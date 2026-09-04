<template>
  <div class="projects-page">

    <div class="page-header container">
      <h1 class="page-title">{{ content[lang].title }}</h1>
      <p class="page-subtitle">{{ content[lang].subtitle }}</p>
    </div>

    <div class="projects-layout">

      <aside class="sidebar">
        <div class="sidebar-label mono">{{ content[lang].filterBy }}</div>
        <button
          v-for="cat in categories"
          :key="cat.value"
          class="sidebar-item mono"
          :class="{ active: activeCategory === cat.value }"
          @click="activeCategory = cat.value"
        >
          {{ cat.label[lang] }}
        </button>
      </aside>

      <div class="timeline-area">
        <div class="timeline-line"></div>

        <TransitionGroup name="tl" tag="div" class="timeline-items">
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="tl-item"
          >
            <div class="tl-year mono">{{ project.year }}</div>
            <div class="tl-dot" :class="{ active: project.highlight }"></div>
            <div
              class="tl-card"
              :class="{ featured: project.highlight }"
              role="link"
              tabindex="0"
              @mouseenter="pauseCarousel(project.id)"
              @mouseleave="resumeCarousel(project.id)"
              @click="abrirProjeto(project.link)"
              @keydown.enter="abrirProjeto(project.link)"
              @keydown.space.prevent="abrirProjeto(project.link)"
            >

              <div class="tl-card-gallery">
                <template v-if="project.images && project.images.length > 0">
                  <div class="gallery-viewport">
                    <img
                      :src="project.images[activeIndex[project.id] ?? 0]"
                      :alt="project.name[lang] + ' screenshot ' + ((activeIndex[project.id] ?? 0) + 1)"
                      class="gallery-img"
                    />

                    <button
                      v-if="project.images.length > 1"
                      class="gallery-arrow left"
                      @click.stop="prev(project)"
                    >&#8249;</button>
                    <button
                      v-if="project.images.length > 1"
                      class="gallery-arrow right"
                      @click.stop="next(project)"
                    >&#8250;</button>
                  </div>

                  <div v-if="project.images.length > 1" class="gallery-dots">
                    <span
                      v-for="(_, idx) in project.images"
                      :key="idx"
                      class="dot"
                      :class="{ active: (activeIndex[project.id] ?? 0) === idx }"
                      @click.stop="activeIndex[project.id] = idx"
                    ></span>
                  </div>
                </template>
                <template v-else>
                  <div class="img-placeholder">
                    <span class="img-placeholder-text mono">{{ content[lang].screensSoon }}</span>
                  </div>
                </template>
                <span v-if="project.highlight" class="status-badge mono">● {{ content[lang].featured }}</span>
              </div>

              <div class="tl-card-body">
                <h3 class="tl-card-title">{{ project.name[lang] }}</h3>
                <p class="tl-card-desc">{{ project.description[lang] }}</p>
                <div class="tech-badges">
                  <span
                    v-for="tech in project.techs"
                    :key="tech"
                    class="tech-badge mono"
                  >{{ tech }}</span>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>

        <div v-if="filteredProjects.length === 0" class="empty-state mono">
          {{ content[lang].empty }}
        </div>
      </div>

    </div>

    <section class="project-stack" aria-label="Stack tecnológica">
      <div class="container project-stack-inner">
        <span class="skills-label mono">Stack →</span>
        <span v-for="skill in skills" :key="skill" class="skill-badge mono">{{ skill }}</span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { useLanguage } from '../composables/useLanguage'

const { lang } = useLanguage()

const skills = [
  'SQL', 'Python', 'Databricks', 'ETL', 'MySQL',
  'Java', 'C', 'JavaScript', 'HTML', 'CSS', 'Spring Boot', 'React', 'Vue.js', 'Node.js', 'Docker', 'Git', 'GitHub',
]

const content = {
  pt: {
    title: 'Projetos',
    subtitle: 'Projetos acadêmicos e pessoais desenvolvidos ao longo da minha trajetória em software e dados.',
    filterBy: 'Filtrar por',
    screensSoon: 'Screenshots em breve',
    featured: 'Destaque',
    empty: 'Nenhum projeto nesta categoria ainda.',
  },
  en: {
    title: 'Projects',
    subtitle: 'Academic and personal projects developed throughout my path in software and data.',
    filterBy: 'Filter by',
    screensSoon: 'Screenshots coming soon',
    featured: 'Featured',
    empty: 'No projects in this category yet.',
  },
}

