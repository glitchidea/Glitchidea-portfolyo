import { defineConfig } from 'vite'

export default defineConfig({
  // Mevcut dosya yapısını koru
  root: '.',
  base: './',
  
  // Build ayarları
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        projects: 'projects.html',
        services: 'services.html',
        blog: 'blog.html',
        work: 'work.html',
        contact: 'contact.html',
        footer: 'footer.html',
        scii: 'scii.html'
      }
    }
  },
  
  // Development server ayarları
  server: {
    port: 3000,
    open: true
  }
})
