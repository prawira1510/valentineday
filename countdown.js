// Countdown Timer for Valentine's Day

document.addEventListener('DOMContentLoaded', function() {
    // Set next Valentine's Day (February 14)
    const now = new Date();
    let nextValentine;
    
    // If current date is after February 14, set for next year
    if (now.getMonth() > 1 || (now.getMonth() === 1 && now.getDate() > 14)) {
        nextValentine = new Date(now.getFullYear() + 1, 1, 14); // February 14 next year
    } else {
        nextValentine = new Date(now.getFullYear(), 1, 14); // February 14 this year
    }
    
    // Update countdown every second
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = nextValentine.getTime() - now;
        
        // If countdown is over
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // Update text
            const countdownText = document.querySelector('.countdown-text');
            if (countdownText) {
                countdownText.textContent = "Selamat Hari Valentine! ❤️";
                countdownText.style.color = "#e91e63";
                countdownText.style.fontWeight = "bold";
            }
            
            // Show celebration effect
            celebrateValentine();
            return;
        }
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Add animation to changing numbers
        animateNumberChange('days', days);
        animateNumberChange('hours', hours);
        animateNumberChange('minutes', minutes);
        animateNumberChange('seconds', seconds);
    }
    
    // Initial call
    updateCountdown();
    
    // Function to animate number changes
    function animateNumberChange(elementId, newValue) {
        const element = document.getElementById(elementId);
        const oldValue = parseInt(element.textContent);
        
        if (oldValue !== newValue) {
            element.style.transform = 'scale(1.2)';
            element.style.color = '#ff4081';
            
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.style.color = '';
            }, 300);
        }
    }
    
    // Celebration effect when countdown reaches zero
    function celebrateValentine() {
        // Create heart explosion
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createFloatingHeart();
            }, i * 100);
        }
        
        // Show celebration message
        setTimeout(() => {
            showNotification("Selamat Hari Valentine! ❤️🎉", "success");
        }, 500);
        
        // Play celebration sound if available
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-happy-crowd-laugh-464.mp3');
        audio.volume = 0.3;
        audio.play().catch(e => console.log("Audio play failed:", e));
    }
    
    // Create floating heart for celebration
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 30 + 20}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0.9;
            z-index: 9999;
            pointer-events: none;
            animation: celebrateHeart 2s ease-out forwards;
        `;
        
        document.body.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => {
            if (heart.parentNode) {
                document.body.removeChild(heart);
            }
        }, 2000);
        
        // Add animation keyframes
        if (!document.querySelector('#celebrate-heart-styles')) {
            const style = document.createElement('style');
            style.id = 'celebrate-heart-styles';
            style.textContent = `
                @keyframes celebrateHeart {
                    0% {
                        transform: translateY(0) rotate(0deg) scale(0);
                        opacity: 1;
                    }
                    50% {
                        transform: translateY(-100px) rotate(180deg) scale(1);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translateY(-200px) rotate(360deg) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
});