<script setup lang="ts">

import {ref} from "vue";
import {useStateStore} from "@/stores/internalstates.ts";
import {useGeoStore} from "@/stores/geometries.ts";

const dropDownActive = ref<boolean>(false)
const geoName = ref<string>("")
const geoDesc = ref<string>("")
const geoType = ref<string>("Point")
const showEditNotif = ref<boolean>(false)
const stateStore = useStateStore()
const geoStore = useGeoStore();

function handleSelectType(type: string) {
  geoType.value = type;
  dropDownActive.value = false;
  stateStore.selectedGeoType = type;
}

function handleSubmit() {
  showEditNotif.value = false;
  console.log("Submitting new geometry");
  stateStore.selectedGeoName = geoName.value;
  stateStore.selectedGeoDesc = geoDesc.value;
  stateStore.openEditWindow = false;
  stateStore.placeGeoMode = true;
}

function handleDropDownClick() {
  if (stateStore.editMode == true) return;
  dropDownActive.value = !dropDownActive.value
  showEditNotif.value = true;
}

</script>

<template>
  <Teleport to="main">
    <div @click.self="stateStore.openEditWindow = false" id="overlay">
      <div id="edit-form" class="floating-window">
        <form id="gap-form">
          <div>
            <p class="heading">Create a new geometry</p>
            <input class="input-field" type="text" v-model="geoName" placeholder="Name of the geometry"/>
            <input class="input-field" type="text" v-model="geoDesc" placeholder="Description of the geometry"/>
            <button v-if="!stateStore.editMode" type="button" class="input-button-primary-small" @click="handleDropDownClick">Typ wählen - {{geoType}}</button>
            <div class="dropdown-wrapper" v-if="dropDownActive">
              <button v-for="type in geoStore.types" type="button" class="dropdown-option" @click="handleSelectType(type)">{{type}}</button>
            </div>
          </div>
          <button v-if="!stateStore.editMode" type="button" class="input-button-primary" @click="handleSubmit()">Start →</button>
          <button v-else type="button" class="input-button-primary" @click="handleSubmit()">Add →</button>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
  .floating-window {
    max-width: 500px;
    width: 90%;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }

  #overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);

    z-index: 1000;
  }

  #edit-form {
    width: 40%;
    display: flex;
    flex-direction: column;
    border: var(--border-thickness-std) solid var(--color-primary-container-border);
    padding: var(--spacing-medium);
    border-radius: var(--border-radius-std);
    background: var(--color-primary-container-bg-translucent);
  }

  #gap-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-medium);
  }
</style>