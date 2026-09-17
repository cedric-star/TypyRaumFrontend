<script setup lang="ts">
import type {GeoFunction, GeometryObj} from "@/scripts/types.ts";
import {sendDeleteGeometry} from "@/scripts/endpoints.ts";

const props = defineProps<{
  geom: GeometryObj,
}>()

const emit = defineEmits<{
  geomChosen: [value: number],
  geomDelete: [value: number]
}>()

</script>

<template>
<div class="list-item-wrapper">
  <div @click="$emit('geomChosen', props.geom.id)" class="info-wrapper">
    <p class="list-item-title">
      {{props.geom.title}} (#{{props.geom.id}})
    </p>
    <p class="list-item-text">
      Beschreibung: {{props.geom.description}}
    </p>
    <p class="list-item-text">
      Art: {{props.geom.geo_data.type}}
    </p>
  </div>
  <button type="button" @click="$emit('geomDelete', props.geom.id)" id="input-button-delete">Delete</button>
</div>
</template>

<style scoped>

.list-item-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-mini);
}

#input-button-delete {
  border: var(--border-thickness-std) solid var(--color-error-container-border);
  border-radius: var(--border-radius-std);
  padding: var(--spacing-small);
  font-size: var(--font-size-std);
  background-color: var(--color-error-container-bg-translucent);
  color: var(--color-error-text);
  transition-duration: var(--transition-time-std);
  margin-right: var(--spacing-mini);
}

#input-button-delete:hover {
  background-color: var(--color-error-container-bg);
  cursor: pointer;
}

</style>