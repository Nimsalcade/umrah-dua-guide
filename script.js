// Global variables
let currentSection = 'journey';
let currentStep = 1;
let bookmarkedDuas = JSON.parse(localStorage.getItem('bookmarkedDuas')) || [];
let customDuas = JSON.parse(localStorage.getItem('customDuas')) || [];

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadBookmarks();
    loadCustomDuas();
});

// Initialize the application
function initializeApp() {
    setupNavigation();
    setupStepNavigation();
    setupKeyboardShortcuts();
    
    // Show the default section
    showSection(currentSection);
}

// Navigation functionality
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            showSection(section);
            
            // Update active navigation button
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Show specific section
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionName;
    }
    
    // Reset to first step when switching to Umrah section
    if (sectionName === 'umrah') {
        showStep(1);
    }
}

// Step navigation for Umrah section
function setupStepNavigation() {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.addEventListener('click', function() {
            const stepNumber = parseInt(this.getAttribute('data-step'));
            showStep(stepNumber);
        });
    });
}

// Show specific step in Umrah section
function showStep(stepNumber) {
    // Update step indicator
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.classList.remove('active', 'completed');
        const stepNum = index + 1;
        
        if (stepNum === stepNumber) {
            step.classList.add('active');
        } else if (stepNum < stepNumber) {
            step.classList.add('completed');
        }
    });
    
    // Show corresponding step content
    const stepContents = document.querySelectorAll('.umrah-step');
    stepContents.forEach(content => {
        content.classList.remove('active');
    });
    
    const targetStep = document.querySelector(`.umrah-step[data-step="${stepNumber}"]`);
    if (targetStep) {
        targetStep.classList.add('active');
    }
    
    // Update step controls
    const prevBtn = document.querySelector('.step-btn[onclick="previousStep()"]');
    const nextBtn = document.querySelector('.step-btn[onclick="nextStep()"]');
    
    prevBtn.disabled = stepNumber === 1;
    nextBtn.disabled = stepNumber === 5;
    nextBtn.textContent = stepNumber === 5 ? 'Complete' : 'Next';
    
    currentStep = stepNumber;
}

// Navigate to previous step
function previousStep() {
    if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}

// Navigate to next step
function nextStep() {
    if (currentStep < 5) {
        showStep(currentStep + 1);
    } else {
        // Show completion message
        showCompletionMessage();
    }
}

// Show completion message
function showCompletionMessage() {
    const message = document.createElement('div');
    message.className = 'completion-message';
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
            color: white;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            z-index: 1001;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        ">
            <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
            <h3 style="margin-bottom: 1rem;">Duas Completed!</h3>
            <p style="margin-bottom: 1.5rem;">May Allah accept your prayers and grant you a blessed journey.</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: white;
                color: #38a169;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 500;
            ">Continue</button>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
        " onclick="this.parentElement.remove()"></div>
    `;
    document.body.appendChild(message);
}

// Audio playback functionality
function playAudio(button) {
    // Visual feedback
    button.style.transform = 'scale(0.95)';
    button.style.background = '#4299e1';
    button.style.color = 'white';
    
    setTimeout(() => {
        button.style.transform = '';
        button.style.background = '';
        button.style.color = '';
    }, 200);
    
    // In a real app, you would play actual audio here
    // For now, we'll show a notification
    showNotification('Audio playback feature would be implemented here', 'info');
}

// Bookmark functionality
function toggleBookmark(button) {
    const duaCard = button.closest('.dua-card');
    const duaText = duaCard.querySelector('.dua-arabic').textContent;
    const duaContext = duaCard.querySelector('.dua-context')?.textContent || '';
    
    const duaData = {
        text: duaText,
        context: duaContext,
        timestamp: Date.now()
    };
    
    const isBookmarked = bookmarkedDuas.some(dua => dua.text === duaText);
    
    if (isBookmarked) {
        // Remove bookmark
        bookmarkedDuas = bookmarkedDuas.filter(dua => dua.text !== duaText);
        button.classList.remove('bookmarked');
        button.innerHTML = '<i class="far fa-bookmark"></i>';
        showNotification('Bookmark removed', 'success');
    } else {
        // Add bookmark
        bookmarkedDuas.push(duaData);
        button.classList.add('bookmarked');
        button.innerHTML = '<i class="fas fa-bookmark"></i>';
        showNotification('Dua bookmarked', 'success');
    }
    
    // Save to localStorage
    localStorage.setItem('bookmarkedDuas', JSON.stringify(bookmarkedDuas));
}

// Load bookmarks on page load
function loadBookmarks() {
    const duaCards = document.querySelectorAll('.dua-card');
    
    duaCards.forEach(card => {
        const duaText = card.querySelector('.dua-arabic').textContent;
        const bookmarkButton = card.querySelector('.btn-bookmark');
        
        if (bookmarkedDuas.some(dua => dua.text === duaText)) {
            bookmarkButton.classList.add('bookmarked');
            bookmarkButton.innerHTML = '<i class="fas fa-bookmark"></i>';
        }
    });
}

// Counter functionality
function incrementCounter(button) {
    const counterValue = button.parentElement.querySelector('.counter-value');
    let count = parseInt(counterValue.textContent);
    count++;
    counterValue.textContent = count;
    
    // Visual feedback
    button.style.transform = 'scale(1.2)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
    
    // Check if reached 100 for the specific dua
    if (count === 100) {
        showNotification('100 times completed! Barakallahu feeki!', 'success');
    }
}

function decrementCounter(button) {
    const counterValue = button.parentElement.querySelector('.counter-value');
    let count = parseInt(counterValue.textContent);
    if (count > 0) {
        count--;
        counterValue.textContent = count;
        
        // Visual feedback
        button.style.transform = 'scale(1.2)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
}

// Add custom dua functionality
function openAddDuaModal() {
    const modal = document.getElementById('addDuaModal');
    modal.classList.add('active');
    
    // Focus on the Arabic text input
    setTimeout(() => {
        document.getElementById('duaArabic').focus();
    }, 300);
}

function closeAddDuaModal() {
    const modal = document.getElementById('addDuaModal');
    modal.classList.remove('active');
    
    // Clear form
    document.getElementById('addDuaForm').reset();
}

// Handle adding new dua
function addNewDua(event) {
    event.preventDefault();
    
    const arabicText = document.getElementById('duaArabic').value.trim();
    const context = document.getElementById('duaContext').value.trim();
    
    if (!arabicText) {
        showNotification('Please enter the Arabic text', 'error');
        return;
    }
    
    const newDua = {
        id: Date.now(),
        text: arabicText,
        context: context,
        timestamp: Date.now()
    };
    
    // Add to custom duas array
    customDuas.push(newDua);
    
    // Save to localStorage
    localStorage.setItem('customDuas', JSON.stringify(customDuas));
    
    // Add to the UI
    addDuaToUI(newDua);
    
    // Close modal
    closeAddDuaModal();
    
    showNotification('New dua added successfully!', 'success');
}

// Add dua to UI
function addDuaToUI(dua) {
    const container = document.getElementById('custom-duas-container');
    
    const duaCard = document.createElement('div');
    duaCard.className = 'dua-card custom-dua';
    duaCard.setAttribute('data-dua-id', dua.id);
    
    duaCard.innerHTML = `
        ${dua.context ? `<div class="dua-context">${dua.context}</div>` : ''}
        <div class="dua-arabic" dir="rtl">${dua.text}</div>
        <div class="dua-controls">
            <button class="btn-play" onclick="playAudio(this)"><i class="fas fa-play"></i></button>
            <button class="btn-bookmark" onclick="toggleBookmark(this)"><i class="far fa-bookmark"></i></button>
            <button class="btn-delete" onclick="deleteCustomDua(${dua.id})" style="
                background: none;
                border: 2px solid #e53e3e;
                color: #e53e3e;
                padding: 0.5rem;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    container.appendChild(duaCard);
}

