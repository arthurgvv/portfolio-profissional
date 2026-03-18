<template>
  <Navegacao />
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
import Navegacao from './components/Navegacao.vue'
import Rodape from './components/Rodape.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped>
.app-main {
  padding-top: 64px;
  flex: 1;
}
</style>