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

// Lightbox functionality menggunakan Bootstrap Modal
function openLightbox(imageSrc, title, description) {
    // Create modal HTML
    const lightboxHTML = `
        <div class="modal fade" id="imageLightbox" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <img src="${imageSrc}" alt="${title}" class="img-fluid rounded" style="max-height: 70vh;">
                        <p class="mt-3">${description}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing lightbox
    const existingLightbox = document.getElementById('imageLightbox');
    if (existingLightbox) {
        existingLightbox.remove();
    }
    
    // Add to DOM
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    // Show modal
    const lightboxModal = new bootstrap.Modal(document.getElementById('imageLightbox'));
    lightboxModal.show();
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
                uploadStatus.innerHTML = '<div class="alert alert-danger">Hanya file gambar yang diizinkan!</div>';
                return;
            }
            
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                uploadStatus.innerHTML = '<div class="alert alert-danger">Ukuran file maksimal 5MB!</div>';
                return;
            }
            
            // Show uploading status
            uploadStatus.innerHTML = '<div class="alert alert-warning">Mengunggah...</div>';
            
            // Create a preview of the uploaded image
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Add new image to gallery
                addToGallery(e.target.result, 'Foto Valentine Anda', 'Diunggah pada ' + new Date().toLocaleDateString('id-ID'));
                
                // Update status
                uploadStatus.innerHTML = '<div class="alert alert-success">Foto berhasil diunggah!</div>';
                
                // Show notification
                if (typeof showNotification === 'function') {
                    showNotification('Foto berhasil ditambahkan ke galeri! 📷', 'success');
                }
                
                // Reset file input
                photoUpload.value = '';
            };
            
            reader.onerror = function() {
                uploadStatus.innerHTML = '<div class="alert alert-danger">Gagal membaca file!</div>';
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
    galleryItem.className = 'col-md-4';
    galleryItem.innerHTML = `
        <div class="gallery-item h-100">
            <img src="${imageSrc}" alt="${title}" class="img-fluid" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"300\" height=\"300\" viewBox=\"0 0 300 300\"><rect width=\"100%\" height=\"100%\" fill=\"%23f8bbd9\"/><text x=\"50%\" y=\"50%\" font-family=\"Arial\" font-size=\"20\" fill=\"%239c27b0\" text-anchor=\"middle\" dy=\".3em\">${title}</text></svg>'}">
            <div class="gallery-overlay">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
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