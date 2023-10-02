import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../views/LoginForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginForm
    },
    {
      path: '/Movies',
      name: 'MovieList',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MovieList.vue')
    },
    {
      path: '/Movie/:id',
      name: 'MovieDetails',
      component: () => import('../views/MovieDetails.vue')
    }
  ]
})

export default router
