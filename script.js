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
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
    
    // Set active link based on scroll position
    window.addEventListener('scroll', setActiveNavLink);
    
    // Initial call
    setActiveNavLink();
}

function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
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
    const modal = document.getElementById('loveMessageModal');
    if (!modal) return;
    
    const closeModal = document.querySelector('.close-modal');
    const newMessageBtn = document.getElementById('newMessageBtn');
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    if (newMessageBtn) {
        newMessageBtn.addEventListener('click', showRandomLoveMessage);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
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
        document.getElementById('loveMessageModal').style.display = 'flex';
    }
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
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
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="close-notification">&times;</button>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.close-notification');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
    
    // Add CSS animations
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .close-notification {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                margin-left: 15px;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .close-notification:hover {
                opacity: 0.8;
            }
        `;
        document.head.appendChild(style);
    }
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

// Form validation helper
function validateForm(inputs) {
    let isValid = true;
    let message = '';
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#F44336';
            message = 'Harap isi semua bidang yang diperlukan.';
        } else {
            input.style.borderColor = '#4CAF50';
        }
    });
    
    return { isValid, message };
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

// Error handling for all functions
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
    showNotification('Terjadi kesalahan. Silakan refresh halaman.', 'error');
});

// Make functions globally available for other scripts
window.showNotification = showNotification;
window.validateForm = validateForm;