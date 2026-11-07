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
    path: '/projetos/:slug',
    name: 'projeto-detalhe',
    component: () => import('../views/ProjetoDetalhe.vue'),
    props: true,
  },
  {
    path: '/experiencias',
    name: 'experiencias',
    component: () => import('../views/Experiencias.vue'),
  },
  {
    path: '/livros',
    name: 'livros',
    component: () => import('../views/Livros.vue'),
  },
  {
    path: '/contato',
    name: 'contato',
    component: () => import('../views/Contato.vue'),
  },
]

// A transição de página (mode="out-in" no App.vue) mantém a página antiga na tela
// por ~0.2s. Se rolarmos antes dela sair, a rolagem é cortada quando a página
// muda de altura e a nova página abre no meio/fim. Por isso esperamos ela sair.
let resolvePageLeft = null

export function notifyPageLeft() {
  if (resolvePageLeft) {
    resolvePageLeft()
    resolvePageLeft = null
  }
}

function waitForPageLeave() {
  return new Promise((resolve) => {
    resolvePageLeft = resolve
    // Garantia: se a transição não disparar o evento, segue mesmo assim
    setTimeout(() => {
      if (resolvePageLeft === resolve) notifyPageLeft()
    }, 500)
  })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  async scrollBehavior(to, from, savedPosition) {
    // Só há transição quando o componente da página muda (ex.: início -> projeto)
    const pageChanged = from.matched[0]?.components?.default !== to.matched[0]?.components?.default
    if (pageChanged && from.matched.length) await waitForPageLeave()

    if (savedPosition) return savedPosition
    // 'instant' ignora o scroll-behavior: smooth do CSS, que seria interrompido na troca de página
    if (to.hash) return { el: to.hash, behavior: pageChanged ? 'instant' : 'smooth' }
    return { top: 0, left: 0, behavior: 'instant' }
  },
})

export default router
