// ===== WORK LOADER =====

class WorkLoader {
  constructor() {
    this.works = [];
    this.init();
  }

  async init() {
    console.log('WorkLoader başlatılıyor...');
    await this.loadWorks();
    this.renderWorks();
    this.updateWorkStats();
    console.log('WorkLoader tamamlandı');
  }

  // İşleri works.json dosyasından yükle
  async loadWorks() {
    try {
      console.log('İş verileri works.json dosyasından yükleniyor...');
      
      if (!workParser) {
        throw new Error('WorkParser henüz yüklenmedi');
      }

      // Works array'ini temizle
      this.works = [];
      
      this.works = await workParser.loadAllWorks();
      console.log('Toplam iş sayısı:', this.works.length);
      console.log('Yüklenen işler:', this.works);
      
    } catch (error) {
      console.error('İş verileri yüklenirken hata:', error);
      
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
          status: 'error'
        }
      ];
    }
  }

  // İşleri render et
  renderWorks() {
    console.log('İşler render ediliyor...');
    
    const worksGrid = document.getElementById('worksGrid');
    if (!worksGrid) {
      console.error('Works grid bulunamadı');
      return;
    }

    worksGrid.innerHTML = '';

    this.works.forEach(work => {
      const workElement = this.createWorkCard(work);
      worksGrid.appendChild(workElement);
    });

    console.log(`${this.works.length} iş render edildi`);
  }

  // İş kartı oluştur
  createWorkCard(work) {
    const div = document.createElement('div');
    div.className = 'work-card fade-in';
    div.setAttribute('data-work-id', work.id);
    
    // Tarih formatını düzenle
    const date = new Date(work.date);
    const formattedDate = date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Link butonu - sadece link varsa göster
    const linkButton = work.link ? 
      `<button class="work-link-btn" onclick="window.open('${work.link}', '_blank')">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15,3 21,3 21,9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
        Siteyi Gör
      </button>` : '';

    div.innerHTML = `
      <div class="work-header">
        <div class="work-icon">${work.image}</div>
        <div class="work-type ${work.type}">${this.getTypeText(work.type)}</div>
      </div>
      <div class="work-content">
        <h3 class="work-title">${work.title}</h3>
        <div class="work-meta">
          <span class="work-client">${work.client}</span>
          <span class="work-date">${formattedDate}</span>
          <span class="work-duration">${work.duration}</span>
        </div>
        <p class="work-description">${work.description}</p>
        <div class="work-technologies">
          ${work.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <div class="work-footer">
          <div class="work-status ${work.status}">${this.getStatusText(work.status)}</div>
          ${linkButton}
          <button class="work-details-btn" onclick="openWorkPopup('${work.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            Detaylar
          </button>
        </div>
      </div>
    `;

    // Fade-in animasyonunu aktif hale getir
    setTimeout(() => {
      div.classList.add('visible');
    }, 100);

    return div;
  }

  // Tip metnini getir
  getTypeText(type) {
    return workParser ? workParser.getTypeText(type) : 'Diğer';
  }

  // Durum metnini getir
  getStatusText(status) {
    return workParser ? workParser.getStatusText(status) : 'Bilinmiyor';
  }

  // İş verilerini getir
  getWorkById(id) {
    return this.works.find(work => work.id === id);
  }

  // Work sayfası istatistiklerini güncelle
  async updateWorkStats() {
    try {
      // Projeleri yükle
      const projectsResponse = await fetch('/projects.json');
      const projects = await projectsResponse.json();
      
      // Deneyim yılını hesapla (2023'ten itibaren)
      const startYear = 2023;
      const currentYear = new Date().getFullYear();
      const experienceYears = currentYear - startYear;
      
      // Proje sayısını hesapla
      const projectCount = projects.length;
      
      // İstatistik elementlerini güncelle
      const projectCountElement = document.getElementById('workProjectCount');
      const experienceYearsElement = document.getElementById('workExperienceYears');
      
      if (projectCountElement) {
        projectCountElement.textContent = `${projectCount}+`;
      }
      
      if (experienceYearsElement) {
        experienceYearsElement.textContent = `${experienceYears}+`;
      }
      
      console.log(`Work sayfası istatistikleri güncellendi: ${projectCount} proje, ${experienceYears} yıl deneyim`);
      
    } catch (error) {
      console.error('Work sayfası istatistikleri güncellenirken hata:', error);
    }
  }
}

// Global work loader instance
let workLoader;

// Sayfa yüklendiğinde işleri yükle
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM yüklendi, WorkLoader başlatılıyor...');
  
  // Kısa bir gecikme ile başlat
  setTimeout(() => {
    workLoader = new WorkLoader();
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