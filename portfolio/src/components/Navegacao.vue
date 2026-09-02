<template>
  <nav class="navbar">
    <div class="nav-inner">
      <RouterLink to="/" class="nav-logo">
        <span class="bracket">&lt;</span>AG<span class="bracket">/&gt;</span>
      </RouterLink>

      <div id="primary-navigation" class="nav-links" :class="{ open: menuOpen }">
        <RouterLink to="/#sobre" @click="menuOpen = false">{{ labels[lang].about }}</RouterLink>
        <RouterLink to="/#projetos" @click="menuOpen = false">{{ labels[lang].projects }}</RouterLink>
        <RouterLink to="/#experiencias" @click="menuOpen = false">{{ labels[lang].experience }}</RouterLink>
        <RouterLink to="/#livros" @click="menuOpen = false">{{ labels[lang].books }}</RouterLink>
        <RouterLink to="/#contato" class="nav-cta" @click="menuOpen = false">
          {{ labels[lang].contact }}&nbsp;↗
        </RouterLink>
        <button
          type="button"
          class="lang-switch mono"
          :aria-label="labels[lang].toggle"
          @click="toggleLanguage"
        >
          {{ nextLanguage }}
        </button>
      </div>

      <button
        type="button"
        class="hamburger"
        :class="{ open: menuOpen }"
        @click="menuOpen = !menuOpen"
        :aria-label="menuOpen ? labels[lang].closeMenu : labels[lang].openMenu"
        :aria-expanded="menuOpen"
        aria-controls="primary-navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <button
        v-if="menuOpen"
        type="button"
        class="nav-backdrop"
        :aria-label="labels[lang].closeMenu"
        @click="menuOpen = false"
      ></button>
    </div>
  </nav>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useLanguage } from '../composables/useLanguage'

const menuOpen = ref(false)
const { lang, nextLanguage, toggleLanguage } = useLanguage()

const labels = {
  pt: {
    about: 'Sobre Mim',
    projects: 'Projetos',
    experience: 'Experiências',
    books: 'Livros',
    contact: 'Contato',
    toggle: 'Mudar site para inglês',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
  },
  en: {
    about: 'About Me',
    projects: 'Projects',
    experience: 'Experience',
    books: 'Books',
    contact: 'Contact',
    toggle: 'Switch site to Portuguese',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
}

function closeMenuOnDesktop() {
  if (window.innerWidth > 768) menuOpen.value = false
}

function closeMenuOnEscape(event) {
  if (event.key === 'Escape') menuOpen.value = false
}

watch(menuOpen, (isOpen) => {
  document.body.classList.toggle('menu-open', isOpen)
})

onMounted(() => {
  window.addEventListener('resize', closeMenuOnDesktop)
  window.addEventListener('keydown', closeMenuOnEscape)
})

onBeforeUnmount(() => {
  document.body.classList.remove('menu-open')
  window.removeEventListener('resize', closeMenuOnDesktop)
  window.removeEventListener('keydown', closeMenuOnEscape)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 64px;
  background: rgba(13, 13, 13, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.nav-logo {
  position: absolute;
  left: 32px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
  transition: color 0.2s;
  letter-spacing: -0.02em;
}
.nav-logo:hover {
  color: var(--accent);
}
.bracket {
  color: var(--accent);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
  justify-content: center;
}

.nav-links a {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-secondary);
  text-decoration: none;
  position: relative;
  padding-bottom: 2px;
  transition: color 0.2s;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s ease;
}

.nav-links a:hover,
.nav-links a.router-link-exact-active {
  color: var(--text);
}

.nav-links a:hover::after {
  transform: scaleX(1);
}

.nav-cta {
  border: 1px solid var(--accent) !important;
  padding: 6px 16px !important;
  border-radius: 6px;
  color: var(--accent) !important;
  background: var(--accent-dim);
  transition: background 0.2s, color 0.2s !important;
}
.nav-cta::after {
  display: none !important;
}
.nav-cta:hover {
  background: var(--accent) !important;
  color: #000 !important;
}

.lang-switch {
  width: 42px;
  height: 32px;
  display: inline-grid;
  place-items: center;
  border: 1px solid var(--border-light);
  border-radius: 6px;
  color: var(--text-secondary);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}
.lang-switch:hover {
  border-color: var(--accent);
  background: var(--accent-dim);
  color: var(--accent);
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: all 0.25s ease;
}
.hamburger.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.hamburger.open span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.hamburger.open span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.nav-backdrop {
  display: none;
}

:global(body.menu-open) {
  overflow: hidden;
}

@media (max-width: 768px) {
  .nav-inner {
    justify-content: space-between;
    padding-right: max(20px, env(safe-area-inset-right));
    padding-left: max(20px, env(safe-area-inset-left));
  }

  .nav-logo {
    position: static;
  }

  .hamburger {
    display: flex;
    position: static;
    z-index: 3;
    width: 44px;
    height: 44px;
    align-items: center;
  }

  .nav-links {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    flex-direction: column;
    align-items: stretch;
    max-height: calc(100dvh - 64px);
    overflow-y: auto;
    padding: 16px max(20px, env(safe-area-inset-right)) max(20px, env(safe-area-inset-bottom)) max(20px, env(safe-area-inset-left));
    gap: 4px;
    transform: translateY(-110%);
    opacity: 0;
    pointer-events: none;
    z-index: 2;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  .nav-links.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }
  .nav-links a {
    min-height: 44px;
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 0 4px;
  }

  .nav-cta {
    justify-content: center;
    margin-top: 4px;
  }

  .lang-switch {
    width: 52px;
    height: 44px;
    margin-top: 4px;
  }

  .nav-backdrop {
    display: block;
    position: fixed;
    inset: 64px 0 0;
    z-index: 1;
    width: 100%;
    height: calc(100dvh - 64px);
    background: rgba(0, 0, 0, 0.62);
    cursor: default;
  }
}
</style>
