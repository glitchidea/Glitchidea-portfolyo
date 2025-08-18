document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const loading = document.getElementById('loadingSection');
  const content = document.getElementById('blogItems');
  const error = document.getElementById('errorSection');
  const stats = document.getElementById('totalPosts');
  const retry = document.getElementById('retryBtn');
  
  // Load blog posts from JSON
  loadBlogPosts();
  
  // Retry button event listener
  if (retry) {
    retry.addEventListener('click', loadBlogPosts);
  }
  
  async function loadBlogPosts() {
    try {
      showLoading();
      
      // Load blog posts from JSON file
      const response = await fetch('/blog.json');
      
      if (!response.ok) {
        throw new Error('Blog verileri yüklenemedi');
      }
      
      const data = await response.json();
      const posts = data.posts;
      
      if (!posts || posts.length === 0) {
        throw new Error('Blog yazısı bulunamadı');
      }
      
      // Otomatik hesaplamalar
      const totalPosts = posts.length;
      const lastUpdated = new Date().toISOString();
      
      showPosts(posts);
      updateStats(totalPosts);
      
      // Console'a bilgi yazdır
      console.log(`Blog yazıları yüklendi: ${totalPosts} yazı`);
      console.log(`Son güncelleme: ${new Date(lastUpdated).toLocaleString('tr-TR')}`);
      
    } catch (err) {
      console.error('Blog yükleme hatası:', err);
      showError();
    }
  }
  
  function showPosts(posts) {
    loading.style.display = 'none';
    error.style.display = 'none';
    content.style.display = 'block';
    
    if (posts.length === 0) {
      content.innerHTML = `
        <div class="no-posts">
          <h3>Henüz blog yazısı bulunmuyor</h3>
          <p>Blog yazıları yakında burada olacak.</p>
        </div>
      `;
      return;
    }
    
    // URL'den highlight parametresini kontrol et
    const urlParams = new URLSearchParams(window.location.search);
    const highlightLatest = urlParams.get('highlight') === 'latest';
    
    content.innerHTML = posts.map((post, index) => {
      // Açıklamayı 200 karaktere kadar kısalt
      let excerpt = post.description;
      if (excerpt.length > 200) {
        excerpt = excerpt.substring(0, 200) + '...';
      }
      
      // En son yazıyı vurgula
      const isLatest = post.isLatest || index === 0;
      const highlightClass = (highlightLatest && isLatest) ? 'blog-item-latest' : '';
      
      // Tags'leri göster
      const tagsHtml = post.tags && post.tags.length > 0 
        ? `<div class="blog-tags">${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}</div>`
        : '';
      
      return `
        <article class="blog-item ${highlightClass}">
          <div class="blog-meta">
            <div class="blog-category">${post.category}</div>
            <div class="blog-date">${post.date}</div>
            ${isLatest ? '<div class="blog-latest-badge">En Yeni</div>' : ''}
          </div>
          <h3 class="blog-title">${post.title}</h3>
          <p class="blog-excerpt">${excerpt}</p>
          ${tagsHtml}
          <div class="blog-footer">
            <a href="${post.link}" target="_blank" class="read-more">Devamını Oku →</a>
            <div class="blog-stats">
              <span>${post.author}</span>
            </div>
          </div>
        </article>
      `;
    }).join('');
    
    // En son yazı vurgulanmışsa, o yazıya scroll yap
    if (highlightLatest) {
      setTimeout(() => {
        const latestPost = document.querySelector('.blog-item-latest');
        if (latestPost) {
          latestPost.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    }
  }
  
  function updateStats(count) {
    if (stats) {
      stats.textContent = count;
    }
  }
  
  function showLoading() {
    loading.style.display = 'flex';
    content.style.display = 'none';
    error.style.display = 'none';
    
    // Loading mesajını güncelle
    const loadingText = loading.querySelector('p');
    if (loadingText) {
      loadingText.textContent = 'Blog yazıları yükleniyor...';
    }
  }
  
  function showError() {
    loading.style.display = 'none';
    content.style.display = 'none';
    error.style.display = 'flex';
  }
  
  console.log('Blog yükleme sistemi başlatıldı - JSON tabanlı sistem (otomatik hesaplama)');
}); 