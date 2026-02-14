/* ═══════════════════════════════════════════════════════════════
   Valentine's Day Experience - Final JavaScript
   ═══════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════
// Global Variables
// ═══════════════════════════════════════════════════════════════
let musicPlaying = false;

// ═══════════════════════════════════════════════════════════════
// Entry Gate - Unlock Invitation
// ═══════════════════════════════════════════════════════════════
function unlockInvitation() {
    const gate = document.getElementById('entry-gate');
    const greeting = document.getElementById('greeting-screen');
    const bgMusic = document.getElementById('bgMusic');
    
    // Fade out gate
    gate.style.opacity = '0';
    
    setTimeout(() => {
        gate.classList.add('hidden');
        greeting.classList.remove('hidden');
        greeting.style.opacity = '1';
        
        // Auto-play music when greeting appears
        bgMusic.play().then(() => {
            musicPlaying = true;
            console.log('Music started automatically');
        }).catch(err => {
            console.log('Auto-play prevented by browser:', err);
        });
        
        // After 3 seconds, fade out greeting and show main content
        setTimeout(() => {
            greeting.style.opacity = '0';
            
            setTimeout(() => {
                greeting.classList.add('hidden');
                const mainContent = document.getElementById('main-content');
                mainContent.classList.add('content-visible');
                mainContent.classList.remove('content-hidden');
                mainContent.style.opacity = '1';
                
                // Initialize particle background
                initParticles();
            }, 1500);
        }, 3000);
    }, 1500);
}

// ═══════════════════════════════════════════════════════════════
// Music Toggle
// ═══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    
    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('click', function() {
            if (musicPlaying) {
                bgMusic.pause();
                musicToggle.style.opacity = '0.5';
                musicPlaying = false;
            } else {
                bgMusic.play();
                musicToggle.style.opacity = '1';
                musicPlaying = true;
            }
        });
    }
});

// ═══════════════════════════════════════════════════════════════
// Particle Background Animation
// ═══════════════════════════════════════════════════════════════
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 80;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ═══════════════════════════════════════════════════════════════
// Modal Functions
// ═══════════════════════════════════════════════════════════════
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => { modal.style.opacity = '1'; }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => { modal.style.display = 'none'; }, 300);
    }
}

function closeModalOnBackground(event, modalId) {
    if (event.target.id === modalId) closeModal(modalId);
}

// ═══════════════════════════════════════════════════════════════
// Make a Wish (UPDATED with Glass Card interaction)
// ═══════════════════════════════════════════════════════════════
function makeAWish() {
    const star = document.getElementById('wishStar');
    const wishText = document.getElementById('wishText');
    const wishMsg = document.getElementById('wishMsg');
    const invitationWrap = document.getElementById('invitationWrap');
    const glassCard = document.querySelector('.wish-glass-card');
    
    // Animation sequence
    star.classList.add('star-ascend');
    wishText.style.opacity = '0';
    
    if (glassCard) {
        glassCard.style.boxShadow = '0 0 50px rgba(212, 175, 55, 0.6)';
        glassCard.style.borderColor = 'var(--gold)';
    }

    setTimeout(() => {
        wishMsg.classList.add('visible');
        setTimeout(() => {
            invitationWrap.classList.add('show-invite');
            // Smooth scroll to invitation
            invitationWrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1000);
    }, 1500);
}

// ═══════════════════════════════════════════════════════════════
// Invitation Card Flip
// ═══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function() {
    const inviteCard = document.getElementById('inviteCard');
    if (inviteCard) {
        inviteCard.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn') || 
                e.target.classList.contains('choice-btn') ||
                e.target.classList.contains('seal-btn') ||
                e.target.closest('.btn-group') ||
                e.target.closest('.date-choices')) {
                return;
            }
            inviteCard.classList.toggle('flipped');
        });
    }
});

// ═══════════════════════════════════════════════════════════════
// Valentine Response Logic
// ═══════════════════════════════════════════════════════════════
function sayYes(event) {
    event.stopPropagation();
    const noBtn = document.getElementById('noBtn');
    const dateChoices = document.getElementById('dateChoices');
    if (noBtn) noBtn.style.display = 'none';
    if (dateChoices) dateChoices.classList.remove('hidden');
}

function moveNoButton() {
    const noBtn = document.getElementById('noBtn');
    if (!noBtn) return;
    const card = document.querySelector('.card-back');
    const cardRect = card.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    const maxX = cardRect.width - btnRect.width - 40;
    const maxY = cardRect.height - btnRect.height - 40;
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = Math.random() * maxX + 'px';
    noBtn.style.top = Math.random() * maxY + 'px';
}

function chooseDate(choice) {
    const dateMessage = document.getElementById('dateMessage');
    const sealBtn = document.getElementById('sealBtn');
    let message = '';
    
    switch(choice) {
        case 'dinner': message = "Di pwede wala tayong pera HAHAHA🍷"; break;
        case 'chill': message = "Kyu kyu sa SM yung tag 99 lang.🍜"; break;
        case 'walk': message = "Tama, Netflix and Chill sabay kodol mwehe.🏠"; break;
    }
    
    if (dateMessage) dateMessage.innerHTML = message;
    if (sealBtn) sealBtn.classList.add('show');
}

// ═══════════════════════════════════════════════════════════════
// Seal with Kiss - REFRESHED: Return to Front and Reset
// ═══════════════════════════════════════════════════════════════
function sealWithKiss() {
    const inviteCard = document.getElementById('inviteCard');
    const mainContent = document.getElementById('main-content');
    const gate = document.getElementById('entry-gate');
    const invitationWrap = document.getElementById('invitationWrap');
    const star = document.getElementById('wishStar');
    const wishMsg = document.getElementById('wishMsg');
    const wishText = document.getElementById('wishText');
    const noBtn = document.getElementById('noBtn');
    const dateChoices = document.getElementById('dateChoices');
    const sealBtn = document.getElementById('sealBtn');
    const glassCard = document.querySelector('.wish-glass-card');

    if (inviteCard) {
        // 1. Flip back to front with kiss effect
        inviteCard.style.transition = 'transform 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        inviteCard.classList.remove('flipped');
        createHeartBurst(inviteCard);
        
        // 2. Wait for flip animation to finish, then fade out and reset
        setTimeout(() => {
            mainContent.style.transition = 'opacity 1.5s ease';
            mainContent.style.opacity = '0';
            
            setTimeout(() => {
                // RESET ALL STATES FOR REPLAY
                mainContent.classList.remove('content-visible');
                mainContent.classList.add('content-hidden');
                invitationWrap.classList.remove('show-invite');
                star.classList.remove('star-ascend');
                wishMsg.classList.remove('visible');
                wishText.style.opacity = '1';
                
                // Reset Glass Card styles
                if (glassCard) {
                    glassCard.style.boxShadow = '';
                    glassCard.style.borderColor = '';
                }

                // Reset card internal logic (No button, date choices)
                if(noBtn) noBtn.style.display = 'inline-block';
                if(dateChoices) dateChoices.classList.add('hidden');
                if(sealBtn) sealBtn.classList.remove('show');

                // Return to Gate
                gate.classList.remove('hidden');
                gate.style.opacity = '1';
                
                // Clean up opacity for next entry
                mainContent.style.opacity = '1';
                inviteCard.style.transition = '';
                window.scrollTo(0, 0); // Reset scroll position
            }, 1500);
        }, 1500);
    }
}

// ═══════════════════════════════════════════════════════════════
// Heart Burst Effect
// ═══════════════════════════════════════════════════════════════
function createHeartBurst(element) {
    const hearts = ['❤️', '💕', '💖', '💗', '💓'];
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = '2rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '10001';
        heart.style.transition = 'all 1.5s ease-out';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            const angle = (i / 12) * Math.PI * 2;
            const x = Math.cos(angle) * 150;
            const y = Math.sin(angle) * 150;
            heart.style.transform = `translate(${x}px, ${y}px) scale(0)`;
            heart.style.opacity = '0';
        }, 10);
        
        setTimeout(() => { heart.remove(); }, 1600);
    }
}

// ═══════════════════════════════════════════════════════════════
// Accessibility
// ═══════════════════════════════════════════════════════════════
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.memory-modal');
        modals.forEach(m => { if (m.style.display === 'flex') closeModal(m.id); });
    }
});