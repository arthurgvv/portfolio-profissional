import { computed, ref } from 'vue'

const savedLanguage = typeof localStorage !== 'undefined'
  ? localStorage.getItem('portfolio-language')
  : null

const lang = ref(savedLanguage === 'en' ? 'en' : 'pt')

function setLanguage(value) {
  lang.value = value === 'en' ? 'en' : 'pt'
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('portfolio-language', lang.value)
  }
}

function toggleLanguage() {
  setLanguage(lang.value === 'pt' ? 'en' : 'pt')
}

export function useLanguage() {
  const nextLanguage = computed(() => (lang.value === 'pt' ? 'EN' : 'PT'))

  return {
    lang,
    nextLanguage,
    setLanguage,
    toggleLanguage,
  }
}
