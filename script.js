// Updated script.js
// Slideshow auto-cycle
const slides = document.querySelectorAll('.slide');
const caption = document.querySelector('.caption');
let currentSlide = 0;

function showNextSlide() {
    if (slides.length > 0) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
        caption.innerHTML = slides[currentSlide].dataset.caption || '';
    }
}

// Initial setup (only if slideshow exists)
if (slides.length > 0) {
    slides[currentSlide].classList.add('active');
    caption.innerHTML = slides[currentSlide].dataset.caption || '';
    // Cycle every 9 seconds
    setInterval(showNextSlide, 9000);
}

// IP copy function
function copyIP() {
    let ipToCopy = 'mc.legendaryhc.org';
    if (window.location.pathname.includes('respawn.html')) {
        ipToCopy = 'respawn.legendaryhc.org';
    }
    navigator.clipboard.writeText(ipToCopy);
    alert('Server IP copied to clipboard!');
}

// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navSidebar = document.getElementById('nav-sidebar');
    const closeBtn = document.getElementById('close-btn');

    if (hamburger && navSidebar) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navSidebar.classList.toggle('open');
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navSidebar.classList.remove('open');
            });
        }

        // Close when clicking any link (on mobile)
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navSidebar.classList.remove('open');
            });
        });
    }
});



// Fetch and display player count
document.addEventListener('DOMContentLoaded', () => {
    const playerCountElement = document.getElementById('player-count');
    if (playerCountElement) {
        let apiUrl = 'https://api.mcsrvstat.us/3/mc.legendaryhc.org'; // Default for main server
        if (window.location.pathname.includes('respawn.html')) {
            apiUrl = 'https://api.mcsrvstat.us/3/respawn.legendaryhc.org';
        }
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.online && data.players && typeof data.players.online === 'number') {
                    playerCountElement.textContent = data.players.online;
                } else {
                    playerCountElement.textContent = 'N/A';
                }
            })
            .catch(error => {
                console.error('Error fetching player count:', error);
                playerCountElement.textContent = 'N/A';
            });
    }
});

// Enhanced: Toggle rank card flip on click/touch for mobile
document.querySelectorAll('.rank-card').forEach(card => {
    const toggleFlip = (e) => {
        e.preventDefault(); // Prevent any default touch behaviors
        card.classList.toggle('flipped');
    };

    card.addEventListener('click', toggleFlip);
    card.addEventListener('touchend', toggleFlip); // Explicit touch support
});
