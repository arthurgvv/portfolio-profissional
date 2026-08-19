<template>
  <div class="sobre-page">

    <div class="page-header container">
      <span class="page-badge mono">PG 01</span>
      <div class="header-row">
        <h1 class="page-title">{{ content[lang].title }}</h1>
      </div>
      <p class="page-subtitle">{{ content[lang].subtitle }}</p>

      <section
        class="activity-card"
        :class="currentActivity.tone"
        @mouseenter="isActivityPaused = true"
        @mouseleave="isActivityPaused = false"
      >
        <div class="activity-topline">
          <div class="activity-now mono">
            <span class="activity-dot"></span>
            {{ content[lang].activityNow }}
          </div>
        </div>

        <Transition name="activity-swap" mode="out-in">
          <div :key="currentActivity.id" class="activity-content">
            <div class="activity-icon mono" aria-hidden="true">
              <svg v-if="currentActivity.symbol === 'cap'" viewBox="0 0 24 24">
                <path d="M3 9.5 12 5l9 4.5-9 4.5L3 9.5Z" />
                <path d="M7 12v4c1.4 1.1 3 1.6 5 1.6s3.6-.5 5-1.6v-4" />
                <path d="M21 10v5" />
              </svg>
              <svg v-else-if="currentActivity.symbol === 'briefcase'" viewBox="0 0 24 24">
                <path d="M8 7V5.8C8 4.8 8.8 4 9.8 4h4.4c1 0 1.8.8 1.8 1.8V7" />
                <path d="M5 7h14c1.1 0 2 .9 2 2v8.2c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2Z" />
                <path d="M3 12.2h18" />
                <path d="M10 12h4" />
              </svg>
              <span v-else-if="currentActivity.symbol === 'code'">&lt;/&gt;</span>
              <svg v-else viewBox="0 0 24 24">
                <path d="M5 5.5c0-.8.7-1.5 1.5-1.5H20v15H6.5C5.7 19 5 18.3 5 17.5v-12Z" />
                <path d="M8 4v15" />
                <path d="M6.5 19H20" />
              </svg>
            </div>
            <div class="activity-copy">
              <p class="activity-label mono">{{ currentActivity.label[lang] }}</p>
              <h2>{{ currentActivity.title[lang] }}</h2>
              <p>{{ currentActivity.description[lang] }}</p>
            </div>
          </div>
        </Transition>

        <div class="activity-footer">
          <div class="activity-tabs" :aria-label="content[lang].activityTabsLabel">
            <button
              v-for="(activity, index) in activities"
              :key="activity.id"
              type="button"
              class="activity-tab mono"
              :class="{ active: index === activeActivity }"
              :title="activity.title[lang]"
              :aria-label="activity.title[lang]"
              @click="goToActivity(index)"
            >
              <span class="activity-tab-symbol" aria-hidden="true">
                <svg v-if="activity.symbol === 'cap'" viewBox="0 0 24 24">
                  <path d="M3 9.5 12 5l9 4.5-9 4.5L3 9.5Z" />
                  <path d="M7 12v4c1.4 1.1 3 1.6 5 1.6s3.6-.5 5-1.6v-4" />
                  <path d="M21 10v5" />
                </svg>
                <svg v-else-if="activity.symbol === 'briefcase'" viewBox="0 0 24 24">
                  <path d="M8 7V5.8C8 4.8 8.8 4 9.8 4h4.4c1 0 1.8.8 1.8 1.8V7" />
                  <path d="M5 7h14c1.1 0 2 .9 2 2v8.2c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2Z" />
                  <path d="M3 12.2h18" />
                  <path d="M10 12h4" />
                </svg>
                <span v-else-if="activity.symbol === 'code'">&lt;/&gt;</span>
                <svg v-else viewBox="0 0 24 24">
                  <path d="M5 5.5c0-.8.7-1.5 1.5-1.5H20v15H6.5C5.7 19 5 18.3 5 17.5v-12Z" />
                  <path d="M8 4v15" />
                  <path d="M6.5 19H20" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>
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
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { books } from '../data/books'

const { lang } = useLanguage()
const activeActivity = ref(0)
const isActivityPaused = ref(false)
let activityTimer

