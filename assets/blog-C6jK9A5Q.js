import"./footer-C-BDvUDr.js";import"./cursor-BCjI2BBM.js";document.addEventListener("DOMContentLoaded",function(){const n=document.getElementById("loadingSection"),l=document.getElementById("blogItems"),a=document.getElementById("errorSection"),r=document.getElementById("totalPosts"),c=document.getElementById("retryBtn");d(),c&&c.addEventListener("click",d);async function d(){try{h();const e=await fetch("blog.json");if(!e.ok)throw new Error("Blog verileri yüklenemedi");const o=(await e.json()).posts;if(!o||o.length===0)throw new Error("Blog yazısı bulunamadı");const t=o.length,i=new Date().toISOString();y(o),m(t),console.log(`Blog yazıları yüklendi: ${t} yazı`),console.log(`Son güncelleme: ${new Date(i).toLocaleString("tr-TR")}`)}catch(e){console.error("Blog yükleme hatası:",e),u()}}function y(e){if(n.style.display="none",a.style.display="none",l.style.display="block",e.length===0){l.innerHTML=`
        <div class="no-posts">
          <h3>Henüz blog yazısı bulunmuyor</h3>
          <p>Blog yazıları yakında burada olacak.</p>
        </div>
      `;return}const o=new URLSearchParams(window.location.search).get("highlight")==="latest";l.innerHTML=e.map((t,i)=>{let s=t.description;s.length>200&&(s=s.substring(0,200)+"...");const g=t.isLatest||i===0,p=o&&g?"blog-item-latest":"",v=t.tags&&t.tags.length>0?`<div class="blog-tags">${t.tags.map(f=>`<span class="blog-tag">${f}</span>`).join("")}</div>`:"";return`
        <article class="blog-item ${p}">
          <div class="blog-meta">
            <div class="blog-category">${t.category}</div>
            <div class="blog-date">${t.date}</div>
            ${g?'<div class="blog-latest-badge">En Yeni</div>':""}
          </div>
          <h3 class="blog-title">${t.title}</h3>
          <p class="blog-excerpt">${s}</p>
          ${v}
          <div class="blog-footer">
            <a href="${t.link}" target="_blank" class="read-more">Devamını Oku →</a>
            <div class="blog-stats">
              <span>${t.author}</span>
            </div>
          </div>
        </article>
      `}).join(""),o&&setTimeout(()=>{const t=document.querySelector(".blog-item-latest");t&&t.scrollIntoView({behavior:"smooth",block:"center"})},500)}function m(e){r&&(r.textContent=e)}function h(){n.style.display="flex",l.style.display="none",a.style.display="none";const e=n.querySelector("p");e&&(e.textContent="Blog yazıları yükleniyor...")}function u(){n.style.display="none",l.style.display="none",a.style.display="flex"}console.log("Blog yükleme sistemi başlatıldı - JSON tabanlı sistem (otomatik hesaplama)")});
