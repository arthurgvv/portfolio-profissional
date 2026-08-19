<template>
  <div class="books-page">
    <div class="page-header container">
      <span class="page-badge mono">PG 05</span>
      <div class="header-row">
        <div>
          <h1 class="page-title">{{ content[lang].title }}</h1>
          <p class="page-subtitle">
            {{ content[lang].subtitle }}
          </p>
        </div>
        <span class="header-mark mono">BOOKS / LOG</span>
      </div>
    </div>

    <section class="books-summary container" :aria-label="content[lang].summaryLabel">
      <div class="summary-card">
        <span class="summary-value">{{ books.length }}</span>
        <span class="summary-label mono">{{ content[lang].onShelf }}</span>
      </div>
      <div class="summary-card">
        <span class="summary-value accent">{{ countByStatus('read') }}</span>
        <span class="summary-label mono">{{ content[lang].read }}</span>
      </div>
      <div class="summary-card">
        <span class="summary-value reading">{{ countByStatus('reading') }}</span>
        <span class="summary-label mono">{{ content[lang].reading }}</span>
      </div>
      <div class="summary-card">
        <span class="summary-value queued">{{ countByStatus('to-read') }}</span>
        <span class="summary-label mono">{{ content[lang].toRead }}</span>
      </div>
    </section>

    <div class="books-toolbar container">
      <div>
        <p class="toolbar-label mono">{{ content[lang].shelf }}</p>
        <p class="toolbar-description">{{ content[lang].toolbarDescription }}</p>
      </div>
      <div class="filters" role="group" :aria-label="content[lang].filterLabel">
        <button
          v-for="filter in filters"
          :key="filter.value"
          class="filter-btn mono"
          :class="{ active: activeFilter === filter.value }"
          type="button"
          @click="activeFilter = filter.value"
        >
          {{ filter.label[lang] }}
        </button>
      </div>
    </div>

    <main class="books-grid container">
      <article v-for="book in filteredBooks" :key="book.id" class="book-card">
        <div class="book-cover" :class="`cover-${book.color}`">
          <img :src="book.cover" :alt="book.title[lang]" class="cover-image" />
        </div>

        <div class="book-body">
          <div class="book-topline">
            <span class="status" :class="`status-${book.status}`">
              <span class="status-dot"></span>
              {{ statusLabels[book.status][lang] }}
            </span>
            <span class="book-year mono">{{ typeof book.year === 'string' ? book.year : book.year[lang] }}</span>
          </div>

          <h2 class="book-title">{{ book.title[lang] }}</h2>
          <p class="book-author mono">{{ book.author[lang] }}</p>
          <p class="book-note">{{ book.note[lang] }}</p>

          <div v-if="book.status === 'reading'" class="progress-block">
            <div class="progress-meta mono">
              <span>{{ content[lang].progress }}</span>
              <span>{{ book.progress }}%</span>
            </div>
            <div class="progress-track">
              <span :style="{ width: `${book.progress}%` }"></span>
            </div>
          </div>

          <div class="book-footer">
            <span class="book-tag mono">{{ book.tag[lang] }}</span>
            <span class="book-arrow" aria-hidden="true">↗</span>
          </div>
        </div>
      </article>

      <div v-if="filteredBooks.length === 0" class="empty-state mono">
        {{ content[lang].empty }}
      </div>
    </main>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { books, statusLabels } from '../data/books'

const { lang } = useLanguage()

const activeFilter = ref('all')

const content = {
  pt: {
    title: 'Livros',
    subtitle: 'Leituras que acompanham minha evolução em tecnologia, dados e carreira.',
    summaryLabel: 'Resumo da estante',
    onShelf: 'na estante',
    read: 'já lidos',
    reading: 'lendo agora',
    toRead: 'quero ler',
    shelf: 'Minha estante',
    toolbarDescription: 'Um registro das leituras e das próximas descobertas.',
    filterLabel: 'Filtrar livros por status',
    progress: 'Progresso',
    empty: 'Nenhum livro neste filtro ainda.',
  },
  en: {
    title: 'Books',
    subtitle: 'Readings that support my growth in technology, data and career.',
    summaryLabel: 'Shelf summary',
    onShelf: 'on shelf',
    read: 'read',
    reading: 'reading now',
    toRead: 'want to read',
    shelf: 'My shelf',
    toolbarDescription: 'A record of readings and next discoveries.',
    filterLabel: 'Filter books by status',
    progress: 'Progress',
    empty: 'No books in this filter yet.',
  },
}

const filters = [
  { label: { pt: 'Todos', en: 'All' }, value: 'all' },
  { label: { pt: 'Já li', en: 'Read' }, value: 'read' },
  { label: { pt: 'Lendo agora', en: 'Reading now' }, value: 'reading' },
  { label: { pt: 'Quero ler', en: 'Want to read' }, value: 'to-read' },
]

