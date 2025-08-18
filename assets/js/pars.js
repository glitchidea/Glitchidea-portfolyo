// ===== PARS.JS - Markdown Parser ve Data Loader =====

class MarkdownParser {
  constructor() {
    this.markdownIt = null;
    this.initMarkdownIt();
  }

  // Markdown-it kütüphanesini yükle
  async initMarkdownIt() {
    try {
      if (typeof markdownit === 'undefined') {
        await this.loadMarkdownIt();
      }
      this.markdownIt = markdownit({
        html: true,
        linkify: true,
        typographer: true
      });
    } catch (error) {
      console.error('Markdown-it yüklenirken hata:', error);
    }
  }

  // Markdown-it CDN'den yükle
  async loadMarkdownIt() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/markdown-it@13.0.1/dist/markdown-it.min.js';
      script.onload = () => {
        console.log('Markdown-it CDN\'den yüklendi');
        resolve();
      };
      script.onerror = () => {
        console.warn('CDN yüklenemedi, alternatif kaynak deneniyor...');
        const altScript = document.createElement('script');
        altScript.src = 'https://unpkg.com/markdown-it@13.0.1/dist/markdown-it.min.js';
        altScript.onload = () => {
          console.log('Markdown-it alternatif CDN\'den yüklendi');
          resolve();
        };
        altScript.onerror = () => reject(new Error('Markdown-it yüklenemedi'));
        document.head.appendChild(altScript);
      };
      document.head.appendChild(script);
    });
  }

  // Markdown dosyasını fetch et ve parse et
  async parseMarkdownFile(filePath) {
    try {
      console.log(`Markdown dosyası yükleniyor: ${filePath}`);
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const markdownText = await response.text();
      console.log(`Markdown içeriği alındı:`, markdownText.substring(0, 200) + '...');
      return this.parseMarkdown(markdownText);
    } catch (error) {
      console.error('Markdown dosyası yüklenirken hata:', error);
      return null;
    }
  }

  // Markdown metnini parse et
  parseMarkdown(markdownText) {
    if (!this.markdownIt) {
      console.error('Markdown-it henüz yüklenmedi');
      return null;
    }

    // Front matter'ı ayır
    const frontMatterMatch = markdownText.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    let frontMatter = {};
    let content = markdownText;

    if (frontMatterMatch) {
      frontMatter = this.parseFrontMatter(frontMatterMatch[1]);
      content = frontMatterMatch[2];
    }

    // Markdown'ı HTML'e çevir
    const htmlContent = this.markdownIt.render(content);

    return {
      frontMatter,
      content: htmlContent,
      rawContent: content
    };
  }

  // Front matter'ı parse et
  parseFrontMatter(frontMatterText) {
    const frontMatter = {};
    const lines = frontMatterText.split('\n');
    
    lines.forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        
        try {
          // Array değerleri için
          if (value.startsWith('[') && value.endsWith(']')) {
            frontMatter[key] = JSON.parse(value);
          }
          // Boolean değerler için
          else if (value === 'true' || value === 'false') {
            frontMatter[key] = value === 'true';
          }
          // String değerler için
          else {
            frontMatter[key] = value;
          }
        } catch (error) {
          console.error(`Front matter parsing hatası - ${key}: ${value}`, error);
          // Hata durumunda string olarak kaydet
          frontMatter[key] = value;
        }
      }
    });

    console.log('Parsed front matter:', frontMatter);
    return frontMatter;
  }
}

// Services Data Loader
class ServicesDataLoader {
  constructor() {
    this.parser = new MarkdownParser();
    this.services = [];
  }

  // Tüm servisleri yükle
  async loadAllServices() {
    try {
      // Kategori bazlı klasör yapısından servisleri yükle
      const categories = {
        'consulting': [
          'system-architecture.md',
          'automation-design.md', 
          'data-collection.md'
        ],
        'technical': [
          'cybersecurity.md',
          'api-processing.md',
          'mini-crm.md'
        ]
      };

      this.services = [];
      
      for (const [category, files] of Object.entries(categories)) {
        for (const fileName of files) {
          const service = await this.loadService(fileName, category);
          if (service) {
            this.services.push(service);
          }
        }
      }

      console.log('Tüm servisler yüklendi:', this.services.length);
      return this.services;
    } catch (error) {
      console.error('Servisler yüklenirken hata:', error);
      return [];
    }
  }

  // Tek bir servisi yükle
  async loadService(fileName, category) {
    try {
      const filePath = `/service_data/${category}/${fileName}`;
      console.log(`Servis yükleniyor: ${filePath}`);
      
      const parsed = await this.parser.parseMarkdownFile(filePath);
      
      if (!parsed) {
        console.error(`${filePath} parse edilemedi`);
        return null;
      }

      const service = {
        fileName,
        category,
        ...parsed.frontMatter,
        content: parsed.content,
        rawContent: parsed.rawContent
      };

      console.log(`Servis yüklendi:`, service);
      return service;
    } catch (error) {
      console.error(`${category}/${fileName} yüklenirken hata:`, error);
      return null;
    }
  }

