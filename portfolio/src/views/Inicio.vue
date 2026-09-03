<template>
  <div class="home">
    <section id="inicio" class="hero anchor-section">
      <div class="container hero-inner">
        <div class="hero-left">
          <h1 class="hero-title">Arthur <span class="accent">Gonçalves</span></h1>
          <p class="hero-subtitle">{{ content[lang].heroSubtitle }}</p>
          <div class="hero-btns">
            <RouterLink to="/#projetos" class="btn-primary mono">{{ content[lang].projectsButton }}</RouterLink>
          </div>
        </div>
        <div class="hero-right">
          <img src="@/assets/styles/arthur-goncalves.jpeg" alt="Arthur Gonçalves" class="avatar-img" />
        </div>
      </div>
    </section>

    <section class="about anchor-section">
      <div class="about-grid">
        <div class="about-lang featured">
          <span class="lang-tag mono">{{ content[lang].languageTag }}</span>
          <p>{{ content[lang].about }}</p>
          <RouterLink to="/#sobre" class="about-link mono">{{ content[lang].readMore }}</RouterLink>
        </div>
      </div>
    </section>

    <section id="sobre" class="landing-section anchor-section"><SobreMim /></section>
    <section id="projetos" class="landing-section anchor-section"><Projetos /></section>
    <section id="experiencias" class="landing-section anchor-section"><Experiencias /></section>
    <section id="livros" class="landing-section anchor-section"><Livros /></section>
    <section id="contato" class="landing-section anchor-section"><Contato /></section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useLanguage } from '../composables/useLanguage'
import SobreMim from './SobreMim.vue'
import Projetos from './Projetos.vue'
import Experiencias from './Experiencias.vue'
import Livros from './Livros.vue'
import Contato from './Contato.vue'

const { lang } = useLanguage()

const content = {
  pt: {
    heroSubtitle: 'Engenharia de Software | Python | Databricks | SQL',
    projectsButton: 'Ver Projetos ↓',
    languageTag: 'BR Português',
    about: 'Estudante de Engenharia de Software na PUC Minas, direcionando minha formação para Dados. Estou aprofundando meus estudos em SQL, Python, Databricks, modelagem de dados e organização de informações para análise.',
    readMore: 'Ler mais →',
  },
  en: {
    heroSubtitle: 'Software Engineering | Python | Databricks | SQL',
    projectsButton: 'View Projects ↓',
    languageTag: 'US English',
    about: 'Software Engineering student at PUC Minas, currently steering my studies toward Data. I am deepening my knowledge in SQL, Python, Databricks, data modeling and organizing information for analysis.',
    readMore: 'Read more →',
  },
}

</script>

<style scoped>
.landing-section,
.anchor-section {
  scroll-margin-top: 64px;
}

.landing-section {
  scroll-margin-top: 78px;
}

.hero {
  min-height: calc(100vh - 64px);
  min-height: calc(100svh - 64px);
  padding: clamp(48px, 7vw, 72px) 0 56px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  background: radial-gradient(circle at 78% 36%, rgba(200, 245, 74, 0.08), transparent 32%);
}

.hero-inner { position: relative; z-index: 1; display: grid; grid-template-columns: minmax(0, 1fr) minmax(240px, 300px); gap: clamp(32px, 6vw, 64px); align-items: center; pointer-events: none; }
.hero-inner a, .hero-inner button, .hero-inner img { pointer-events: auto; }
.hero-left { display: flex; flex-direction: column; align-items: center; gap: 24px; text-align: center; }
.hero-title { font-size: clamp(40px, 6vw, 80px); line-height: 1.05; color: var(--text); overflow-wrap: anywhere; }
.hero-subtitle { max-width: 680px; font-size: clamp(14px, 1.5vw, 17px); color: var(--text-secondary); line-height: 1.7; }
.hero-btns { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
.btn-primary { min-height: 44px; display: inline-flex; align-items: center; justify-content: center; padding: 11px 26px; background: var(--accent); color: #000; font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; border-radius: 8px; text-decoration: none; opacity: .82; transition: opacity .2s, transform .15s; }
.btn-primary:hover { opacity: 1; transform: translateY(-1px); }
.hero-right { display: flex; justify-content: center; }
.avatar-img { width: clamp(240px, 25vw, 300px); height: auto; aspect-ratio: 3 / 4; object-fit: cover; object-position: center; border-radius: 16px; border: 1px solid var(--border-light); box-shadow: var(--shadow-main); }
.about { border-top: none; }
.about-grid { display: grid; grid-template-columns: 1fr; }
.about-lang { background: var(--surface-dark); padding: 40px; display: flex; flex-direction: column; align-items: center; gap: 16px; position: relative; overflow: hidden; text-align: center; }
.about-lang::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: linear-gradient(to bottom, var(--accent), transparent); }
.lang-tag { display: inline-flex; align-items: center; gap: 6px; font-size: 10px; color: var(--text-secondary); background: var(--surface); border: 1px solid var(--border); padding: 4px 12px; border-radius: var(--radius-badge); width: fit-content; }
.about-lang p { max-width: 820px; font-size: 14px; color: var(--text-secondary); line-height: 1.8; }
.about-link { display: inline-flex; align-items: center; font-size: 10px; color: var(--accent); text-decoration: none; letter-spacing: .12em; margin-top: 4px; opacity: .8; transition: opacity .2s; }
.about-link:hover { opacity: 1; }
@media (max-width: 768px) {
  .hero { padding: 32px 0 44px; }
  .hero-inner { grid-template-columns: minmax(0, 1fr); gap: 28px; }
  .hero-right { order: -1; }
  .avatar-img { width: min(68vw, 260px); }
  .about-lang { padding: 28px 24px; }
}

@media (max-width: 480px) {
  .hero { min-height: auto; padding: 28px 0 40px; }
  .hero-left { gap: 18px; }
  .hero-title { font-size: clamp(34px, 12vw, 44px); }
  .hero-subtitle { line-height: 1.55; }
  .hero-btns,
  .btn-primary { width: 100%; }
  .btn-primary { max-width: 280px; }
  .avatar-img { width: min(70vw, 230px); border-radius: 14px; }
  .about-lang { padding: 24px 16px; }
}
</style>
