// Music Player for Valentine's Day website

document.addEventListener('DOMContentLoaded', function() {
    initMusicPlayer();
});

function initMusicPlayer() {
    // Check if browser supports audio
    if (!window.Audio) {
        showAudioFallback();
        return;
    }
    
    // Audio element
    const audio = new Audio();
    audio.volume = 0.7;
    
    // Current song index
    let currentSongIndex = 0;
    let isPlaying = false;
    
    // Playlist data with fallback URLs
    const playlist = [
        {
            title: "My Heart Will Go On",
            artist: "Celine Dion",
            src: "audio/My Heart Will Go On.mp3" // Local fallback
        },
        {
            title: "Perfect",
            artist: "Ed Sheeran",
            src: "audio/Perfect.mp3"
        },
        {
            title: "Love Story",
            artist: "Taylor Swift",
            src: "audio/Love Story.mp3"
        },
        {
            title: "Thinking Out Loud",
            artist: "Ed Sheeran",
            src: "audio/Thinking Out Loud.mp3"
        }
    ];
    
    // DOM elements
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const volumeSlider = document.getElementById('volumeSlider');
    const songTitle = document.getElementById('songTitle');
    const songArtist = document.getElementById('songArtist');
    const playlistItems = document.querySelectorAll('.playlist-item');
    
    // Check if all required elements exist
    if (!playBtn || !progressBar || !songTitle) {
        console.error("Music player elements not found");
        return;
    }
    
    // Initialize
    loadSong(currentSongIndex);
    updatePlaylistHighlight();
    
    // Event listeners
    playBtn.addEventListener('click', togglePlay);
    if (prevBtn) prevBtn.addEventListener('click', prevSong);
    if (nextBtn) nextBtn.addEventListener('click', nextSong);
    
    // Progress bar
    audio.addEventListener('timeupdate', updateProgressBar);
    if (progressBar && progressBar.parentElement) {
        progressBar.parentElement.addEventListener('click', setProgress);
    }
    
    // Volume control
    if (volumeSlider) {
        volumeSlider.addEventListener('input', updateVolume);
    }
    
    // Playlist item clicks
    playlistItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            loadSong(index);
            playSong();
        });
    });
    
    // Song ended
    audio.addEventListener('ended', nextSong);
    
    // Error handling for audio
    audio.addEventListener('error', function(e) {
        console.error("Audio error:", e);
        if (typeof showNotification === 'function') {
            showNotification("Gagal memutar musik. Coba lagu lain.", "error");
        }
        nextSong();
    });
    
    // Functions
    function loadSong(index) {
        if (index < 0 || index >= playlist.length) return;
        
        currentSongIndex = index;
        const song = playlist[index];
        
        audio.src = song.src;
        songTitle.textContent = song.title;
        if (songArtist) songArtist.textContent = song.artist;
        
        updatePlaylistHighlight();
    }
    
    function togglePlay() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }
    
    function playSong() {
        isPlaying = true;
        audio.play().catch(e => {
            console.error("Play failed:", e);
            isPlaying = false;
            if (typeof showNotification === 'function') {
                showNotification("Gagal memutar musik. Coba klik play lagi.", "error");
            }
        });
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        
        // Add visual feedback
        playBtn.style.backgroundColor = '#880e4f';
    }
    
    function pauseSong() {
        isPlaying = false;
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playBtn.style.backgroundColor = '';
    }
    
    function prevSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = playlist.length - 1;
        }
        loadSong(currentSongIndex);
        playSong();
    }
    
    function nextSong() {
        currentSongIndex++;
        if (currentSongIndex > playlist.length - 1) {
            currentSongIndex = 0;
        }
        loadSong(currentSongIndex);
        playSong();
    }
    
    function updateProgressBar() {
        if (!progressBar) return;
        
        const { currentTime, duration } = audio;
        const progressPercent = duration ? (currentTime / duration) * 100 : 0;
        progressBar.style.width = `${progressPercent}%`;
    }
    
    function setProgress(e) {
        if (!audio.duration) return;
        
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        
        audio.currentTime = (clickX / width) * duration;
    }
    
    function updateVolume() {
        audio.volume = volumeSlider.value / 100;
        
        // Update volume icon
        const volumeIcon = document.querySelector('.volume-control i');
        if (volumeIcon) {
            if (volumeSlider.value == 0) {
                volumeIcon.className = 'fas fa-volume-mute';
            } else if (volumeSlider.value < 30) {
                volumeIcon.className = 'fas fa-volume-down';
            } else {
                volumeIcon.className = 'fas fa-volume-up';
            }
        }
    }
    
    function updatePlaylistHighlight() {
        playlistItems.forEach((item, index) => {
            if (index === currentSongIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    function showAudioFallback() {
        const musicPlayer = document.querySelector('.music-player');
        if (!musicPlayer) return;
        
        const fallbackHTML = `
            <div class="audio-fallback">
                <h3>Pemutar Musik</h3>
                <p>Browser Anda tidak mendukung pemutar audio atau ada masalah dengan koneksi.</p>
                <p>Anda tetap bisa menikmati fitur lainnya di website ini.</p>
                <p>🎵 Happy Valentine's Day! ❤️</p>
            </div>
        `;
        
        musicPlayer.innerHTML = fallbackHTML;
    }
    
    // Make audio element available globally
    window.valentineAudio = audio;
    window.valentineMusicPlayer = {
        play: playSong,
        pause: pauseSong,
        next: nextSong,
        prev: prevSong,
        toggle: togglePlay,
        loadSong: loadSong
    };
}