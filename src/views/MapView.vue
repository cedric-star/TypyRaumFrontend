<script setup lang="ts">

import FeatureSidebar from "@/bars/FeatureSidebar.vue";
import MapComponent from "@/misc/MapComponent.vue";
import {onBeforeMount, ref} from "vue";
import {getMetadata, loginRequest} from "@/scripts/endpoints.ts";
import {useAuthStore} from "@/stores/userAuth.ts";
import {useGeoStore} from "@/stores/geometries.ts";
import GeoEditWindow from "@/misc/GeoEditWindow.vue";
import {useStateStore} from "@/stores/internalstates.ts";
import GeoPlaceWindow from "@/misc/GeoPlaceWindow.vue";
import {useRouter} from "vue-router";

const authStore = useAuthStore();
const geoStore = useGeoStore();
const stateStore = useStateStore();
const router = useRouter();


onBeforeMount(async() => {
  if (!authStore.isAuthenticated) {
    console.log("Not logged in!");
    router.push('/login');
  }

  try {
    const resultJson = await getMetadata(authStore.jwt)
    console.log(resultJson);
    if(resultJson && typeof resultJson === 'object' && 'functions' in resultJson && 'types' in resultJson) {

      if(Array.isArray(resultJson.types)) {
        geoStore.types = resultJson.types;
      }
      if(Array.isArray(resultJson.functions)) {
        geoStore.functions = resultJson.functions;
      }

    } else {
      console.error("Invalid response from server. No metadata detected.");
    }
  } catch (e) {
    console.error(e);
    console.error("Error while fetching metadata.");
  }
})

</script>

<template>
<div class="wrapper">
  <div class="col-sidebar">
    <FeatureSidebar/>
  </div>
  <div class="col-map">
    <MapComponent @point-clicked="console.log($event)"/>
  </div>
  <GeoEditWindow v-if="stateStore.openEditWindow"/>
  <GeoPlaceWindow v-if="stateStore.placeGeoMode"/>
</div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  min-height: 0;
}

.col-sidebar {
  flex: 25%;
  min-height: 0;
}

.col-map {
  flex: 75%;
}

</style>