// Delete custom dua
function deleteCustomDua(duaId) {
    if (confirm('Are you sure you want to delete this dua?')) {
        // Remove from array
        customDuas = customDuas.filter(dua => dua.id !== duaId);
        
        // Update localStorage
        localStorage.setItem('customDuas', JSON.stringify(customDuas));
        
        // Remove from UI
        const duaCard = document.querySelector(`[data-dua-id="${duaId}"]`);
        if (duaCard) {
            duaCard.remove();
        }
        
        showNotification('Dua deleted', 'success');
    }
}

// Load custom duas on page load
function loadCustomDuas() {
    customDuas.forEach(dua => {
        addDuaToUI(dua);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        success: '#48bb78',
        error: '#e53e3e',
        info: '#4299e1',
        warning: '#ed8936'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 500;
        animation: slideInRight 0.3s ease-in-out;
        max-width: 300px;
    `;
    
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in-out';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(event) {
        // Navigate sections with numbers 1-4
        if (event.key >= '1' && event.key <= '4') {
            const sections = ['journey', 'umrah', 'family', 'madinah'];
            const sectionIndex = parseInt(event.key) - 1;
            if (sections[sectionIndex]) {
                showSection(sections[sectionIndex]);
                
                // Update navigation buttons
                const navButtons = document.querySelectorAll('.nav-btn');
                navButtons.forEach(btn => btn.classList.remove('active'));
                navButtons[sectionIndex].classList.add('active');
            }
        }
        
        // Navigate steps in Umrah section with arrow keys
        if (currentSection === 'umrah') {
            if (event.key === 'ArrowLeft' && currentStep > 1) {
                previousStep();
                event.preventDefault();
            } else if (event.key === 'ArrowRight' && currentStep < 5) {
                nextStep();
                event.preventDefault();
            }
        }
        
        // Close modal with Escape key
        if (event.key === 'Escape') {
            const modal = document.getElementById('addDuaModal');
            if (modal.classList.contains('active')) {
                closeAddDuaModal();
            }
        }
        
        // Open add dua modal with Ctrl/Cmd + N
        if ((event.ctrlKey || event.metaKey) && event.key === 'n' && currentSection === 'umrah') {
            event.preventDefault();
            openAddDuaModal();
        }
    });
}

// Search functionality (future enhancement)
function initializeSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search duas...';
    searchInput.className = 'search-input';
    
    // Add search input to header (if needed)
    // This is a placeholder for future search functionality
}

// Export/Import functionality (future enhancement)
function exportBookmarks() {
    const data = {
        bookmarks: bookmarkedDuas,
        customDuas: customDuas,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'umrah-duas-backup.json';
    link.click();
}

function importBookmarks(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.bookmarks) {
                bookmarkedDuas = data.bookmarks;
                localStorage.setItem('bookmarkedDuas', JSON.stringify(bookmarkedDuas));
            }
            
            if (data.customDuas) {
                customDuas = data.customDuas;
                localStorage.setItem('customDuas', JSON.stringify(customDuas));
            }
            
            // Reload the page to reflect changes
            location.reload();
            
        } catch (error) {
            showNotification('Error importing data. Please check the file format.', 'error');
        }
    };
    
    reader.readAsText(file);
}

// Offline functionality
window.addEventListener('online', function() {
    showNotification('Connection restored', 'success');
});

window.addEventListener('offline', function() {
    showNotification('App is now available offline', 'info');
});

// Service Worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('addDuaModal');
    if (event.target === modal) {
        closeAddDuaModal();
    }
});

// Add CSS animations for notifications
const style = document.createElement('style');
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