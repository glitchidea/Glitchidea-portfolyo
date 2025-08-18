import"./footer-C-BDvUDr.js";import"./cursor-BCjI2BBM.js";document.addEventListener("DOMContentLoaded",function(){s();async function s(){try{const t=await fetch("contact.json");if(!t.ok)throw new Error("İletişim verileri yüklenemedi");const e=await t.json();l(e.pageInfo),d(e.contact),console.log("İletişim verileri başarıyla yüklendi")}catch(t){console.error("İletişim yükleme hatası:",t),g()}}function l(t){const e=document.querySelector(".hero-title"),o=document.querySelector(".hero-subtitle");e&&t.title&&(e.textContent=t.title),o&&t.subtitle&&(o.textContent=t.subtitle)}function d(t){const e=document.querySelector(".contact-grid");if(!e){console.error("Contact grid bulunamadı");return}e.innerHTML="";const i=Object.values(t).filter(n=>n.active);if(i.length===0){e.innerHTML=`
        <div class="no-contact-methods">
          <h3>Şu anda aktif iletişim yöntemi bulunmuyor</h3>
          <p>Yakında iletişim bilgileri eklenecek.</p>
        </div>
      `;return}const a=i.find(n=>n.address),c=i.filter(n=>!n.address);if(a){const n=r(a);e.appendChild(n)}if(c.length>0){const n=document.createElement("div");n.className="other-contact-methods",c.forEach(v=>{const w=r(v);n.appendChild(w)}),e.appendChild(n)}}function r(t){const e=document.createElement("div");e.className="contact-card",t.address&&e.classList.add("email-card");const o=h(t.icon),i=u(t);return e.innerHTML=`
      <div class="contact-icon">
        ${o}
      </div>
      <h3 class="contact-method-title">${t.title}</h3>
      <p class="contact-method-description">${t.description}</p>
      ${i}
    `,e}function h(t){const e={mail:`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <path d="M22 6l-10 7L2 6"/>
      </svg>`,globe:`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>`,"book-open":`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>`,twitter:`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
      </svg>`,github:`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>`};return e[t]||e.globe}function u(t){return t.address?`<a href="mailto:${t.address}" class="contact-method-link">
        ${t.address}
      </a>`:t.url&&t.username?`<a href="${t.url}" target="_blank" class="contact-method-link">
        ${t.username}
      </a>`:t.url?`<a href="${t.url}" target="_blank" class="contact-method-link">
        Projelerim
      </a>`:`<span class="contact-method-link inactive">
        Şu anda aktif değil
      </span>`}function g(){const t=document.querySelector(".contact-grid");t&&(t.innerHTML=`
        <div class="error-message">
          <h3>İletişim bilgileri yüklenemedi</h3>
          <p>Lütfen daha sonra tekrar deneyin.</p>
        </div>
      `)}console.log("İletişim sayfası sistemi başlatıldı - JSON tabanlı")});
