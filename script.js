// Sound Effects
let soundEnabled = true;
const clickSound = document.getElementById('click-sound');
const bgMusic = document.getElementById('bg-music');

function playClick() {
    if (soundEnabled && clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
    }
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    playClick();
    document.body.classList.toggle('light-mode');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Sound Toggle
const soundToggle = document.getElementById('sound-toggle');
soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    const icon = soundToggle.querySelector('i');
    icon.classList.toggle('fa-volume-up');
    icon.classList.toggle('fa-volume-mute');
    
    if (soundEnabled) {
        bgMusic.play().catch(() => {});
    } else {
        bgMusic.pause();
    }
});

// Particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}
createParticles();

// Mouse Trail
const canvas = document.getElementById('trail-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 20;

class TrailParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.life = 1;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.02;
        if (this.size > 0.2) this.size -= 0.1;
    }
    
    draw() {
        ctx.fillStyle = `rgba(0, 212, 255, ${this.life})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

document.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 3; i++) {
        particles.push(new TrailParticle(e.clientX, e.clientY));
    }
});

function animateTrail() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }
    
    requestAnimationFrame(animateTrail);
}
animateTrail();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Typing Effect
const texts = [
    '🚀 Base Portfolio Tracker',
    '💎 Track Your Crypto',
    '⚡ Real-Time Updates',
    '🔥 Coming Soon!'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeText() {
    const titleElement = document.getElementById('main-title');
    const currentText = texts[textIndex];
    
    if (!isDeleting) {
        titleElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            setTimeout(() => { isDeleting = true; }, pauseTime);
        }
    } else {
        titleElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
    }
    
    setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
}
typeText();

// Countdown Timer
const launchDate = new Date('2026-06-01T00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = launchDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    
    if (distance < 0) {
        document.querySelector('.countdown').innerHTML = '<h2>🎉 We\'re Live! 🎉</h2>';
    }
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Wallet Connect
const connectWalletBtn = document.getElementById('connect-wallet');
const walletInfo = document.getElementById('wallet-info');

connectWalletBtn.addEventListener('click', async () => {
    playClick();
    
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            
            document.getElementById('wallet-address').textContent = 
                account.substring(0, 6) + '...' + account.substring(account.length - 4);
            
            walletInfo.style.display = 'block';
            connectWalletBtn.textContent = '✅ Connected';
            connectWalletBtn.disabled = true;
            
            // Confetti on connect
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            
            // Fetch balances (mock data for demo)
            setTimeout(() => {
                document.getElementById('eth-balance').textContent = '1.234';
                document.getElementById('usdc-balance').textContent = '5,678.90';
                document.getElementById('weth-balance').textContent = '0.567';
            }, 1000);
            
        } catch (error) {
            alert('Failed to connect wallet: ' + error.message);
        }
    } else {
        alert('Please install MetaMask or another Web3 wallet!');
    }
});

// Price Ticker (Mock API)
async function updatePrices() {
    // Mock data - replace with real API
    const prices = {
        eth: (2500 + Math.random() * 100).toFixed(2),
        btc: (45000 + Math.random() * 1000).toFixed(2),
        ethChange: (Math.random() * 10 - 5).toFixed(2),
        btcChange: (Math.random() * 10 - 5).toFixed(2)
    };
    
    document.getElementById('eth-price').textContent = prices.eth;
    document.getElementById('btc-price').textContent = prices.btc;
    
    const ethChange = document.getElementById('eth-change');
    ethChange.textContent = (prices.ethChange > 0 ? '+' : '') + prices.ethChange + '%';
    ethChange.className = 'change ' + (prices.ethChange > 0 ? 'positive' : 'negative');
    
    const btcChange = document.getElementById('btc-change');
    btcChange.textContent = (prices.btcChange > 0 ? '+' : '') + prices.btcChange + '%';
    btcChange.className = 'change ' + (prices.btcChange > 0 ? 'positive' : 'negative');
}
updatePrices();
setInterval(updatePrices, 5000);

// Duplicate ticker content for seamless scroll
const tickerContent = document.querySelector('.ticker-content');
tickerContent.innerHTML += tickerContent.innerHTML;

// Portfolio Chart
const ctx2 = document.getElementById('portfolio-chart').getContext('2d');
const portfolioChart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Portfolio Value ($)',
            data: [10000, 12000, 11500, 15000, 14000, 18000],
            borderColor: '#00D4FF',
            backgroundColor: 'rgba(0, 212, 255, 0.1)',
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                labels: { color: 'white' }
            }
        },
        scales: {
            y: {
                ticks: { color: 'white' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            x: {
                ticks: { color: 'white' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
        }
    }
});

// Transaction History (Mock)
function loadTransactions() {
    const txList = document.getElementById('transactions-list');
    const mockTxs = [
        { type: 'Received', amount: '+0.5 ETH', time: '2 hours ago', hash: '0x1234...5678' },
        { type: 'Sent', amount: '-100 USDC', time: '5 hours ago', hash: '0xabcd...efgh' },
        { type: 'Swap', amount: '0.2 ETH → 500 USDC', time: '1 day ago', hash: '0x9876...5432' },
        { type: 'Received', amount: '+1000 USDC', time: '2 days ago', hash: '0xfedc...ba98' },
        { type: 'Sent', amount: '-0.1 WETH', time: '3 days ago', hash: '0x1111...2222' }
    ];
    
    setTimeout(() => {
        txList.innerHTML = mockTxs.map(tx => `
            <div class="transaction-item">
                <div>
                    <strong>${tx.type}</strong>
                    <div style="font-size: 0.9rem; opacity: 0.7;">${tx.hash}</div>
                </div>
                <div style="text-align: right;">
                    <strong>${tx.amount}</strong>
                    <div style="font-size: 0.9rem; opacity: 0.7;">${tx.time}</div>
                </div>
            </div>
        `).join('');
    }, 1500);
}
loadTransactions();

// Waitlist Form
const waitlistForm = document.getElementById('waitlist-form');
const formMessage = document.getElementById('form-message');

waitlistForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    playClick();
    
    const email = document.getElementById('email').value;
    
    // Mock submission - replace with real API
    formMessage.textContent = '⏳ Submitting...';
    formMessage.style.color = '#00D4FF';
    
    setTimeout(() => {
        formMessage.textContent = '✅ Success! You\'re on the waitlist!';
        formMessage.style.color = '#22c55e';
        waitlistForm.reset();
        
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 }
        });
    }, 1500);
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        playClick();
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Testimonials Slider
let currentSlide = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    testimonials.forEach(t => t.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showSlide(currentSlide);
}

// Auto-advance slides
setInterval(nextSlide, 5000);

// Manual dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        playClick();
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Social Links Click Sound
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        playClick();
        e.preventDefault();
        alert('Social link coming soon!');
    });
});

// Confetti on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }, 500);
});

// Add click sound to all buttons
document.querySelectorAll('button, .btn-primary').forEach(btn => {
    btn.addEventListener('click', playClick);
});

console.log('🚀 Base Portfolio Tracker loaded successfully!');
console.log('💎 Built with love for Base chain');
console.log('⚡ All features active!');