// Footer loader
import '../css/footer.css';
document.addEventListener('DOMContentLoaded', function() {
  console.log('Footer loader başlatıldı');
  
  // Footer HTML'ini yükle
  fetch('footer.html')
    .then(response => {
      console.log('Footer HTML fetch edildi, status:', response.status);
      return response.text();
    })
    .then(data => {
      console.log('Footer HTML içeriği alındı, uzunluk:', data.length);
      document.body.insertAdjacentHTML('beforeend', data);
      console.log('Footer HTML sayfaya eklendi');
      
      // JSON'dan footer email bilgisini yükle
      loadFooterEmailFromJson();
      
      // Fade-in animasyonunu aktif hale getir
      setTimeout(() => {
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
          element.classList.add('visible');
        });
        console.log('Fade-in animasyonu aktif hale getirildi');
      }, 100);
    })
    .catch(error => {
      console.error('Footer yüklenirken hata oluştu:', error);
    });
  
  async function loadFooterEmailFromJson() {
    try {
      const response = await fetch('contact.json');
      if (!response.ok) {
        throw new Error('Footer iletişim verileri yüklenemedi');
      }
      const data = await response.json();
      const email = data?.contact?.email?.address;
      const active = data?.contact?.email?.active;
      
      const emailLink = document.getElementById('footerEmailLink');
      const emailText = document.getElementById('footerEmailText');
      
      if (emailLink && emailText) {
        if (active && email && email.trim() !== '') {
          emailLink.href = `mailto:${email}`;
          emailText.textContent = email;
        } else {
          // Email pasif veya boşsa, linki gizle (ikinci 'İletişim' görünmesin)
          emailLink.style.display = 'none';
        }
      }
      console.log('Footer email bilgisi JSON üzerinden güncellendi');
    } catch (err) {
      console.error('Footer email bilgisi yüklenirken hata:', err);
    }
  }
}); 