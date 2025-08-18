import"./footer-C-BDvUDr.js";import"./cursor-BCjI2BBM.js";import"./work-pars-l0sNRNKZ.js";class u{constructor(){this.works=[],this.init()}async init(){console.log("WorkLoader başlatılıyor..."),await this.loadWorks(),this.renderWorks(),this.updateWorkStats(),console.log("WorkLoader tamamlandı")}async loadWorks(){try{console.log("İş verileri works.json dosyasından yükleniyor...");let e=0;const o=20;for(;!window.workParser&&e<o;)await new Promise(t=>setTimeout(t,100)),e++;if(window.workParser)this.works=await window.workParser.loadAllWorks();else{console.log("WorkParser bulunamadı, doğrudan fetch ediliyor...");const t=await fetch("works.json");if(!t.ok)throw new Error(`HTTP ${t.status}: ${t.statusText}`);const n=await t.json();this.works=n.works||[]}console.log("Toplam iş sayısı:",this.works.length),console.log("Yüklenen işler:",this.works)}catch(e){console.error("İş verileri yüklenirken hata:",e),this.works=[{id:"error",title:"Veriler Yüklenemedi",type:"error",client:"Sistem",date:"2024-01-01",duration:"1 gün",description:"İş verileri yüklenirken bir hata oluştu",content:"Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.",technologies:["Error"],tools:["System"],results:["Tekrar deneyin"],link:"",image:"⚠️",status:"error"}]}}renderWorks(){console.log("İşler render ediliyor...");const e=document.getElementById("worksGrid");if(!e){console.error("Works grid bulunamadı");return}e.innerHTML="",this.works.forEach(o=>{const t=this.createWorkCard(o);e.appendChild(t)}),console.log(`${this.works.length} iş render edildi`)}createWorkCard(e){const o=document.createElement("div");o.className="work-card fade-in",o.setAttribute("data-work-id",e.id);const n=new Date(e.date).toLocaleDateString("tr-TR",{year:"numeric",month:"long",day:"numeric"}),r=e.link?`<button class="work-link-btn" onclick="window.open('${e.link}', '_blank')">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15,3 21,3 21,9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
        Siteyi Gör
      </button>`:"";return o.innerHTML=`
      <div class="work-header">
        <div class="work-icon">${e.image}</div>
        <div class="work-type ${e.type}">${this.getTypeText(e.type)}</div>
      </div>
      <div class="work-content">
        <h3 class="work-title">${e.title}</h3>
        <div class="work-meta">
          <span class="work-client">${e.client}</span>
          <span class="work-date">${n}</span>
          <span class="work-duration">${e.duration}</span>
        </div>
        <p class="work-description">${e.description}</p>
        <div class="work-technologies">
          ${e.technologies.map(i=>`<span class="tech-tag">${i}</span>`).join("")}
        </div>
        <div class="work-footer">
          <div class="work-status ${e.status}">${this.getStatusText(e.status)}</div>
          ${r}
          <button class="work-details-btn" onclick="openWorkPopup('${e.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            Detaylar
          </button>
        </div>
      </div>
    `,setTimeout(()=>{o.classList.add("visible")},100),o}getTypeText(e){return window.workParser?window.workParser.getTypeText(e):{security:"Güvenlik",developer:"Geliştirici",consulting:"Danışmanlık",error:"Hata"}[e]||"Diğer"}getStatusText(e){return window.workParser?window.workParser.getStatusText(e):{completed:"Tamamlandı","in-progress":"Devam Ediyor",planned:"Planlandı",error:"Hata"}[e]||"Bilinmiyor"}getWorkById(e){return this.works.find(o=>o.id===e)}async updateWorkStats(){try{const o=await(await fetch("projects.json")).json(),r=new Date().getFullYear()-2023,i=o.length,p=document.getElementById("workProjectCount"),l=document.getElementById("workExperienceYears");p&&(p.textContent=`${i}+`),l&&(l.textContent=`${r}+`),console.log(`Work sayfası istatistikleri güncellendi: ${i} proje, ${r} yıl deneyim`)}catch(e){console.error("Work sayfası istatistikleri güncellenirken hata:",e)}}}let c;document.addEventListener("DOMContentLoaded",function(){console.log("DOM yüklendi, WorkLoader başlatılıyor..."),setTimeout(()=>{c=new u,window.workLoader=c},100)});const w={threshold:.1,rootMargin:"0px 0px -50px 0px"},k=new IntersectionObserver(s=>{s.forEach(e=>{e.isIntersecting&&e.target.classList.add("visible")})},w);document.querySelectorAll(".fade-in").forEach(s=>{k.observe(s)});class h{constructor(){this.isOpen=!1,this.currentWork=null,this.init()}init(){this.createPopupHTML(),this.bindEvents()}createPopupHTML(){document.body.insertAdjacentHTML("beforeend",`
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
    `)}bindEvents(){const o=document.getElementById("workPopup").querySelector(".work-popup-overlay"),t=document.getElementById("workPopupClose");o.addEventListener("click",()=>{this.close()}),t.addEventListener("click",()=>{this.close()}),document.addEventListener("keydown",n=>{n.key==="Escape"&&this.isOpen&&this.close()})}open(e){let o=null;const t=window.workLoader;t&&typeof t.getWorkById=="function"&&(o=t.getWorkById(e));const n=window.aboutWorkLoader;if(!o&&n&&typeof n.getWorkById=="function"&&(o=n.getWorkById(e)),!o){console.error("İş bulunamadı:",e);return}this.currentWork=o,this.populatePopup(o),this.show()}close(){this.hide(),this.currentWork=null}show(){document.getElementById("workPopup").classList.add("active"),this.isOpen=!0,document.body.style.overflow="hidden",window.hideCursor?window.hideCursor():window.cursorUtils&&window.cursorUtils.hide?window.cursorUtils.hide():document.body.style.cursor="none",setTimeout(()=>{window.cursorUtils&&window.cursorUtils.reinitializeForWorkPopup&&window.cursorUtils.reinitializeForWorkPopup()},100)}hide(){document.getElementById("workPopup").classList.remove("active"),this.isOpen=!1,document.body.style.overflow="",window.showCursor?window.showCursor():window.cursorUtils&&window.cursorUtils.show?window.cursorUtils.show():document.body.style.cursor="",window.cursorUtils&&window.cursorUtils.cleanup&&window.cursorUtils.cleanup()}populatePopup(e){const t=new Date(e.date).toLocaleDateString("tr-TR",{year:"numeric",month:"long",day:"numeric"});document.getElementById("workPopupIcon").textContent=e.image,document.getElementById("workPopupTitle").textContent=e.title;const n=document.getElementById("workPopupType");n.textContent=this.getTypeText(e.type),n.className=`work-popup-type ${e.type}`,document.getElementById("workPopupClient").textContent=e.client,document.getElementById("workPopupDate").textContent=t,document.getElementById("workPopupDuration").textContent=e.duration,document.getElementById("workPopupDescription").textContent=e.description,document.getElementById("workPopupContent").textContent=e.content;const r=document.getElementById("workPopupTechnologies");r.innerHTML=e.technologies.map(a=>`<span class="tech-tag">${a}</span>`).join("");const i=document.getElementById("workPopupTools");i.innerHTML=e.tools.map(a=>`<span class="tool-tag">${a}</span>`).join("");const p=document.getElementById("workPopupResults");p.innerHTML=e.results.map(a=>`<li>${a}</li>`).join("");const l=document.getElementById("workPopupActions");e.link?l.innerHTML=`
        <button class="work-popup-link-btn" onclick="window.open('${e.link}', '_blank')">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15,3 21,3 21,9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          Siteyi Ziyaret Et
        </button>
      `:l.innerHTML=""}getTypeText(e){return{security:"Güvenlik",developer:"Geliştirici",consulting:"Danışmanlık",error:"Hata"}[e]||"Diğer"}}let d;document.addEventListener("DOMContentLoaded",function(){setTimeout(()=>{d=new h},500)});window.openWorkPopup=function(s){d?d.open(s):console.error("WorkPopup henüz başlatılmadı")};
