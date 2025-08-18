// Premium Custom Cursor - GLITCH
// Premium Circle Cursor Implementation

document.addEventListener('DOMContentLoaded', function() {
    // Create cursor element
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.id = 'customCursor';
    document.body.appendChild(cursor);

    // Cursor styles
    const cursorStyles = `
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
    `;

    // Add styles to head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = cursorStyles;
    document.head.appendChild(styleSheet);

    // Mouse position variables
    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;

    // Mouse move event listener - ULTRA FAST
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Direct position update - NO DELAY
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    }, { passive: true });

    // Mouse down event - clicking effect
    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicking');
        
        // Start dragging detection
        setTimeout(() => {
            if (cursor.classList.contains('clicking')) {
                isDragging = true;
                cursor.classList.remove('clicking');
                cursor.classList.add('dragging');
            }
        }, 150); // 150ms sonra sürükleme olarak algıla
    });

    // Mouse up event - remove clicking/dragging effect
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicking');
        cursor.classList.remove('dragging');
        isDragging = false;
    });

    // Mouse leave window - reset states
    document.addEventListener('mouseleave', () => {
        cursor.classList.remove('clicking');
        cursor.classList.remove('dragging');
        isDragging = false;
    });

    // Hover effects for interactive elements
    const hoverElements = document.querySelectorAll('a, button, .cursor-item, .test-button, .test-link, .test-card, .back-btn, .apply-btn, .footer-link, .hero-cta, .hero-btn, .service-card, .project-card, .work-item, .blog-item, .contact-btn, .page-btn, .search-btn, .search-input, input, textarea, select, [role="button"], [tabindex]');

    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (!isDragging) {
                cursor.classList.add('hover');
            }
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });

    // Page load - show cursor
    window.addEventListener('load', () => {
        cursor.style.opacity = '1';
    });

    // Page focus - show cursor
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });

    // Page blur - hide cursor
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    // Mobile detection
    if (window.innerWidth <= 768) {
        cursor.style.display = 'none';
        document.body.style.cursor = 'auto';
    }

    // Window resize handler
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            cursor.style.display = 'none';
            document.body.style.cursor = 'auto';
        } else {
            cursor.style.display = 'block';
            document.body.style.cursor = 'none';
        }
    });

    // Prevent default cursor on all elements
    function hideDefaultCursor() {
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            element.style.cursor = 'none';
        });
    }

    // Run after a short delay to ensure all elements are loaded
    setTimeout(hideDefaultCursor, 100);

    // Global cursor functions for modal support
    window.cursorUtils = {
        // Modal için cursor'ı yeniden başlat
        reinitializeForModal: function() {
            // Modal içindeki elementleri bul ve cursor'ı bağla
            const modalElements = document.querySelectorAll('.modal-overlay button, .modal-overlay a, .modal-overlay input, .modal-overlay textarea, .modal-overlay select, .modal-overlay [role="button"], .modal-overlay [tabindex]');
            
            modalElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    if (cursor && !cursor.classList.contains('dragging')) {
                        cursor.classList.add('hover');
                    }
                });
                
                element.addEventListener('mouseleave', () => {
                    if (cursor) {
                        cursor.classList.remove('hover');
                    }
                });
            });

            // Modal'ın kendisinde cursor'ı göster
            const modal = document.querySelector('.modal-overlay');
            if (modal) {
                modal.addEventListener('mouseenter', () => {
                    if (cursor) {
                        cursor.style.opacity = '1';
                        cursor.style.zIndex = '10001';
                    }
                });
            }
        },

        // Work popup için cursor'ı yeniden başlat
        reinitializeForWorkPopup: function() {
            // Work popup içindeki elementleri bul ve cursor'ı bağla
            const popupElements = document.querySelectorAll('.work-popup button, .work-popup a, .work-popup input, .work-popup textarea, .work-popup select, .work-popup [role="button"], .work-popup [tabindex]');
            
            popupElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    if (cursor && !cursor.classList.contains('dragging')) {
                        cursor.classList.add('hover');
                    }
                });
                
                element.addEventListener('mouseleave', () => {
                    if (cursor) {
                        cursor.classList.remove('hover');
                    }
                });
            });

            // Popup'ın kendisinde cursor'ı göster
            const popup = document.querySelector('.work-popup');
            if (popup) {
                popup.addEventListener('mouseenter', () => {
                    if (cursor) {
                        cursor.style.opacity = '1';
                        cursor.style.zIndex = '10001';
                    }
                });
            }
        },

        // Cursor'ı temizle
        cleanup: function() {
            if (cursor) {
                cursor.classList.remove('hover');
                cursor.classList.remove('clicking');
                cursor.classList.remove('dragging');
            }
        },

        // Modal içinde cursor'ı görünür yap
        showInModal: function() {
            if (cursor) {
                cursor.style.opacity = '1';
                cursor.style.zIndex = '10001';
            }
        },

        // Cursor'ı gizle
        hide: function() {
            if (cursor) {
                cursor.style.opacity = '0';
            }
        },

        // Cursor'ı göster
        show: function() {
            if (cursor) {
                cursor.style.opacity = '1';
            }
        }
    };

    // Global cursor functions
    window.hideCursor = function() {
        if (cursor) {
            cursor.style.opacity = '0';
        }
    };

    window.showCursor = function() {
        if (cursor) {
            cursor.style.opacity = '1';
        }
    };
}); 