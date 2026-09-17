<script setup lang="ts">

</script>

<template>
<div id="footer-wrapper">
  <RouterLink to="/">Home</RouterLink> | <RouterLink to="/about">About</RouterLink> | <RouterLink to="/privacy">Privacy & Data</RouterLink>
</div>
</template>

<style scoped>

#footer-wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 2rem;
  border-top: var(--border-thickness-std) solid var(--color-secondary-container-border);
  background-color: var(--color-primary-container-bg-translucent);
}

</style>