import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/summer',
            name: "summer",
            component: () => import(/* webpackChunkName: "summer" */ '../views/Summer.vue')
        },
        {
            path: '/fall-winter',
            name: "fall-winter",
            component: () => import(/* webpackChunkName: "fall-winter" */ '../views/FallWinter.vue')
        },
        {
            path: '/demo',
            name: "demo",
            component: () => import(/* webpackChunkName: "fall-winter" */ '../views/Demo.vue')
        }
    ]
});
