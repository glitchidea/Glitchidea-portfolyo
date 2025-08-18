// Loading screen
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loading').classList.add('hidden');
  }, 2000);
  
  // Blog verilerini yükle
  loadLatestBlogPost();
  
  // Work verilerini yükle
  loadWorkShowcase();
  
  // Link click event listener ekle
  const linkElement = document.getElementById('latestPostLink');
  if (linkElement) {
    linkElement.addEventListener('click', (e) => {
      console.log('Link tıklandı!');
      console.log('Link href:', linkElement.href);
      console.log('Link target:', linkElement.target);
      
      // Eğer link henüz güncellenmemişse
      if (linkElement.href === '#' || !linkElement.href) {
        e.preventDefault();
        console.log('Link henüz güncellenmemiş, varsayılan davranış engellendi');
        alert('Blog yazısı yükleniyor, lütfen biraz bekleyin...');
      }
    });
  }
});

// Side navigation
const navDots = document.querySelectorAll('.nav-dot');
const sections = document.querySelectorAll('section');

navDots.forEach((dot) => {
  dot.addEventListener('click', () => {
    const targetSection = dot.getAttribute('data-section');
    const targetElement = document.getElementById(targetSection);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Update active dot on scroll
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 100;
  
  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navDots.forEach(dot => dot.classList.remove('active'));
      navDots[index].classList.add('active');
    }
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
  observer.observe(element);
});

// Smooth scroll for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Blog verilerini JSON'dan yükle
async function loadLatestBlogPost() {
  try {
    // Blog verilerini JSON dosyasından yükle
    const response = await fetch('blog.json');
    
    if (!response.ok) {
      throw new Error('Blog verileri yüklenemedi');
    }
    
    const data = await response.json();
    const posts = data.posts;
    
    if (posts && posts.length > 0) {
      // En son yazıyı bul (isLatest: true olan veya ilk yazı)
      const latestPost = posts.find(post => post.isLatest) || posts[0];
      console.log('En son yazı:', latestPost);
      updateLatestBlogPost(latestPost);
    } else {
      console.log('Hiç yazı bulunamadı');
      showDefaultBlogPost();
    }
    
  } catch (err) {
    console.error('Blog yükleme hatası:', err);
    // Hata durumunda varsayılan değerleri göster
    showDefaultBlogPost();
  }
}

function updateLatestBlogPost(post) {
  const metaElement = document.getElementById('latestPostMeta');
  const titleElement = document.getElementById('latestPostTitle');
  const excerptElement = document.getElementById('latestPostExcerpt');
  const linkElement = document.getElementById('latestPostLink');
  
  console.log('Blog post güncelleniyor:', post);
  
  if (metaElement) metaElement.textContent = post.date;
  if (titleElement) titleElement.textContent = post.title;
  
  // Açıklamayı 150 karaktere kadar kısalt
  let excerpt = post.description;
  if (excerpt.length > 150) {
    excerpt = excerpt.substring(0, 150) + '...';
  }
  if (excerptElement) excerptElement.textContent = excerpt;
  
  // Link doğrudan blog yazısına yönlendir
  if (linkElement && post.link) {
    linkElement.href = post.link;
    linkElement.target = '_blank'; // Yeni sekmede aç
    linkElement.style.pointerEvents = 'auto'; // Link tıklanabilir olsun
    linkElement.style.cursor = 'pointer'; // Cursor pointer olsun
    console.log('Link güncellendi:', post.link);
  } else {
    console.error('Link elementi bulunamadı veya post.link yok');
    // Varsayılan durumda blog sayfasına yönlendir
    if (linkElement) {
      linkElement.href = 'blog.html';
      linkElement.style.pointerEvents = 'auto';
      linkElement.style.cursor = 'pointer';
    }
  }
}

function showDefaultBlogPost() {
  const metaElement = document.getElementById('latestPostMeta');
  const titleElement = document.getElementById('latestPostTitle');
  const excerptElement = document.getElementById('latestPostExcerpt');
  const linkElement = document.getElementById('latestPostLink');
  
  if (metaElement) metaElement.textContent = 'Yakında';
  if (titleElement) titleElement.textContent = 'Blog yazıları yakında burada olacak';
  if (excerptElement) excerptElement.textContent = 'Siber güvenlik deneyimlerimi ve öğrendiklerimi paylaşacağım blog yazıları yakında burada olacak.';
  if (linkElement) linkElement.href = 'blog.html';
}

// Work showcase verilerini JSON'dan yükle
async function loadWorkShowcase() {
  try {
    // Work verilerini JSON dosyasından yükle
    const response = await fetch('works.json');
    
    if (!response.ok) {
      throw new Error('Work verileri yüklenemedi');
    }
    
    const data = await response.json();
    const works = data.works;
    
    if (works && works.length > 0) {
      // Yıldızlı işleri göster (en fazla 3 tane)
      const starredWorks = works.filter(work => work.stars === 'yes').slice(0, 3);
      console.log('Yıldızlı işler:', starredWorks);
      updateWorkShowcase(starredWorks);
    } else {
      console.log('Hiç iş bulunamadı');
      showDefaultWorkShowcase();
    }
    
  } catch (err) {
    console.error('Work yükleme hatası:', err);
    // Hata durumunda varsayılan değerleri göster
    showDefaultWorkShowcase();
  }
}

function updateWorkShowcase(works) {
  const workShowcase = document.getElementById('workShowcase');
  
  if (!workShowcase) {
    console.error('Work showcase elementi bulunamadı');
    return;
  }
  
  workShowcase.innerHTML = '';
  
  works.forEach(work => {
    const workElement = createWorkCard(work);
    workShowcase.appendChild(workElement);
  });
  
  console.log(`${works.length} iş showcase'e eklendi`);
}

function createWorkCard(work) {
  const div = document.createElement('div');
  div.className = 'work-card fade-in';
  
  // Tarih formatını düzenle
  const date = new Date(work.date);
  const formattedDate = date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long'
  });

  div.innerHTML = `
    <div class="work-header">
      <div class="work-icon">${work.image}</div>
      <div class="work-type ${work.type}">${getWorkTypeText(work.type)}</div>
    </div>
    <div class="work-content">
      <h3 class="work-title">${work.title}</h3>
      <div class="work-meta">
        <span class="work-client">${work.client}</span>
        <span class="work-date">${formattedDate}</span>
      </div>
      <p class="work-description">${work.description}</p>
      <div class="work-technologies">
        ${work.technologies.slice(0, 3).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        ${work.technologies.length > 3 ? `<span class="tech-tag">+${work.technologies.length - 3}</span>` : ''}
      </div>
    </div>
  `;

  // Fade-in animasyonunu aktif hale getir
  setTimeout(() => {
    div.classList.add('visible');
  }, 100);

  return div;
}

function getWorkTypeText(type) {
  const typeMap = {
    'security': 'Güvenlik',
    'developer': 'Geliştirici',
    'product': 'Ürün',
    'consulting': 'Danışmanlık'
  };
  return typeMap[type] || 'Diğer';
}

function showDefaultWorkShowcase() {
  const workShowcase = document.getElementById('workShowcase');
  
  if (workShowcase) {
    workShowcase.innerHTML = `
      <div class="work-card fade-in">
        <div class="work-content">
          <h3 class="work-title">İşler Yakında Burada Olacak</h3>
          <p class="work-description">Başkalarının projelerine yaptığım katkılar ve sunduğum hizmetler yakında burada listelenecek.</p>
        </div>
      </div>
    `;
  }
}
