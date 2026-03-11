<template>
  <div class="home">

    <section class="hero">
      <div class="spline-bg">
        <spline-viewer url="https://prod.spline.design/KI4OaoX6CFEX9D0k/scene.splinecode"></spline-viewer>
      </div>
      <div class="container hero-inner">

        <div class="hero-left">
          <h1 class="hero-title">
            Matheus <span class="accent">Guilherme</span>
          </h1>

          <p class="hero-subtitle">
            Engenheiro de Software em formação pela PUC Minas.
          </p>

          <div class="hero-btns">
            <RouterLink to="/projetos" class="btn-primary mono">Ver Projetos ↓</RouterLink>
          </div>
        </div>

        <div class="hero-right">
          <img src="@/assets/styles/profile.jpg" alt="Matheus Guilherme" class="avatar-img" />
        </div>

      </div>
    </section>

    <section class="about">
      <div class="about-grid">
        <div class="about-lang">
          <span class="lang-tag mono">🇧🇷 Português</span>
          <p>
            Estudante de Engenharia de Software na PUC Minas com experiência em suporte técnico
            e desenvolvimento de sistemas. Autodidata desde cedo, busco construir soluções com
            propósito e impacto real.
          </p>
          <RouterLink to="/sobre" class="about-link mono">Ler mais →</RouterLink>
        </div>
        <div class="about-lang">
          <span class="lang-tag mono">🇺🇸 English</span>
          <p>
            Software Engineering student at PUC Minas with experience in technical support and
            systems development. Self-taught from an early age, I seek to build solutions with
            real purpose and impact.
          </p>
          <RouterLink to="/sobre" class="about-link mono">Read more →</RouterLink>
        </div>
      </div>
    </section>

    <section class="skills">
      <div class="container skills-strip">
        <span class="skills-label mono">Stack →</span>
        <span v-for="skill in skills" :key="skill" class="skill-badge mono">{{ skill }}</span>
      </div>
    </section>

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import '@splinetool/viewer'

const skills = [
  'Java', 'Spring Boot', 'Vue.js', 'React',
  'PostgreSQL', 'PHP', 'Python', 'Docker', 'Git',
]
</script>

<style scoped>
.hero {
  padding: 72px 0 56px;
  position: relative;
  overflow: hidden;
}

.spline-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.spline-bg spline-viewer {
  width: 100%;
  height: 100%;
}

.hero-inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 64px;
  align-items: center;
  pointer-events: none;
}

.hero-inner a,
.hero-inner button,
.hero-inner img {
  pointer-events: auto;
}

.hero-left {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-title {
  font-size: clamp(38px, 5vw, 64px);
  line-height: 1.05;
  color: var(--text);
}

.hero-subtitle {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.7;
}

.hero-btns {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  padding: 11px 26px;
  background: var(--accent);
  color: #000;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: 8px;
  text-decoration: none;
  opacity: 0.82;
  transition: opacity 0.2s, transform 0.15s;
}
.btn-primary:hover {
  opacity: 1;
  transform: translateY(-1px);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 11px 26px;
  border: 1px solid var(--border-light);
  color: var(--text-secondary);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: 8px;
  text-decoration: none;
  transition: border-color 0.2s, color 0.2s;
}
.btn-secondary:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.hero-right {
  display: flex;
  justify-content: center;
}

.avatar-img {
  width: 220px;
  height: 260px;
  object-fit: cover;
  border-radius: 16px;
  border: 1px solid var(--border-light);
}


.about {
  border-top: 1px solid var(--border);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.about-lang {
  background: var(--surface-dark);
  padding: 40px;
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  overflow: hidden;
}

.about-lang:last-child {
  border-right: none;
}

.about-lang::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom, var(--accent), transparent);
}

.lang-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  color: var(--text-secondary);
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 4px 12px;
  border-radius: var(--radius-badge);
  width: fit-content;
}

.about-lang p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.8;
}

.about-link {
  display: inline-flex;
  align-items: center;
  font-size: 10px;
  color: var(--accent);
  text-decoration: none;
  letter-spacing: 0.12em;
  margin-top: 4px;
  opacity: 0.8;
  transition: opacity 0.2s;
}
.about-link:hover {
  opacity: 1;
}

.skills {
  border-top: 1px solid var(--border);
  padding: 20px 0;
}

.skills-strip {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.skills-label {
  font-size: 10px;
  color: var(--text-muted);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-right: 4px;
}

.skill-badge {
  height: 30px;
  padding: 0 14px;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-pill);
  background: var(--surface);
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  color: var(--text-secondary);
  transition: border-color 0.2s, color 0.2s;
  cursor: default;
}
.skill-badge:hover {
  border-color: var(--accent);
  color: var(--accent);
}

@media (max-width: 768px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .hero-right {
    order: -1;
  }
  .about-grid {
    grid-template-columns: 1fr;
  }
  .about-lang {
    border-right: none;
    border-bottom: 1px solid var(--border);
    padding: 28px 24px;
  }
  .about-lang:last-child {
    border-bottom: none;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 40px 0 36px;
  }
  .avatar-placeholder {
    width: 160px;
    height: 190px;
  }
}
</style>
