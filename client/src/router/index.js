import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
        meta: { requiresRegister: true },
        beforeEnter: (to, from, next ) => {
            if( localStorage.getItem('userId') != null ) next();
            else next('/register');
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView,
        meta: { requiresRegister: false },
        beforeEnter: (to, from, next ) => {
            if( localStorage.getItem('userId') == null ) next();
            else next('/');
        }
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

export default router;