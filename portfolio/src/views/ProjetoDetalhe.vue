<template>
  <div class="project-page container">
    <RouterLink to="/projetos" class="back-link mono">← {{ content[lang].back }}</RouterLink>

    <template v-if="project">
      <header class="project-header">
        <span class="project-meta mono">{{ project.year }} · {{ categoryLabel }}</span>
        <h1 class="project-title">{{ project.name[lang] }}</h1>
      </header>

      <div v-if="images.length" class="gallery">
        <div class="gallery-viewport">
          <img
            :src="images[current]"
            :alt="project.name[lang] + ' screenshot ' + (current + 1)"
            class="gallery-img"
          />
          <button v-if="images.length > 1" class="gallery-arrow left" @click="prev">&#8249;</button>
          <button v-if="images.length > 1" class="gallery-arrow right" @click="next">&#8250;</button>
        </div>
        <div v-if="images.length > 1" class="gallery-dots">
          <span
            v-for="(_, idx) in images"
            :key="idx"
            class="dot"
            :class="{ active: current === idx }"
            @click="current = idx"
          ></span>
        </div>
      </div>

      <section class="project-info">
        <p class="project-desc">{{ project.description[lang] }}</p>

        <div v-if="stackGroups.length" class="stack">
          <h2 class="stack-title mono">Stack</h2>
          <div v-for="group in stackGroups" :key="group.key" class="stack-row">
            <span class="stack-label mono">{{ content[lang].groups[group.key] }}</span>
            <div class="tech-badges">
              <span v-for="tech in group.items" :key="tech" class="tech-badge mono">{{ tech }}</span>
            </div>
          </div>
        </div>
        <div v-else class="tech-badges">
          <span v-for="tech in project.techs" :key="tech" class="tech-badge mono">{{ tech }}</span>
        </div>

        <a
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
          class="github-btn mono"
        >{{ content[lang].github }} ↗</a>
      </section>
    </template>

    <p v-else class="not-found mono">{{ content[lang].notFound }}</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useLanguage } from '../composables/useLanguage'
import { findProject } from '../data/projects'

const props = defineProps({
  slug: { type: String, required: true },
})

const { lang } = useLanguage()

const content = {
  pt: {
    back: 'Voltar para projetos',
    github: 'Ver repositório no GitHub',
    notFound: 'Projeto não encontrado.',
    academic: 'Projeto acadêmico',
    personal: 'Projeto pessoal',
    groups: {
      languages: 'Linguagens',
      backend: 'Back-end',
      frontend: 'Front-end',
      database: 'Banco de dados',
      tools: 'Ferramentas',
    },
  },
  en: {
    back: 'Back to projects',
    github: 'View repository on GitHub',
    notFound: 'Project not found.',
    academic: 'Academic project',
    personal: 'Personal project',
    groups: {
      languages: 'Languages',
      backend: 'Back-end',
      frontend: 'Front-end',
      database: 'Database',
      tools: 'Tools',
    },
  },
}

const project = computed(() => findProject(props.slug))
// só imagens na galeria (o vídeo do pipeline fica no destaque da lista)
const images = computed(() =>
  (project.value?.images ?? []).filter((src) => !/\.(mp4|webm)$/i.test(src)),
)
const categoryLabel = computed(() => content[lang.value][project.value?.category] ?? '')

const STACK_ORDER = ['languages', 'backend', 'frontend', 'database', 'tools']
const stackGroups = computed(() =>
  STACK_ORDER
    .filter((key) => project.value?.stack?.[key]?.length)
    .map((key) => ({ key, items: project.value.stack[key] })),
)

const current = ref(0)
watch(() => props.slug, () => { current.value = 0 })

function next() {
  current.value = (current.value + 1) % images.value.length
}
function prev() {
  current.value = (current.value - 1 + images.value.length) % images.value.length
}
</script>

<style scoped>
.project-page {
  min-height: calc(100vh - 64px - 62px);
  padding-top: 40px;
  padding-bottom: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.back-link {
  align-self: flex-start;
  font-size: 12px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}
.back-link:hover {
  color: var(--accent);
}

.project-header {
  max-width: 820px;
  text-align: center;
  margin: 36px 0 32px;
}

.project-meta {
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
}

.project-title {
  font-size: clamp(26px, 4vw, 42px);
  margin-top: 12px;
}

.gallery {
  width: 100%;
  max-width: 960px;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-card);
  overflow: hidden;
  box-shadow: var(--shadow-main);
}

.gallery-viewport {
  position: relative;
  background: var(--surface-dark);
}

.gallery-img {
  display: block;
  width: 100%;
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.18s, border-color 0.18s;
}
.gallery-arrow:hover {
  background: rgba(0, 0, 0, 0.8);
  border-color: var(--accent);
}
.gallery-arrow.left  { left: 14px; }
.gallery-arrow.right { right: 14px; }

.gallery-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 10px 0;
  background: var(--surface-dark);
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--border-light);
  cursor: pointer;
  transition: background 0.18s, transform 0.18s;
}
.dot.active {
  background: var(--accent);
  transform: scale(1.3);
}

.project-info {
  max-width: 820px;
  text-align: center;
  margin-top: 36px;
}

.project-desc {
  font-size: 15px;
  line-height: 1.75;
  color: var(--text-secondary);
}

.tech-badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  margin: 22px 0 30px;
}

.stack {
  margin: 36px 0;
  padding: 24px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.stack-title {
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 18px;
}

.stack-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
  text-align: left;
}

.stack-label {
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.stack .tech-badges {
  justify-content: flex-start;
  margin: 0;
}

@media (max-width: 600px) {
  .stack-row {
    grid-template-columns: 1fr;
    gap: 8px;
    text-align: center;
  }
  .stack .tech-badges { justify-content: center; }
}

.tech-badge {
  height: 24px;
  padding: 0 10px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-badge);
  font-size: 11px;
  color: var(--text-secondary);
  display: inline-flex;
  align-items: center;
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

.not-found {
  margin-top: 64px;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .project-page { padding-top: 28px; }
  .gallery-arrow { width: 44px; height: 44px; }
}
</style>
