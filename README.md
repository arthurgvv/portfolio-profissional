# 🎓 Portfólio Profissional

Portfólio desenvolvido na disciplina Laboratório de Desenvolvimento de Software da PUC Minas. O site reúne a trajetória acadêmica e profissional, projetos desenvolvidos, experiências relevantes e formas de contato.

---

## 🚀 Status do Projeto

![Sprint](https://img.shields.io/badge/Sprint-03-c8f54a?style=flat-square)
![Vue](https://img.shields.io/badge/Vue.js-3.4-42b883?style=flat-square&logo=vuedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff?style=flat-square&logo=vite&logoColor=white)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=flat-square)

---

## 📚 Índice

- [Links Úteis](#-links-úteis)
- [Sobre o Projeto](#-sobre-o-projeto)
- [Wireframes](#-wireframes)
- [Funcionalidades](#-funcionalidades-principais)
- [Tecnologias](#-tecnologias-utilizadas)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Instalação e Execução](#-instalação-e-execução)
- [Deploy](#-deploy)
- [Autor](#-autor)
- [Licença](#-licença)

---

## 🔗 Links Úteis

- **Repositório:** https://github.com/arthurgvv/portfolio-profissional
- - **Site:** https://portfolio-arthur-six.vercel.app

---

## 📖 Sobre o Projeto

Este projeto foi desenvolvido na disciplina de Laboratório de Desenvolvimento de Software com o objetivo de reunir, em um único site, as principais informações do perfil acadêmico e profissional.

A proposta é facilitar a apresentação da trajetória, dos projetos e das experiências para professores, recrutadores e demais interessados.

---

## 🎨 Wireframes

Desenvolvidos em média fidelidade no Figma.

| Página | Descrição |
|--------|-----------|
| **Sobre Mim** | Hero + apresentação bilíngue PT/EN + skills |
| **Projetos** | Timeline vertical com cards e links GitHub |
| **Experiências** | Cards com filtro por tipo de experiência |
| **Contato** | Links para redes sociais + formulário de mensagem |

<img width="2000" height="2400" alt="wireframe-home (1)" src="https://github.com/user-attachments/assets/9b524c3a-e08e-410f-9da6-ca1637a8e619" />


---

## ⚙️ Funcionalidades Principais

- Navegação com Vue Router
- Apresentação bilíngue (PT/EN)
- Timeline de projetos
- Filtro de experiências
- Formulário de contato

---

## 🛠️ Tecnologias Utilizadas

- Vue.js 3
- Vue Router
- Vite
- CSS3
- EmailJS
- Spline (3D)
- Vercel (deploy)

---

## 📂 Estrutura de Pastas


```
portfolio-profissional/ ← raiz do repositório
├── .gitignore
├── README.md
├── docs/
│ └── wireframes/
│ └── wireframe-home (1).png
└── portfolio/
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── vercel.json
├── dist/ ← build de produção (gerado automaticamente)
├── node_modules/ ← dependências (não versionar)
└── src/
├── App.vue
├── main.js
├── assets/
│ ├── styles/
│ │ ├── variables.css
│ │ └── global.css
│ └── profile.jpg
├── components/
│ ├── Navegacao.vue
│ └── Rodape.vue
├── router/
│ └── index.js
└── views/
├── Inicio.vue
├── SobreMim.vue
├── Projetos.vue
├── Experiencias.vue
└── Contato.vue
```

---


---

## 💻 Instalação

**Pré-requisitos:** Node.js v18+ e npm v9+

```bash
# Clone o repositório
git clone https://github.com/arthurgvv/portfolio-profissional.git

# Acesse a pasta do projeto
cd portfolio-profissional/portfolio

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

💡 O projeto será iniciado em: http://localhost:5173
```

## 🚀 Deploy

O projeto é hospedado na **Vercel**. Para replicar:

1. Faça push do repositório para o GitHub
2. Importe o repositório em [vercel.com](https://vercel.com)
3. Configure a pasta raiz como `portfolio/`, build command `npm run build` e output `dist`
4. Clique em **Deploy**

O arquivo `vercel.json` já está configurado para suportar o roteamento SPA do Vue Router.

---

## 👤 Autor

| 👤 Nome | 🖼️ Foto | GitHub | LinkedIn | Email |
|--------|--------|--------|----------|-------|
| Arthur Gonçalves Vieira | <img src="https://github.com/arthurgvv/portfolio-profissional/blob/b2ba05915144647c956bac70dcb435ec0ce55927/portfolio/src/assets/styles/profile.jpg" width="100px" style="border-radius:50%;"> | <a href="https://github.com/arthurgvv"><img src="https://img.shields.io/badge/GitHub-000?style=for-the-badge&logo=github&logoColor=white"></a> | <a href="https://www.linkedin.com/in/arthur-goncalves-62b15232a/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"></a> | <a href="mailto:arthurgvkj@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white"></a> |

---

## Licença

Este projeto é distribuído sob a [Licença MIT](./LICENSE).
