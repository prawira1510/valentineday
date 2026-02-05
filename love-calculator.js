// Love Calculator for Valentine's Day website

document.addEventListener('DOMContentLoaded', function() {
    initLoveCalculator();
});

function initLoveCalculator() {
    const calculateBtn = document.getElementById('calculateLove');
    
    if (!calculateBtn) return;
    
    calculateBtn.addEventListener('click', calculateLoveCompatibility);
    
    // Also calculate when Enter key is pressed in input fields
    const nameInputs = document.querySelectorAll('#name1, #name2');
    nameInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateLoveCompatibility();
            }
        });
        
        // Add input validation
        input.addEventListener('input', function() {
            validateNameInput(this);
        });
    });
    
    // Add tooltips
    addTooltips();
}

function validateNameInput(input) {
    const value = input.value.trim();
    if (value.length < 2) {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    }
}

function addTooltips() {
    // Add tooltip to calculate button
    const calculateBtn = document.getElementById('calculateLove');
    if (calculateBtn) {
        calculateBtn.title = "Klik untuk menghitung kecocokan cinta Anda!";
    }
    
    // Add tooltip to input fields
    const name1 = document.getElementById('name1');
    const name2 = document.getElementById('name2');
    
    if (name1) name1.title = "Masukkan nama lengkap Anda";
    if (name2) name2.title = "Masukkan nama lengkap pasangan Anda";
}

function calculateLoveCompatibility() {
    const name1 = document.getElementById('name1').value.trim();
    const name2 = document.getElementById('name2').value.trim();
    
    // Validation
    if (!name1 || !name2) {
        showResult(0, "Harap masukkan kedua nama!", "Masukkan nama Anda dan nama pasangan untuk menghitung kecocokan cinta.");
        showNotification('Harap isi kedua nama terlebih dahulu!', 'error');
        return;
    }
    
    if (name1.length < 2 || name2.length < 2) {
        showResult(0, "Nama terlalu pendek!", "Masukkan nama yang valid untuk perhitungan akurat.");
        showNotification('Nama harus minimal 2 karakter!', 'error');
        return;
    }
    
    if (name1.toLowerCase() === name2.toLowerCase()) {
        showResult(100, "Cinta Diri Sendiri! 💝", "Kamu mencintai dirimu sendiri - itu hal yang baik! Tapi cobalah mencintai orang lain juga. Cinta diri adalah langkah pertama untuk mencintai orang lain.");
        showNotification('Cinta diri adalah yang terpenting! 💖', 'success');
        return;
    }
    
    // Show loading state
    showLoadingState();
    
    // Calculate love percentage with animation delay
    setTimeout(() => {
        let percentage = calculateLovePercentage(name1, name2);
        
        // Get message based on percentage
        const { message, description } = getLoveMessage(percentage);
        
        // Show result with animation
        showResult(percentage, message, description);
        
        // Show notification
        if (typeof showNotification === 'function') {
            showNotification(`Kecocokan ${name1} dan ${name2}: ${percentage}% ❤️`, 'success');
        }
        
        // Create celebration effect
        if (percentage > 80) {
            createCelebrationEffect();
        }
    }, 1500);
}

