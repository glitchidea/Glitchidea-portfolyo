import"./footer-C-BDvUDr.js";function r(){const e=document.getElementById("matrixBg"),o="01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";for(let a=0;a<50;a++){const t=document.createElement("div");t.className="matrix-char",t.textContent=o[Math.floor(Math.random()*o.length)],t.style.left=Math.random()*100+"%",t.style.animationDuration=Math.random()*10+5+"s",t.style.animationDelay=Math.random()*5+"s",e.appendChild(t)}}const n=document.createElement("style");n.textContent=`
    @keyframes glow {
        0%, 100% { 
            box-shadow: 0 0 5px rgba(212, 175, 55, 0.3);
            text-shadow: 0 0 5px var(--gold);
        }
        50% { 
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
            text-shadow: 0 0 10px var(--gold);
        }
    }
`;document.head.appendChild(n);const s={threshold:.1,rootMargin:"0px 0px -50px 0px"},d=new IntersectionObserver(e=>{e.forEach(o=>{o.isIntersecting&&o.target.classList.add("visible")})},s);document.querySelectorAll(".fade-in").forEach(e=>{d.observe(e)});document.addEventListener("DOMContentLoaded",function(){r()});
