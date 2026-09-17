<script setup lang="ts">
import type {GeoFunction} from "@/scripts/types.ts";
import {useStateStore} from "@/stores/internalstates.ts";
import {ref} from "vue";

const props = defineProps<{
  geoFunction: GeoFunction,
}>()

const emit = defineEmits<{
  functionChosen: [value: string]
  functionDeselected: [value: string]
}>()

function handleFunctionChosen() {
  if(!chosen.value) {
    emit('functionChosen', props.geoFunction.name);
    chosen.value = true;
  } else {
    emit('functionDeselected', props.geoFunction.name);
    chosen.value = false;
  }
}

const stateStore = useStateStore();
const chosen = ref(false);

</script>

<template>
<div @click="handleFunctionChosen" class="list-item-wrapper" :class="chosen ? 'list-item-wrapper-selected' : ''">
  <p class="list-item-title">
    {{props.geoFunction.name}}
  </p>
  <p class="list-item-text">
    Inputs required: {{props.geoFunction.inputs}}
  </p>
  <p class="list-item-text">
    Allowed geometries: {{ props.geoFunction.types.join(', ') }}
  </p>
</div>
</template>

<style scoped>

</style>