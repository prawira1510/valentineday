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
    });
}

function calculateLoveCompatibility() {
    const name1 = document.getElementById('name1').value.trim();
    const name2 = document.getElementById('name2').value.trim();
    
    // Validation
    if (!name1 || !name2) {
        showResult(0, "Harap masukkan kedua nama!", "Masukkan nama Anda dan nama pasangan untuk menghitung kecocokan cinta.");
        return;
    }
    
    if (name1.toLowerCase() === name2.toLowerCase()) {
        showResult(100, "Cinta Diri Sendiri!", "Kamu mencintai dirimu sendiri - itu hal yang baik! Tapi cobalah mencintai orang lain juga.");
        return;
    }
    
    // Calculate love percentage (deterministic but fun)
    let percentage = calculateLovePercentage(name1, name2);
    
    // Get message based on percentage
    const { message, description } = getLoveMessage(percentage);
    
    // Show result with animation
    showResult(percentage, message, description);
    
    // Show notification
    if (typeof showNotification === 'function') {
        showNotification(`Kecocokan ${name1} dan ${name2}: ${percentage}% ❤️`, 'success');
    }
}

function calculateLovePercentage(name1, name2) {
    // Combine names and convert to lowercase
    const combined = (name1 + name2).toLowerCase().replace(/\s/g, '');
    
    let score = 0;
    
    // Calculate based on letters in "love"
    const loveLetters = ['l', 'o', 'v', 'e', 'c', 'i', 'n', 't', 'a'];
    
    for (let letter of combined) {
        if (loveLetters.includes(letter)) {
            score += 10;
        } else {
            score += 5;
        }
    }
    
    // Add some randomness but make it deterministic
    let seed = 0;
    for (let i = 0; i < combined.length; i++) {
        seed += combined.charCodeAt(i);
    }
    
    // Use seed for deterministic "randomness"
    const pseudoRandom = (seed * 9301 + 49297) % 233280;
    const randomPercent = (pseudoRandom / 233280) * 30;
    
    // Base percentage (40-70%) plus random
    let percentage = 40 + (score % 30) + randomPercent;
    
    // Ensure it's between 0 and 100
    percentage = Math.min(100, Math.max(0, Math.round(percentage)));
    
    // Bonus for longer names
    const nameLengthBonus = Math.min(20, (name1.length + name2.length) * 0.5);
    percentage += nameLengthBonus;
    
    // Final adjustment
    percentage = Math.min(100, Math.round(percentage));
    
    return percentage;
}

function getLoveMessage(percentage) {
    let message = '';
    let description = '';
    
    if (percentage >= 90) {
        message = "Cinta Sejati! 💖";
        description = "Kalian adalah pasangan yang sangat cocok! Cinta kalian kuat dan abadi. Pertahankan hubungan yang indah ini!";
    } else if (percentage >= 80) {
        message = "Pasangan Ideal! 💕";
        description = "Kalian memiliki hubungan yang sangat harmonis. Teruslah saling mendukung dan mencintai!";
    } else if (percentage >= 70) {
        message = "Sangat Cocok! 😍";
        description = "Kalian memiliki chemistry yang kuat. Hubungan kalian penuh dengan gairah dan kebahagiaan!";
    } else if (percentage >= 60) {
        message = "Cocok! 💗";
        description = "Kalian memiliki potensi untuk hubungan yang baik. Teruslah belajar memahami satu sama lain!";
    } else if (percentage >= 50) {
        message = "Cukup Cocok 💝";
        description = "Ada ketertarikan di antara kalian, tetapi butuh usaha lebih untuk membangun hubungan yang kuat.";
    } else if (percentage >= 40) {
        message = "Butuh Usaha 💞";
        description = "Kalian memiliki perbedaan, tetapi dengan komunikasi yang baik, hubungan bisa berkembang.";
    } else if (percentage >= 30) {
        message = "Tantangan 💔";
        description = "Kalian memiliki banyak perbedaan. Butuh komitmen dan pengertian untuk menjalani hubungan.";
    } else {
        message = "Tidak Cocok 💔";
        description = "Mungkin kalian lebih baik sebagai teman. Tetapi ingat, cinta bisa tumbuh dari mana saja!";
    }
    
    return { message, description };
}

function showResult(percentage, message, description) {
    const percentageElement = document.getElementById('lovePercentage');
    const messageElement = document.getElementById('loveMessage');
    const descriptionElement = document.getElementById('loveDescription');
    const resultContainer = document.querySelector('.result-container');
    
    if (!percentageElement || !messageElement || !descriptionElement) return;
    
    // Animate percentage counter
    animatePercentage(percentageElement, 0, percentage);
    
    // Set message and description
    messageElement.textContent = message;
    descriptionElement.textContent = description;
    
    // Add visual feedback
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
        
        // Change color based on percentage
        if (currentValue >= 80) {
            element.style.color = '#4CAF50'; // Green
        } else if (currentValue >= 60) {
            element.style.color = '#FF9800'; // Orange
        } else if (currentValue >= 40) {
            element.style.color = '#FFC107'; // Yellow
        } else {
            element.style.color = '#F44336'; // Red
        }
        
        if (now < endTime) {
            requestAnimationFrame(update);
        } else {
            element.textContent = end + '%';
        }
    }
    
    requestAnimationFrame(update);
}