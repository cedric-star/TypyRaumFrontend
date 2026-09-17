import {createMemoryHistory, createRouter, createWebHistory} from 'vue-router'
import AboutView from "@/views/AboutView.vue";
import LoginView from "@/views/LoginView.vue";
import MapView from "@/views/MapView.vue";
import PrivacyView from "@/views/PrivacyView.vue";


const routes = [
    { path: '/', component: MapView },
    { path: '/login', component: LoginView },
    { path: '/about', component: AboutView },
    { path: '/privacy', component: PrivacyView },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router