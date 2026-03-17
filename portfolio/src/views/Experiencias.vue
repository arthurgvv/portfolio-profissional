<template>
  <div class="exp-page">

    <div class="page-header container">
      <span class="page-badge mono">PG 03</span>
      <h1 class="page-title">Experiências</h1>
      <p class="page-subtitle">Minha trajetória profissional e acadêmica.</p>
    </div>

    <div class="container">

      <div class="filters">
        <button
          v-for="filter in filters"
          :key="filter"
          class="filter-btn mono"
          :class="{ active: activeFilter === filter }"
          @click="activeFilter = filter"
        >
          {{ filter }}
        </button>
      </div>

      <TransitionGroup name="exp" tag="div" class="exp-list">
        <div
          v-for="exp in filteredExperiences"
          :key="exp.id"
          class="exp-card"
          :class="{ featured: exp.current }"
        >
          <div class="exp-logo">{{ exp.icon }}</div>
          <div class="exp-info">
            <div class="exp-role-row">
              <h3 class="exp-role">{{ exp.role }}</h3>
              <span class="type-badge mono">{{ exp.type }}</span>
            </div>
            <p class="exp-company">{{ exp.company }}</p>
            <p class="exp-period mono">{{ exp.period }}</p>
            <p class="exp-desc">{{ exp.description }}</p>
            <div v-if="exp.techs" class="exp-techs">
              <span v-for="tech in exp.techs" :key="tech" class="tech-tag mono">{{ tech }}</span>
            </div>
          </div>
          <span v-if="exp.current" class="current-badge mono">● Atual</span>
        </div>
      </TransitionGroup>

      <div v-if="filteredExperiences.length === 0" class="empty-state mono">
        Nenhuma experiência nesta categoria ainda.
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const filters = ['Todos', 'Emprego', 'Estágio', 'Freelance', 'Acadêmico']
const activeFilter = ref('Todos')

const experiences = [
  {
    id: 1,
    icon: '🛍️',
    role: 'Fundador & Gestor',
    company: 'Finesse Sportz',
    period: '2022 – Atual',
    type: 'Emprego',
    description:
      'Criação e gestão de loja de artigos esportivos com foco em posicionamento digital e vendas online. Responsável pela estratégia do negócio, análise de mercado, definição de produtos e acompanhamento de métricas. Desenvolvimento de visão orientada a dados para tomada de decisão e otimização de resultados.',
    techs: ['Negócios', 'Marketing Digital', 'Gestão'],
    current: true,
  },
  {
    id: 2,
    icon: '🎓',
    role: 'Estudante de Engenharia de Software',
    company: 'PUC Minas',
    period: '2024 – 2028 (previsão)',
    type: 'Acadêmico',
    description:
      'Graduação em Engenharia de Software com foco em análise de dados e desenvolvimento de sistemas. Experiência com modelagem de dados, construção de consultas SQL e lógica de programação. Direcionando a formação para a área de dados, buscando transformar informações em soluções inteligentes e orientadas a resultados.',
    techs: ['SQL','Python', 'Java', 'Modelagem de Dados'],
    current: true,
  },
]

const filteredExperiences = computed(() => {
  if (activeFilter.value === 'Todos') return experiences
  return experiences.filter((e) => e.type === activeFilter.value)
})
</script>

<style scoped>
.exp-page {
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

.filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 24px;
}

.filter-btn {
  padding: 7px 18px;
  border-radius: 6px;
  font-size: 11px;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  cursor: pointer;
  background: none;
  transition: all 0.18s;
}
.filter-btn:hover {
  border-color: var(--border-light);
  color: var(--text);
}
.filter-btn.active {
  background: var(--accent-dim);
  border-color: rgba(200, 245, 74, 0.4);
  color: var(--accent);
}

.exp-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.exp-card {
  display: grid;
  grid-template-columns: 58px 1fr;
  gap: 20px;
  padding: 20px 24px;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-card);
  background: #171717;
  position: relative;
  transition: border-color 0.2s, background 0.2s;
}

.exp-card:hover {
  border-color: rgba(200, 245, 74, 0.15);
}

.exp-card.featured {
  border-color: rgba(200, 245, 74, 0.25);
  background: var(--accent-dim2);
}

.exp-logo {
  width: 52px;
  height: 52px;
  background: var(--placeholder);
  border: 1px solid var(--border-light);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}

.exp-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.exp-role-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.exp-role {
  font-size: 15px;
  font-weight: 800;
  color: var(--text);
}

.type-badge {
  font-size: 10px;
  color: var(--text-muted);
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 2px 10px;
  border-radius: var(--radius-pill);
}

.exp-company {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 600;
}

.exp-period {
  font-size: 11px;
  color: var(--text-muted);
}

.exp-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-top: 4px;
}

.exp-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}

.tech-tag {
  font-size: 10px;
  padding: 3px 10px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-badge);
  color: var(--text-muted);
}

.current-badge {
  position: absolute;
  top: 16px;
  right: 18px;
  font-size: 10px;
  background: rgba(0, 200, 80, 0.12);
  border: 1px solid rgba(0, 200, 80, 0.3);
  color: var(--green);
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  white-space: nowrap;
}

.empty-state {
  padding: 48px;
  text-align: center;
  color: var(--text-muted);
  font-size: 13px;
}

.exp-enter-active,
.exp-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.exp-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.exp-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 600px) {
  .exp-card {
    grid-template-columns: 1fr;
    padding: 16px;
  }
  .exp-logo {
    display: none;
  }
  .current-badge {
    position: static;
    display: inline-block;
    margin-bottom: 8px;
    align-self: flex-start;
  }
}
</style>