function calculateLovePercentage(name1, name2) {
    // Combine names and convert to lowercase
    const combined = (name1 + name2).toLowerCase().replace(/\s/g, '');
    
    let score = 0;
    
    // Calculate based on letters in love-related words
    const loveLetters = ['l', 'o', 'v', 'e', 'c', 'i', 'n', 't', 'a', 'h', 'p', 'y', 'r', 's'];
    
    for (let letter of combined) {
        if (loveLetters.includes(letter)) {
            score += 12; // Bonus for love letters
        } else {
            score += 5;
        }
    }
    
    // Calculate vowel and consonant ratio
    const vowels = combined.match(/[aeiou]/gi);
    const consonants = combined.match(/[bcdfghjklmnpqrstvwxyz]/gi);
    
    if (vowels) score += vowels.length * 3;
    if (consonants) score += consonants.length * 2;
    
    // Add some deterministic "randomness" based on names
    let seed = 0;
    for (let i = 0; i < combined.length; i++) {
        seed += combined.charCodeAt(i);
    }
    
    // Use seed for deterministic "randomness"
    const pseudoRandom = (seed * 9301 + 49297) % 233280;
    const randomPercent = (pseudoRandom / 233280) * 25;
    
    // Base percentage (50-75%) plus random
    let percentage = 50 + (score % 25) + randomPercent;
    
    // Bonus for name length compatibility
    const lengthDiff = Math.abs(name1.length - name2.length);
    const lengthBonus = Math.max(0, 15 - lengthDiff);
    percentage += lengthBonus;
    
    // Bonus for same first letter
    if (name1.charAt(0).toLowerCase() === name2.charAt(0).toLowerCase()) {
        percentage += 5;
    }
    
    // Ensure it's between 0 and 100
    percentage = Math.min(100, Math.max(0, Math.round(percentage)));
    
    // Make it more likely to be high (for positive vibes!)
    if (percentage < 40) {
        percentage += 15;
    }
    
    return Math.min(100, percentage);
}

function getLoveMessage(percentage) {
    let message = '';
    let description = '';
    let emoji = '';
    
    if (percentage >= 95) {
        message = "JODOH SEJATI! 💖";
        description = "Kalian adalah pasangan yang ditakdirkan! Cinta kalian sempurna dan akan bertahan selamanya. Pertahankan hubungan yang indah ini!";
        emoji = "💖✨";
    } else if (percentage >= 90) {
        message = "CINTA ABADI! 💕";
        description = "Kalian memiliki hubungan yang sangat harmonis dan saling melengkapi. Cinta kalian akan terus tumbuh semakin kuat!";
        emoji = "💕🌟";
    } else if (percentage >= 80) {
        message = "PASANGAN IDEAL! 😍";
        description = "Chemistry antara kalian sangat kuat! Hubungan kalian penuh dengan gairah, kebahagiaan, dan saling pengertian.";
        emoji = "😍❤️";
    } else if (percentage >= 70) {
        message = "SANGAT COCOK! 💗";
        description = "Kalian memiliki potensi untuk hubungan yang luar biasa. Teruslah saling mendukung dan komunikasi dengan baik!";
        emoji = "💗✨";
    } else if (percentage >= 60) {
        message = "COCOK BANGET! 💝";
        description = "Ada ketertarikan yang kuat di antara kalian. Dengan usaha dan pengertian, hubungan bisa menjadi sangat indah!";
        emoji = "💝💫";
    } else if (percentage >= 50) {
        message = "CUKUP COCOK 💞";
        description = "Kalian memiliki dasar yang baik untuk sebuah hubungan. Butuh lebih banyak waktu untuk saling mengenal dan memahami.";
        emoji = "💞";
    } else if (percentage >= 40) {
        message = "BUTUH USAHA 💓";
        description = "Ada potensi di antara kalian, tetapi butuh komitmen dan komunikasi yang baik untuk membangun hubungan.";
        emoji = "💓";
    } else if (percentage >= 30) {
        message = "TANTANGAN 💔";
        description = "Kalian memiliki banyak perbedaan. Butuh pengertian dan kesabaran ekstra untuk menjalin hubungan.";
        emoji = "💔";
    } else {
        message = "TEMAN SAJA 💔";
        description = "Mungkin kalian lebih cocok sebagai teman. Tapi ingat, cinta bisa tumbuh dari persahabatan yang tulus!";
        emoji = "💔🤝";
    }
    
    return { message: message + " " + emoji, description };
}

function showLoadingState() {
    const percentageElement = document.getElementById('lovePercentage');
    const messageElement = document.getElementById('loveMessage');
    const descriptionElement = document.getElementById('loveDescription');
    
    if (!percentageElement || !messageElement || !descriptionElement) return;
    
    // Show loading animation
    percentageElement.innerHTML = '<div class="loading-dots"><span></span><span></span><span></span></div>';
    percentageElement.style.fontSize = '2rem';
    
    messageElement.textContent = "Menghitung cinta...";
    messageElement.style.color = "var(--primary-color)";
    
    descriptionElement.textContent = "Sedang menganalisis kecocokan antara kalian...";
    
    // Add pulse animation to button
    const calculateBtn = document.getElementById('calculateLove');
    calculateBtn.classList.add('success-animation');
    calculateBtn.innerHTML = '<i class="fas fa-heartbeat"></i> Menghitung...';
    calculateBtn.disabled = true;
}