const categories = [
  { value: 'all', label: { pt: 'Todos', en: 'All' } },
  { value: 'academic', label: { pt: 'Acadêmicos', en: 'Academic' } },
  { value: 'personal', label: { pt: 'Pessoais', en: 'Personal' } },
]
const activeCategory = ref('all')
const activeIndex = reactive({})
const pausedProjectId = ref(null)
let carouselTimer

function advanceProject(project) {
  if (!project.images || project.images.length <= 1) return
  const cur = activeIndex[project.id] ?? 0
  activeIndex[project.id] = (cur + 1) % project.images.length
}
function next(project) {
  advanceProject(project)
}
function prev(project) {
  if (!project.images || project.images.length <= 1) return
  const cur = activeIndex[project.id] ?? 0
  activeIndex[project.id] = (cur - 1 + project.images.length) % project.images.length
}
function pauseCarousel(projectId) {
  pausedProjectId.value = projectId
}
function resumeCarousel(projectId) {
  if (pausedProjectId.value === projectId) pausedProjectId.value = null
}
function abrirProjeto(link) {
  window.open(link, "_blank")
}

const projects = [
  {
    id: 3,
    year: '2026',
    name: {
      pt: 'Seri.Estudio',
      en: 'Seri.Estudio',
    },
    description: {
      pt: 'Plataforma web desenvolvida a partir de uma demanda real de um estúdio de serigrafia sob encomenda, com o objetivo de digitalizar e centralizar seu fluxo de pedidos. Permite criação de fichas técnicas, envio de artes, acompanhamento de pedidos e comunicação entre clientes e o estúdio. A solução também conta com visualização 3D das peças, permitindo ao cliente visualizar a aplicação de sua arte no produto selecionado.',
      en: 'Web platform developed from a real demand from a custom screen-printing studio, created to digitize and centralize its order flow. It supports technical sheets, artwork upload, order tracking and communication between clients and the studio. The solution also includes 3D visualization of the pieces, allowing customers to see their artwork applied to the selected product.',
    },
    techs: ['Web App', 'Projeto acadêmico', 'GitHub'],
    category: 'academic',
    highlight: true,
    link: 'https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-1-ti4-3126100-seri-estudio',
    images: [
      new URL('../assets/styles/seri-estudio-home.png', import.meta.url).href,
      new URL('../assets/styles/seri-home.png', import.meta.url).href,
      new URL('../assets/styles/seri-ficha.png', import.meta.url).href,
      new URL('../assets/styles/seri-pedidos.png', import.meta.url).href,
    ],
  },
  {
    id: 1,
    year: '2025',
    name: {
      pt: 'Sistema de Consultório Médico',
      en: 'Medical Clinic System',
    },
    description: {
      pt: 'Plataforma web desenvolvida para apoiar a rotina de um consultório médico, centralizando o gerenciamento de consultas e pacientes. A solução permite controlar a disponibilidade semanal do profissional, configurar bloqueios de agenda, visualizar compromissos por mês, semana ou dia e gerenciar pacientes e seus vínculos com profissionais.',
      en: 'Web platform developed to support a medical clinic routine by centralizing appointment and patient management. The solution allows control of weekly professional availability, calendar blocks, monthly, weekly or daily appointments, and management of patients and their links with professionals.',
    },
    techs: ['Web App', 'Projeto acadêmico', 'GitHub'],
    category: 'academic',
    highlight: false,
    link: 'https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2025-2-ti3-9545100-consultoriomedico',
    images: [
  new URL('../assets/styles/consul.png', import.meta.url).href
],
  },
  {
  id: 2,
  year: '2025',
  name: {
    pt: 'Finesse Sportz',
    en: 'Finesse Sportz',
  },
  description: {
    pt: 'Sistema web desenvolvido para apoiar as operações da Finesse Sportz, automatizando e centralizando processos anteriormente realizados na operação da loja. A aplicação contempla cadastro de produtos, gerenciamento de estoque, controle de pedidos e interfaces destinadas a clientes e administradores.',
    en: 'Web system developed to support Finesse Sportz operations, automating and centralizing processes previously handled manually in the store operation. The application includes product registration, inventory management, order control and interfaces for customers and administrators.',
  },
  techs: ['Web App', 'Projeto acadêmico', 'GitHub'],
  category: 'academic',
  highlight: false,
  link: "https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2025-2-ti2-3740100-finesse-sportz",
  images: [
  new URL('../assets/styles/finesse.png', import.meta.url).href
],
},
  {
    id: 4,
    year: '2026',
    name: {
      pt: 'VERBUM',
      en: 'VERBUM',
    },
    description: {
      pt: 'Sistema web de aluguel de veículos que simula a operação de uma locadora, permitindo o gerenciamento de clientes, veículos, solicitações de aluguel e contratos.',
      en: 'Vehicle rental web system that simulates a rental company operation, allowing management of customers, vehicles, rental requests and contracts.',
    },
    techs: ['Web App', 'Projeto acadêmico', 'GitHub'],
    category: 'academic',
    highlight: false,
    link: 'https://github.com/arthurgvv/VERBUM--Sistema-de-Aluguel-de-Carros',
    images: [
      new URL('../assets/styles/verbum-main.png', import.meta.url).href,
      new URL('../assets/styles/verbum-home.png', import.meta.url).href,
      new URL('../assets/styles/verbum-ofertas.png', import.meta.url).href,
    ],
  },
  {
    id: 5,
    year: '2026',
    name: {
      pt: 'Happy Coin',
      en: 'Happy Coin',
    },
    description: {
      pt: 'Sistema de moeda estudantil desenvolvido para incentivar e reconhecer o desempenho dos alunos. Professores podem distribuir moedas como forma de reconhecimento, que posteriormente podem ser resgatadas pelos estudantes por vantagens oferecidas por empresas parceiras. A plataforma também permite que instituições de ensino gerenciem professores e semestres acadêmicos.',
      en: 'Student currency system developed to encourage and recognize student performance. Teachers distribute coins as recognition, students redeem benefits and institutions manage teachers and academic semesters.',
    },
    techs: ['Web App', 'Projeto acadêmico', 'GitHub'],
    category: 'academic',
    highlight: false,
    link: 'https://github.com/arthurgvv/happyCoin',
    images: [
      new URL('../assets/styles/happycoin-login.png', import.meta.url).href,
      new URL('../assets/styles/happycoin-estudante.png', import.meta.url).href,
      new URL('../assets/styles/happycoin-professor.png', import.meta.url).href,
    ],
  },
  {
    id: 6,
    year: '2026',
    name: {
      pt: 'Portfólio Profissional',
      en: 'Professional Portfolio',
    },
    description: {
      pt: 'Site desenvolvido para apresentar minha trajetória acadêmica e profissional, reunindo projetos, experiências, competências e formas de contato em uma única plataforma.',
      en: 'Website developed to present my academic and professional path, bringing together projects, experiences, skills and contact channels in a single platform.',
    },
    techs: ['Projeto pessoal', 'Web App', 'GitHub'],
    category: 'personal',
    highlight: false,
    link: 'https://github.com/arthurgvv/portfolio-profissional',
    images: [
      new URL('../assets/styles/portfolio-home.png', import.meta.url).href,
      new URL('../assets/styles/portfolio-sobre.png', import.meta.url).href,
    ],
  },
]

