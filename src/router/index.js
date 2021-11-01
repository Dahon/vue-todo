import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import List from '../components/List.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    { 
        path: '/todo/:id',
        name: 'todo',
        component: List 
    },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
});