function showResult(percentage, message, description) {
    const percentageElement = document.getElementById('lovePercentage');
    const messageElement = document.getElementById('loveMessage');
    const descriptionElement = document.getElementById('loveDescription');
    const resultContainer = document.querySelector('.result-container');
    const calculateBtn = document.getElementById('calculateLove');
    
    if (!percentageElement || !messageElement || !descriptionElement) return;
    
    // Reset button state
    if (calculateBtn) {
        calculateBtn.classList.remove('success-animation');
        calculateBtn.innerHTML = '<i class="fas fa-heartbeat"></i> Hitung Ulang';
        calculateBtn.disabled = false;
    }
    
    // Animate percentage counter
    animatePercentage(percentageElement, 0, percentage);
    
    // Set message and description with animation
    setTimeout(() => {
        messageElement.textContent = message;
        descriptionElement.textContent = description;
        
        // Add color based on percentage
        if (percentage >= 80) {
            messageElement.style.color = "#4CAF50";
        } else if (percentage >= 60) {
            messageElement.style.color = "#FF9800";
        } else if (percentage >= 40) {
            messageElement.style.color = "#FFC107";
        } else {
            messageElement.style.color = "#F44336";
        }
        
        // Add hearts animation
        addHeartsAnimation();
    }, 1500);
    
    // Add visual feedback to result container
    resultContainer.style.animation = 'none';
    setTimeout(() => {
        resultContainer.style.animation = 'pulse 1s';
    }, 10);
    
    // Add CSS animation if not already added
    if (!document.querySelector('#pulse-animation')) {
        const style = document.createElement('style');
        style.id = 'pulse-animation';
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

function animatePercentage(element, start, end, duration = 1500) {
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    function update() {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.round(start + (end - start) * easeOutQuart);
        
        element.textContent = currentValue + '%';
        element.style.fontSize = '5rem';
        
        // Change color based on percentage
        if (currentValue >= 90) {
            element.style.background = "linear-gradient(135deg, #4CAF50, #8BC34A)";
        } else if (currentValue >= 80) {
            element.style.background = "linear-gradient(135deg, #FF9800, #FFC107)";
        } else if (currentValue >= 70) {
            element.style.background = "linear-gradient(135deg, #FF5722, #FF9800)";
        } else if (currentValue >= 50) {
            element.style.background = "linear-gradient(135deg, #E91E63, #9C27B0)";
        } else {
            element.style.background = "linear-gradient(135deg, #F44336, #FF5722)";
        }
        
        element.style.webkitBackgroundClip = "text";
        element.style.webkitTextFillColor = "transparent";
        
        if (now < endTime) {
            requestAnimationFrame(update);
        } else {
            element.textContent = end + '%';
        }
    }
    
    requestAnimationFrame(update);
}

function addHeartsAnimation() {
    const heartsContainer = document.querySelector('.hearts-animation');
    if (!heartsContainer) return;
    
    heartsContainer.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('span');
        heart.innerHTML = '❤️';
        heartsContainer.appendChild(heart);
    }
}

function createCelebrationEffect() {
    // Create heart explosion
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.cssText = `
                position: fixed;
                font-size: ${Math.random() * 25 + 15}px;
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
        }, i * 100);
    }
    
    // Add celebration sound
    try {
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-happy-crowd-laugh-464.mp3');
        audio.volume = 0.2;
        audio.play().catch(e => console.log("Audio play failed:", e));
    } catch (e) {
        console.log("Audio not available");
    }
    
    // Add CSS animation if not already added
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

// Make functions available globally
window.calculateLoveCompatibility = calculateLoveCompatibility;