<template>
  <div class="contact-page">

    <div class="page-header container">
      <span class="page-badge mono">PG 04</span>
      <h1 class="page-title">Contato</h1>
      <p class="page-subtitle">Quer conversar sobre um projeto ou oportunidade? Manda uma mensagem!</p>
    </div>

    <div class="contact-layout container">

      <div class="contact-left">
        <p class="section-label mono">Redes sociais</p>
        <div class="social-grid">
          <a
            v-for="social in socials"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener"
            class="social-card"
          >
            <div class="social-icon" v-html="social.svg"></div>
            <div class="social-info">
              <span class="social-name mono">{{ social.name }}</span>
              <span class="social-handle mono">{{ social.handle }}</span>
            </div>
          </a>
        </div>
      </div>

      <div class="contact-right">
        <p class="form-label mono">Enviar mensagem</p>

        <form @submit.prevent="handleSubmit" class="contact-form" novalidate>

          <div class="form-field">
            <label class="field-label mono" for="name">Nome</label>
            <input
              id="name"
              v-model.trim="form.name"
              type="text"
              placeholder="Seu nome completo"
              autocomplete="name"
              :class="{ 'input-error': errors.name }"
              @blur="validateField('name')"
            />
            <Transition name="err">
              <span v-if="errors.name" class="error-msg mono">{{ errors.name }}</span>
            </Transition>
          </div>

          <div class="form-field">
            <label class="field-label mono" for="email">E-mail</label>
            <input
              id="email"
              v-model.trim="form.email"
              type="email"
              placeholder="seu@email.com"
              autocomplete="email"
              :class="{ 'input-error': errors.email }"
              @blur="validateField('email')"
            />
            <Transition name="err">
              <span v-if="errors.email" class="error-msg mono">{{ errors.email }}</span>
            </Transition>
          </div>

          <div class="form-field">
            <label class="field-label mono" for="message">Mensagem</label>
            <textarea
              id="message"
              v-model.trim="form.message"
              rows="5"
              placeholder="Escreva sua mensagem..."
              :class="{ 'input-error': errors.message }"
              @blur="validateField('message')"
            ></textarea>
            <Transition name="err">
              <span v-if="errors.message" class="error-msg mono">{{ errors.message }}</span>
            </Transition>
          </div>

          <button type="submit" class="submit-btn mono" :disabled="sending">
            <span v-if="sending" class="spinner"></span>
            {{ sending ? 'Enviando...' : 'Enviar mensagem →' }}
          </button>

          <Transition name="fade">
            <p
              v-if="feedback"
              class="feedback mono"
              :class="feedback.type"
            >{{ feedback.text }}</p>
          </Transition>

        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import emailjs from '@emailjs/browser'

const EJS_SERVICE  = 'service_hrz42i7'
const EJS_TEMPLATE = 'template_aioxtvg'
const EJS_KEY      = 'AuEERyPv9hpaN5Sm9'

const socials = [
  {
    name: 'GitHub',
    handle: '@arthurgvv',
    url: 'https://github.com/arthurgvv',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>`,
  },
  {
    name: 'LinkedIn',
    handle: 'in/arthur-goncalves',
    url: 'https://www.linkedin.com/in/arthur-goncalves-62b15232a/',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>`,
  },
  {
    name: 'E-mail',
    handle: 'arthurgvkj@gmail.com',
    url: 'mailto:arthurgvkj@gmail.com',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <polyline points="2,4 12,13 22,4"/>
    </svg>`,
  },
  {
    name: 'WhatsApp',
    handle: '+55 (31) 98307-1212',
    url: 'https://wa.me/5531983071212',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487z"/>
    </svg>`,
  },
]

const form = reactive({ name: '', email: '', message: '' })
const errors = reactive({ name: '', email: '', message: '' })
const sending = ref(false)
const feedback = ref(null)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateField(field) {
  if (field === 'name') {
    errors.name = form.name.length < 2 ? 'Nome deve ter ao menos 2 caracteres.' : ''
  }
  if (field === 'email') {
    errors.email = !emailRegex.test(form.email) ? 'Informe um e-mail válido.' : ''
  }
  if (field === 'message') {
    errors.message = form.message.length < 1 ? 'Escreva uma mensagem.' : ''
  }
}

