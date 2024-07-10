import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/:pathMatch(.*)*', // Обработчик всех остальных маршрутов
    name: 'NotFound',
    component: () => import('../views/NotFound.vue') // Создай компонент NotFound.vue
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router