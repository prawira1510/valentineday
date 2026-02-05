// Main JavaScript File for Valentine's Day Website

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Valentine's Day Website Loaded!");
    
    // Initialize all components
    initThemeToggle();
    initNavigation();
    initButtons();
    initModal();
    initSmoothScroll();
    initHeartsBackground();
    
    // Show welcome message
    setTimeout(() => {
        showNotification("Selamat datang di Website Valentine's Day! ❤️");
    }, 1000);
});

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme or prefer-color-scheme
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('valentine-theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('valentine-theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('valentine-theme', 'light');
        }
    });
}

// Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Close navbar on mobile after click
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            
            if (navbarToggler && !navbarToggler.classList.contains('collapsed')) {
                navbarToggler.click();
            }
        });
    });
}

// Button Initialization
function initButtons() {
    // Show Love Message Button
    const showLoveMessageBtn = document.getElementById('showLoveMessage');
    if (showLoveMessageBtn) {
        showLoveMessageBtn.addEventListener('click', showRandomLoveMessage);
    }
    
    // Play Romantic Music Button
    const playRomanticMusicBtn = document.getElementById('playRomanticMusic');
    if (playRomanticMusicBtn) {
        playRomanticMusicBtn.addEventListener('click', function() {
            const playBtn = document.getElementById('playBtn');
            if (playBtn) {
                playBtn.click();
                showNotification("Musik romantis diputar! ❤️🎵");
            }
        });
    }
}

// Hearts Background
function initHeartsBackground() {
    createHeartRain(30);
}

// Modal Functions
function initModal() {
    const newMessageBtn = document.getElementById('newMessageBtn');
    
    if (newMessageBtn) {
        newMessageBtn.addEventListener('click', showRandomLoveMessage);
    }
}

// Show random love message in modal
function showRandomLoveMessage() {
    const messages = [
        "Cinta sejati bukan tentang menemukan orang yang sempurna, tetapi tentang melihat orang yang tidak sempurna dengan cara yang sempurna.",
        "Kamu adalah alasan aku tersenyum setiap hari. Aku bersyukur memiliki kamu dalam hidupku.",
        "Cinta itu seperti angin, kamu tidak bisa melihatnya, tapi kamu bisa merasakannya.",
        "Di antara ribuan orang, aku akan selalu menemukan kamu. Itulah kekuatan cinta kita.",
        "Setiap hari bersamamu adalah petualangan baru. Aku tidak sabar untuk menghabiskan sisa hidupku bersamamu.",
        "Cinta kita seperti bintang, bahkan ketika tidak terlihat, aku tahu itu selalu ada di sana.",
        "Kamu melengkapi diriku dengan cara yang tidak pernah aku bayangkan. Aku mencintaimu sepenuh hati.",
        "Cinta terbesar adalah ketika kamu bisa menjadi dirimu sendiri di depan seseorang, dan mereka masih mencintaimu apa adanya.",
        "Aku tidak butuh surga karena aku sudah memilikimu. Kamu adalah surga di dunia untukku.",
        "Cinta kita bukan tentang seberapa lama kita bersama, tetapi tentang seberapa dalam kita saling mencintai.",
        "Di mataku, kamu akan selalu menjadi orang yang paling cantik/tampan di dunia.",
        "Cinta sejati tidak pernah berakhir. Itu terus tumbuh dan menjadi lebih kuat setiap hari.",
        "Kamu adalah jawaban dari semua doaku. Aku bersyukur setiap hari karena memiliki kamu.",
        "Cinta kita adalah cerita terindah yang pernah ditulis, dan kita masih menulis bab-bab baru setiap hari.",
        "Aku mencintaimu tidak hanya karena siapa kamu, tetapi karena siapa diriku ketika aku bersamamu."
    ];
    
    const randomIndex = Math.floor(Math.random() * messages.length);
    const messageElement = document.getElementById('randomLoveMessage');
    
    if (messageElement) {
        messageElement.textContent = messages[randomIndex];
        
        // Show modal using Bootstrap
        const modal = new bootstrap.Modal(document.getElementById('loveMessageModal'));
        modal.show();
    }
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} position-fixed top-0 end-0 m-3`;
    notification.style.zIndex = '3000';
    notification.style.minWidth = '300px';
    notification.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <span>${message}</span>
            <button type="button" class="btn-close" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Heart rain effect
function createHeartRain(count = 30) {
    const container = document.querySelector('.hearts-background');
    if (!container) return;
    
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        
        // Random properties
        const size = Math.random() * 20 + 10;
        const left = Math.random() * 100;
        const duration = Math.random() * 5 + 5;
        const delay = Math.random() * 5;
        
        heart.style.cssText = `
            position: absolute;
            font-size: ${size}px;
            left: ${left}%;
            top: -30px;
            opacity: ${Math.random() * 0.5 + 0.3};
            animation: floatDown ${duration}s linear ${delay}s infinite;
            z-index: -1;
            pointer-events: none;
        `;
        
        container.appendChild(heart);
    }
    
    // Add animation keyframes
    if (!document.querySelector('#heart-rain-styles')) {
        const style = document.createElement('style');
        style.id = 'heart-rain-styles';
        style.textContent = `
            @keyframes floatDown {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Utility function to format date
function formatDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('id-ID', options);
}

// Make functions globally available for other scripts
window.showNotification = showNotification;