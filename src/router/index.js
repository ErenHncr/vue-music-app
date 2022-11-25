import { createRouter, createWebHistory } from 'vue-router';

import store from '@/store';

const ListenNow = () => import('@/views/ListenNow.vue');
const Browse = () => import('@/views/Browse.vue');
const Song = () => import('@/views/Song.vue');
const Manage = () => import(/* webpackChunkName: "groupedChunk" */'@/views/Manage.vue');
const Manage2 = () => import(/* webpackChunkName: "groupedChunk" */'@/views/Manage/Manage.vue');

const routes = [
  {
    name: 'manage',
    path: '/manage-music',
    alias: '/manage',
    meta: { requiresAuth: true },
    component: Manage,
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
    name: 'song',
    path: '/song/:id',
    component: Song,
  },
  {
    name: 'manage2',
    path: '/manage2',
    component: Manage2,
  },
  {
    name: 'manage',
    path: '/manage-music',
    // alias: '/manage',
    // meta: { requiresAuth: true },
    component: Manage,
    // beforeEnter: (to, from, next) => {
    //   // console.log('Manage guard');
    //   next();
    // },
  },
  {
    path: '/',
    redirect: { name: 'listen-now' },
  },
  {
    path: '/manage',
    redirect: { name: 'manage' },
  },
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'listen-now' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }
  if (store.state.auth.userLoggedIn) {
    next();
  } else next({ name: 'listen-now' });
});

export default router;
