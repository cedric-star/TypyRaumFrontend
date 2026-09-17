<script setup lang="ts">

import GeometryLister from "@/listitems/GeometryLister.vue";
import FunctionLister from "@/listitems/FunctionLister.vue";
</script>

<template>
<div id="the-wrap">
  <GeometryLister id="geo-list-size"/>
  <FunctionLister id="func-list-size"/>
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

#geo-list-size {
  flex: 60%;
  min-height: 0;
  display: flex;
  overflow: hidden;
}

#func-list-size {
  flex: 40%;
  min-height: 0;
  display: flex;
  overflow: hidden;
}

</style>