<script setup lang="ts">

import {onBeforeMount, ref} from "vue";
import {loginRequest} from "@/scripts/endpoints.ts";
import {useAuthStore} from '@/stores/userAuth.ts';
import {useRouter} from "vue-router";

const username = ref<string>("");
const password = ref<string>("");
const failedAuth = ref<boolean>(false);
const authStore = useAuthStore();
const router = useRouter();

async function sendLoginRequest() {
  try {
    const resultJson = await loginRequest(username.value, password.value)
    console.log(resultJson);
    if(resultJson && typeof resultJson === 'object' && 'access_token' in resultJson) {
      if(typeof resultJson.access_token == 'string') {
        authStore.jwt = resultJson.access_token;
        router.push('/');
      }
    } else {
      console.log(authStore.isAuthenticated);
      console.error("Invalid response from server. No JWT detected.");
    }
  } catch (e) {
    failedAuth.value = true;
  }

  if(authStore.isAuthenticated) {
    console.log("Successfully logged in!");

  }
}

onBeforeMount(() => {
  if(authStore.isAuthenticated) {
    console.log("Already logged in!");
    if (authStore.isAuthenticated) router.push('/');
  }
})

</script>

<template>
<div class="wrapper">
  <form id="login-form">
    <input class="input-field" type="text" v-model="username" placeholder="Username"/>
    <div id="password-input-container">
      <input class="input-field" type="password" v-model="password" placeholder="Password">
      <div class="info-icon-container">
        <img class="info-icon" src="@/assets/icons/help_primary-col-txt.svg" alt="help"/>
        <span class="info-text">min. 8 characters with at least one capital letter, one number and one special character</span>
      </div>

    </div>
    <p v-if="failedAuth" class="error-msg">Wrong password or username!</p>
    <div class="flex-center">
      <button type="button" class="input-button-primary" @click="sendLoginRequest">Login</button>
    </div>
  </form>
</div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#login-form {
  width: 20rem;
  display: flex;
  flex-direction: column;
  border: var(--border-thickness-std) solid var(--color-primary-container-border);
  padding: var(--spacing-medium);
  border-radius: var(--border-radius-std);
  background: var(--color-primary-container-bg-translucent);
}

#password-input-container {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.input-field {
  background: var(--color-secondary-container-bg-translucent);
}

</style>