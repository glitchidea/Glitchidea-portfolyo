// ===== SERVICES PAGE JAVASCRIPT =====

class ServicesManager {
  constructor() {
    this.services = [];
    this.currentCategory = 'all';
    this.init();
  }

  async init() {
    await this.loadAllServices();
    this.setupEventListeners();
    this.initAnimations();
  }

  // Tüm servisleri tek dosyadan yükle
  async loadAllServices() {
    console.log('🔄 Starting to load all services from services.json...');
    
    try {
      const filePath = 'service_data/services.json';
      console.log(`📂 Loading file: ${filePath}`);
      
      const response = await fetch(filePath);
      console.log(`📡 Response status: ${response.status} for ${filePath}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`📄 Loaded data from services.json:`, data);
      
      if (data.services && Array.isArray(data.services)) {
        this.services = data.services;
        console.log(`✅ Successfully loaded ${this.services.length} services from services.json`);
      } else {
        console.warn(`⚠️ No services array found in services.json`);
        this.services = [];
      }
      
    } catch (error) {
      console.error(`❌ Failed to load services.json:`, error);
      this.services = [];
    }

    console.log('📊 Total loaded services:', this.services.length);
    console.log('📋 Loaded services:', this.services);
    
    this.renderServices();
    this.updateStats();
  }

  // Filtrelenmiş servisleri al
  getFilteredServices() {
    if (this.currentCategory === 'all') {
      return this.services;
    }
    return this.services.filter(service => service.category === this.currentCategory);
  }

  // Servisleri render et
  renderServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    if (!servicesGrid) return;

    const filteredServices = this.getFilteredServices();
    console.log(`🎨 Rendering ${filteredServices.length} services for category: ${this.currentCategory}`);

    if (filteredServices.length === 0) {
      servicesGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>Bu kategoride hizmet bulunamadı</h3>
          <p>Şu anda bu kategoride aktif hizmet bulunmuyor.</p>
        </div>
      `;
      return;
    }

    const servicesHTML = filteredServices.map(service => this.createServiceCard(service)).join('');
    servicesGrid.innerHTML = servicesHTML;
  }

  // Servis kartı oluştur
  createServiceCard(service) {
    const categoryText = service.category === 'consulting' ? 'Danışmanlık' : 'Teknik';
    
    return `
      <div class="service-card">
        <div class="service-header">
          <span class="service-icon">${service.icon || '⚙️'}</span>
          <h3 class="service-title">${service.title || 'Hizmet Adı'}</h3>
        </div>
        <div class="service-description">
          ${service.description || 'Hizmet açıklaması'}
        </div>
        <ul class="service-features">
          ${(service.features || []).map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        <div class="service-footer">
          <div class="service-status ${service.status || 'active'}">
            ${service.status === 'active' ? 'Aktif' : 'Pasif'}
          </div>
          <div class="service-category">${categoryText}</div>
        </div>
      </div>
    `;
  }

  // İstatistikleri güncelle
  updateStats() {
    const statsContainer = document.getElementById('heroStats');
    if (!statsContainer) return;

    const categories = [...new Set(this.services.map(s => s.category))];
    const activeServices = this.services.filter(s => s.status === 'active').length;
    const totalFeatures = this.services.reduce((sum, s) => sum + (s.features ? s.features.length : 0), 0);

    statsContainer.innerHTML = `
      <div class="stat-item">
        <div class="stat-number">${categories.length}</div>
        <div class="stat-label">Ana Kategori</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">${activeServices}</div>
        <div class="stat-label">Aktif Hizmet</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">${totalFeatures}+</div>
        <div class="stat-label">Teknik Özellik</div>
      </div>
    `;
  }

  // Event listener'ları ayarla
  setupEventListeners() {
    // Navigation butonları
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        this.setActiveCategory(category);
      });
    });
  }

  // Aktif kategoriyi ayarla
  setActiveCategory(category) {
    this.currentCategory = category;
    
    // Navigation butonlarını güncelle
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.category === category) {
        btn.classList.add('active');
      }
    });
    
    // Servisleri yeniden render et
    this.renderServices();
  }

  // Animasyonları başlat
  initAnimations() {
    // Intersection Observer ile fade-in animasyonları
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

    // Fade-in elementlerini gözlemle
    document.querySelectorAll('.fade-in').forEach(element => {
      observer.observe(element);
    });
  }
}

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', function() {
  console.log('Services page loading...');
  window.servicesManager = new ServicesManager();
}); 