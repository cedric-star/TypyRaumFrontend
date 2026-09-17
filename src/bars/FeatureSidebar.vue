<script setup lang="ts">
import GeometryLister from "@/listitems/GeometryLister.vue";
import FunctionLister from "@/listitems/FunctionLister.vue";
import {ref} from "vue";

const view = ref<string>("GEOMS");

function setLocationsView() {
  view.value = "GEOMS";
}

function setFunctionsView() {
  view.value = "FUNCS";
}

</script>

<template>
  <div id="the-wrap">
    <div id="buttons">
      <button
          class="input-button-primary-small"
          @click="setLocationsView"
          :class="{ active: view === 'GEOMS' }"
      >
        Locations
      </button>
      <button
          class="input-button-primary-small"
          @click="setFunctionsView"
          :class="{ active: view === 'FUNCS' }"
      >
        Functions
      </button>
    </div>

    <GeometryLister v-if="view === 'GEOMS'" />
    <FunctionLister v-if="view === 'FUNCS'" />
  </div>
</template>

<style scoped>

#the-wrap {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  overflow: hidden;
}

#buttons {
  display: flex;
  justify-content: center;
  gap: 8px;
  background-color: var(--color-primary-container-bg-translucent);
  padding: 8px;
  align-items: center;
}

.input-button-primary-small {
  transition: opacity 0.2s ease;
}

.input-button-primary-small.active {
  opacity: 0.5;
  cursor: default;
}

</style>