function validateAll() {
  validateField('name')
  validateField('email')
  validateField('message')
  return !errors.name && !errors.email && !errors.message
}

async function handleSubmit() {
  if (!validateAll()) return

  sending.value = true
  feedback.value = null

  try {
    await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, {
      from_name: form.name,
      from_email: form.email,
      message: form.message,
    }, EJS_KEY)

    feedback.value = { type: 'success', text: '✓ Mensagem enviada! Em breve retornarei o contato.' }
    form.name = ''
    form.email = ''
    form.message = ''
    setTimeout(() => { feedback.value = null }, 7000)
  } catch {
    feedback.value = { type: 'error', text: '✗ Erro ao enviar. Tente novamente mais tarde.' }
  } finally {
    sending.value = false
  }
}
</script>

<style scoped>
.contact-page {
  min-height: calc(100vh - 64px - 62px);
  padding-bottom: 64px;
}

.page-header {
  padding: 52px 32px 40px;
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

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 64px;
  align-items: start;
}

.section-label {
  font-size: 10px;
  color: var(--text-muted);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.social-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.social-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-card);
  background: var(--surface-alt);
  text-decoration: none;
  transition: border-color 0.2s, background 0.2s, transform 0.15s;
}
.social-card:hover {
  border-color: rgba(200, 245, 74, 0.25);
  background: var(--accent-dim2);
  transform: translateY(-2px);
}

.social-icon {
  width: 42px;
  height: 42px;
  border-radius: 8px;
  background: var(--placeholder);
  border: 1px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  flex-shrink: 0;
  transition: color 0.2s;
}
.social-card:hover .social-icon {
  color: var(--accent);
}

.social-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.social-name {
  font-size: 13px;
  color: var(--text);
  font-weight: 700;
}

.social-handle {
  font-size: 10px;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Form */
.form-label {
  font-size: 10px;
  color: var(--text-secondary);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.field-label {
  font-size: 11px;
  color: var(--text-secondary);
  letter-spacing: 0.06em;
}

input,
textarea {
  background: #1c1c1c;
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 10px 14px;
  color: var(--text);
  font-family: 'Syne', sans-serif;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  resize: vertical;
}
input:focus,
textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-dim);
}
input::placeholder,
textarea::placeholder {
  color: var(--text-muted);
  font-size: 13px;
}

.input-error {
  border-color: rgba(255, 80, 80, 0.6) !important;
  box-shadow: 0 0 0 2px rgba(255, 80, 80, 0.12) !important;
}

.error-msg {
  font-size: 10px;
  color: #ff6060;
  letter-spacing: 0.04em;
}

.submit-btn {
  height: 46px;
  background: var(--accent);
  color: #000;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  opacity: 0.82;
  transition: opacity 0.2s, transform 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.submit-btn:hover:not(:disabled) {
  opacity: 1;
  transform: translateY(-1px);
}
.submit-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  flex-shrink: 0;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

.feedback {
  font-size: 12px;
  padding: 10px 14px;
  border-radius: 6px;
}
.feedback.success {
  background: rgba(0, 200, 80, 0.1);
  border: 1px solid rgba(0, 200, 80, 0.3);
  color: var(--green);
}
.feedback.error {
  background: rgba(255, 80, 80, 0.1);
  border: 1px solid rgba(255, 80, 80, 0.3);
  color: #ff6060;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.err-enter-active,
.err-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.err-enter-from {
  opacity: 0;
  transform: translateY(-4px);
}
.err-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 900px) {
  .contact-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
@media (max-width: 480px) {
  .social-grid {
    grid-template-columns: 1fr;
  }
  .page-header {
    padding: 40px 20px 28px;
  }
}
</style>
