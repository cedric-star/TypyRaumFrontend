import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { jwtDecode } from "jwt-decode";

interface AccessPayload {
    user: string;
    name: string;
    role: "ADMIN" | "USER";
    exp: number;
    iat: number;
    typ: "access";
}

export const useAuthStore = defineStore("auth", () => {
    const jwt = ref<string>("");

    const payload = computed<AccessPayload | null>(() => {
        if (!jwt.value) return null;
        try {
            const p = jwtDecode<AccessPayload>(jwt.value);
            return p.typ === "access" ? p : null;
        } catch {
            return null;
        }
    });

    const userid = computed(() => payload.value?.user ?? "");
    const username = computed(() => payload.value?.name ?? "");
    const role = computed(() => payload.value?.role ?? null);
    const isAuthenticated = computed(
        () => payload.value !== null && payload.value.exp > Date.now() / 1000
    );

    async function clearUser() {
        jwt.value = "";
    }

    return { jwt, userid, role, isAuthenticated, username, clearUser };
}, {
    persist: true,
});