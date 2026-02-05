// Gallery functionality for Valentine's Day website

document.addEventListener('DOMContentLoaded', function() {
    initGallery();
});

// Gallery initialization
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('h3')?.textContent || 'Foto Valentine';
            const desc = this.querySelector('p')?.textContent || 'Momen spesial Valentine';
            
            openLightbox(img.src, title, desc);
        });
    });
    
    // Initialize upload functionality
    initUpload();
}

// Lightbox functionality
function openLightbox(imageSrc, title, description) {
    // Create lightbox element
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close-lightbox">&times;</span>
            <img src="${imageSrc}" alt="${title}">
            <div class="lightbox-info">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        </div>
    `;
    
    // Style lightbox
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const lightboxContent = lightbox.querySelector('.lightbox-content');
    lightboxContent.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        position: relative;
        background-color: white;
        border-radius: 10px;
        overflow: hidden;
        animation: scaleIn 0.3s ease-out;
    `;
    
    lightbox.querySelector('img').style.cssText = `
        width: 100%;
        max-height: 70vh;
        object-fit: contain;
        display: block;
        background-color: #f0f0f0;
    `;
    
    const lightboxInfo = lightbox.querySelector('.lightbox-info');
    lightboxInfo.style.cssText = `
        padding: 20px;
        text-align: center;
        background-color: white;
    `;
    
    const closeBtn = lightbox.querySelector('.close-lightbox');
    closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 20px;
        color: white;
        font-size: 40px;
        cursor: pointer;
        z-index: 10;
        text-shadow: 0 0 5px black;
        transition: transform 0.2s;
        background: none;
        border: none;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Close lightbox functionality
    const closeLightbox = () => {
        lightbox.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            if (lightbox.parentNode) {
                lightbox.parentNode.removeChild(lightbox);
            }
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Add CSS animations
    if (!document.querySelector('#lightbox-styles')) {
        const style = document.createElement('style');
        style.id = 'lightbox-styles';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            @keyframes scaleIn {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to DOM
    document.body.appendChild(lightbox);
    
    // Close with Escape key
    const closeOnEscape = function(e) {
        if (e.key === 'Escape' && document.body.contains(lightbox)) {
            closeLightbox();
            document.removeEventListener('keydown', closeOnEscape);
        }
    };
    
    document.addEventListener('keydown', closeOnEscape);
}

// Upload functionality
function initUpload() {
    const uploadBtn = document.getElementById('uploadBtn');
    const photoUpload = document.getElementById('photoUpload');
    const uploadStatus = document.getElementById('uploadStatus');
    
    if (!uploadBtn || !photoUpload || !uploadStatus) return;
    
    uploadBtn.addEventListener('click', function() {
        photoUpload.click();
    });
    
    photoUpload.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            
            // Validate file type
            if (!file.type.match('image.*')) {
                uploadStatus.textContent = 'Hanya file gambar yang diizinkan!';
                uploadStatus.style.cssText = 'color: #F44336; background-color: #FFEBEE; padding: 10px; border-radius: 5px; margin-top: 10px;';
                return;
            }
            
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                uploadStatus.textContent = 'Ukuran file maksimal 5MB!';
                uploadStatus.style.cssText = 'color: #F44336; background-color: #FFEBEE; padding: 10px; border-radius: 5px; margin-top: 10px;';
                return;
            }
            
            // Show uploading status
            uploadStatus.textContent = 'Mengunggah...';
            uploadStatus.style.cssText = 'color: #FF9800; background-color: #FFF3E0; padding: 10px; border-radius: 5px; margin-top: 10px;';
            
            // Create a preview of the uploaded image
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Add new image to gallery
                addToGallery(e.target.result, 'Foto Valentine Anda', 'Diunggah pada ' + new Date().toLocaleDateString('id-ID'));
                
                // Update status
                uploadStatus.textContent = 'Foto berhasil diunggah!';
                uploadStatus.style.cssText = 'color: #4CAF50; background-color: #E8F5E9; padding: 10px; border-radius: 5px; margin-top: 10px;';
                
                // Show notification
                if (typeof showNotification === 'function') {
                    showNotification('Foto berhasil ditambahkan ke galeri! 📷', 'success');
                }
                
                // Reset file input
                photoUpload.value = '';
            };
            
            reader.onerror = function() {
                uploadStatus.textContent = 'Gagal membaca file!';
                uploadStatus.style.cssText = 'color: #F44336; background-color: #FFEBEE; padding: 10px; border-radius: 5px; margin-top: 10px;';
            };
            
            reader.readAsDataURL(file);
        }
    });
}

// Add new image to gallery
function addToGallery(imageSrc, title, description) {
    const galleryContainer = document.querySelector('.gallery-container');
    if (!galleryContainer) return;
    
    // Create new gallery item
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.innerHTML = `
        <img src="${imageSrc}" alt="${title}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"300\" height=\"300\" viewBox=\"0 0 300 300\"><rect width=\"100%\" height=\"100%\" fill=\"%23f8bbd9\"/><text x=\"50%\" y=\"50%\" font-family=\"Arial\" font-size=\"20\" fill=\"%239c27b0\" text-anchor=\"middle\" dy=\".3em\">${title}</text></svg>'">
        <div class="gallery-overlay">
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
    `;
    
    // Add click event for lightbox
    galleryItem.addEventListener('click', function() {
        openLightbox(imageSrc, title, description);
    });
    
    // Add animation
    galleryItem.style.animation = 'fadeInScale 0.5s ease-out';
    
    // Add to gallery (at the beginning)
    galleryContainer.prepend(galleryItem);
    
    // Add CSS animation if not already added
    if (!document.querySelector('#gallery-add-styles')) {
        const style = document.createElement('style');
        style.id = 'gallery-add-styles';
        style.textContent = `
            @keyframes fadeInScale {
                from { opacity: 0; transform: scale(0.8); }
                to { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}