import"./footer-C-BDvUDr.js";import"./cursor-BCjI2BBM.js";document.addEventListener("DOMContentLoaded",function(){const l=document.getElementById("loadingSection"),o=document.getElementById("blogItems"),i=document.getElementById("errorSection"),c=document.getElementById("totalPosts"),d=document.getElementById("retryBtn");g(),d&&d.addEventListener("click",g);async function g(){try{h();const e=await fetch("blog.json");if(!e.ok)throw new Error("Blog verileri yüklenemedi");const n=(await e.json()).posts;if(!n||n.length===0)throw new Error("Blog yazısı bulunamadı");const t=n.length,r=new Date().toISOString();m(n),u(t),console.log(`Blog yazıları yüklendi: ${t} yazı`),console.log(`Son güncelleme: ${new Date(r).toLocaleString("tr-TR")}`)}catch(e){console.error("Blog yükleme hatası:",e),b()}}function m(e){if(l.style.display="none",i.style.display="none",o.style.display="block",e.length===0){o.innerHTML=`
        <div class="no-posts">
          <h3>Henüz blog yazısı bulunmuyor</h3>
          <p>Blog yazıları yakında burada olacak.</p>
        </div>
      `;return}const n=new URLSearchParams(window.location.search).get("highlight")==="latest";o.innerHTML=e.map((t,r)=>{let s=t.description;s.length>200&&(s=s.substring(0,200)+"...");const y=t.isLatest||r===0,p=n&&y?"blog-item-latest":"",f=t.tags&&t.tags.length>0?`<div class="blog-tags">${t.tags.map(v=>`<span class="blog-tag">${v}</span>`).join("")}</div>`:"";return`
        <article class="blog-item ${p}">
          <div class="blog-meta">
            <div class="blog-category">${t.category}</div>
            <div class="blog-date">${t.date}</div>
            ${y?'<div class="blog-latest-badge">En Yeni</div>':""}
          </div>
          <h3 class="blog-title">${t.title}</h3>
          <p class="blog-excerpt">${s}</p>
          ${f}
          <div class="blog-footer">
            <a href="${t.link}" target="_blank" class="read-more">Devamını Oku →</a>
            <div class="blog-stats">
              <span>${t.author}</span>
            </div>
          </div>
        </article>
      `}).join(""),n&&setTimeout(()=>{const t=document.querySelector(".blog-item-latest");t&&t.scrollIntoView({behavior:"smooth",block:"center"})},500)}function u(e){c&&(c.textContent=e);const a=document.getElementById("currentYear");a&&(a.textContent=new Date().getFullYear())}function h(){l.style.display="flex",o.style.display="none",i.style.display="none";const e=l.querySelector("p");e&&(e.textContent="Blog yazıları yükleniyor...")}function b(){l.style.display="none",o.style.display="none",i.style.display="flex"}console.log("Blog yükleme sistemi başlatıldı - JSON tabanlı sistem (otomatik hesaplama)")});
