// ===== ABOUT WORK LOADER =====

class AboutWorkLoader {
  constructor() {
    this.works = [];
    this.init();
  }

  async init() {
    console.log('AboutWorkLoader başlatılıyor...');
    await this.loadStarredWorks();
    this.renderStarredWorks();
    this.setupOphironHeroLink();
    this.updateStats();
    console.log('AboutWorkLoader tamamlandı');
  }

  // Stars tag'i "yes" olan işleri work-pars.js'den yükle
  async loadStarredWorks() {
    try {
      console.log('Yıldızlı işler work-pars.js\'den yükleniyor...');
      
      if (!workParser) {
        throw new Error('WorkParser henüz yüklenmedi');
      }

      // Works array'ini temizle
      this.works = [];
      
      this.works = await workParser.loadStarredWorks();
      console.log('Toplam yıldızlı iş sayısı:', this.works.length);
      console.log('Yıldızlı işler:', this.works);
      
    } catch (error) {
      console.error('Yıldızlı işler yüklenirken hata:', error);
      
      // Hata durumunda varsayılan işler göster
      this.works = [
        {
          id: 'error',
          title: 'Veriler Yüklenemedi',
          type: 'error',
          client: 'Sistem',
          date: '2024-01-01',
          duration: '1 gün',
          description: 'İş verileri yüklenirken bir hata oluştu',
          content: 'Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.',
          technologies: ['Error'],
          tools: ['System'],
          results: ['Tekrar deneyin'],
          link: '',
          image: '⚠️',
          status: 'error',
          stars: 'yes'
        }
      ];
    }
  }

  // Yıldızlı işleri render et
  renderStarredWorks() {
    console.log('Yıldızlı işler render ediliyor...');
    
    const workGrid = document.getElementById('aboutWorkGrid');
    if (!workGrid) {
      console.error('About work grid bulunamadı');
      return;
    }

    workGrid.innerHTML = '';

    this.works.forEach(work => {
      const workElement = this.createAboutWorkCard(work);
      workGrid.appendChild(workElement);
    });

    console.log(`${this.works.length} yıldızlı iş render edildi`);
  }

