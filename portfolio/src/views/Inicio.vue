<template>
  <div class="home">
    <section id="inicio" class="hero snap-section">
      <div class="spline-bg">
        <spline-viewer url="https://prod.spline.design/KI4OaoX6CFEX9D0k/scene.splinecode"></spline-viewer>
      </div>
      <div class="container hero-inner">
        <div class="hero-left">
          <h1 class="hero-title">Arthur <span class="accent">Gonçalves</span></h1>
          <p class="hero-subtitle">{{ content[lang].heroSubtitle }}</p>
          <div class="hero-btns">
            <RouterLink to="/#projetos" class="btn-primary mono">{{ content[lang].projectsButton }}</RouterLink>
          </div>
        </div>
        <div class="hero-right">
          <img src="@/assets/styles/profile.jpg" alt="Arthur Goncalves" class="avatar-img" />
        </div>
      </div>
    </section>

    <section class="about snap-section">
      <div class="about-grid">
        <div class="about-lang featured">
          <span class="lang-tag mono">{{ content[lang].languageTag }}</span>
          <p>{{ content[lang].about }}</p>
          <RouterLink to="/#sobre" class="about-link mono">{{ content[lang].readMore }}</RouterLink>
        </div>
      </div>
    </section>

    <section id="sobre" class="landing-section snap-section"><SobreMim /></section>
    <section id="projetos" class="landing-section snap-section"><Projetos /></section>
    <section id="experiencias" class="landing-section snap-section"><Experiencias /></section>
    <section id="livros" class="landing-section snap-section"><Livros /></section>
    <section id="contato" class="landing-section snap-section"><Contato /></section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import '@splinetool/viewer'
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
.snap-section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  scroll-margin-top: 64px;
}

.landing-section {
  scroll-margin-top: 78px;
}

.hero {
  min-height: calc(100vh - 64px);
  padding: 72px 0 56px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.spline-bg { position: absolute; inset: 0; z-index: 0; }
.spline-bg spline-viewer { width: 100%; height: 100%; }
.hero-inner { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 300px; gap: 64px; align-items: center; pointer-events: none; }
.hero-inner a, .hero-inner button, .hero-inner img { pointer-events: auto; }
.hero-left { display: flex; flex-direction: column; align-items: center; gap: 24px; text-align: center; }
.hero-title { font-size: clamp(46px, 6vw, 80px); line-height: 1.05; color: var(--text); }
.hero-subtitle { font-size: 17px; color: var(--text-secondary); line-height: 1.7; }
.hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
.btn-primary { display: inline-flex; align-items: center; padding: 11px 26px; background: var(--accent); color: #000; font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; border-radius: 8px; text-decoration: none; opacity: .82; transition: opacity .2s, transform .15s; }
.btn-primary:hover { opacity: 1; transform: translateY(-1px); }
.hero-right { display: flex; justify-content: center; }
.avatar-img { width: 300px; height: 340px; object-fit: cover; border-radius: 16px; border: 1px solid var(--border-light); }
.about { border-top: none; }
.about-grid { display: grid; grid-template-columns: 1fr; }
.about-lang { background: var(--surface-dark); padding: 40px; display: flex; flex-direction: column; align-items: center; gap: 16px; position: relative; overflow: hidden; text-align: center; }
.about-lang::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: linear-gradient(to bottom, var(--accent), transparent); }
.lang-tag { display: inline-flex; align-items: center; gap: 6px; font-size: 10px; color: var(--text-secondary); background: var(--surface); border: 1px solid var(--border); padding: 4px 12px; border-radius: var(--radius-badge); width: fit-content; }
.about-lang p { font-size: 14px; color: var(--text-secondary); line-height: 1.8; }
.about-link { display: inline-flex; align-items: center; font-size: 10px; color: var(--accent); text-decoration: none; letter-spacing: .12em; margin-top: 4px; opacity: .8; transition: opacity .2s; }
.about-link:hover { opacity: 1; }
@media (max-width: 768px) {
  .hero-inner { grid-template-columns: 1fr; gap: 40px; }
  .hero-right { order: -1; }
  .about-lang { padding: 28px 24px; }
}

@media (max-width: 480px) {
  .hero { padding: 40px 0 36px; }
}
</style>
