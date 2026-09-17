<script setup lang="ts">

</script>

<template>
  <div class="card-wrapper">
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-content">
      <slot/>
    </div>
  </div>
</template>

<style scoped>
  .card-wrapper {
    padding: var(--card-top-pad) var(--card-sides-pad) var(--card-bottom-pad);
    margin: var(--spacing-large) var(--spacing-medium);

    border: var(--border-thickness-std) solid;
    border-radius: var(--border-radius-std);
    display: flex;
    flex-direction: column;

    background: var(--color-primary-container-bg);
    color: var(--color-primary-text);
    border-color: var(--color-primary-container-border);
  }

  .card-header {
    font-size: var(--font-size-heading);
    margin-bottom: var(--spacing-small);
  }

  .card-content {
    font-size: var(--font-size-std);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
</style>