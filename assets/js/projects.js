// Pagination
function changePage(pageNum) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Show selected page
  document.getElementById('page' + pageNum).classList.add('active');
  
  // Update pagination buttons
  document.querySelectorAll('.page-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelectorAll('.page-btn')[pageNum].classList.add('active');
  
  // Update prev/next buttons
  const prevBtn = document.querySelector('.page-btn.prev');
  const nextBtn = document.querySelector('.page-btn.next');
  
  if (pageNum === 1) {
    prevBtn.style.opacity = '0.5';
    prevBtn.style.pointerEvents = 'none';
  } else {
    prevBtn.style.opacity = '1';
    prevBtn.style.pointerEvents = 'auto';
    prevBtn.onclick = () => changePage(pageNum - 1);
  }
  
  if (pageNum === 3) {
    nextBtn.style.opacity = '0.5';
    nextBtn.style.pointerEvents = 'none';
  } else {
    nextBtn.style.opacity = '1';
    nextBtn.style.pointerEvents = 'auto';
    nextBtn.onclick = () => changePage(pageNum + 1);
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

// ===== PROJECTS LOADER =====

class ProjectLoader {
  constructor() {
    this.projects = [];
    this.init();
  }

  async init() {
    console.log('ProjectLoader başlatılıyor...');
    
    // JSON dosyasından projeleri yükle
    await this.loadProjects();
    
    // Projeleri render et
    this.renderProjects();
    console.log('ProjectLoader tamamlandı');
  }

  // Projeleri JSON dosyasından yükle
  async loadProjects() {
    try {
      console.log('Proje verileri JSON dosyasından yükleniyor...');
      
      const response = await fetch('projects.json');
      
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
          title: 'SecureChat Pro',
          icon: '🛡️',
          category: 'main',
          showOnIndex: true,
          description: 'End-to-end şifreleme destekli güvenli mesajlaşma uygulaması',
          features: ['End-to-End Encryption', 'Real-time Message Security', 'Self-hosted Solution']
        },
        {
          title: 'PasswordVault',
          icon: '🔐',
          category: 'main',
          showOnIndex: true,
          description: 'Kuantum dirençli şifreleme kullanan şifre yöneticisi',
          features: ['Quantum-Resistant Encryption', 'Biometric Authentication', 'Offline Storage']
        }
      ];
    }
  }



    // Front matter'ı parse et


  // Ürünleri render et
  renderProjects() {
    console.log('Ürünler render ediliyor...');
    
    // Hangi sayfada olduğumuzu kontrol et
    const isIndexPage = document.getElementById('projectsShowcase') !== null;
    const isProjectsPage = document.getElementById('projectsGrid') !== null;
    
    if (isIndexPage) {
      // Index sayfasında - sadece showOnIndex: true olan ürünleri göster
      const indexProducts = this.projects.filter(p => p.showOnIndex === true);
      console.log('Index\'te gösterilecek ürünler:', indexProducts);
      
      // Ana ürünleri render et
      const mainProducts = indexProducts.filter(p => p.category === 'main');
      console.log('Ana ürünler:', mainProducts);
      this.renderMainProjects(mainProducts);

      // İkincil ürünleri render et
      const secondaryProducts = indexProducts.filter(p => p.category === 'secondary');
      console.log('İkincil ürünler:', secondaryProducts);
      this.renderSecondaryProjects(secondaryProducts);
    } else if (isProjectsPage) {
      // Projects sayfasında - tüm ürünleri göster
      console.log('Projects sayfasında tüm ürünler gösteriliyor:', this.projects);
      this.renderAllProjects(this.projects);
    }
  }

  // Ana projeleri render et
  renderMainProjects(projects) {
    const showcase = document.getElementById('projectsShowcase');
    if (!showcase || projects.length === 0) return;

    showcase.innerHTML = '';

    projects.forEach(project => {
      const projectElement = this.createMainProjectElement(project);
      showcase.appendChild(projectElement);
    });

    console.log(`${projects.length} ana proje render edildi`);
  }

  // İkincil projeleri render et
  renderSecondaryProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    if (!grid || projects.length === 0) return;

    grid.innerHTML = '';

    projects.forEach(project => {
      const projectElement = this.createSecondaryProjectElement(project);
      grid.appendChild(projectElement);
    });

    console.log(`${projects.length} ikincil proje render edildi`);
  }

  // Ana proje elementi oluştur
  createMainProjectElement(project) {
    const div = document.createElement('div');
    div.className = 'project-main fade-in';
    
    const featuresList = project.features ? 
      project.features.map(feature => `<li>${feature}</li>`).join('') : '';

    div.innerHTML = `
      <div class="project-icon">${project.icon || '⚙️'}</div>
      <h3 class="project-title">${project.title}</h3>
      <p class="project-description">${project.description}</p>
      <ul class="project-features">
        ${featuresList}
      </ul>
    `;

    // Fade-in animasyonunu aktif hale getir
    setTimeout(() => {
      div.classList.add('visible');
    }, 100);

    return div;
  }

  // İkincil proje elementi oluştur
  createSecondaryProjectElement(project) {
    const div = document.createElement('div');
    div.className = 'project-card fade-in';
    
    div.innerHTML = `
      <div class="card-icon">${project.icon || '⚙️'}</div>
      <h4 class="card-title">${project.title}</h4>
      <p class="card-description">${project.description}</p>
    `;

    // Fade-in animasyonunu aktif hale getir
    setTimeout(() => {
      div.classList.add('visible');
    }, 100);

    return div;
  }

  // Tüm projeleri render et (projects.html için)
  renderAllProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    if (!grid || projects.length === 0) return;

    grid.innerHTML = '';

    projects.forEach(project => {
      const projectElement = this.createProjectCardElement(project);
      grid.appendChild(projectElement);
    });

    console.log(`${projects.length} proje render edildi`);
  }

  // Proje kartı elementi oluştur (projects.html için)
  createProjectCardElement(project) {
    const div = document.createElement('div');
    div.className = 'project-card fade-in';
    
    const featuresList = project.features ? 
      project.features.map(feature => `<li>${feature}</li>`).join('') : '';

    div.innerHTML = `
      <div class="project-header">
        <div class="project-icon">${project.icon || '⚙️'}</div>
        <h3 class="project-title">${project.title}</h3>
        <div class="project-category">${this.getCategoryText(project.category)}</div>
      </div>
      <div class="project-content">
        <p class="project-purpose">${project.description}</p>
        <ul class="project-features">
          ${featuresList}
        </ul>
        <div class="project-status active">${project.status || 'Aktif'}</div>
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
      'product': 'Ürün'
    };
    return categories[category] || 'Proje';
  }
}

// Sayfa yüklendiğinde projeleri yükle
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM yüklendi, ProjectLoader başlatılıyor...');
  
  // Kısa bir gecikme ile başlat
  setTimeout(() => {
    new ProjectLoader();
  }, 100);
}); 