const filteredBooks = computed(() => {
  if (activeFilter.value === 'all') return books
  return books.filter((book) => book.status === activeFilter.value)
})

function countByStatus(status) {
  return books.filter((book) => book.status === status).length
}
</script>

<style scoped>
.books-page {
  min-height: calc(100vh - 64px - 62px);
  padding-bottom: 64px;
}

.page-header {
  padding: 52px 32px 32px;
}

.page-badge {
  display: inline-block;
  margin-bottom: 14px;
  padding: 3px 10px;
  border: 1px solid var(--accent);
  border-radius: var(--radius-badge);
  background: var(--accent-dim);
  color: var(--accent);
  font-size: 10px;
  letter-spacing: 0.2em;
}

.header-row {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
}

.page-title {
  margin-bottom: 8px;
  font-size: clamp(26px, 4vw, 42px);
}

.page-subtitle {
  max-width: 600px;
  color: var(--text-secondary);
  font-size: 14px;
}

.header-mark {
  padding-bottom: 8px;
  color: var(--text-muted);
  font-size: 10px;
  letter-spacing: 0.16em;
}

.books-summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.summary-card {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-height: 92px;
  padding: 20px 24px;
  border-right: 1px solid var(--border);
}

.summary-card:last-child {
  border-right: none;
}

.summary-value {
  color: var(--text);
  font-family: 'JetBrains Mono', monospace;
  font-size: 26px;
  font-weight: 700;
}

.summary-value.reading { color: var(--green); }
.summary-value.queued { color: var(--text); }

.summary-label {
  color: var(--text-muted);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.books-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-top: 36px;
  padding-bottom: 20px;
}

.toolbar-label {
  margin-bottom: 4px;
  color: var(--text);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.toolbar-description {
  color: var(--text-muted);
  font-size: 12px;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  gap: 6px;
}

.filter-btn {
  padding: 7px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 10px;
  transition: all 0.18s;
}

.filter-btn:hover,
.filter-btn.active {
  border-color: rgba(200, 245, 74, 0.4);
  background: var(--accent-dim);
  color: var(--accent);
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.book-card {
  overflow: hidden;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-card);
  background: var(--surface-alt);
  box-shadow: var(--shadow-main);
  transition: border-color 0.2s, transform 0.2s;
}

.book-card:hover {
  border-color: rgba(200, 245, 74, 0.35);
  transform: translateY(-3px);
}

.book-cover {
  position: relative;
  min-height: 242px;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: var(--surface-dark);
}

.cover-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #f7f7f4;
}

.book-body {
  padding: 18px 20px 20px;
}

.book-topline,
.book-footer,
.progress-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.status,
.book-year,
.book-tag,
.progress-meta {
  font-size: 9px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}

.status-read { color: var(--accent); }
.status-reading { color: var(--blue); }
.status-reading .status-dot { background: var(--blue); }
.status-to-read { color: var(--text-secondary); }
.status-to-read .status-dot { background: var(--text-muted); }
.book-year { color: var(--text-muted); }

.book-title {
  margin-top: 16px;
  color: var(--text);
  font-size: 17px;
  line-height: 1.2;
}

.book-author {
  margin-top: 5px;
  color: var(--text-muted);
  font-size: 10px;
}

.book-note {
  min-height: 62px;
  margin-top: 14px;
  color: var(--text-secondary);
  font-size: 12px;
  line-height: 1.65;
}

.progress-block {
  margin-top: 18px;
}

.progress-meta {
  margin-bottom: 7px;
  color: var(--text-muted);
}

.progress-track {
  height: 4px;
  overflow: hidden;
  border-radius: 4px;
  background: var(--border);
}

.progress-track span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--blue);
}

.book-footer {
  margin-top: 20px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
}

.book-tag {
  color: var(--text-muted);
}

.book-arrow {
  color: var(--accent);
  font-size: 18px;
  line-height: 1;
}

.empty-state {
  grid-column: 1 / -1;
  padding: 48px;
  border: 1px dashed var(--border-light);
  color: var(--text-muted);
  font-size: 13px;
  text-align: center;
}

@media (max-width: 900px) {
  .books-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .books-summary {
    grid-template-columns: repeat(2, 1fr);
  }

  .summary-card:nth-child(2) {
    border-right: none;
  }

  .summary-card:nth-child(-n + 2) {
    border-bottom: 1px solid var(--border);
  }

  .books-toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .filters {
    justify-content: start;
  }
}

@media (max-width: 600px) {
  .page-header {
    padding: 40px 20px 28px;
  }

  .header-row {
    align-items: flex-start;
    flex-direction: column;
  }

  .books-grid {
    grid-template-columns: 1fr;
  }

}

@media (max-width: 480px) {
  .summary-card {
    padding: 16px;
  }
}
</style>
