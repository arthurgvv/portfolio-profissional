<template>
  <footer class="footer">
    <div class="footer-inner">
      <span class="footer-copy mono">
        &copy; {{ year }}
        <span class="accent">Arthur Goncalves</span>
</span>
      <div class="footer-links">
        <a href="https://github.com/arthurgvv" target="_blank" rel="noopener" class="mono">GitHub</a>
        <a href="https://www.linkedin.com/in/arthur-goncalves-62b15232a/" target="_blank" rel="noopener" class="mono">LinkedIn</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  background: #0f0f0f;
  padding: 20px 0;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.footer-copy {
  font-size: 12px;
  color: var(--text-muted);
}

.footer-links {
  display: flex;
  gap: 24px;
}

.footer-links a {
  font-size: 11px;
  color: var(--text-secondary);
  letter-spacing: 0.08em;
  transition: color 0.2s;
}
.footer-links a:hover {
  color: var(--accent);
}

@media (max-width: 480px) {
  .footer-inner {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
}
</style>
