<template>
  <div class="sobre-page">

    <div class="page-header container">
      <span class="page-badge mono">PG 01</span>
      <div class="header-row">
        <h1 class="page-title">{{ content[lang].title }}</h1>
        <div class="lang-toggle">
          <button class="lang-btn mono" :class="{ active: lang === 'pt' }" @click="lang = 'pt'">🇧🇷 PT</button>
          <button class="lang-btn mono" :class="{ active: lang === 'en' }" @click="lang = 'en'">🇺🇸 EN</button>
        </div>
      </div>
      <p class="page-subtitle">{{ content[lang].subtitle }}</p>
    </div>

    <div class="sobre-layout container">

      <div class="bio-section">
        <Transition name="fade" mode="out-in">
          <div :key="lang" class="bio-block">
            <div class="bio-card" v-for="(para, i) in content[lang].bio" :key="i">
              <p>{{ para }}</p>
            </div>
          </div>
        </Transition>
      </div>

      <aside class="sobre-aside">

        <div class="aside-block">
          <p class="aside-title mono">{{ content[lang].stackTitle }}</p>
          <div class="skill-list">
            <div v-for="skill in skills" :key="skill.name" class="skill-row">
              <span class="skill-name mono">{{ skill.name }}</span>
              <div class="skill-bar">
                <div class="skill-fill" :style="{ width: skill.level + '%' }"></div>
              </div>
              <span class="skill-pct mono">{{ skill.level }}%</span>
            </div>
          </div>
        </div>

        <div class="aside-block">
          <p class="aside-title mono">{{ content[lang].educationTitle }}</p>
          <div class="edu-card" v-for="edu in content[lang].education" :key="edu.course">
            <span class="edu-icon">{{ edu.icon }}</span>
            <div>
              <p class="edu-course">{{ edu.course }}</p>
              <p class="edu-inst mono">{{ edu.institution }}</p>
              <p class="edu-period mono">{{ edu.period }}</p>
            </div>
          </div>
        </div>

      </aside>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const lang = ref('pt')

const content = {
  pt: {
    title: 'Sobre Mim',
    subtitle: 'Engenheiro de Software em formação na PUC Minas.',
    stackTitle: 'Stack principal',
    educationTitle: 'Formação',
    bio: [
      'Meu primeiro contato com programação aconteceu durante a pandemia, quando comecei a explorar a área de tecnologia de forma mais curiosa e independente. O que começou como um interesse simples evoluiu para uma conexão mais profunda com a área.',
      'Em 2024, iniciei minha formação em Análise e Desenvolvimento de Sistemas pela PUC Minas. Após o primeiro período, migrei para Engenharia de Software, onde realmente desenvolvi gosto pela programação e defini meu objetivo de seguir carreira na área.',
      'Atualmente, minha principal linguagem é SQL, e busco escrever consultas com precisão e eficiência, transformando dados em decisões inteligentes.'
    ],
    education: [
      {
        icon: '🎓',
        course: 'Engenharia de Software',
        institution: 'PUC Minas',
        period: '2024.2 – 2028.1 (previsão)',
      },
    ],
  },
  en: {
    title: 'About Me',
    subtitle: 'Software Engineering student at PUC Minas.',
    stackTitle: 'Main Stack',
    educationTitle: 'Education',
    bio: [
      'My first contact with programming happened during the pandemic, when I began exploring technology in a more curious and independent way. What started as a simple interest gradually turned into a deeper connection with the field.',
      'In 2024, I started my studies in Systems Analysis and Development at PUC Minas. After my first semester, I transitioned to Software Engineering, where I truly developed a passion for programming and defined my goal of building a career in the area.',
      'Currently, my main language is SQL, and I focus on writing precise and efficient queries, turning data into intelligent decision-making.'
    ],
    education: [
      {
        icon: '🎓',
        course: 'Software Engineering',
        institution: 'PUC Minas',
        period: '2024.2 – 2028.1 (expected)',
      },
    ],
  },
}

const skills = [
  { name: 'PostgreSQL',         level: 85 },
  { name: 'Java / Spring Boot', level: 75 },
  { name: 'Python',             level: 70 },
  { name: 'React',              level: 60 },
  { name: 'Vue.js',             level: 50 },
]
</script>

<style scoped>
.sobre-page {
  min-height: calc(100vh - 64px - 62px);
  padding-bottom: 64px;
}

.page-header {
  padding: 52px 32px 36px;
}

.page-badge {
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--accent);
  background: var(--accent-dim);
  border: 1px solid var(--accent);
  padding: 3px 10px;
  border-radius: var(--radius-badge);
  display: inline-block;
  margin-bottom: 14px;
}

.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 10px;
}

.page-title {
  font-size: clamp(26px, 4vw, 42px);
}

.page-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  max-width: 600px;
}

/* Language toggle */
.lang-toggle {
  display: flex;
  gap: 6px;
}

.lang-btn {
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 11px;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  cursor: pointer;
  background: none;
  transition: all 0.18s;
}
.lang-btn:hover {
  border-color: var(--border-light);
  color: var(--text);
}
.lang-btn.active {
  background: var(--accent-dim);
  border-color: rgba(200, 245, 74, 0.4);
  color: var(--accent);
}

/* Layout */
.sobre-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 48px;
  align-items: start;
}

/* Bio */
.bio-block {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.bio-card {
  padding: 20px 24px;
  background: var(--surface-alt);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-card);
  border-left: 3px solid var(--accent);
}

.bio-card p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.85;
}


/* Aside */
.sobre-aside {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.aside-block {
  background: var(--surface-alt);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-card);
  padding: 20px;
}

.aside-title {
  font-size: 9px;
  color: var(--text-muted);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

/* Skills */
.skill-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skill-row {
  display: grid;
  grid-template-columns: 140px 1fr 36px;
  align-items: center;
  gap: 10px;
}

.skill-name {
  font-size: 11px;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.skill-bar {
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 2px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.skill-pct {
  font-size: 10px;
  color: var(--text-muted);
  text-align: right;
}

/* Interests */
.interest-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.interest-tag {
  font-size: 10px;
  padding: 4px 10px;
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  color: var(--text-secondary);
  background: var(--surface);
  cursor: default;
  transition: border-color 0.18s, color 0.18s;
}
.interest-tag:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* Education */
.edu-card {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.edu-icon {
  font-size: 22px;
  margin-top: 2px;
  flex-shrink: 0;
}

.edu-course {
  font-size: 13px;
  color: var(--text);
  font-weight: 700;
  margin-bottom: 2px;
}

.edu-inst {
  font-size: 11px;
  color: var(--text-secondary);
}

.edu-period {
  font-size: 10px;
  color: var(--text-muted);
  margin-top: 2px;
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Responsive */
@media (max-width: 900px) {
  .sobre-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .page-header {
    padding: 40px 20px 28px;
  }
  .skill-row {
    grid-template-columns: 120px 1fr 32px;
  }
  .highlights {
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .header-row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
