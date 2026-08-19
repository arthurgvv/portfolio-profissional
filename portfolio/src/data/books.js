import decifrandoCover from '../assets/styles/decifrando-arquiteturas-dados.png'
import fluenciaCover from '../assets/styles/fluencia-em-dados.png'
import fundamentosCover from '../assets/styles/fundamentos-engenharia-dados.png'

export const statusLabels = {
  read: { pt: 'Já li', en: 'Read' },
  reading: { pt: 'Lendo agora', en: 'Reading now' },
  'to-read': { pt: 'Quero ler', en: 'Want to read' },
}

export const books = [
  {
    id: 1,
    title: { pt: 'Fluência em Dados', en: 'Data Fluency' },
    author: { pt: 'Priscila Papazissis', en: 'Priscila Papazissis' },
    status: 'read',
    category: { pt: 'LEITURA 01', en: 'READING 01' },
    year: '2025',
    note: {
      pt: 'Meu primeiro livro da estante: uma base para pensar dados com clareza, contexto e impacto.',
      en: 'My first book on the shelf: a foundation for thinking about data with clarity, context and impact.',
    },
    tag: { pt: 'CONCLUÍDO', en: 'DONE' },
    color: 'violet',
    cover: fluenciaCover,
  },
  {
    id: 2,
    title: { pt: 'Decifrando Arquiteturas de Dados', en: 'Decoding Data Architectures' },
    author: { pt: 'James Serra', en: 'James Serra' },
    status: 'reading',
    category: { pt: 'LEITURA 02', en: 'READING 02' },
    year: '2026',
    progress: 48,
    note: {
      pt: 'Leitura atual para entender melhor data warehouse, data fabric, data lakehouse e data mesh.',
      en: 'Current reading to better understand data warehouse, data fabric, data lakehouse and data mesh.',
    },
    tag: { pt: 'EM ANDAMENTO', en: 'IN PROGRESS' },
    color: 'lime',
    cover: decifrandoCover,
  },
  {
    id: 3,
    title: { pt: 'Fundamentos de Engenharia de Dados', en: 'Fundamentals of Data Engineering' },
    author: { pt: 'Joe Reis e Matt Housley', en: 'Joe Reis and Matt Housley' },
    status: 'to-read',
    category: { pt: 'LEITURA 03', en: 'READING 03' },
    year: { pt: 'FILA', en: 'QUEUE' },
    note: {
      pt: 'Minha próxima leitura para aprofundar sistemas de dados robustos e fundamentos da área.',
      en: 'My next reading to go deeper into robust data systems and the foundations of the field.',
    },
    tag: { pt: 'NA FILA', en: 'QUEUED' },
    color: 'blue',
    cover: fundamentosCover,
  },
]
