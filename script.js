// Main JavaScript File for Valentine's Day Website

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Website Valentine's Day dimuat!");
    
    // Inisialisasi semua komponen
    initThemeToggle();
    initButtons();
    
    // Tampilkan pesan selamat datang
    setTimeout(() => {
        showNotification("Selamat datang di Website Valentine's Day! ❤️");
    }, 1000);
});

// Toggle tema
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('i');
    
    // Cek tema yang disimpan atau preferensi sistem
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

// Inisialisasi tombol
function initButtons() {
    console.log("Menginisialisasi tombol...");
    
    // 1. Tombol Kirim Pesan Cinta
    const showLoveMessageBtn = document.getElementById('showLoveMessage');
    if (showLoveMessageBtn) {
        console.log("Tombol Kirim Pesan Cinta ditemukan");
        showLoveMessageBtn.addEventListener('click', function(e) {
            console.log("Tombol Kirim Pesan Cinta diklik!");
            e.preventDefault();
            e.stopPropagation();
            showRandomLoveMessage();
        });
    } else {
        console.error("Tombol Kirim Pesan Cinta TIDAK ditemukan!");
        // Coba lagi setelah 500ms
        setTimeout(() => {
            const retryBtn = document.getElementById('showLoveMessage');
            if (retryBtn) {
                console.log("Tombol ditemukan pada percobaan kedua");
                retryBtn.addEventListener('click', showRandomLoveMessage);
            }
        }, 500);
    }
    
    // 2. Tombol Putar Musik Romantis
    const playRomanticMusicBtn = document.getElementById('playRomanticMusic');
    if (playRomanticMusicBtn) {
        console.log("Tombol Putar Musik ditemukan");
        playRomanticMusicBtn.addEventListener('click', function(e) {
            console.log("Tombol Putar Musik diklik!");
            e.preventDefault();
            e.stopPropagation();
            playMusicAndScroll();
        });
    } else {
        console.error("Tombol Putar Musik TIDAK ditemukan!");
    }
    
    // Tambahkan kelas aktif untuk tombol agar terlihat clickable
    document.querySelectorAll('button, .btn').forEach(btn => {
        btn.classList.add('clickable-btn');
        btn.style.cursor = 'pointer';
    });
}

// Fungsi untuk menampilkan pesan cinta random di modal
function showRandomLoveMessage() {
    console.log("Menampilkan pesan cinta acak...");
    
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
        "Cinta kita bukan tentang seberapa lama kita bersama, tetapi tentang seberapa dalam kita saling mencintai."
    ];
    
    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomIndex];
    
    // Cek apakah modal sudah ada
    let modal = document.getElementById('loveMessageModal');
    
    if (!modal) {
        // Buat modal jika belum ada
        modal = document.createElement('div');
        modal.id = 'loveMessageModal';
        modal.className = 'modal fade';
        modal.tabIndex = '-1';
        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title"><i class="fas fa-heart me-2"></i> Pesan Cinta Spesial</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center py-4">
                        <div class="heart-icon mb-3">
                            <i class="fas fa-heart fa-3x text-danger"></i>
                        </div>
                        <p id="randomLoveMessage" class="h5"></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                        <button type="button" class="btn btn-primary" id="newMessageBtn">
                            <i class="fas fa-redo me-2"></i> Pesan Lainnya
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Tambahkan event listener untuk tombol baru
        const newMessageBtn = modal.querySelector('#newMessageBtn');
        if (newMessageBtn) {
            newMessageBtn.addEventListener('click', showRandomLoveMessage);
        }
    }
    
    // Update isi pesan
    const messageElement = modal.querySelector('#randomLoveMessage');
    if (messageElement) {
        messageElement.textContent = randomMessage;
    }
    
    // Tampilkan modal menggunakan Bootstrap
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // Tampilkan notifikasi
    showNotification("Pesan cinta spesial untuk kamu! 💖", "success");
}

// Fungsi untuk memutar musik dan scroll ke bagian musik
function playMusicAndScroll() {
    console.log("Memutar musik dan scroll ke bagian musik...");
    
    // 1. Scroll ke bagian musik
    const musicSection = document.getElementById('music');
    if (musicSection) {
        musicSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
        
        // Tambahkan efek highlight
        musicSection.style.transition = 'all 0.5s';
        musicSection.style.boxShadow = '0 0 0 4px rgba(233, 30, 99, 0.3)';
        setTimeout(() => {
            musicSection.style.boxShadow = '';
        }, 2000);
    }
    
    // 2. Tunggu sebentar lalu mainkan musik
    setTimeout(() => {
        playMusic();
    }, 800);
}

