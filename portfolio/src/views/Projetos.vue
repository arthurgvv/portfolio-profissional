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
        <Transition name="tl">
          <article
            v-if="featuredProject"
            class="featured-project"
          >
            <div class="featured-media">
              <video
                class="featured-video"
                src="/videos/pipeline-end-to-end-reels.mp4"
                autoplay
                muted
                loop
                playsinline
                controls
              ></video>
            </div>

            <div class="featured-body">
              <span class="featured-meta mono">● {{ content[lang].featured }} · {{ featuredProject.year }}</span>
              <h2 class="featured-title">{{ featuredProject.name[lang] }}</h2>
              <p class="featured-desc">{{ featuredProject.description[lang] }}</p>
              <div class="tech-badges featured-badges">
                <span
                  v-for="tech in featuredProject.techs"
                  :key="tech"
                  class="tech-badge mono"
                >{{ tech }}</span>
              </div>
              <a
                :href="featuredProject.link"
                target="_blank"
                rel="noopener noreferrer"
                class="github-btn mono"
              >{{ content[lang].github }} ↗</a>
            </div>
          </article>
        </Transition>

        <div class="timeline-line"></div>

        <TransitionGroup name="tl" tag="div" class="timeline-items">
          <div
            v-for="project in gridProjects"
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
              @click="abrirProjeto(project)"
              @keydown.enter="abrirProjeto(project)"
              @keydown.space.prevent="abrirProjeto(project)"
            >

              <div class="tl-card-gallery">
                <template v-if="project.images && project.images.length > 0">
                  <div class="gallery-viewport">
                    <video
                      v-if="isVideo(project.images[activeIndex[project.id] ?? 0])"
                      :src="project.images[activeIndex[project.id] ?? 0]"
                      class="gallery-img"
                      autoplay
                      muted
                      playsinline
                      @ended="advanceProject(project)"
                    ></video>
                    <img
                      v-else
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
import { useRouter } from 'vue-router'
import { useLanguage } from '../composables/useLanguage'
import { projects } from '../data/projects'

const { lang } = useLanguage()
const router = useRouter()

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
    github: 'Ver repositório no GitHub',
  },
  en: {
    title: 'Projects',
    subtitle: 'Academic and personal projects developed throughout my path in software and data.',
    filterBy: 'Filter by',
    screensSoon: 'Screenshots coming soon',
    featured: 'Featured',
    empty: 'No projects in this category yet.',
    github: 'View repository on GitHub',
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

function isVideo(src) {
  return /\.(mp4|webm)$/i.test(src)
}
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
function abrirProjeto(project) {
  router.push({ name: 'projeto-detalhe', params: { slug: project.slug } })
}


const filteredProjects = computed(() => {
  if (activeCategory.value === 'all') return projects
  return projects.filter((p) => p.category === activeCategory.value)
})

// projeto em destaque fica no centro, fora da grade
const featuredProject = computed(() => filteredProjects.value.find((p) => p.highlight))
const gridProjects = computed(() => filteredProjects.value.filter((p) => !p.highlight))

onMounted(() => {
  carouselTimer = window.setInterval(() => {
    gridProjects.value.forEach((project) => {
      if (pausedProjectId.value === project.id) return
      // vídeo avança sozinho ao terminar (@ended), não pelo timer
      if (isVideo(project.images?.[activeIndex[project.id] ?? 0])) return
      advanceProject(project)
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

.featured-project {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  align-items: center;
  gap: 48px;
  margin-bottom: 64px;
}

.featured-media {
  display: flex;
  justify-content: center;
}

.featured-video {
  display: block;
  width: auto;
  max-width: 100%;
  max-height: 72vh;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-card);
  background: var(--surface-dark);
}

.featured-body {
  text-align: left;
}

.featured-meta {
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
}

.featured-title {
  font-size: clamp(22px, 3vw, 34px);
  margin: 12px 0 16px;
  color: var(--text);
}

.featured-desc {
  font-size: 14px;
  line-height: 1.75;
  color: var(--text-secondary);
}

.featured-body .featured-badges {
  justify-content: flex-start;
  margin: 20px 0 28px;
}

.github-btn {
  display: inline-flex;
  align-items: center;
  height: 44px;
  padding: 0 24px;
  border: 1px solid var(--accent);
  border-radius: var(--radius-pill);
  background: var(--accent-dim);
  color: var(--accent);
  font-size: 13px;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}
.github-btn:hover {
  background: var(--accent);
  color: var(--bg);
}

@media (max-width: 900px) {
  .featured-project {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .featured-body { text-align: center; }
  .featured-body .featured-badges { justify-content: center; }
  .featured-video { max-height: 70vh; }
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
  margin: 0;
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
