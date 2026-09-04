import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/Inicio.vue'

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: Inicio,
  },
  {
    path: '/sobre',
    name: 'sobre',
    component: () => import('../views/SobreMim.vue'),
  },
  {
    path: '/projetos',
    name: 'projetos',
    component: () => import('../views/Projetos.vue'),
  },
  {
    path: '/experiencias',
    name: 'experiencias',
    component: () => import('../views/Experiencias.vue'),
  },
  {
    path: '/contato',
    name: 'contato',
    component: () => import('../views/Contato.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
