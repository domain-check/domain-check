import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import SearchView from '@/views/SearchView.vue';
import WatchListView from '@/views/WatchListView.vue';
import ExtensionListView from '@/views/ExtensionListView.vue';
import Error404View from '@/views/Error404View.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Search',
      component: SearchView,
    },
    {
      path: '/:pathMatch(.*)',
      name: '404',
      component: Error404View
    },
    {
      path: '/watch',
      name: 'WatchList',
      component: WatchListView
    },
    {
      path: '/extensions',
      name: 'ExtensionList',
      component: ExtensionListView
    }
  ],
})

export default router