const filteredProjects = computed(() => {
  if (activeCategory.value === 'all') return projects
  return projects.filter((p) => p.category === activeCategory.value)
})

onMounted(() => {
  carouselTimer = window.setInterval(() => {
    filteredProjects.value.forEach((project) => {
      if (pausedProjectId.value !== project.id) advanceProject(project)
    })
  }, 3000)
})

onBeforeUnmount(() => {
  window.clearInterval(carouselTimer)
})
</script>

<style scoped>
.projects-page {
  min-height: calc(100vh - 64px - 62px);
  padding-bottom: 64px;
}

.project-stack {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 20px 0;
}

.project-stack-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.project-stack .skills-label {
  margin-right: 4px;
  color: var(--text-muted);
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.project-stack .skill-badge {
  height: 30px;
  display: inline-flex;
  align-items: center;
  padding: 0 14px;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-pill);
  background: var(--surface);
  color: var(--text-secondary);
  font-size: 11px;
  transition: border-color 0.2s, color 0.2s;
}

.project-stack .skill-badge:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.page-header {
  padding: 52px 32px 32px;
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

.page-title {
  font-size: clamp(26px, 4vw, 42px);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
}

.projects-layout {
  display: block;
}

.sidebar {
  max-width: 1200px;
  margin: 0 auto;
  padding: 22px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
}

.sidebar-label {
  font-size: 9px;
  color: var(--text-muted);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin: 0 10px 0 0;
}

.sidebar-item {
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 11px;
  color: var(--text-secondary);
  border: 1px solid transparent;
  text-align: left;
  cursor: pointer;
  transition: all 0.18s;
  background: none;
}
.sidebar-item:hover {
  color: var(--text);
  background: var(--surface);
  border-color: var(--border);
}
.sidebar-item.active {
  background: var(--accent-dim);
  border-color: rgba(200, 245, 74, 0.3);
  color: var(--accent);
}

.timeline-area {
  max-width: 1200px;
  margin: 0 auto;
  padding: 36px 32px 64px;
}

.timeline-line {
  display: none;
}

.timeline-items {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.tl-item {
  display: block;
  position: relative;
}

.tl-year {
  width: auto;
  font-size: 10px;
  color: var(--text-muted);
  text-align: left;
  padding: 0 0 9px 2px;
}

.tl-dot {
  display: none;
}
.tl-dot.active {
  background: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-dim);
}

.tl-card {
  width: 100%;
  background: var(--surface-alt);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-card);
  overflow: hidden;
  max-width: none;
  transition: border-color 0.2s, transform 0.2s;
  box-shadow: var(--shadow-main);
  cursor: pointer;
}
.tl-card:hover {
  border-color: rgba(200, 245, 74, 0.2);
  transform: translateY(-2px);
}
.tl-card.featured {
  border-color: rgba(200, 245, 74, 0.3);
}

