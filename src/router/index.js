import { createRouter, createWebHistory } from 'vue-router';

import store from '@/store';

const Home = () => import('@/views/Home.vue');
const About = () => import('@/views/About.vue');
const Manage = () => import(/* webpackChunkName: "groupedChunk" */'@/views/Manage.vue');
const Song = () => import(/* webpackChunkName: "groupedChunk" */'@/views/Song.vue');

const Browse = () => import('@/views/Browse.vue');
const ListenNow = () => import('@/views/ListenNow.vue');

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'about',
    path: '/about',
    component: About,
  },
  {
    name: 'manage',
    path: '/manage-music',
    // alias: '/manage',
    meta: { requiresAuth: true },
    component: Manage,
    beforeEnter: (to, from, next) => {
      // console.log('Manage guard');
      next();
    },
  },
  {
    path: '/manage',
    redirect: { name: 'manage' },
  },
  {
    name: 'song',
    path: '/song/:id',
    component: Song,
  },
  // New routes
  {
    name: 'listen-now',
    path: '/listen-now',
    component: ListenNow,
  },
  {
    name: 'browse',
    path: '/browse',
    component: Browse,
  },
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'home' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // linkExactActiveClass: 'text-yellow-500',
});

router.beforeEach((to, from, next) => {
  // console.log(to.matched);
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }
  if (store.state.auth.userLoggedIn) {
    next();
  } else next({ name: 'home' });
});

export default router;