  // About sayfası için iş kartı oluştur
  createAboutWorkCard(work) {
    const div = document.createElement('div');
    div.className = 'work-item fade-in';
    div.setAttribute('data-work-id', work.id);
    
    // Tarih formatını düzenle
    const date = new Date(work.date);
    const formattedDate = date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long'
    });

    // Ophiron için özel işlem
    if (work.id === 'ophiron-platform') {
      div.innerHTML = `
        <div class="work-icon">${work.image}</div>
        <h3 class="work-title-small">${work.title}</h3>
        <p class="work-description">
          ${work.description}
        </p>
        <div class="work-examples">
          ${work.client} - ${formattedDate}
        </div>
      `;
      
      // Ophiron kartına tıklama olayı ekle
      div.addEventListener('click', () => {
        this.openOphironModal(work);
      });
      div.style.cursor = 'pointer';
    } else {
      div.innerHTML = `
        <div class="work-icon">${work.image}</div>
        <h3 class="work-title-small">${work.title}</h3>
        <p class="work-description">
          ${work.description}
        </p>
        <div class="work-examples">
          ${work.client} - ${formattedDate}
        </div>
      `;
    }

    // Fade-in animasyonunu aktif hale getir
    setTimeout(() => {
      div.classList.add('visible');
    }, 100);

    return div;
  }

  // Ophiron modal'ını aç (work için)
  openOphironModal(work) {
    const modal = document.getElementById('ophironModal');
    const modalTitle = document.getElementById('ophironModalTitle');
    const modalDescription = document.getElementById('ophironModalDescription');
    const modalLink = document.getElementById('ophironModalLink');
    
    // Modal içeriğini güncelle
    modalTitle.textContent = work.title;
    modalDescription.textContent = work.content;
    
    // Link kontrolü
    if (work.link && work.link.trim() !== '') {
      modalLink.href = work.link;
      modalLink.style.display = 'flex';
      modalLink.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15,3 21,3 21,9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
        Projeye Git
      `;
    } else {
      modalLink.style.display = 'none';
      // Link yoksa "Şu an hazır değil" mesajı göster
      const noLinkMessage = document.createElement('div');
      noLinkMessage.className = 'modal-no-link-message';
      noLinkMessage.textContent = 'Bu proje şu an hazır değil.';
      noLinkMessage.style.cssText = 'text-align: center; color: #666; margin-top: 10px; font-style: italic;';
      
      // Eğer daha önce mesaj eklenmemişse ekle
      if (!modal.querySelector('.modal-no-link-message')) {
        modal.querySelector('.modal-actions').appendChild(noLinkMessage);
      }
    }
    
    // Modal'ı göster
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Modal açıldığında cursor'ı bağla
    if (window.cursorUtils && window.cursorUtils.showInModal) {
      window.cursorUtils.showInModal();
    }
  }

  // Ophiron proje modal'ını aç (project için)
  openOphironProjectModal(project) {
    const modal = document.getElementById('ophironModal');
    const modalTitle = document.getElementById('ophironModalTitle');
    const modalDescription = document.getElementById('ophironModalDescription');
    const modalLink = document.getElementById('ophironModalLink');
    
    // Modal içeriğini güncelle
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    
    // Link kontrolü
    if (project.link && project.link.trim() !== '') {
      modalLink.href = project.link;
      modalLink.style.display = 'flex';
      modalLink.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15,3 21,3 21,9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
        Projeye Git
      `;
    } else {
      modalLink.style.display = 'none';
      // Link yoksa "Şu an hazır değil" mesajı göster
      const noLinkMessage = document.createElement('div');
      noLinkMessage.className = 'modal-no-link-message';
      noLinkMessage.textContent = 'Bu proje şu an hazır değil.';
      noLinkMessage.style.cssText = 'text-align: center; color: #666; margin-top: 10px; font-style: italic;';
      
      // Eğer daha önce mesaj eklenmemişse ekle
      if (!modal.querySelector('.modal-no-link-message')) {
        modal.querySelector('.modal-actions').appendChild(noLinkMessage);
      }
    }
    
    // Modal'ı göster
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Modal açıldığında cursor'ı bağla
    if (window.cursorUtils && window.cursorUtils.showInModal) {
      window.cursorUtils.showInModal();
    }
  }

  // Hero section'daki Ophiron linkini ayarla
  async setupOphironHeroLink() {
    try {
      // Ophiron'u projects.json'dan yükle
      const projectsResponse = await fetch('/projects.json');
      const projects = await projectsResponse.json();
      
      const ophironProject = projects.find(project => project.title === 'Ophiron Platform');
      const heroLink = document.getElementById('ophironHeroLink');
      const heroText = document.getElementById('ophironHeroText');
      
      if (ophironProject && heroLink && heroText) {
        // Hero text'i güncelle - sadece title göster
        heroText.textContent = ophironProject.title;
        
        // Hero link'ine tıklama olayı ekle
        heroLink.addEventListener('click', () => {
          this.openOphironProjectModal(ophironProject);
        });
      }
    } catch (error) {
      console.error('Ophiron projesi yüklenirken hata:', error);
    }
  }

  // İş verilerini getir
  getWorkById(id) {
    return this.works.find(work => work.id === id);
  }

  // İstatistikleri güncelle
  async updateStats() {
    try {
      // Projeleri yükle
      const projectsResponse = await fetch('/projects.json');
      const projects = await projectsResponse.json();
      
      // Works.json'u yükle ve stats'i dinamik hesapla
      const worksResponse = await fetch('/works.json');
      const worksData = await worksResponse.json();
      
      // Works stats'ini dinamik hesapla (dosyaya yazmadan)
      const totalWorks = worksData.works.length;
      const completedWorks = worksData.works.filter(work => work.status === 'completed').length;
      const securityWorks = worksData.works.filter(work => work.type === 'security').length;
      const developerWorks = worksData.works.filter(work => work.type === 'developer').length;
      const productWorks = worksData.works.filter(work => work.type === 'product').length;
      const starredWorks = worksData.works.filter(work => work.stars === 'yes').length;
      
      // Deneyim yılını hesapla (2023'ten itibaren)
      const startYear = 2023;
      const currentYear = new Date().getFullYear();
      const experienceYears = currentYear - startYear;
      
      // Proje sayısını hesapla
      const projectCount = projects.length;
      
      // İstatistik elementlerini güncelle
      const statElements = document.querySelectorAll('.stat-item');
      
      if (statElements.length >= 4) {
        // Tamamlanan Proje sayısı
        const projectStat = statElements[0].querySelector('.stat-number');
        if (projectStat) {
          projectStat.textContent = `${projectCount}+`;
        }
        
        // Yıl Deneyim
        const experienceStat = statElements[1].querySelector('.stat-number');
        if (experienceStat) {
          experienceStat.textContent = `${experienceYears}+`;
        }
        
        // Güvenlik Odaklı (sabit kalabilir)
        const securityStat = statElements[2].querySelector('.stat-number');
        if (securityStat) {
          securityStat.textContent = '100%';
        }
        
        // Sürekli Öğrenme (sabit kalabilir)
        const learningStat = statElements[3].querySelector('.stat-number');
        if (learningStat) {
          learningStat.textContent = '∞';
        }
      }
      
      // Hikayem kısmındaki sayaçları güncelle
      const storyYearsElement = document.getElementById('storyExperienceYears');
      if (storyYearsElement) {
        storyYearsElement.textContent = `${experienceYears}`;
      }
      const storyProjectElement = document.getElementById('storyProjectCount');
      if (storyProjectElement) {
        storyProjectElement.textContent = `${projectCount}`;
      }
      
      console.log(`İstatistikler güncellendi: ${projectCount} proje, ${experienceYears} yıl deneyim`);
      console.log(`Works stats (dinamik): ${totalWorks} toplam, ${starredWorks} yıldızlı, ${securityWorks} güvenlik, ${developerWorks} geliştirici, ${productWorks} ürün`);
      
    } catch (error) {
      console.error('İstatistikler güncellenirken hata:', error);
    }
  }
}

// Global about work loader instance
let aboutWorkLoader;

// Sayfa yüklendiğinde yıldızlı işleri yükle
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM yüklendi, AboutWorkLoader başlatılıyor...');
  
  // Kısa bir gecikme ile başlat
  setTimeout(() => {
    aboutWorkLoader = new AboutWorkLoader();
  }, 100);
});



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