.tl-card-gallery {
  position: relative;
  border-bottom: 1px solid var(--border);
}

.gallery-viewport {
  position: relative;
  background: var(--surface-dark);
}

.gallery-img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: contain;
}

.gallery-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid var(--border-light);
  color: var(--text);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.18s, border-color 0.18s;
  z-index: 2;
}
.gallery-arrow:hover {
  background: rgba(0, 0, 0, 0.8);
  border-color: var(--accent);
}
.gallery-arrow.left  { left: 10px; }
.gallery-arrow.right { right: 10px; }

.gallery-dots {
  display: flex;
  justify-content: center;
  gap: 6px;
  padding: 8px 0;
  background: var(--surface-dark);
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--border-light);
  cursor: pointer;
  transition: background 0.18s, transform 0.18s;
}
.dot.active {
  background: var(--accent);
  transform: scale(1.3);
}

.img-placeholder {
  height: 180px;
  background: var(--placeholder);
  display: flex;
  align-items: center;
  justify-content: center;
}

.img-placeholder-text {
  font-size: 11px;
  color: var(--text-muted);
}

.status-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(200, 245, 74, 0.12);
  border: 1px solid rgba(200, 245, 74, 0.4);
  color: var(--accent);
  font-size: 9px;
  padding: 3px 10px;
  border-radius: var(--radius-pill);
}

.tl-card-body {
  padding: 16px 20px 20px;
  text-align: center;
}

.tl-card-title {
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 6px;
  color: var(--text);
}

.tl-card-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.65;
  margin-bottom: 12px;
}

.tech-badges {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: center;
}

.tech-badge {
  height: 22px;
  padding: 0 9px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-badge);
  font-size: 10px;
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
}

.empty-state {
  padding: 48px;
  text-align: center;
  color: var(--text-muted);
  font-size: 13px;
}

.tl-enter-active,
.tl-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.tl-enter-from {
  opacity: 0;
  transform: translateX(8px);
}
.tl-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}

@media (max-width: 900px) {
  .timeline-items { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 768px) {
  .page-header {
    padding: 40px 20px 28px;
  }

  .sidebar {
    padding: 16px 20px;
    gap: 8px;
  }
  .sidebar-label {
    width: 100%;
    margin: 0 0 2px;
    text-align: center;
  }

  .sidebar-item {
    min-height: 44px;
  }

  .timeline-area {
    padding: 28px 20px 48px;
  }

  .gallery-arrow {
    width: 44px;
    height: 44px;
  }
}

@media (max-width: 640px) {
  .timeline-items {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .timeline-area {
    padding: 24px 16px;
  }

  .tl-card-body {
    padding: 16px;
  }

  .tl-card-desc,
  .tl-card-title {
    overflow-wrap: anywhere;
  }
}
</style>
