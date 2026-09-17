import { defineStore } from "pinia";
import {ref, computed, shallowRef} from "vue";
import { jwtDecode } from "jwt-decode";
import type {GeoFunction, GeometryObj, ReceivedGeom, SimpleGeoJSON} from "@/scripts/types.ts";
import * as maplibregl from "maplibre-gl";

/**
 * Generierung eines Stores mit Geometrie-Stores.
 */
export const useGeoStore = defineStore("geo", () => {

    const types = ref<string[]>([]);
    const functions = ref<GeoFunction[]>([]);
    const geometries = ref<GeometryObj[]>([]);
    const map = shallowRef<maplibregl.Map | null>(null);
    const receivedFuncGeom = ref<ReceivedGeom[]>([]);


    return { types, functions, geometries, map, receivedFuncGeom };
}, {
    persist: true,
});