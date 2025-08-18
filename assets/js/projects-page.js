// ===== PROJECTS PAGE LOADER =====

class ProjectsPageLoader {
  constructor() {
    this.projects = [];
    this.init();
  }

  async init() {
    console.log('ProjectsPageLoader başlatılıyor...');
    await this.loadProjects();
    this.renderProjects();
    console.log('ProjectsPageLoader tamamlandı');
  }

  // Projeleri JSON dosyasından yükle
  async loadProjects() {
    try {
      console.log('Proje verileri JSON dosyasından yükleniyor...');
      
      const response = await fetch('/projects.json');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      this.projects = await response.json();
      console.log('Projeler başarıyla yüklendi:', this.projects);
      console.log('Toplam proje sayısı:', this.projects.length);
      
    } catch (error) {
      console.error('Proje verileri yüklenirken hata:', error);
      
      // Hata durumunda varsayılan projeler göster
      this.projects = [
        {
          title: 'Proje Yüklenemedi',
          description: 'Proje verileri yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.',
          category: 'error',
          status: 'error',
          features: ['Tekrar deneyin']
        }
      ];
    }
  }

  // Projeleri render et
  renderProjects() {
    console.log('Projeler render ediliyor...');
    console.log('Tüm projeler gösteriliyor:', this.projects);
    this.renderAllProjects(this.projects);
  }

  // Tüm projeleri render et
  renderAllProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    if (!grid || projects.length === 0) {
      console.log('Projects grid bulunamadı veya proje yok');
      return;
    }

    grid.innerHTML = '';

    projects.forEach(project => {
      const projectElement = this.createProjectCardElement(project);
      grid.appendChild(projectElement);
    });

    console.log(`${projects.length} proje render edildi`);
  }

  // Proje kartı elementi oluştur
  createProjectCardElement(project) {
    const div = document.createElement('div');
    div.className = 'project-card fade-in';
    
    const featuresList = project.features ? 
      project.features.map(feature => `<li>${feature}</li>`).join('') : '';

    // Link butonu - sadece link varsa göster
    const linkButton = project.link ? 
      `<button class="project-link-btn" onclick="window.open('${project.link}', '_blank')">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15,3 21,3 21,9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
        Detayları Gör
      </button>` : '';

    div.innerHTML = `
      <div class="project-header">
        <h3 class="project-title">${project.title}</h3>
        <div class="project-category">${this.getCategoryText(project.category)}</div>
      </div>
      <div class="project-content">
        <p class="project-purpose">${project.description}</p>
        <ul class="project-features">
          ${featuresList}
        </ul>
        <div class="project-card-footer">
          <div class="project-status ${project.status}">${project.status || 'Aktif'}</div>
          ${linkButton}
        </div>
      </div>
    `;

    // Fade-in animasyonunu aktif hale getir
    setTimeout(() => {
      div.classList.add('visible');
    }, 100);

    return div;
  }

  // Kategori metnini getir
  getCategoryText(category) {
    const categories = {
      'main': 'Ana Proje',
      'secondary': 'İkincil Proje',
      'product': 'Ürün',
      'error': 'Hata'
    };
    return categories[category] || 'Proje';
  }
}

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
  observer.observe(element);
});

// Sayfa yüklendiğinde projeleri yükle
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM yüklendi, ProjectsPageLoader başlatılıyor...');
  
  // Kısa bir gecikme ile başlat
  setTimeout(() => {
    new ProjectsPageLoader();
  }, 100);
}); 