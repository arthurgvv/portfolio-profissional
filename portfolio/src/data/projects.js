// dados dos projetos, usados na lista (/projetos) e na pagina de cada um (/projetos/:slug)
export const projects = [
  {
    id: 7,
    slug: 'pipeline-end-to-end',
    year: '2026',
    name: {
      pt: 'Pipeline de Dados End-to-End – Olist E-commerce',
      en: 'End-to-End Data Pipeline – Olist E-commerce',
    },
    description: {
      pt: 'Pipeline de Engenharia de Dados no Databricks com arquitetura Medallion (Bronze, Silver e Gold), processando cerca de 100 mil pedidos do dataset público de e-commerce da Olist. Ingestão incremental com Auto Loader, limpeza e padronização com PySpark e modelagem dimensional em modelo estrela, com marts de negócio e segmentação RFM de clientes. Conta com 39 testes automatizados de qualidade de dados, testes unitários com pytest, orquestração por Job com alerta de falha e dashboard analítico.',
      en: 'Data Engineering pipeline on Databricks using the Medallion architecture (Bronze, Silver and Gold), processing around 100k orders from the public Olist e-commerce dataset. Incremental ingestion with Auto Loader, cleaning and standardization with PySpark and dimensional star-schema modeling, with business marts and RFM customer segmentation. Includes 39 automated data quality tests, unit tests with pytest, Job orchestration with failure alerts and an analytics dashboard.',
    },
    techs: ['Projeto pessoal', 'Databricks', 'PySpark', 'SQL', 'GitHub'],
    category: 'personal',
    highlight: true,
    link: 'https://github.com/arthurgvv/end-to-end-data-pipeline',
  },
  {
    id: 3,
    slug: 'seri-estudio',
    stack: {
      languages: ['Java 21', 'TypeScript', 'SQL'],
      backend: ['Spring Boot', 'Spring Security', 'Spring Data JPA', 'JWT', 'Lombok'],
      frontend: ['React', 'React Router', 'Tailwind CSS', 'Three.js (3D)', 'Vite'],
      database: ['PostgreSQL'],
      tools: ['Maven', 'Git', 'GitHub'],
    },
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
    highlight: false,
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
    slug: 'consultorio-medico',
    stack: {
      languages: ['Java 21', 'TypeScript', 'SQL'],
      backend: ['Spring Boot', 'Spring Security', 'Spring Data JPA', 'Bean Validation', 'JWT', 'Lombok'],
      frontend: ['React', 'React Router', 'Tailwind CSS', 'React Hook Form', 'Zod', 'Axios', 'Framer Motion', 'Vite'],
      database: ['PostgreSQL', 'pgAdmin'],
      tools: ['Docker Compose', 'Maven', 'Vitest', 'Git', 'GitHub'],
    },
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
    slug: 'finesse-sportz',
    stack: {
      languages: ['Java 21', 'JavaScript'],
      backend: ['Spring Boot', 'Spring Security', 'Spring Data JPA', 'Spring Data REST', 'JWT', 'Lombok', 'Cloudinary'],
      frontend: ['React', 'React Router', 'Bootstrap', 'Recharts', 'SweetAlert2', 'Vite'],
      database: ['PostgreSQL'],
      tools: ['Docker', 'Maven', 'Git', 'GitHub'],
    },
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
    slug: 'verbum',
    stack: {
      languages: ['Java 17', 'JavaScript'],
      backend: ['Spring Boot', 'Spring Web', 'Spring Data JPA'],
      frontend: ['React', 'Vite'],
      database: ['H2'],
      tools: ['Maven', 'Git', 'GitHub'],
    },
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
    slug: 'happy-coin',
    stack: {
      languages: ['Java 21', 'JavaScript', 'SQL'],
      backend: ['Spring Boot', 'Spring Data JPA', 'Bean Validation', 'Spring Security Crypto', 'RabbitMQ (Spring AMQP)', 'Flyway'],
      frontend: ['React', 'Vite', 'QR Code'],
      database: ['PostgreSQL'],
      tools: ['Docker', 'Maven', 'Git', 'GitHub'],
    },
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
    slug: 'portfolio-profissional',
    stack: {
      languages: ['JavaScript', 'HTML', 'CSS'],
      frontend: ['Vue 3', 'Vue Router', 'Vite', 'EmailJS'],
      tools: ['Git', 'GitHub'],
    },
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

export function findProject(slug) {
  return projects.find((p) => p.slug === slug)
}
