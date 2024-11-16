import {createWebHistory, createRouter} from 'vue-router';
import HomePage from "@/pages/Base/HomePage.vue";
import LoginPage from "@/pages/Auth/LoginPage.vue";
import RegisterPage from "@/pages/Auth/RegisterPage.vue";
import MarketplacePage from "@/pages/Base/MarketplacePage.vue";
import ErrorPage from "@/pages/Base/ErrorPage.vue";
import FaqPage from "@/pages/Base/FaqPage.vue";
import Profile from "@/pages/User/Profile.vue";


const routes = [
    {path: '/', component: HomePage},
    {path: '/login', component: LoginPage},
    {path: '/register', component: RegisterPage},
    {path: '/marketplace', component: MarketplacePage},
    {path: '/error', component: ErrorPage},
    {path: '/faq', component: FaqPage},
    {path: '/profile', component: Profile},
    { path: '/:pathMatch(.*)*', redirect: '/error' }



];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// router.beforeEach((to, from, next) => {
//     if (to.meta.middleware) {
//         to.meta.middleware({ next, router });
//     } else {
//         next();
//     }
// });


export default router;