// Fungsi untuk memutar musik
function playMusic() {
    console.log("Memutar musik...");
    
    // Cek apakah ada audio player
    const playBtn = document.getElementById('playBtn');
    const audioElement = document.querySelector('audio');
    
    if (audioElement) {
        // Jika ada audio element langsung
        if (audioElement.paused) {
            audioElement.play()
                .then(() => {
                    console.log("Musik berhasil diputar");
                    if (playBtn) {
                        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                        playBtn.classList.remove('btn-primary');
                        playBtn.classList.add('btn-danger');
                    }
                    showNotification("Musik romantis diputar! 🎵❤️", "success");
                })
                .catch(error => {
                    console.error("Gagal memutar musik:", error);
                    showNotification("Klik tombol Play di pemutar musik untuk mulai mendengarkan 🎵", "info");
                });
        } else {
            // Jika musik sedang diputar, pause
            audioElement.pause();
            if (playBtn) {
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                playBtn.classList.remove('btn-danger');
                playBtn.classList.add('btn-primary');
            }
            showNotification("Musik dijeda ⏸️", "info");
        }
    } else if (playBtn) {
        // Coba klik tombol play di pemutar musik
        playBtn.click();
        
        // Tampilkan notifikasi setelah 500ms
        setTimeout(() => {
            showNotification("Memutar musik romantis untukmu! 🎶💕", "success");
        }, 500);
    } else {
        // Jika tidak ada pemutar musik
        showNotification("Buka bagian Musik untuk mendengarkan lagu romantis! 🎵", "info");
        
        // Coba buat audio element sederhana
        createSimpleAudioPlayer();
    }
}

// Fungsi untuk membuat pemutar audio sederhana
function createSimpleAudioPlayer() {
    const musicSection = document.getElementById('music');
    if (!musicSection) return;
    
    // Cek apakah sudah ada audio player
    const existingPlayer = musicSection.querySelector('.simple-audio-player');
    if (existingPlayer) {
        // Toggle play/pause
        const audio = existingPlayer.querySelector('audio');
        const playBtn = existingPlayer.querySelector('.btn');
        
        if (audio.paused) {
            audio.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
            playBtn.classList.add('btn-danger');
        } else {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i> Play';
            playBtn.classList.remove('btn-danger');
        }
        return;
    }
    
    // Buat pemutar audio sederhana
    const simplePlayer = document.createElement('div');
    simplePlayer.className = 'simple-audio-player mt-4 p-4 rounded bg-light';
    simplePlayer.innerHTML = `
        <h4><i class="fas fa-music me-2"></i>Pemutar Musik Sederhana</h4>
        <audio id="simpleAudio" loop>
            <source src="https://assets.codepen.io/4358584/My_Heart_Will_Go_On.mp3" type="audio/mpeg">
            Browser Anda tidak mendukung audio.
        </audio>
        <div class="d-flex justify-content-center align-items-center gap-3 mt-3">
            <button class="btn btn-primary btn-lg" id="simplePlayBtn">
                <i class="fas fa-play"></i> Putar Musik Romantis
            </button>
            <div class="volume-control">
                <i class="fas fa-volume-up me-2"></i>
                <input type="range" class="form-range" id="simpleVolume" min="0" max="100" value="70" style="width: 150px;">
            </div>
        </div>
        <p class="text-muted mt-3 small">
            <i class="fas fa-info-circle"></i> "My Heart Will Go On" - Celine Dion
        </p>
    `;
    
    musicSection.appendChild(simplePlayer);
    
    // Setup event listeners
    const audio = simplePlayer.querySelector('#simpleAudio');
    const playBtn = simplePlayer.querySelector('#simplePlayBtn');
    const volumeSlider = simplePlayer.querySelector('#simpleVolume');
    
    if (audio && playBtn) {
        playBtn.addEventListener('click', function() {
            if (audio.paused) {
                audio.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i> Jeda';
                playBtn.classList.add('btn-danger');
                showNotification("Memutar 'My Heart Will Go On' 🎶", "success");
            } else {
                audio.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i> Putar Musik Romantis';
                playBtn.classList.remove('btn-danger');
            }
        });
        
        // Auto play setelah dibuat
        setTimeout(() => {
            audio.play().catch(e => {
                console.log("Autoplay diblokir, butuh interaksi pengguna");
                playBtn.innerHTML = '<i class="fas fa-play"></i> Klik untuk Putar';
            });
        }, 300);
    }
    
    if (volumeSlider && audio) {
        volumeSlider.addEventListener('input', function() {
            audio.volume = this.value / 100;
        });
    }
}

