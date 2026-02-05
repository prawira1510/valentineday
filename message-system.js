// Love Message System for Valentine's Day website

document.addEventListener('DOMContentLoaded', function() {
    initMessageSystem();
});

function initMessageSystem() {
    const sendBtn = document.getElementById('sendMessage');
    const messagesList = document.getElementById('messagesList');
    
    if (!sendBtn || !messagesList) return;
    
    // Load messages from localStorage
    loadMessages();
    
    // Send message button click
    sendBtn.addEventListener('click', sendMessage);
    
    // Also send when Enter is pressed in textarea (with Ctrl/Cmd)
    const messageText = document.getElementById('messageText');
    if (messageText) {
        messageText.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

function sendMessage() {
    const senderName = document.getElementById('senderName').value.trim();
    const recipientName = document.getElementById('recipientName').value.trim();
    const messageText = document.getElementById('messageText').value.trim();
    
    // Validation
    if (!senderName || !recipientName || !messageText) {
        if (typeof showNotification === 'function') {
            showNotification('Harap isi semua bidang sebelum mengirim pesan!', 'error');
        }
        return;
    }
    
    // Create message object
    const message = {
        id: Date.now(),
        sender: senderName,
        recipient: recipientName,
        text: messageText,
        date: new Date().toISOString(),
        likes: 0
    };
    
    // Save to localStorage
    saveMessage(message);
    
    // Add to display
    addMessageToDisplay(message);
    
    // Clear form
    document.getElementById('senderName').value = '';
    document.getElementById('recipientName').value = '';
    document.getElementById('messageText').value = '';
    
    // Show notification
    if (typeof showNotification === 'function') {
        showNotification(`Pesan cinta untuk ${recipientName} berhasil dikirim! 💖`, 'success');
    }
    
    // Create visual effect
    createHeartEffect();
}

function saveMessage(message) {
    // Get existing messages from localStorage
    let messages = JSON.parse(localStorage.getItem('valentineMessages')) || [];
    
    // Add new message
    messages.unshift(message); // Add to beginning
    
    // Keep only last 50 messages
    if (messages.length > 50) {
        messages = messages.slice(0, 50);
    }
    
    // Save back to localStorage
    localStorage.setItem('valentineMessages', JSON.stringify(messages));
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('valentineMessages')) || [];
    const messagesList = document.getElementById('messagesList');
    
    if (!messagesList) return;
    
    // Clear current list
    messagesList.innerHTML = '';
    
    // Add each message
    messages.forEach(message => {
        addMessageToDisplay(message);
    });
    
    // Show message if no messages yet
    if (messages.length === 0) {
        messagesList.innerHTML = `
            <div class="empty-message">
                <i class="fas fa-heart-broken"></i>
                <p>Belum ada pesan cinta. Kirim pesan pertama!</p>
            </div>
        `;
        
        // Add styles for empty message
        const style = document.createElement('style');
        if (!document.querySelector('#empty-message-styles')) {
            style.id = 'empty-message-styles';
            style.textContent = `
                .empty-message {
                    text-align: center;
                    padding: 3rem 1rem;
                    color: var(--text-color);
                    opacity: 0.6;
                }
                .empty-message i {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                    color: var(--primary-color);
                }
            `;
            document.head.appendChild(style);
        }
    }
}

function addMessageToDisplay(message) {
    const messagesList = document.getElementById('messagesList');
    
    if (!messagesList) return;
    
    // Remove empty message if present
    const emptyMessage = messagesList.querySelector('.empty-message');
    if (emptyMessage) {
        emptyMessage.remove();
    }
    
    // Format date
    const date = new Date(message.date);
    const formattedDate = formatDate(date);
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = 'message-item';
    messageElement.dataset.id = message.id;
    messageElement.innerHTML = `
        <div class="message-header">
            <span class="message-sender">${escapeHtml(message.sender)} → ${escapeHtml(message.recipient)}</span>
            <span class="message-date">${formattedDate}</span>
        </div>
        <div class="message-text">${escapeHtml(message.text)}</div>
        <div class="message-actions">
            <button class="like-btn" data-id="${message.id}">
                <i class="fas fa-heart"></i> <span class="like-count">${message.likes || 0}</span>
            </button>
            <button class="delete-btn" data-id="${message.id}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    // Add animation
    messageElement.style.animation = 'slideInMessage 0.5s ease-out';
    
    // Add to list (at the top)
    messagesList.prepend(messageElement);
    
    // Add event listeners for buttons
    const likeBtn = messageElement.querySelector('.like-btn');
    const deleteBtn = messageElement.querySelector('.delete-btn');
    
    likeBtn.addEventListener('click', function() {
        likeMessage(message.id);
    });
    
    deleteBtn.addEventListener('click', function() {
        deleteMessage(message.id);
    });
    
    // Add CSS animation if not already added
    if (!document.querySelector('#message-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'message-animation-styles';
        style.textContent = `
            @keyframes slideInMessage {
                from { 
                    opacity: 0; 
                    transform: translateY(-20px); 
                }
                to { 
                    opacity: 1; 
                    transform: translateY(0); 
                }
            }
            .message-actions {
                display: flex;
                justify-content: flex-end;
                gap: 1rem;
                margin-top: 1rem;
                padding-top: 0.5rem;
                border-top: 1px solid rgba(0,0,0,0.1);
            }
            .like-btn, .delete-btn {
                background: none;
                border: none;
                cursor: pointer;
                font-size: 0.9rem;
                display: flex;
                align-items: center;
                gap: 0.3rem;
                color: var(--text-color);
                opacity: 0.7;
                transition: var(--transition);
                padding: 0.3rem 0.7rem;
                border-radius: 5px;
            }
            .like-btn:hover {
                color: #e91e63;
                background-color: rgba(233, 30, 99, 0.1);
                opacity: 1;
            }
            .delete-btn:hover {
                color: #f44336;
                background-color: rgba(244, 67, 54, 0.1);
                opacity: 1;
            }
            .message-item.liked .like-btn {
                color: #e91e63;
            }
        `;
        document.head.appendChild(style);
    }
}

function likeMessage(messageId) {
    // Get messages from localStorage
    let messages = JSON.parse(localStorage.getItem('valentineMessages')) || [];
    
    // Find and update message
    const messageIndex = messages.findIndex(msg => msg.id == messageId);
    
    if (messageIndex !== -1) {
        // Initialize likes if not exists
        if (!messages[messageIndex].likes) {
            messages[messageIndex].likes = 0;
        }
        
        // Increment likes
        messages[messageIndex].likes++;
        
        // Save back to localStorage
        localStorage.setItem('valentineMessages', JSON.stringify(messages));
        
        // Update display
        const messageElement = document.querySelector(`.message-item[data-id="${messageId}"]`);
        if (messageElement) {
            const likeCount = messageElement.querySelector('.like-count');
            if (likeCount) {
                likeCount.textContent = messages[messageIndex].likes;
            }
            
            // Add visual feedback
            messageElement.classList.add('liked');
            likeCount.style.transform = 'scale(1.3)';
            
            setTimeout(() => {
                likeCount.style.transform = 'scale(1)';
            }, 300);
            
            // Create heart effect
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.cssText = `
                position: absolute;
                font-size: 20px;
                animation: floatUp 1s ease-out forwards;
                pointer-events: none;
                z-index: 10;
            `;
            
            messageElement.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 1000);
        }
        
        // Add CSS animation if not already added
        if (!document.querySelector('#float-up-animation')) {
            const style = document.createElement('style');
            style.id = 'float-up-animation';
            style.textContent = `
                @keyframes floatUp {
                    0% { 
                        opacity: 1; 
                        transform: translateY(0) scale(1); 
                    }
                    100% { 
                        opacity: 0; 
                        transform: translateY(-30px) scale(1.5); 
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

function deleteMessage(messageId) {
    if (!confirm('Apakah Anda yakin ingin menghapus pesan ini?')) {
        return;
    }
    
    // Get messages from localStorage
    let messages = JSON.parse(localStorage.getItem('valentineMessages')) || [];
    
    // Filter out the message to delete
    messages = messages.filter(msg => msg.id != messageId);
    
    // Save back to localStorage
    localStorage.setItem('valentineMessages', JSON.stringify(messages));
    
    // Remove from display
    const messageElement = document.querySelector(`.message-item[data-id="${messageId}"]`);
    if (messageElement) {
        messageElement.style.animation = 'slideOutMessage 0.3s ease-out';
        
        setTimeout(() => {
            messageElement.remove();
            
            // Reload messages to handle empty state
            loadMessages();
        }, 300);
    }
    
    // Show notification
    if (typeof showNotification === 'function') {
        showNotification('Pesan berhasil dihapus!', 'success');
    }
    
    // Add CSS animation if not already added
    if (!document.querySelector('#slide-out-message')) {
        const style = document.createElement('style');
        style.id = 'slide-out-message';
        style.textContent = `
            @keyframes slideOutMessage {
                from { 
                    opacity: 1; 
                    transform: translateX(0); 
                }
                to { 
                    opacity: 0; 
                    transform: translateX(100%); 
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function formatDate(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 1) {
        return 'Baru saja';
    } else if (diffMins < 60) {
        return `${diffMins} menit yang lalu`;
    } else if (diffHours < 24) {
        return `${diffHours} jam yang lalu`;
    } else if (diffDays < 7) {
        return `${diffDays} hari yang lalu`;
    } else {
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function createHeartEffect() {
    // Create floating hearts animation
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.cssText = `
                position: fixed;
                font-size: ${Math.random() * 20 + 15}px;
                left: ${Math.random() * 100}%;
                top: 100%;
                opacity: 0.9;
                z-index: 9999;
                pointer-events: none;
                animation: sendHeart 2s ease-out forwards;
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    document.body.removeChild(heart);
                }
            }, 2000);
        }, i * 100);
    }
    
    // Add CSS animation if not already added
    if (!document.querySelector('#send-heart-animation')) {
        const style = document.createElement('style');
        style.id = 'send-heart-animation';
        style.textContent = `
            @keyframes sendHeart {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Export function to be used by other scripts
window.valentineMessageSystem = {
    sendMessage: sendMessage,
    loadMessages: loadMessages,
    likeMessage: likeMessage,
    deleteMessage: deleteMessage
};