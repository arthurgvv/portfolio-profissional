<template>
  <div class="project-page container">
    <RouterLink to="/projetos" class="back-link mono">← {{ content[lang].back }}</RouterLink>

    <header class="project-header">
      <span class="project-year mono">2026 · {{ content[lang].personal }}</span>
      <h1 class="project-title">{{ content[lang].title }}</h1>
      <p class="project-desc">{{ content[lang].description }}</p>

      <div class="tech-badges">
        <span v-for="tech in techs" :key="tech" class="tech-badge mono">{{ tech }}</span>
      </div>
    </header>

    <div class="video-stage">
      <video
        class="project-video"
        src="/videos/pipeline-end-to-end-reels.mp4"
        autoplay
        muted
        loop
        playsinline
        controls
      ></video>
    </div>

    <div class="actions">
      <a
        href="https://github.com/arthurgvv/end-to-end-data-pipeline"
        target="_blank"
        rel="noopener noreferrer"
        class="github-btn mono"
      >
        {{ content[lang].github }} ↗
      </a>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useLanguage } from '../composables/useLanguage'

const { lang } = useLanguage()

const techs = ['Databricks', 'PySpark', 'SQL', 'Auto Loader', 'pytest', 'GitHub']

const content = {
  pt: {
    back: 'Voltar para projetos',
    personal: 'Projeto pessoal',
    title: 'Pipeline de Dados End-to-End – Olist E-commerce',
    description:
      'Pipeline de Engenharia de Dados no Databricks com arquitetura Medallion (Bronze, Silver e Gold), processando cerca de 100 mil pedidos do dataset público de e-commerce da Olist. Ingestão incremental com Auto Loader, limpeza e padronização com PySpark e modelagem dimensional em modelo estrela, com marts de negócio e segmentação RFM de clientes. Conta com 39 testes automatizados de qualidade de dados, testes unitários com pytest, orquestração por Job com alerta de falha e dashboard analítico.',
    github: 'Ver repositório no GitHub',
  },
  en: {
    back: 'Back to projects',
    personal: 'Personal project',
    title: 'End-to-End Data Pipeline – Olist E-commerce',
    description:
      'Data Engineering pipeline on Databricks using the Medallion architecture (Bronze, Silver and Gold), processing around 100k orders from the public Olist e-commerce dataset. Incremental ingestion with Auto Loader, cleaning and standardization with PySpark and dimensional star-schema modeling, with business marts and RFM customer segmentation. Includes 39 automated data quality tests, unit tests with pytest, Job orchestration with failure alerts and an analytics dashboard.',
    github: 'View repository on GitHub',
  },
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
  margin: 36px 0 40px;
}

.project-year {
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
}

.project-title {
  font-size: clamp(24px, 4vw, 40px);
  margin: 12px 0 16px;
}

.project-desc {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-secondary);
}

.tech-badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  margin-top: 20px;
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

.video-stage {
  width: 100%;
  display: flex;
  justify-content: center;
}

.project-video {
  display: block;
  width: auto;
  max-width: 100%;
  max-height: 80vh;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-card);
  background: var(--surface-dark);
  box-shadow: var(--shadow-main);
}

.actions {
  margin-top: 32px;
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
</style>
