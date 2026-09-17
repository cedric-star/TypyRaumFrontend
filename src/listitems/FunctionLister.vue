<script setup lang="ts">
import {useGeoStore} from "@/stores/geometries.ts";
import FunctionListItem from "@/listitems/FunctionListItem.vue";
import {executeGISFunc} from "@/scripts/endpoints.ts";
import {useStateStore} from "@/stores/internalstates.ts";

const geoStore = useGeoStore();
const stateStore = useStateStore();

const emit = defineEmits<{
  functionChosen: [value: string]
}>()

async function handleFunctionChosen(name: string) {
  const res = confirm("Function selected: " + name + "\n\nAfter confirmation you will need to click on the geometry/geometries " +
      "that you want to use this function on. Once all are selected, the function automatically executes." +
      "\nDo you want to use this function now?");
  if(!res) return;
  stateStore.selectedFunc = name;
  stateStore.selectFuncGeomMode = true;
}

async function handleFunctionDeselected(name: string) {
  stateStore.selectedFunc = "";
  stateStore.selectFuncGeomMode = false;
  stateStore.selectedGeoms.splice(0, stateStore.selectedGeoms.length);
}

</script>

<template>
  <div class="lister-wrapper">
    <p class="mini-heading">Functions</p>
    <div class="list-wrapper">
      <FunctionListItem v-for="thisFunction in geoStore.functions" :geoFunction="thisFunction" @functionChosen="handleFunctionChosen($event)" @functionDeselected="handleFunctionDeselected($event)"/>
    </div>
  </div>

</template>

<style scoped>
</style>