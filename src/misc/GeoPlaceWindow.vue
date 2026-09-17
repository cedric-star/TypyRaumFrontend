<script setup lang="ts">

import {onMounted, onUnmounted, ref, watch} from "vue";
import {useStateStore} from "@/stores/internalstates.ts";
import {useGeoStore} from "@/stores/geometries.ts";
import * as maplibregl from "maplibre-gl";
import {sendGeometry} from "@/scripts/endpoints.ts";
import {useAuthStore} from "@/stores/userAuth.ts";
import type {GeoJSON} from "geojson";
import {loadGeoms} from "@/scripts/geom-funcs.ts";

const authStore = useAuthStore();
const stateStore = useStateStore()
const geoStore = useGeoStore();
const SOURCE_ID = "placed-points-line";
const LAYER_ID = "placed-points-line-layer";
const markers: maplibregl.Marker[] = [];
const pointLimit = ref<number>(1024);

function handleCancel() {
  stateStore.placeGeoMode = false;
  stateStore.createMode = false;
  markers.forEach(m => m.remove());
  markers.length = 0;
  stateStore.placedPoints.splice(0, stateStore.placedPoints.length);
}

async function handleSave() {
  if(stateStore.editMode) {
    console.log("Saving geometry in editMode");
    if(geoStore.receivedFuncGeom.length == 0) return;
    for(const geom of geoStore.receivedFuncGeom) {
      const geoData = geom.geo_data

      console.log(geoData);

      if(
          geoData.type == "Point" ||
          geoData.type == "LineString" ||
          geoData.type == "Polygon" ||
          geoData.type == "MultiPolygon" ||
          geoData.type == "MultiLineString" ||
          geoData.type == "MultiPoint"
      ) {
        console.log("Point data detected...")
        await sendGeometry(authStore.jwt, stateStore.selectedGeoName, stateStore.selectedGeoDesc, geoData.type, geoData.coordinates );
        geoStore.receivedFuncGeom.splice(0, geoStore.receivedFuncGeom.length);
      }
    }

  } else {
    if(stateStore.placedPoints.length == 0) return;
    const coordinates = stateStore.placedPoints.map((p: maplibregl.LngLat) => [p.lng, p.lat]);

    if(coordinates.length >= 1 && coordinates[0] instanceof Array) {
      if(stateStore.selectedGeoType == "Point") {
        await sendGeometry(authStore.jwt, stateStore.selectedGeoName, stateStore.selectedGeoDesc, stateStore.selectedGeoType, coordinates[0] );
      } else if(stateStore.selectedGeoType == "LineString") {
        await sendGeometry(authStore.jwt, stateStore.selectedGeoName, stateStore.selectedGeoDesc, stateStore.selectedGeoType, coordinates );
      } else if(stateStore.selectedGeoType == "Polygon") {
        coordinates.push(coordinates[0]);
        await sendGeometry(authStore.jwt, stateStore.selectedGeoName, stateStore.selectedGeoDesc, stateStore.selectedGeoType, [coordinates] );
      }
    }
  }

  await loadGeoms();
  handleCancel();
}

function addPointToMap(point: maplibregl.LngLat) {
  const el = document.createElement("div");
  el.className = "polygon-point-marker";
  el.textContent = String(stateStore.placedPoints.length);
  el.className = "polygon-point-marker";

  const m = new maplibregl.Marker({ element: el })
      .setLngLat(point)
      .addTo(geoStore.map!);
  markers.push(m);
}

function updatePointLayer() {
  if(!geoStore.map) return;

  const coordinates = stateStore.placedPoints.map((p: maplibregl.LngLat) => [p.lng, p.lat]);

  const geoJSONLine: GeoJSON.Feature = {
    type: "Feature",
    geometry: { type: "LineString", coordinates },
    properties: {}
  };

  const source = geoStore.map.getSource(SOURCE_ID) as maplibregl.GeoJSONSource | undefined;

  if (source) {
    source.setData(geoJSONLine);
  } else {
    geoStore.map.addSource(SOURCE_ID, {type: "geojson", data: geoJSONLine});
    geoStore.map.addLayer({
      id: LAYER_ID,
      type: "line",
      source: SOURCE_ID,
      paint: {
        "line-color": "#efb930",
        "line-width": 2
      }
    });
  }
}

function handleMapClick(e: maplibregl.MapMouseEvent) {
  console.log(pointLimit.value);
  console.log(stateStore.placedPoints.length);

  if(stateStore.placedPoints.length >= pointLimit.value) return;
  console.log(e.lngLat)
  stateStore.placedPoints.push(e.lngLat);
  addPointToMap(e.lngLat);
  updatePointLayer();
}

onMounted(async() => {
  if(stateStore.editMode) {
    console.log("Placement mode activated in edit mode, saving geom...")
    await handleSave();
    stateStore.editMode = false;
    stateStore.placeGeoMode = false;
    return;
  }
  geoStore.map!.on('click', handleMapClick);
  if(stateStore.selectedGeoType == "Point") {
    pointLimit.value = 1;
  }
})

onUnmounted(() => {
  geoStore.map?.off('click', handleMapClick);
})

</script>

<template>
  <Teleport to="main">
    <div class="floating-window">
      <button :class="stateStore.placedPoints.length == 0 ? 'input-button-tertiary-unavailable' : 'input-button-tertiary'" type="button" @click="handleSave">Save</button>
      <!--button type="button" class="input-button-tertiary" @click="">Undo last</button-->
      <button type="button" class="input-button-tertiary" @click="handleCancel">Cancel</button>
    </div>
  </Teleport>
</template>

<style scoped>
.floating-window {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-mini);
  position: fixed;
  bottom: 20px;
  left: 50%;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  border: var(--border-thickness-std) solid var(--color-tertiary-container-border);
  padding: var(--spacing-mini);
  border-radius: var(--border-radius-std);
  background: var(--color-tertiary-container-bg-translucent);
  align-items: center;
  justify-content: space-between;
}


</style>