const content = {
  pt: {
    title: 'Sobre Mim',
    subtitle: 'Engenharia de Software com foco em Dados, SQL, Python e Databricks.',
    stackTitle: 'Dados em foco',
    educationTitle: 'Formação',
    activityNow: 'Agora',
    activityTabsLabel: 'Atividades em destaque',
    bio: [
      'Meu primeiro contato com programação aconteceu durante a pandemia, quando comecei a explorar a área de tecnologia de forma mais curiosa e independente. O que começou como um interesse simples evoluiu para uma conexão mais profunda com a área.',
      'Em 2024, iniciei minha formação em Análise e Desenvolvimento de Sistemas pela PUC Minas. Após o primeiro período, migrei para Engenharia de Software, onde realmente desenvolvi gosto pela programação e defini meu objetivo de seguir carreira na área.',
      'Atualmente, estou direcionando minha formação para a área de Dados, com foco em SQL, Python, Databricks, modelagem de dados e organização de informações para análise.',
      'Também mantenho uma base em desenvolvimento front-end e back-end, o que complementa minha formação em Dados e me ajuda a entender sistemas, integrações e aplicações de ponta a ponta.'
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
    subtitle: 'Software Engineering student focused on Data, SQL, Python and Databricks.',
    stackTitle: 'Data Focus',
    educationTitle: 'Education',
    activityNow: 'Now',
    activityTabsLabel: 'Featured activities',
    bio: [
      'My first contact with programming happened during the pandemic, when I began exploring technology in a more curious and independent way. What started as a simple interest gradually turned into a deeper connection with the field.',
      'In 2024, I started my studies in Systems Analysis and Development at PUC Minas. After my first semester, I transitioned to Software Engineering, where I truly developed a passion for programming and defined my goal of building a career in the area.',
      'I am currently steering my education toward Data, with a focus on SQL, Python, Databricks, data modeling and organizing information for analysis.',
      'I also keep a front-end and back-end development background, which complements my Data education and helps me understand systems, integrations and applications end to end.'
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
  { name: 'SQL',                level: 82 },
  { name: 'Python',             level: 70 },
  { name: 'Databricks',         level: 64 },
]

const readingBook = computed(() => books.find((book) => book.status === 'reading') ?? books[0])

const activities = computed(() => [
  {
    id: 'data',
    tone: 'tone-accent',
    symbol: 'cap',
    label: {
      pt: 'Estudando',
      en: 'Studying',
    },
    title: {
      pt: 'SQL, Python e Databricks',
      en: 'SQL, Python and Databricks',
    },
    description: {
      pt: 'Modelagem de dados, consultas mais limpas e organização de informações para análise.',
      en: 'Data modeling, cleaner queries and organizing information for analysis.',
    },
  },
  {
    id: 'software',
    tone: 'tone-green',
    symbol: 'briefcase',
    label: {
      pt: 'Construindo',
      en: 'Building',
    },
    title: {
      pt: 'Projetos no PostgreSQL e ETL no Databricks',
      en: 'PostgreSQL projects and ETL in Databricks',
    },
    description: {
      pt: 'Construindo práticas de dados com banco relacional, pipelines e transformação de informações.',
      en: 'Building data practices with relational databases, pipelines and information transformation.',
    },
  },
  {
    id: 'college',
    tone: 'tone-green',
    symbol: 'code',
    label: {
      pt: 'Cursando',
      en: 'Enrolled',
    },
    title: {
      pt: 'Engenharia de Software',
      en: 'Software Engineering',
    },
    description: {
      pt: 'PUC Minas • 5º período.',
      en: 'PUC Minas • 5th semester.',
    },
  },
  {
    id: 'reading',
    tone: 'tone-warm',
    symbol: 'book',
    label: {
      pt: 'Lendo',
      en: 'Reading',
    },
    title: readingBook.value.title,
    description: readingBook.value.note,
  },
])

const currentActivity = computed(() => activities.value[activeActivity.value])

function goToActivity(index) {
  activeActivity.value = index
}

onMounted(() => {
  activityTimer = window.setInterval(() => {
    if (!isActivityPaused.value) {
      activeActivity.value = (activeActivity.value + 1) % activities.value.length
    }
  }, 4800)
})

onBeforeUnmount(() => {
  window.clearInterval(activityTimer)
})
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

/* Activity spotlight */
.activity-card {
  position: relative;
  isolation: isolate;
  margin-top: 34px;
  padding: 24px;
  min-height: 188px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  border: 1px solid rgba(200, 245, 74, 0.25);
  border-radius: var(--radius-card);
  background:
    linear-gradient(115deg, rgba(200, 245, 74, 0.08), transparent 44%),
    linear-gradient(180deg, rgba(22, 22, 22, 0.96), rgba(10, 10, 10, 0.98));
  box-shadow: var(--shadow-main);
}

.activity-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -2;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: linear-gradient(90deg, rgba(0, 0, 0, 0.7), transparent 88%);
}

.activity-card::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(circle at 12% 50%, var(--activity-glow), transparent 34%);
  opacity: 0.95;
  transition: background 0.25s ease;
}

.activity-card.tone-accent {
  --activity-color: var(--accent);
  --activity-glow: rgba(200, 245, 74, 0.18);
  border-color: rgba(200, 245, 74, 0.32);
}

.activity-card.tone-blue {
  --activity-color: var(--blue);
  --activity-glow: rgba(74, 144, 245, 0.18);
  border-color: rgba(74, 144, 245, 0.28);
}

.activity-card.tone-green {
  --activity-color: var(--green);
  --activity-glow: rgba(0, 200, 80, 0.16);
  border-color: rgba(0, 200, 80, 0.26);
}

.activity-card.tone-warm {
  --activity-color: #f5b84a;
  --activity-glow: rgba(245, 184, 74, 0.18);
  border-color: rgba(245, 184, 74, 0.28);
}

.activity-topline,
.activity-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.activity-now {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--green);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.28em;
  text-transform: uppercase;
}

