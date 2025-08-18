import"./footer-C-BDvUDr.js";import"./cursor-BCjI2BBM.js";class i{constructor(){this.projects=[],this.init()}async init(){console.log("ProjectsPageLoader başlatılıyor..."),await this.loadProjects(),this.renderProjects(),console.log("ProjectsPageLoader tamamlandı")}async loadProjects(){try{console.log("Proje verileri JSON dosyasından yükleniyor...");const e=await fetch("projects.json");if(!e.ok)throw new Error("Projeler yüklenemedi");this.projects=await e.json(),console.log("Projeler başarıyla yüklendi:",this.projects),console.log("Toplam proje sayısı:",this.projects.length)}catch(e){console.error("Proje verileri yüklenirken hata:",e),this.projects=[{title:"Proje Yüklenemedi",description:"Proje verileri yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.",category:"error",status:"error",features:["Tekrar deneyin"]}]}}renderProjects(){console.log("Projeler render ediliyor..."),console.log("Tüm projeler gösteriliyor:",this.projects),this.renderAllProjects(this.projects)}renderAllProjects(e){const r=document.getElementById("projectsGrid");if(!r||e.length===0){console.log("Projects grid bulunamadı veya proje yok");return}r.innerHTML="",e.forEach(t=>{const s=this.createProjectCardElement(t);r.appendChild(s)}),console.log(`${e.length} proje render edildi`)}createProjectCardElement(e){const r=document.createElement("div");r.className="project-card fade-in";const t=e.features?e.features.map(n=>`<li>${n}</li>`).join(""):"",s=e.link?`<button class="project-link-btn" onclick="window.open('${e.link}', '_blank')">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15,3 21,3 21,9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
        Detayları Gör
      </button>`:"";return r.innerHTML=`
      <div class="project-header">
        <h3 class="project-title">${e.title}</h3>
        <div class="project-category">${this.getCategoryText(e.category)}</div>
      </div>
      <div class="project-content">
        <p class="project-purpose">${e.description}</p>
        <ul class="project-features">
          ${t}
        </ul>
        <div class="project-card-footer">
          <div class="project-status ${e.status}">${e.status||"Aktif"}</div>
          ${s}
        </div>
      </div>
    `,setTimeout(()=>{r.classList.add("visible")},100),r}getCategoryText(e){return{main:"Ana Proje",secondary:"İkincil Proje",product:"Ürün",error:"Hata"}[e]||"Proje"}}const a={threshold:.1,rootMargin:"0px 0px -50px 0px"},l=new IntersectionObserver(o=>{o.forEach(e=>{e.isIntersecting&&e.target.classList.add("visible")})},a);document.querySelectorAll(".fade-in").forEach(o=>{l.observe(o)});document.addEventListener("DOMContentLoaded",function(){console.log("DOM yüklendi, ProjectsPageLoader başlatılıyor..."),setTimeout(()=>{new i},100)});
