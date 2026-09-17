<script setup lang="ts">
import {useGeoStore} from "@/stores/geometries.ts";
import FunctionListItem from "@/listitems/FunctionListItem.vue";
import GeometryListItem from "@/listitems/GeometryListItem.vue";
import type {GeometryObj} from "@/scripts/types.ts";
import {bbox, center, geometry} from "@turf/turf";
import type {
  Feature,
  Geometry,
  GeometryCollection,
  LineString, MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon
} from 'geojson';
import {useStateStore} from "@/stores/internalstates.ts";
import {executeGISFunc, getGeometries, sendDeleteGeometry} from "@/scripts/endpoints.ts";
import {useAuthStore} from "@/stores/userAuth.ts";
import {loadGeoms} from "@/scripts/geom-funcs.ts";
import {ref} from "vue";

const geoStore = useGeoStore();
const stateStore = useStateStore();
const authStore = useAuthStore();

type GISResult = GeometryCollection | Point | LineString | Polygon | MultiPoint | MultiLineString | MultiPolygon;

async function addNewGeom(resultJson: GeometryCollection | Point | LineString | Polygon | MultiPolygon | MultiLineString | MultiPoint) {

  if(resultJson.type === 'GeometryCollection') {
      for (const geom of resultJson.geometries) {
        geoStore.receivedFuncGeom.push({ geo_data: geom })
      }
  } else if(
      resultJson.type === 'Polygon' ||
      resultJson.type === 'LineString' ||
      resultJson.type === 'Point' ||
      resultJson.type === 'MultiPolygon' ||
      resultJson.type === 'MultiLineString' ||
      resultJson.type === 'MultiPoint'
  ) {
    geoStore.receivedFuncGeom.push({ geo_data: resultJson })
  }
}

async function handleGISResult(result: GISResult | unknown) {
  stateStore.selectedGeoms.splice(0, stateStore.selectedGeoms.length);
  if(
      result && typeof result == 'object' && 'type' in result && (
      result.type === 'GeometryCollection' ||
      result.type === 'Polygon' ||
      result.type === 'LineString' ||
      result.type === 'Point' ||
      result.type === 'MultiPolygon' ||
      result.type === 'MultiLineString' ||
      result.type === 'MultiPoint')
  ) {
    stateStore.openEditWindow = true;
    stateStore.editMode = true;
    await addNewGeom(result as GISResult);
  } else {
    confirm("Ergebnis deiner Anfrage: " + result + "");
  }
}

async function handleGeomClicked(id: string) {
  if(stateStore.selectFuncGeomMode) {
    const added = await pushGeomToStore(id);
    if(!added) return;
    const activeFunc = geoStore.functions.find(func => func.name === stateStore.selectedFunc);
    if(activeFunc == undefined) return;
    if(stateStore.selectedGeoms.length >= activeFunc.inputs) {
      const resultJSON = await executeGISFunc(authStore.jwt, stateStore.selectedFunc, stateStore.selectedGeoms)
      if(resultJSON == undefined) return;
      await handleGISResult(resultJSON);
      return;
    }

  } else {
    jumpToMapLocation(id)
  }
}

async function pushGeomToStore(id: string): Promise<boolean> {
  if(stateStore.selectedGeoms[stateStore.selectedGeoms.length - 1] == id) return false;
  if(stateStore.selectedGeoms.includes(id)) {
    stateStore.selectedGeoms.splice(stateStore.selectedGeoms.indexOf(id), 1);
    return false;
  } else {
    stateStore.selectedGeoms.push(id);
    console.log(stateStore.selectedGeoms);
    return true;
  }
}

function jumpToMapLocation(id: String) {
  const geom = geoStore.geometries.find(geometry => geometry.id === id);

  if(!geom) return;
  const feature = geom.geo_data as unknown as Feature<Geometry>;

  const [minX, minY, maxX, maxY] = bbox(feature);
  const centerPoint = center(feature);
  const centerCoords = centerPoint.geometry.coordinates;

  geoStore.map!.jumpTo({center: centerCoords as [number, number], zoom: 15});
}

function handleCreate() {
  stateStore.createMode = true;
  stateStore.openEditWindow = true;
}

const view = ref<string>("USER");
function toggleView() {
  if (view.value == "USER") {
    loadGeoms(true);
    view.value = "ADMIN";
  }
  else if (view.value == "ADMIN") {
    loadGeoms();
    view.value = "USER";
  }
}

async function handleDelete(id: string) {
  var result = confirm("Are you sure you want to delete this geometry? This action cannot be undone.");
  if (!result) {
    return;
  }
  await sendDeleteGeometry(authStore.jwt, id)
  await loadGeoms()
}

</script>

<template>
  <div class="lister-wrapper">
    <p class="mini-heading">Geometries</p>
    <div v-if="authStore.role==='ADMIN'">
      <button @click="toggleView" class="input-button-primary-small">
        See all locations as {{ view === "ADMIN" ? "User" : "Admin" }}
      </button>
    </div>
    <div class="option-lister">
      <button @click="handleCreate" class="input-button-primary-small">Create new geometry</button>
    </div>
    <div class="list-wrapper">
      <GeometryListItem v-for="thisGeom in geoStore.geometries" :key="thisGeom.id" :geom="thisGeom" @geomChosen="handleGeomClicked($event)" @geomDelete="handleDelete($event)"/>
    </div>
  </div>
</template>

<style scoped>

</style>