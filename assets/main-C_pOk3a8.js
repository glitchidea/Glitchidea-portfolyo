import"./footer-C-BDvUDr.js";import"./cursor-BCjI2BBM.js";window.addEventListener("load",()=>{setTimeout(()=>{document.getElementById("loading").classList.add("hidden")},2e3),g(),p();const t=document.getElementById("latestPostLink");t&&t.addEventListener("click",e=>{console.log("Link tıklandı!"),console.log("Link href:",t.href),console.log("Link target:",t.target),(t.href==="#"||!t.href)&&(e.preventDefault(),console.log("Link henüz güncellenmemiş, varsayılan davranış engellendi"),alert("Blog yazısı yükleniyor, lütfen biraz bekleyin..."))})});const l=document.querySelectorAll(".nav-dot"),d=document.querySelectorAll("section");l.forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-section"),n=document.getElementById(e);n&&n.scrollIntoView({behavior:"smooth"})})});window.addEventListener("scroll",()=>{const t=window.scrollY+100;d.forEach((e,n)=>{const o=e.offsetTop,s=e.offsetHeight;t>=o&&t<o+s&&(l.forEach(r=>r.classList.remove("active")),l[n].classList.add("active"))})});const m={threshold:.1,rootMargin:"0px 0px -50px 0px"},u=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting&&e.target.classList.add("visible")})},m);document.querySelectorAll(".fade-in").forEach(t=>{u.observe(t)});document.querySelectorAll('a[href^="#"]').forEach(t=>{t.addEventListener("click",function(e){e.preventDefault();const n=document.querySelector(this.getAttribute("href"));n&&n.scrollIntoView({behavior:"smooth",block:"start"})})});async function g(){try{const t=await fetch("blog.json");if(!t.ok)throw new Error("Blog verileri yüklenemedi");const n=(await t.json()).posts;if(n&&n.length>0){const o=n.find(s=>s.isLatest)||n[0];console.log("En son yazı:",o),h(o)}else console.log("Hiç yazı bulunamadı"),a()}catch(t){console.error("Blog yükleme hatası:",t),a()}}function h(t){const e=document.getElementById("latestPostMeta"),n=document.getElementById("latestPostTitle"),o=document.getElementById("latestPostExcerpt"),s=document.getElementById("latestPostLink");console.log("Blog post güncelleniyor:",t),e&&(e.textContent=t.date),n&&(n.textContent=t.title);let r=t.description;r.length>150&&(r=r.substring(0,150)+"..."),o&&(o.textContent=r),s&&t.link?(s.href=t.link,s.target="_blank",s.style.pointerEvents="auto",s.style.cursor="pointer",console.log("Link güncellendi:",t.link)):(console.error("Link elementi bulunamadı veya post.link yok"),s&&(s.href="blog.html",s.style.pointerEvents="auto",s.style.cursor="pointer"))}function a(){const t=document.getElementById("latestPostMeta"),e=document.getElementById("latestPostTitle"),n=document.getElementById("latestPostExcerpt"),o=document.getElementById("latestPostLink");t&&(t.textContent="Yakında"),e&&(e.textContent="Blog yazıları yakında burada olacak"),n&&(n.textContent="Siber güvenlik deneyimlerimi ve öğrendiklerimi paylaşacağım blog yazıları yakında burada olacak."),o&&(o.href="blog.html")}async function p(){try{const t=await fetch("works.json");if(!t.ok)throw new Error("Work verileri yüklenemedi");const n=(await t.json()).works;if(n&&n.length>0){const o=n.filter(s=>s.stars==="yes").slice(0,3);console.log("Yıldızlı işler:",o),f(o)}else console.log("Hiç iş bulunamadı"),c()}catch(t){console.error("Work yükleme hatası:",t),c()}}function f(t){const e=document.getElementById("workShowcase");if(!e){console.error("Work showcase elementi bulunamadı");return}e.innerHTML="",t.forEach(n=>{const o=y(n);e.appendChild(o)}),console.log(`${t.length} iş showcase'e eklendi`)}function y(t){const e=document.createElement("div");e.className="work-card fade-in";const o=new Date(t.date).toLocaleDateString("tr-TR",{year:"numeric",month:"long"});return e.innerHTML=`
    <div class="work-header">
      <div class="work-icon">${t.image}</div>
      <div class="work-type ${t.type}">${k(t.type)}</div>
    </div>
    <div class="work-content">
      <h3 class="work-title">${t.title}</h3>
      <div class="work-meta">
        <span class="work-client">${t.client}</span>
        <span class="work-date">${o}</span>
      </div>
      <p class="work-description">${t.description}</p>
      <div class="work-technologies">
        ${t.technologies.slice(0,3).map(s=>`<span class="tech-tag">${s}</span>`).join("")}
        ${t.technologies.length>3?`<span class="tech-tag">+${t.technologies.length-3}</span>`:""}
      </div>
    </div>
  `,setTimeout(()=>{e.classList.add("visible")},100),e}function k(t){return{security:"Güvenlik",developer:"Geliştirici",product:"Ürün",consulting:"Danışmanlık"}[t]||"Diğer"}function c(){const t=document.getElementById("workShowcase");t&&(t.innerHTML=`
      <div class="work-card fade-in">
        <div class="work-content">
          <h3 class="work-title">İşler Yakında Burada Olacak</h3>
          <p class="work-description">Başkalarının projelerine yaptığım katkılar ve sunduğum hizmetler yakında burada listelenecek.</p>
        </div>
      </div>
    `)}const v={threshold:.1,rootMargin:"0px 0px -50px 0px"},E=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting&&e.target.classList.add("visible")})},v);document.querySelectorAll(".fade-in").forEach(t=>{E.observe(t)});class j{constructor(){this.projects=[],this.init()}async init(){console.log("ProjectLoader başlatılıyor..."),await this.loadProjects(),this.renderProjects(),console.log("ProjectLoader tamamlandı")}async loadProjects(){try{console.log("Proje verileri JSON dosyasından yükleniyor...");const e=await fetch("projects.json");if(!e.ok)throw new Error(`HTTP ${e.status}: ${e.statusText}`);this.projects=await e.json(),console.log("Projeler başarıyla yüklendi:",this.projects),console.log("Toplam proje sayısı:",this.projects.length)}catch(e){console.error("Proje verileri yüklenirken hata:",e),this.projects=[{title:"SecureChat Pro",icon:"🛡️",category:"main",showOnIndex:!0,description:"End-to-end şifreleme destekli güvenli mesajlaşma uygulaması",features:["End-to-End Encryption","Real-time Message Security","Self-hosted Solution"]},{title:"PasswordVault",icon:"🔐",category:"main",showOnIndex:!0,description:"Kuantum dirençli şifreleme kullanan şifre yöneticisi",features:["Quantum-Resistant Encryption","Biometric Authentication","Offline Storage"]}]}}renderProjects(){console.log("Ürünler render ediliyor...");const e=document.getElementById("projectsShowcase")!==null,n=document.getElementById("projectsGrid")!==null;if(e){const o=this.projects.filter(i=>i.showOnIndex===!0);console.log("Index'te gösterilecek ürünler:",o);const s=o.filter(i=>i.category==="main");console.log("Ana ürünler:",s),this.renderMainProjects(s);const r=o.filter(i=>i.category==="secondary");console.log("İkincil ürünler:",r),this.renderSecondaryProjects(r)}else n&&(console.log("Projects sayfasında tüm ürünler gösteriliyor:",this.projects),this.renderAllProjects(this.projects))}renderMainProjects(e){const n=document.getElementById("projectsShowcase");!n||e.length===0||(n.innerHTML="",e.forEach(o=>{const s=this.createMainProjectElement(o);n.appendChild(s)}),console.log(`${e.length} ana proje render edildi`))}renderSecondaryProjects(e){const n=document.getElementById("projectsGrid");!n||e.length===0||(n.innerHTML="",e.forEach(o=>{const s=this.createSecondaryProjectElement(o);n.appendChild(s)}),console.log(`${e.length} ikincil proje render edildi`))}createMainProjectElement(e){const n=document.createElement("div");n.className="project-main fade-in";const o=e.features?e.features.map(s=>`<li>${s}</li>`).join(""):"";return n.innerHTML=`
      <div class="project-icon">${e.icon||"⚙️"}</div>
      <h3 class="project-title">${e.title}</h3>
      <p class="project-description">${e.description}</p>
      <ul class="project-features">
        ${o}
      </ul>
    `,setTimeout(()=>{n.classList.add("visible")},100),n}createSecondaryProjectElement(e){const n=document.createElement("div");return n.className="project-card fade-in",n.innerHTML=`
      <div class="card-icon">${e.icon||"⚙️"}</div>
      <h4 class="card-title">${e.title}</h4>
      <p class="card-description">${e.description}</p>
    `,setTimeout(()=>{n.classList.add("visible")},100),n}renderAllProjects(e){const n=document.getElementById("projectsGrid");!n||e.length===0||(n.innerHTML="",e.forEach(o=>{const s=this.createProjectCardElement(o);n.appendChild(s)}),console.log(`${e.length} proje render edildi`))}createProjectCardElement(e){const n=document.createElement("div");n.className="project-card fade-in";const o=e.features?e.features.map(s=>`<li>${s}</li>`).join(""):"";return n.innerHTML=`
      <div class="project-header">
        <div class="project-icon">${e.icon||"⚙️"}</div>
        <h3 class="project-title">${e.title}</h3>
        <div class="project-category">${this.getCategoryText(e.category)}</div>
      </div>
      <div class="project-content">
        <p class="project-purpose">${e.description}</p>
        <ul class="project-features">
          ${o}
        </ul>
        <div class="project-status active">${e.status||"Aktif"}</div>
      </div>
    `,setTimeout(()=>{n.classList.add("visible")},100),n}getCategoryText(e){return{main:"Ana Proje",secondary:"İkincil Proje",product:"Ürün"}[e]||"Proje"}}document.addEventListener("DOMContentLoaded",function(){console.log("DOM yüklendi, ProjectLoader başlatılıyor..."),setTimeout(()=>{new j},100)});
