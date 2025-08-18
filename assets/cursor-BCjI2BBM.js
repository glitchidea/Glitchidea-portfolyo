document.addEventListener("DOMContentLoaded",function(){const e=document.createElement("div");e.className="custom-cursor",e.id="customCursor",document.body.appendChild(e);const c=`
        .custom-cursor {
            position: fixed;
            width: 12px;
            height: 12px;
            border: 1px solid #d4af37;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.02s ease;
            mix-blend-mode: difference;
            opacity: 0;
        }
        
        .custom-cursor.hover {
            transform: translate(-50%, -50%) scale(1.8);
            background: #d4af37;
            opacity: 0.2;
        }
        
        .custom-cursor.clicking {
            transform: translate(-50%, -50%) scale(0.8);
            background: #d4af37;
            opacity: 0.4;
        }
        
        .custom-cursor.dragging {
            transform: translate(-50%, -50%) scale(1.2);
            background: #d4af37;
            opacity: 0.6;
            border-width: 2px;
            border-color: #e6c97a;
        }
        
        body {
            cursor: none !important;
        }
        
        * {
            cursor: none !important;
        }
        
        a, button, input, textarea, select, [role="button"], [tabindex] {
            cursor: none !important;
        }
        
        /* Mobile devices - show default cursor */
        @media (max-width: 768px) {
            .custom-cursor {
                display: none;
            }
            body {
                cursor: auto !important;
            }
            * {
                cursor: auto !important;
            }
        }
    `,r=document.createElement("style");r.textContent=c,document.head.appendChild(r);let a=0,i=0,n=!1;document.addEventListener("mousemove",t=>{a=t.clientX,i=t.clientY,e.style.left=a+"px",e.style.top=i+"px"},{passive:!0}),document.addEventListener("mousedown",()=>{e.classList.add("clicking"),setTimeout(()=>{e.classList.contains("clicking")&&(n=!0,e.classList.remove("clicking"),e.classList.add("dragging"))},150)}),document.addEventListener("mouseup",()=>{e.classList.remove("clicking"),e.classList.remove("dragging"),n=!1}),document.addEventListener("mouseleave",()=>{e.classList.remove("clicking"),e.classList.remove("dragging"),n=!1}),document.querySelectorAll('a, button, .cursor-item, .test-button, .test-link, .test-card, .back-btn, .apply-btn, .footer-link, .hero-cta, .hero-btn, .service-card, .project-card, .work-item, .blog-item, .contact-btn, .page-btn, .search-btn, .search-input, input, textarea, select, [role="button"], [tabindex]').forEach(t=>{t.addEventListener("mouseenter",()=>{n||e.classList.add("hover")}),t.addEventListener("mouseleave",()=>{e.classList.remove("hover")})}),window.addEventListener("load",()=>{e.style.opacity="1"}),document.addEventListener("mouseenter",()=>{e.style.opacity="1"}),document.addEventListener("mouseleave",()=>{e.style.opacity="0"}),window.innerWidth<=768&&(e.style.display="none",document.body.style.cursor="auto"),window.addEventListener("resize",()=>{window.innerWidth<=768?(e.style.display="none",document.body.style.cursor="auto"):(e.style.display="block",document.body.style.cursor="none")});function d(){document.querySelectorAll("*").forEach(o=>{o.style.cursor="none"})}setTimeout(d,100),window.cursorUtils={reinitializeForModal:function(){document.querySelectorAll('.modal-overlay button, .modal-overlay a, .modal-overlay input, .modal-overlay textarea, .modal-overlay select, .modal-overlay [role="button"], .modal-overlay [tabindex]').forEach(s=>{s.addEventListener("mouseenter",()=>{e&&!e.classList.contains("dragging")&&e.classList.add("hover")}),s.addEventListener("mouseleave",()=>{e&&e.classList.remove("hover")})});const o=document.querySelector(".modal-overlay");o&&o.addEventListener("mouseenter",()=>{e&&(e.style.opacity="1",e.style.zIndex="10001")})},reinitializeForWorkPopup:function(){document.querySelectorAll('.work-popup button, .work-popup a, .work-popup input, .work-popup textarea, .work-popup select, .work-popup [role="button"], .work-popup [tabindex]').forEach(s=>{s.addEventListener("mouseenter",()=>{e&&!e.classList.contains("dragging")&&e.classList.add("hover")}),s.addEventListener("mouseleave",()=>{e&&e.classList.remove("hover")})});const o=document.querySelector(".work-popup");o&&o.addEventListener("mouseenter",()=>{e&&(e.style.opacity="1",e.style.zIndex="10001")})},cleanup:function(){e&&(e.classList.remove("hover"),e.classList.remove("clicking"),e.classList.remove("dragging"))},showInModal:function(){e&&(e.style.opacity="1",e.style.zIndex="10001")},hide:function(){e&&(e.style.opacity="0")},show:function(){e&&(e.style.opacity="1")}},window.hideCursor=function(){e&&(e.style.opacity="0")},window.showCursor=function(){e&&(e.style.opacity="1")}});
