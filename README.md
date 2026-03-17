# Portfólio Profissional

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

---

## 📖 Sobre o Projeto

Este projeto foi desenvolvido na disciplina de Laboratório de Desenvolvimento de Software com o objetivo de reunir, em um único site, as principais informações do perfil acadêmico e profissional.

A proposta é facilitar a apresentação da trajetória, dos projetos e das experiências para professores, recrutadores e demais interessados.

---

## 🎨 Wireframes

| Sobre Mim | Projetos |
|:---------:|:--------:|
| ![](<img width="767" height="427" alt="sobremim" src="https://github.com/user-attachments/assets/b19024bb-b99f-4bff-b363-dafc72812f0d" />
) | ![](<img width="787" height="141" alt="projetos" src="https://github.com/user-attachments/assets/7677752e-04c6-4abe-8410-da6109e192bc" />
) |

| Experiências | Contato |
|:------------:|:-------:|
| ![](<img width="788" height="118" alt="experiencias" src="https://github.com/user-attachments/assets/18a1fce0-2a1b-437b-940d-a9b0bce3c671" />
) | ![](<img width="781" height="308" alt="contato" src="https://github.com/user-attachments/assets/4bbb15c8-d902-4c95-b43b-694dfe851526" />
) |

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
portfolio/                          ← raiz do repositório
├── .gitignore
├── README.md
├── docs/
│   ├── wireframes/                 ← imagens dos wireframes (Figma)
│   │   ├── wireframe-home (1).png
└── portfolio/                      
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    ├── vercel.json
    └── src/
        ├── App.vue
        ├── main.js
        ├── assets/
        │   └── styles/
        │       ├── variables.css
        │       ├── global.css
        │       └── profile.jpg
        ├── components/
        │   ├── Navegacao.vue
        │   └── Rodape.vue
        ├── router/
        │   └── index.js
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

```bash
git clone https://github.com/arthurgvv/portfolio-profissional.git
cd portfolio-profissional/portfolio
npm install
npm run dev
---

## Deploy

O projeto é hospedado na **Vercel**. Para replicar:

1. Faça push do repositório para o GitHub
2. Importe o repositório em [vercel.com](https://vercel.com)
3. Configure a pasta raiz como `portfolio/`, build command `npm run build` e output `dist`
4. Clique em **Deploy**

O arquivo `vercel.json` já está configurado para suportar o roteamento SPA do Vue Router.

---

## Autor

## 👤 Autor

| 👤 Nome | 🖼️ Foto | GitHub | LinkedIn | Email |
|--------|--------|--------|----------|-------|
| Arthur Gonçalves Vieira | <img src="https://raw.githubusercontent.com/arthurgvv/portfolio-profissional/main/portfolio/src/assets/styles/profile.jpg" width="100px" style="border-radius:50%;"> | <a href="https://github.com/arthurgvv"><img src="https://img.shields.io/badge/GitHub-000?style=for-the-badge&logo=github&logoColor=white"></a> | <a href="https://www.linkedin.com/in/arthur-goncalves-62b15232a/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"></a> | <a href="mailto:arthurgvkj@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white"></a> |

---

## Licença

Este projeto é distribuído sob a [Licença MIT](./LICENSE).
