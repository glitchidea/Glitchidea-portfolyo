// Matrix background animation
function createMatrixBackground() {
    const matrixBg = document.getElementById('matrixBg');
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    for (let i = 0; i < 50; i++) {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = Math.random() * 100 + '%';
        char.style.animationDuration = (Math.random() * 10 + 5) + 's';
        char.style.animationDelay = Math.random() * 5 + 's';
        matrixBg.appendChild(char);
    }
}

// Copy ASCII art to clipboard
function copyAscii(button, id) {
    const asciiContent = document.getElementById(id);
    const text = asciiContent.textContent;
    
    // Create temporary textarea
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    
    // Select and copy
    textarea.select();
    
    try {
        document.execCommand('copy');
        showNotification('ASCII art copied to clipboard!', 'success');
        
        // Change button text temporarily
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        
        setTimeout(() => {
            button.innerHTML = originalText;
        }, 2000);
    } catch (err) {
        // Fallback for modern browsers
        navigator.clipboard.writeText(text).then(() => {
            showNotification('ASCII art copied to clipboard!', 'success');
            
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Copied!';
            
            setTimeout(() => {
                button.innerHTML = originalText;
            }, 2000);
        }).catch(() => {
            showNotification('Failed to copy. Please select and copy manually.', 'error');
        });
    }
    
    document.body.removeChild(textarea);
}

// Animate ASCII art
function animateAscii(button) {
    const artwork = button.closest('.ascii-artwork');
    const asciiContent = artwork.querySelector('.ascii-content');
    
    // Add animation class
    asciiContent.style.animation = 'none';
    asciiContent.offsetHeight; // Trigger reflow
    asciiContent.style.animation = 'glow 2s ease-in-out';
    
    // Change button text temporarily
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Animating...';
    
    setTimeout(() => {
        button.innerHTML = originalText;
    }, 2000);
    
    showNotification('ASCII art animated!', 'info');
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add type-specific styling
    if (type === 'success') {
        notification.style.borderColor = 'var(--terminal-green)';
        notification.style.color = 'var(--terminal-green)';
    } else if (type === 'error') {
        notification.style.borderColor = 'var(--terminal-red)';
        notification.style.color = 'var(--terminal-red)';
    } else if (type === 'info') {
        notification.style.borderColor = 'var(--gold)';
        notification.style.color = 'var(--gold)';
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add glow animation to CSS
const style = document.createElement('style');
style.textContent = `
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
`;
document.head.appendChild(style);

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

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Initialize matrix background when page loads
document.addEventListener('DOMContentLoaded', function() {
    createMatrixBackground();
}); 