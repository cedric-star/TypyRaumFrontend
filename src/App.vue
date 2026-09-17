<script setup lang="ts">
import {onBeforeMount, onMounted, ref, watch} from "vue";
import MapView from "@/views/MapView.vue";
import LoginView from "@/views/LoginView.vue";
import {useAuthStore} from "@/stores/userAuth.ts";
import Footer from "@/bars/Footer.vue";
import AboutView from "@/views/AboutView.vue";

const authStore = useAuthStore();
const authorized = ref(authStore.isAuthenticated);

onBeforeMount(() => {
  authorized.value = authStore.isAuthenticated;
})

watch(authStore.$state, () => {
  authorized.value = authStore.isAuthenticated;
})

</script>

<template>
  <header>

  </header>

  <main>
    <RouterView/>
    <Footer/>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

</style>