.activity-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--green);
  box-shadow: 0 0 18px rgba(0, 200, 80, 0.8);
}

.activity-content {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 18px 0 20px;
}

.activity-icon {
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  color: var(--activity-color);
  font-size: 14px;
  font-weight: 800;
  border: 1px solid color-mix(in srgb, var(--activity-color), transparent 52%);
  border-radius: var(--radius-card);
  background: color-mix(in srgb, var(--activity-color), transparent 88%);
  box-shadow: 0 0 32px color-mix(in srgb, var(--activity-color), transparent 82%);
}

.activity-icon svg {
  width: 27px;
  height: 27px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.85;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.activity-icon span {
  font-size: 16px;
  line-height: 1;
}

.activity-copy {
  min-width: 0;
}

.activity-label {
  margin-bottom: 4px;
  color: var(--activity-color);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.28em;
  text-transform: uppercase;
}

.activity-copy h2 {
  margin-bottom: 3px;
  color: var(--text);
  font-size: clamp(18px, 2.4vw, 26px);
  letter-spacing: 0;
}

.activity-copy p:not(.activity-label) {
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.55;
}

.activity-tabs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.activity-tab {
  width: 34px;
  height: 28px;
  display: grid;
  place-items: center;
  color: var(--text-muted);
  font-size: 9px;
  font-weight: 800;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.04);
  transition: border-color 0.18s, color 0.18s, background 0.18s, box-shadow 0.18s;
}

.activity-tab:hover,
.activity-tab.active {
  color: var(--activity-color);
  border-color: color-mix(in srgb, var(--activity-color), transparent 45%);
  background: color-mix(in srgb, var(--activity-color), transparent 88%);
  box-shadow: 0 0 20px color-mix(in srgb, var(--activity-color), transparent 86%);
}

.activity-tab-symbol {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  font-size: 11px;
  font-weight: 800;
  line-height: 1;
  transform: translateY(-1px);
}

.activity-tab-symbol svg {
  width: 15px;
  height: 15px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
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

.activity-swap-enter-active,
.activity-swap-leave-active {
  transition: opacity 0.24s ease, transform 0.24s ease;
}
.activity-swap-enter-from {
  opacity: 0;
  transform: translateX(12px);
}
.activity-swap-leave-to {
  opacity: 0;
  transform: translateX(-10px);
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
  .activity-card {
    padding: 20px;
    min-height: 228px;
  }
  .activity-topline,
  .activity-footer {
    align-items: flex-start;
  }
  .activity-content {
    align-items: flex-start;
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
  .activity-topline,
  .activity-footer,
  .activity-content {
    flex-direction: column;
  }
  .activity-tabs {
    flex-wrap: wrap;
  }
}
</style>
