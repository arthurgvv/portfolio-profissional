<template>
  <div class="projects-page">

    <div class="page-header container">
      <span class="page-badge mono">PG 02</span>
      <h1 class="page-title">Projetos</h1>
      <p class="page-subtitle">Uma seleção de projetos desenvolvidos ao longo da minha trajetória.</p>
    </div>

    <div class="projects-layout">

      <aside class="sidebar">
        <div class="sidebar-label mono">Filtrar por</div>
        <button
          v-for="cat in categories"
          :key="cat"
          class="sidebar-item mono"
          :class="{ active: activeCategory === cat }"
          @click="activeCategory = cat"
        >
          {{ cat }}
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
            <div class="tl-card" :class="{ featured: project.highlight }">

              <div class="tl-card-gallery">
                <template v-if="project.images && project.images.length > 0">
                  <div class="gallery-viewport">
                    <img
                      :src="project.images[activeIndex[project.id] ?? 0]"
                      :alt="project.name + ' screenshot ' + ((activeIndex[project.id] ?? 0) + 1)"
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
                      @click="activeIndex[project.id] = idx"
                    ></span>
                  </div>
                </template>
                <template v-else>
                  <div class="img-placeholder">
                    <span class="img-placeholder-text mono">🖼️ Screenshots em breve</span>
                  </div>
                </template>
                <span v-if="project.highlight" class="status-badge mono">● Destaque</span>
              </div>

              <div class="tl-card-body">
                <h3 class="tl-card-title">{{ project.name }}</h3>
                <p class="tl-card-desc">{{ project.description }}</p>
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
          Nenhum projeto nesta categoria ainda.
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const categories = ['Todos', 'Web App', 'Mobile', 'API / Back-end', 'Estudo']
const activeCategory = ref('Todos')
const activeIndex = reactive({})

function next(project) {
  const cur = activeIndex[project.id] ?? 0
  activeIndex[project.id] = (cur + 1) % project.images.length
}
function prev(project) {
  const cur = activeIndex[project.id] ?? 0
  activeIndex[project.id] = (cur - 1 + project.images.length) % project.images.length
}

const projects = [
  {
    id: 1,
    year: '2025',
    name: 'Sistema de Consultório Médico',
    description: 'Sistema web desenvolvido em equipe com foco na gestão de consultório médico. Atuei na modelagem de dados e no desenvolvimento de consultas SQL, garantindo organização, consistência e eficiência no tratamento das informações.',
    techs: ['Web App', 'HTML', 'CSS', 'JavaScript', 'PostgreSQL'],
    category: 'Web App',
    highlight: true,
    link: 'https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2025-2-ti3-9545100-consultoriomedico',
    images: [],
  },
  {
    id: 2,
    year: '2025',
    name: 'Sistema de Cálculo de Folha de Pagamento',
    description: 'Projeto desenvolvido em equipe para simular o cálculo de folha de pagamento, aplicando regras de negócio e lógica de programação para garantir resultados corretos, organizados e consistentes.',
    techs: ['Python'],
    category: 'Estudo',
    highlight: false,
    link: 'https://github.com/pm-puc-minas/calculo-folha-pagamento-teorica-grupo1',
    images: [],
  },
]

const filteredProjects = computed(() => {
  if (activeCategory.value === 'Todos') return projects
  return projects.filter((p) => p.category === activeCategory.value)
})
</script>

<style scoped>
.projects-page {
  min-height: calc(100vh - 64px - 62px);
  padding-bottom: 64px;
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
  display: grid;
  grid-template-columns: 200px 1fr;
  border-top: 1px solid var(--border);
  min-height: 400px;
}

.sidebar {
  border-right: 1px solid var(--border);
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sidebar-label {
  font-size: 9px;
  color: var(--text-muted);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 8px;
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
  padding: 32px;
  position: relative;
}

.timeline-line {
  position: absolute;
  left: 100px;
  top: 32px;
  bottom: 32px;
  width: 2px;
  background: linear-gradient(to bottom, var(--accent), var(--border));
  border-radius: 2px;
}

.timeline-items {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.tl-item {
  display: flex;
  gap: 22px;
  align-items: flex-start;
  position: relative;
}

.tl-year {
  width: 44px;
  font-size: 10px;
  color: var(--text-muted);
  text-align: right;
  padding-top: 7px;
  flex-shrink: 0;
}

.tl-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--placeholder-light);
  border: 2px solid var(--surface-dark);
  flex-shrink: 0;
  margin-top: 5px;
  transition: background 0.2s, box-shadow 0.2s;
}
.tl-dot.active {
  background: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-dim);
}

.tl-card {
  flex: 1;
  background: var(--surface-alt);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-card);
  overflow: hidden;
  max-width: 580px;
  transition: border-color 0.2s, transform 0.2s;
  box-shadow: var(--shadow-main);
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
  height: 300px;
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
  .timeline-line { left: 76px; }
}

@media (max-width: 768px) {
  .projects-layout {
    grid-template-columns: 1fr;
  }
  .sidebar {
    border-right: none;
    border-bottom: 1px solid var(--border);
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px;
    gap: 8px;
  }
  .sidebar-label {
    width: 100%;
    margin-bottom: 0;
  }
  .timeline-line { left: 80px; }
}

@media (max-width: 480px) {
  .timeline-area {
    padding: 24px 16px;
  }
  .timeline-line { left: 64px; }
  .tl-card { max-width: 100%; }
}
</style>
