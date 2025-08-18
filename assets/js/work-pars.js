// ===== WORK PARSING SYSTEM =====
// Tek JSON dosyasından iş yükleme ve parsing sistemi

class WorkParser {
  constructor() {
    this.works = [];
    this.stats = {};
  }

  // Tüm işleri tek JSON dosyasından yükle
  async loadAllWorks() {
    try {
      console.log('Tüm işler works.json dosyasından yükleniyor...');
      
      const response = await fetch('/works.json');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      this.works = data.works || [];
      this.stats = data.stats || {};
      
      console.log('Toplam iş sayısı:', this.works.length);
      console.log('İstatistikler:', this.stats);
      console.log('Yüklenen işler:', this.works);
      
      return this.works;
      
    } catch (error) {
      console.error('İşler yüklenirken hata:', error);
      return [];
    }
  }

  // Yıldızlı işleri yükle
  async loadStarredWorks() {
    try {
      console.log('Yıldızlı işler yükleniyor...');
      
      // Önce tüm işleri yükle
      await this.loadAllWorks();
      
      // Sonra stars tag'ini kontrol et
      const starredWorks = this.works.filter(work => work.stars === 'yes');
      
      console.log('Yıldızlı iş sayısı:', starredWorks.length);
      return starredWorks;
      
    } catch (error) {
      console.error('Yıldızlı işler yüklenirken hata:', error);
      return [];
    }
  }

  // İş verilerini getir
  getWorkById(id) {
    return this.works.find(work => work.id === id);
  }

  // Tip metnini getir
  getTypeText(type) {
    const types = {
      'security': 'Güvenlik',
      'developer': 'Geliştirici',
      'consulting': 'Danışmanlık',
      'error': 'Hata'
    };
    return types[type] || 'Diğer';
  }

  // Durum metnini getir
  getStatusText(status) {
    const statuses = {
      'completed': 'Tamamlandı',
      'in-progress': 'Devam Ediyor',
      'planned': 'Planlandı',
      'error': 'Hata'
    };
    return statuses[status] || 'Bilinmiyor';
  }
}

// Global work parser instance
let workParser;

// Sayfa yüklendiğinde parser'ı başlat
document.addEventListener('DOMContentLoaded', function() {
  console.log('WorkParser başlatılıyor...');
  workParser = new WorkParser();
});
