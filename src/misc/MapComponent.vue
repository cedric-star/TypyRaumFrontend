<script setup lang="ts">

import 'maplibre-gl/dist/maplibre-gl.css'
import {onMounted, onUnmounted, ref, shallowRef} from "vue";
import {useGeoStore} from "@/stores/geometries.ts";
import {getGeometriesById} from "@/scripts/endpoints.ts";
import {useAuthStore} from "@/stores/userAuth.ts";
import pinIcon from "@/assets/icons/map_pin_green.png";
import {useStateStore} from "@/stores/internalstates.ts";

import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

maplibregl.setWorkerUrl(maplibreWorkerUrl);

//const styleUrl = window.location.origin + import.meta.env.BASE_URL + 'map-style.json'
const geoStore = useGeoStore();
const authStore = useAuthStore();
const stateStore = useStateStore();

const emit = defineEmits<{
  (e: "point-clicked", coords: [number]): void
  (e: "object-chosen", value: string): void
}>()

function transformRequest(url: string, resourceType?: string) {
  if (url.startsWith(import.meta.env.VITE_MARTIN_HOST)) {
    return {
      url,
      headers: {
        Authorization: 'Basic ' + btoa(`${import.meta.env.VITE_MARTIN_USER}:${import.meta.env.VITE_MARTIN_PW}`),
      },
    }
  }
  return { url }
}

async function loadIcon(map: maplibregl.Map, name: string, url: string): Promise<void> {
  if (map.hasImage(name)) return;

  const response = await map.loadImage(url);
  if (!map.hasImage(name)) {
    map.addImage(name, response.data);
  }
}

onMounted(async () => {
    geoStore.map! = new maplibregl.Map({
      container: 'map',
      style: {
        "version": 8,
        "sources": {
          "satellite": {
            "type": "raster",
            "tiles": [
              "https://raum-martin.micedric.dpdns.org/map/{z}/{x}/{y}"
            ],
            "tileSize": 256
          }
        },
        "layers": [{
          "id": "satellite",
          "type": "raster",
          "source": "satellite"
        }]
      },
      center: [11.96783,51.47286],
      zoom: 10,
      maxBounds: [
        [11.9388965, 51.4334917], // Süd-Westen
        [11.9923481, 51.5025798]  // Nord-Osten
      ],
      maxZoom: 16,
      maplibreLogo: true,
      transformRequest
    });

  geoStore.map!.on('load', async () => {
    console.log("Map loaded")

    console.log('pinIcon URL:', pinIcon);

    try {
      await loadIcon(geoStore.map!, 'pin', pinIcon);
    } catch (err) {
      console.error('Failed to load icon:', err);
    }

    const resultJson = await getGeometriesById(authStore.jwt, authStore.userid)
    if(resultJson && Array.isArray(resultJson)) {
      geoStore.geometries.splice(0, geoStore.geometries.length);
      for(const geometry of resultJson) {
        geoStore.geometries.push(geometry);
        console.log(geometry);
      }
      for(const [index, geometry] of geoStore.geometries.entries()) {
        const id = "" + geometry.id;

        geoStore.map!.addSource(id, {
          type: 'geojson',
          data: geometry.geo_data,
        });

        const geoType = geometry.geo_data.type

        if(geoType === "Point" || geoType === "MultiPoint") {
          geoStore.map!.addLayer({
            id: id,
            type: 'symbol',
            source: id,
            layout: {
              'icon-image': 'pin',
              'text-field': geometry.title,
              'text-font': [ 'Noto Sans Regular' ],
              'text-offset': [0, 1.25],
              'text-anchor': 'top',
              'icon-overlap': 'always'
            },
            paint: {
              'text-color': '#26a269',
              'text-halo-color': '#ffffff',
              'text-halo-width': 2,
              'text-halo-blur': 2,
            }
          });
        } else if (geoType === "LineString" || geoType === "MultiLineString") {
          geoStore.map!.addLayer({
            id: id,
            type: 'line',
            source: id,
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#2e98d5',
              'line-width': 5
            }
          });
        } else if (geoType === "Polygon" || geoType === "MultiPolygon") {

          geoStore.map!.addLayer({
            id: id,
            type: 'line',
            source: id,
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#ec8b2c',
              'line-width': 5
            }
          });
          geoStore.map!.addLayer({
            id: id + "-fill",
            type: 'fill',
            source: id,
            paint: {
              'fill-color': '#edaa69',
              'fill-opacity': 0.2
            }
          });
        }
      }
    } else {
      console.error("Invalid response from server. No geometries detected.");
      return;
    }
  });


})

onUnmounted(() => {
  geoStore.map!.remove();
  geoStore.map = null;
});

</script>

<template>
<div id="map"/>
</template>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>