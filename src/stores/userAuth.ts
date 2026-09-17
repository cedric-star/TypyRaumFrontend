import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { jwtDecode } from "jwt-decode";

/**
 * Generierung eines Stores mit Nutzerauthentifizierungsdaten.
 */
export const useAuthStore = defineStore("auth", () => {

    const jwt = ref<string>("");

    //Extraktion aller wichtigen Nutzerdaten
    const username = computed(() => jwt.value !== "" ? jwtDecode(jwt.value).sub : "");
    const isAuthenticated = computed(() => jwt.value !== "" && jwtDecode(jwt.value).exp! > Date.now() / 1000);

    async function clearUser() {
        jwt.value = "";
    }

    return { jwt, username, isAuthenticated, clearUser };
}, {
    persist: true,
});