import { defineStore } from "pinia";
import {ref, computed, shallowRef} from "vue";
import { jwtDecode } from "jwt-decode";
import type {GeoFunction, GeometryObj} from "@/scripts/types.ts";
import * as maplibregl from "maplibre-gl";

/**
 * Generierung eines Stores mit Geometrie-Stores.
 */
export const useStateStore = defineStore("state", () => {

    const createMode = ref(false);
    const editMode = ref(false);
    const openEditWindow = ref(false);
    const createGeomType = ref<string>("");
    const selectedGeoType = ref<string>("Point");
    const selectedGeoName = ref<string>("");
    const selectedGeoDesc = ref<string>("");
    const placeGeoMode = ref(false);
    const placedPoints = ref<maplibregl.LngLat[]>([]);
    const selectedFunc = ref<string>("")
    const selectedGeoms = ref<number[]>([])
    const selectFuncGeomMode = ref(false);

    return { createMode, editMode, openEditWindow, createGeomType, selectedGeoType, placeGeoMode, placedPoints,
        selectedGeoName, selectedGeoDesc, selectedGeoms, selectFuncGeomMode, selectedFunc };
}, {
    persist: false,
});