<template>
  <Navegacao />
  <div class="scroll-progress" aria-hidden="true">
    <div class="scroll-progress-bar" :style="{ width: `${scrollProgress}%` }"></div>
  </div>
  <main class="app-main">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <Rodape />
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Navegacao from './components/Navegacao.vue'
import Rodape from './components/Rodape.vue'
import { RouterView } from 'vue-router'

const scrollProgress = ref(0)

function updateScrollProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = scrollableHeight > 0
    ? Math.min(100, Math.max(0, (scrollTop / scrollableHeight) * 100))
    : 0
}

onMounted(() => {
  updateScrollProgress()
  window.addEventListener('scroll', updateScrollProgress, { passive: true })
  window.addEventListener('resize', updateScrollProgress)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollProgress)
  window.removeEventListener('resize', updateScrollProgress)
})
</script>

<style scoped>
.scroll-progress {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  z-index: 99;
  height: 4px;
  background: rgba(200, 245, 74, 0.08);
  border-bottom: 1px solid rgba(200, 245, 74, 0.12);
}

.scroll-progress-bar {
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, var(--accent), #00c850);
  box-shadow: 0 0 14px rgba(200, 245, 74, 0.45);
  transition: width 0.08s linear;
}

.app-main {
  padding-top: 64px;
  flex: 1;
  min-width: 0;
}
</style>