  // Servisleri kategorilere göre filtrele
  getServicesByCategory(category) {
    const filtered = this.services.filter(service => service.category === category);
    console.log(`${category} kategorisinde ${filtered.length} servis bulundu:`, filtered);
    return filtered;
  }

  // Aktif servisleri getir
  getActiveServices() {
    return this.services.filter(service => service.status === 'active');
  }
}

// Services Page Renderer
class ServicesPageRenderer {
  constructor() {
    this.dataLoader = new ServicesDataLoader();
  }

  // Sayfayı render et
  async renderServicesPage() {
    try {
      console.log('Services sayfası render ediliyor...');
      
      const services = await this.dataLoader.loadAllServices();
      
      if (services.length === 0) {
        console.warn('Hiç servis yüklenemedi');
        return;
      }

      console.log('Yüklenen servisler:', services);

      // Danışmanlık hizmetlerini render et
      const consultingServices = this.dataLoader.getServicesByCategory('consulting');
      console.log('Danışmanlık servisleri:', consultingServices);
      this.renderConsultingServices(consultingServices);

      // Teknik hizmetleri render et
      const technicalServices = this.dataLoader.getServicesByCategory('technical');
      console.log('Teknik servisler:', technicalServices);
      this.renderTechnicalServices(technicalServices);

      // Hero stats'ı güncelle
      this.updateHeroStats(services);

    } catch (error) {
      console.error('Services sayfası render edilirken hata:', error);
    }
  }

  // Danışmanlık servislerini render et
  renderConsultingServices(services) {
    const servicesGrid = document.getElementById('consultingServices');
    
    if (!servicesGrid || services.length === 0) {
      console.log('Danışmanlık servisleri bulunamadı veya grid yok');
      return;
    }

    servicesGrid.innerHTML = '';
    
    services.forEach(service => {
      const serviceCard = this.createServiceCard(service);
      servicesGrid.appendChild(serviceCard);
    });
    
    console.log(`${services.length} danışmanlık servisi render edildi`);
  }

  // Teknik hizmetleri render et
  renderTechnicalServices(services) {
    const servicesGrid = document.getElementById('technicalServices');
    
    if (!servicesGrid || services.length === 0) {
      console.log('Teknik servisler bulunamadı veya grid yok');
      return;
    }

    servicesGrid.innerHTML = '';
    
    services.forEach(service => {
      const serviceCard = this.createServiceCard(service);
      servicesGrid.appendChild(serviceCard);
    });
    
    console.log(`${services.length} teknik servis render edildi`);
  }

  // Hero stats'ı güncelle
  updateHeroStats(services) {
    const heroStats = document.getElementById('heroStats');
    if (!heroStats) return;

    // Kategori sayısını hesapla
    const categories = [...new Set(services.map(s => s.category))];
    const activeServices = services.filter(s => s.status === 'active').length;
    const totalFeatures = services.reduce((sum, s) => sum + (s.features ? s.features.length : 0), 0);

    heroStats.innerHTML = `
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

    console.log('Hero stats güncellendi');
  }

  // Servis kartı oluştur
  createServiceCard(service) {
    const card = document.createElement('div');
    card.className = 'service-card fade-in';
    
    // Service verisini data attribute olarak ekle
    card.dataset.service = JSON.stringify(service);
    
    // Güvenli değer kontrolü
    const title = service.title || 'Başlık Yok';
    const description = service.description || 'Açıklama Yok';
    const features = service.features || [];
    const status = service.status || 'unknown';
    
    card.innerHTML = `
      <h3 class="service-title">${title}</h3>
      <div class="service-description">${description}</div>
      <ul class="service-features">
        ${features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
      <div class="service-status ${status}">${status === 'active' ? 'Aktif' : 'Pasif'}</div>
    `;

    // Fade-in animasyonunu aktif hale getir
    setTimeout(() => {
      card.classList.add('visible');
    }, 100);

    return card;
  }
}

// Global instance'lar
window.markdownParser = new MarkdownParser();
window.servicesDataLoader = new ServicesDataLoader();
window.servicesPageRenderer = new ServicesPageRenderer();

// Sayfa yüklendiğinde otomatik render et
document.addEventListener('DOMContentLoaded', function() {
  // Sadece services sayfasında render et
  if (window.location.pathname.includes('services.html') || 
      document.querySelector('.services-grid')) {
    window.servicesPageRenderer.renderServicesPage();
  }
});
