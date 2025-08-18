import"./footer-C-BDvUDr.js";import"./cursor-BCjI2BBM.js";class c{constructor(){this.services=[],this.currentCategory="all",this.init()}async init(){await this.loadAllServices(),this.setupEventListeners(),this.initAnimations()}async loadAllServices(){console.log("🔄 Starting to load all services from services.json...");try{const e="service_data/services.json";console.log(`📂 Loading file: ${e}`);const s=await fetch(e);if(console.log(`📡 Response status: ${s.status} for ${e}`),!s.ok)throw new Error(`HTTP ${s.status}`);const t=await s.json();console.log("📄 Loaded data from services.json:",t),t.services&&Array.isArray(t.services)?(this.services=t.services,console.log(`✅ Successfully loaded ${this.services.length} services from services.json`)):(console.warn("⚠️ No services array found in services.json"),this.services=[])}catch(e){console.error("❌ Failed to load services.json:",e),this.services=[]}console.log("📊 Total loaded services:",this.services.length),console.log("📋 Loaded services:",this.services),this.renderServices(),this.updateStats()}getFilteredServices(){return this.currentCategory==="all"?this.services:this.services.filter(e=>e.category===this.currentCategory)}renderServices(){const e=document.getElementById("servicesGrid");if(!e)return;const s=this.getFilteredServices();if(console.log(`🎨 Rendering ${s.length} services for category: ${this.currentCategory}`),s.length===0){e.innerHTML=`
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>Bu kategoride hizmet bulunamadı</h3>
          <p>Şu anda bu kategoride aktif hizmet bulunmuyor.</p>
        </div>
      `;return}const t=s.map(i=>this.createServiceCard(i)).join("");e.innerHTML=t}createServiceCard(e){const s=e.category==="consulting"?"Danışmanlık":"Teknik";return`
      <div class="service-card">
        <div class="service-header">
          <span class="service-icon">${e.icon||"⚙️"}</span>
          <h3 class="service-title">${e.title||"Hizmet Adı"}</h3>
        </div>
        <div class="service-description">
          ${e.description||"Hizmet açıklaması"}
        </div>
        <ul class="service-features">
          ${(e.features||[]).map(t=>`<li>${t}</li>`).join("")}
        </ul>
        <div class="service-footer">
          <div class="service-status ${e.status||"active"}">
            ${e.status==="active"?"Aktif":"Pasif"}
          </div>
          <div class="service-category">${s}</div>
        </div>
      </div>
    `}updateStats(){const e=document.getElementById("heroStats");if(!e)return;const s=[...new Set(this.services.map(r=>r.category))],t=this.services.filter(r=>r.status==="active").length,i=this.services.reduce((r,a)=>r+(a.features?a.features.length:0),0);e.innerHTML=`
      <div class="stat-item">
        <div class="stat-number">${s.length}</div>
        <div class="stat-label">Ana Kategori</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">${t}</div>
        <div class="stat-label">Aktif Hizmet</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">${i}+</div>
        <div class="stat-label">Teknik Özellik</div>
      </div>
    `}setupEventListeners(){document.querySelectorAll(".nav-btn").forEach(s=>{s.addEventListener("click",()=>{const t=s.dataset.category;this.setActiveCategory(t)})})}setActiveCategory(e){this.currentCategory=e,document.querySelectorAll(".nav-btn").forEach(s=>{s.classList.remove("active"),s.dataset.category===e&&s.classList.add("active")}),this.renderServices()}initAnimations(){const e={threshold:.1,rootMargin:"0px 0px -50px 0px"},s=new IntersectionObserver(t=>{t.forEach(i=>{i.isIntersecting&&i.target.classList.add("visible")})},e);document.querySelectorAll(".fade-in").forEach(t=>{s.observe(t)})}}document.addEventListener("DOMContentLoaded",function(){console.log("Services page loading..."),window.servicesManager=new c});