// Sistem notifikasi
function showNotification(message, type = 'info') {
    // Hapus notifikasi lama
    const oldNotifications = document.querySelectorAll('.custom-notification');
    oldNotifications.forEach(n => {
        if (n.parentNode) n.parentNode.removeChild(n);
    });
    
    // Buat elemen notifikasi
    const notification = document.createElement('div');
    notification.className = `custom-notification alert alert-${type} position-fixed`;
    
    // Warna berdasarkan type
    const colors = {
        'success': 'linear-gradient(135deg, #28a745, #20c997)',
        'error': 'linear-gradient(135deg, #dc3545, #fd7e14)',
        'info': 'linear-gradient(135deg, #17a2b8, #0dcaf0)',
        'warning': 'linear-gradient(135deg, #ffc107, #fd7e14)'
    };
    
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 99999;
        min-width: 300px;
        max-width: 400px;
        border: none;
        border-radius: 10px;
        color: white;
        background: ${colors[type] || colors.info};
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease-out;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
    `;
    
    // Icon berdasarkan type
    const icons = {
        'success': '🎉',
        'error': '❌',
        'info': '💌',
        'warning': '⚠️'
    };
    
    notification.innerHTML = `
        <div style="flex-grow: 1; display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.5rem;">${icons[type] || '💌'}</span>
            <span style="font-weight: 500;">${message}</span>
        </div>
        <button type="button" class="btn-close btn-close-white" onclick="this.parentElement.remove()" 
                style="margin-left: 15px; filter: brightness(0) invert(1);"></button>
    `;
    
    // Tambahkan ke DOM
    document.body.appendChild(notification);
    
    // Auto hapus setelah 5 detik
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
    
    // Tambahkan animasi CSS jika belum ada
    if (!document.querySelector('#notification-animations')) {
        const style = document.createElement('style');
        style.id = 'notification-animations';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Tambahkan efek hover pada semua tombol
document.addEventListener('DOMContentLoaded', function() {
    // Tambahkan CSS untuk tombol
    const style = document.createElement('style');
    style.textContent = `
        .clickable-btn {
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            position: relative !important;
            overflow: hidden !important;
        }
        
        .clickable-btn:hover {
            transform: translateY(-3px) !important;
            box-shadow: 0 10px 20px rgba(0,0,0,0.2) !important;
        }
        
        .clickable-btn:active {
            transform: translateY(-1px) !important;
        }
        
        .clickable-btn::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 5px;
            height: 5px;
            background: rgba(255, 255, 255, 0.5);
            opacity: 0;
            border-radius: 100%;
            transform: scale(1, 1) translate(-50%);
            transform-origin: 50% 50%;
        }
        
        .clickable-btn:focus:not(:active)::after {
            animation: ripple 1s ease-out;
        }
        
        @keyframes ripple {
            0% {
                transform: scale(0, 0);
                opacity: 0.5;
            }
            100% {
                transform: scale(20, 20);
                opacity: 0;
            }
        }
        
        /* Hero buttons khusus */
        #showLoveMessage, #playRomanticMusic {
            padding: 1rem 2rem !important;
            font-size: 1.2rem !important;
            font-weight: 600 !important;
            border-radius: 50px !important;
            min-width: 250px !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 10px !important;
        }
        
        /* Highlight tombol di hero */
        .hero-buttons .btn {
            border: 2px solid transparent !important;
        }
        
        .hero-buttons .btn-primary {
            background: linear-gradient(135deg, #e91e63, #9c27b0) !important;
            border-color: white !important;
        }
        
        .hero-buttons .btn-outline-light:hover {
            background: white !important;
            color: #e91e63 !important;
            border-color: white !important;
        }
    `;
    document.head.appendChild(style);
    
    // Pastikan semua tombol punya event listener
    setTimeout(() => {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
            if (!btn.hasAttribute('data-initialized')) {
                btn.setAttribute('data-initialized', 'true');
                btn.addEventListener('click', function() {
                    console.log('Tombol diklik:', this.id || this.className || this.textContent);
                });
            }
        });
    }, 100);
});

// Buat hujan hati di background
function createHeartRain(count = 30) {
    const container = document.querySelector('.hearts-background');
    if (!container) return;
    
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        
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
}

// Panggil fungsi saat halaman dimuat
window.addEventListener('load', function() {
    createHeartRain(30);
    console.log("Semua tombol siap digunakan!");
    
    // Tampilkan pesan bantuan
    setTimeout(() => {
        showNotification("Klik tombol 'Kirim Pesan Cinta' atau 'Putar Musik' untuk mulai! 💝", "info");
    }, 2000);
});

// Ekspor fungsi ke global scope
window.showRandomLoveMessage = showRandomLoveMessage;
window.playMusicAndScroll = playMusicAndScroll;
window.showNotification = showNotification;