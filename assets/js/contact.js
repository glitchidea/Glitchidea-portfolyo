document.addEventListener('DOMContentLoaded', function() {
  // Load contact data from JSON
  loadContactData();
  
  async function loadContactData() {
    try {
      // Load contact data from JSON file
      const response = await fetch('contact.json');
      
      if (!response.ok) {
        throw new Error('İletişim verileri yüklenemedi');
      }
      
      const data = await response.json();
      
      // Update page info
      updatePageInfo(data.pageInfo);
      
      // Update contact methods
      updateContactMethods(data.contact);
      
      console.log('İletişim verileri başarıyla yüklendi');
      
    } catch (err) {
      console.error('İletişim yükleme hatası:', err);
      showError();
    }
  }
  
  function updatePageInfo(pageInfo) {
    const titleElement = document.querySelector('.hero-title');
    const subtitleElement = document.querySelector('.hero-subtitle');
    
    if (titleElement && pageInfo.title) {
      titleElement.textContent = pageInfo.title;
    }
    
    if (subtitleElement && pageInfo.subtitle) {
      subtitleElement.textContent = pageInfo.subtitle;
    }
  }
  
  function updateContactMethods(contactData) {
    const contactGrid = document.querySelector('.contact-grid');
    
    if (!contactGrid) {
      console.error('Contact grid bulunamadı');
      return;
    }
    
    // Clear existing content
    contactGrid.innerHTML = '';
    
    // Get all contact methods
    const contactMethods = Object.values(contactData);
    
    // Filter active methods
    const activeMethods = contactMethods.filter(method => method.active);
    
    if (activeMethods.length === 0) {
      contactGrid.innerHTML = `
        <div class="no-contact-methods">
          <h3>Şu anda aktif iletişim yöntemi bulunmuyor</h3>
          <p>Yakında iletişim bilgileri eklenecek.</p>
        </div>
      `;
      return;
    }
    
    // Separate email from other methods
    const emailMethod = activeMethods.find(method => method.address);
    const otherMethods = activeMethods.filter(method => !method.address);
    
    // Create email card first (if exists)
    if (emailMethod) {
      const emailCard = createContactCard(emailMethod);
      contactGrid.appendChild(emailCard);
    }
    
    // Create other contact methods grid
    if (otherMethods.length > 0) {
      const otherMethodsContainer = document.createElement('div');
      otherMethodsContainer.className = 'other-contact-methods';
      
      otherMethods.forEach(method => {
        const card = createContactCard(method);
        otherMethodsContainer.appendChild(card);
      });
      
      contactGrid.appendChild(otherMethodsContainer);
    }
  }
  
  function createContactCard(method) {
    const card = document.createElement('div');
    card.className = 'contact-card';
    
    // Add special class for email card
    if (method.address) {
      card.classList.add('email-card');
    }
    
    const iconSvg = getIconSvg(method.icon);
    const linkContent = getLinkContent(method);
    
    card.innerHTML = `
      <div class="contact-icon">
        ${iconSvg}
      </div>
      <h3 class="contact-method-title">${method.title}</h3>
      <p class="contact-method-description">${method.description}</p>
      ${linkContent}
    `;
    
    return card;
  }
  
  function getIconSvg(iconName) {
    const icons = {
      'mail': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <path d="M22 6l-10 7L2 6"/>
      </svg>`,
      'globe': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>`,
      'book-open': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>`,
      'twitter': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
      </svg>`,
      
      'github': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>`
    };
    
    return icons[iconName] || icons['globe'];
  }
  
  function getLinkContent(method) {
    if (method.address) {
      // Email method
      return `<a href="mailto:${method.address}" class="contact-method-link">
        ${method.address}
      </a>`;
    } else if (method.url && method.username) {
      // Social media method
      return `<a href="${method.url}" target="_blank" class="contact-method-link">
        ${method.username}
      </a>`;
    } else if (method.url) {
      // Website method
      return `<a href="${method.url}" target="_blank" class="contact-method-link">
        Projelerim
      </a>`;
    } else {
      // Inactive method
      return `<span class="contact-method-link inactive">
        Şu anda aktif değil
      </span>`;
    }
  }
  
  function showError() {
    const contactGrid = document.querySelector('.contact-grid');
    if (contactGrid) {
      contactGrid.innerHTML = `
        <div class="error-message">
          <h3>İletişim bilgileri yüklenemedi</h3>
          <p>Lütfen daha sonra tekrar deneyin.</p>
        </div>
      `;
    }
  }
  
  console.log('İletişim sayfası sistemi başlatıldı - JSON tabanlı');
});
