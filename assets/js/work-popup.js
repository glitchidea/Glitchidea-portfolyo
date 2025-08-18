// ===== WORK POPUP SYSTEM =====

class WorkPopup {
  constructor() {
    this.isOpen = false;
    this.currentWork = null;
    this.init();
  }

  init() {
    this.createPopupHTML();
    this.bindEvents();
  }

  // Popup HTML'ini oluştur
  createPopupHTML() {
    const popupHTML = `
      <div id="workPopup" class="work-popup">
        <div class="work-popup-overlay"></div>
        <div class="work-popup-content">
          <button class="work-popup-close" id="workPopupClose">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div class="work-popup-header">
            <div class="work-popup-icon" id="workPopupIcon">🛡️</div>
            <div class="work-popup-meta">
              <h2 class="work-popup-title" id="workPopupTitle">İş Başlığı</h2>
              <div class="work-popup-type" id="workPopupType">Güvenlik</div>
            </div>
          </div>
          <div class="work-popup-body">
            <div class="work-popup-info">
              <div class="work-popup-client">
                <strong>Müşteri:</strong> <span id="workPopupClient">-</span>
              </div>
              <div class="work-popup-date">
                <strong>Tarih:</strong> <span id="workPopupDate">-</span>
              </div>
              <div class="work-popup-duration">
                <strong>Süre:</strong> <span id="workPopupDuration">-</span>
              </div>
            </div>
            <div class="work-popup-description">
              <h3>Proje Açıklaması</h3>
              <p id="workPopupDescription">-</p>
            </div>
            <div class="work-popup-content-full">
              <h3>Detaylı İçerik</h3>
              <p id="workPopupContent">-</p>
            </div>
            <div class="work-popup-technologies">
              <h3>Kullanılan Teknolojiler</h3>
              <div class="work-popup-tech-list" id="workPopupTechnologies">-</div>
            </div>
            <div class="work-popup-tools">
              <h3>Araçlar</h3>
              <div class="work-popup-tools-list" id="workPopupTools">-</div>
            </div>
            <div class="work-popup-results">
              <h3>Sonuçlar</h3>
              <ul class="work-popup-results-list" id="workPopupResults">-</ul>
            </div>
            <div class="work-popup-actions" id="workPopupActions">
              <!-- Link butonu buraya eklenecek -->
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', popupHTML);
  }

  // Event'leri bağla
  bindEvents() {
    const popup = document.getElementById('workPopup');
    const overlay = popup.querySelector('.work-popup-overlay');
    const closeBtn = document.getElementById('workPopupClose');

    // Overlay'e tıklayarak kapat
    overlay.addEventListener('click', () => {
      this.close();
    });

    // Close butonuna tıklayarak kapat
    closeBtn.addEventListener('click', () => {
      this.close();
    });

    // ESC tuşu ile kapat
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  // Popup'ı aç
  open(workId) {
    let work = null;
    
    // Önce workLoader'dan dene
    const wl = window.workLoader;
    if (wl && typeof wl.getWorkById === 'function') {
      work = wl.getWorkById(workId);
    }
    
    // Sonra aboutWorkLoader'dan dene
    const awl = window.aboutWorkLoader;
    if (!work && awl && typeof awl.getWorkById === 'function') {
      work = awl.getWorkById(workId);
    }
    
    if (!work) {
      console.error('İş bulunamadı:', workId);
      return;
    }

    this.currentWork = work;
    this.populatePopup(work);
    this.show();
  }

  // Popup'ı kapat
  close() {
    this.hide();
    this.currentWork = null;
  }

  // Popup'ı göster
  show() {
    const popup = document.getElementById('workPopup');
    popup.classList.add('active');
    this.isOpen = true;
    document.body.style.overflow = 'hidden'; // Scroll'u engelle
    
    // Cursor'ı gizle
    if (window.hideCursor) {
      window.hideCursor();
    } else if (window.cursorUtils && window.cursorUtils.hide) {
      window.cursorUtils.hide();
    } else {
      // Fallback: CSS ile cursor'ı gizle
      document.body.style.cursor = 'none';
    }

    // Popup içindeki elementlerde cursor'ı yeniden başlat
    setTimeout(() => {
      if (window.cursorUtils && window.cursorUtils.reinitializeForWorkPopup) {
        window.cursorUtils.reinitializeForWorkPopup();
      }
    }, 100);
  }

  // Popup'ı gizle
  hide() {
    const popup = document.getElementById('workPopup');
    popup.classList.remove('active');
    this.isOpen = false;
    document.body.style.overflow = ''; // Scroll'u geri aç
    
    // Cursor'ı geri göster
    if (window.showCursor) {
      window.showCursor();
    } else if (window.cursorUtils && window.cursorUtils.show) {
      window.cursorUtils.show();
    } else {
      // Fallback: CSS ile cursor'ı geri göster
      document.body.style.cursor = '';
    }

    // Cursor'ı temizle
    if (window.cursorUtils && window.cursorUtils.cleanup) {
      window.cursorUtils.cleanup();
    }
  }

  // Popup içeriğini doldur
  populatePopup(work) {
    // Tarih formatını düzenle
    const date = new Date(work.date);
    const formattedDate = date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Temel bilgileri doldur
    document.getElementById('workPopupIcon').textContent = work.image;
    document.getElementById('workPopupTitle').textContent = work.title;
    
    const typeElement = document.getElementById('workPopupType');
    typeElement.textContent = this.getTypeText(work.type);
    typeElement.className = `work-popup-type ${work.type}`;
    
    document.getElementById('workPopupClient').textContent = work.client;
    document.getElementById('workPopupDate').textContent = formattedDate;
    document.getElementById('workPopupDuration').textContent = work.duration;
    document.getElementById('workPopupDescription').textContent = work.description;
    document.getElementById('workPopupContent').textContent = work.content;

    // Teknolojileri doldur
    const techList = document.getElementById('workPopupTechnologies');
    techList.innerHTML = work.technologies.map(tech => 
      `<span class="tech-tag">${tech}</span>`
    ).join('');

    // Araçları doldur
    const toolsList = document.getElementById('workPopupTools');
    toolsList.innerHTML = work.tools.map(tool => 
      `<span class="tool-tag">${tool}</span>`
    ).join('');

    // Sonuçları doldur
    const resultsList = document.getElementById('workPopupResults');
    resultsList.innerHTML = work.results.map(result => 
      `<li>${result}</li>`
    ).join('');

    // Link butonunu ekle
    const actionsDiv = document.getElementById('workPopupActions');
    if (work.link) {
      actionsDiv.innerHTML = `
        <button class="work-popup-link-btn" onclick="window.open('${work.link}', '_blank')">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15,3 21,3 21,9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          Siteyi Ziyaret Et
        </button>
      `;
    } else {
      actionsDiv.innerHTML = '';
    }
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
}

// Global popup instance
let workPopup;

// Sayfa yüklendiğinde popup'ı başlat
document.addEventListener('DOMContentLoaded', function() {
  // WorkLoader yüklendikten sonra popup'ı başlat
  setTimeout(() => {
    workPopup = new WorkPopup();
  }, 500);
});

// Global fonksiyon - work.js'den çağrılacak
window.openWorkPopup = function(workId) {
  if (workPopup) {
    workPopup.open(workId);
  } else {
    console.error('WorkPopup henüz başlatılmadı');
  }
};
