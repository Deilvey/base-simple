// Price Ticker Animation
const ticker = document.querySelector('.ticker');
if (ticker) {
    ticker.innerHTML += ticker.innerHTML; // Duplicate for seamless loop
}

// Price Updates
function updatePrices() {
    const prices = {
        eth: (2500 + Math.random() * 100).toFixed(2),
        btc: (45000 + Math.random() * 1000).toFixed(2),
        doge: (0.15 + Math.random() * 0.05).toFixed(4),
        pepe: (0.000012 + Math.random() * 0.000005).toFixed(8),
        brett: (0.085 + Math.random() * 0.03).toFixed(4),
        toshi: (0.00045 + Math.random() * 0.0002).toFixed(6),
        ethChange: (Math.random() * 10 - 5).toFixed(1),
        btcChange: (Math.random() * 10 - 5).toFixed(1),
        dogeChange: (Math.random() * 20 - 10).toFixed(1),
        pepeChange: (Math.random() * 30 - 15).toFixed(1),
        brettChange: (Math.random() * 40 - 20).toFixed(1),
        toshiChange: (Math.random() * 35 - 17).toFixed(1)
    };

    // Update prices
    const updates = [
        { id: 'eth-price', value: `$${prices.eth}` },
        { id: 'btc-price', value: `$${prices.btc}` },
        { id: 'doge-price', value: `$${prices.doge}` },
        { id: 'pepe-price', value: `$${prices.pepe}` },
        { id: 'brett-price', value: `$${prices.brett}` },
        { id: 'toshi-price', value: `$${prices.toshi}` }
    ];

    updates.forEach(update => {
        const el = document.getElementById(update.id);
        if (el) el.textContent = update.value;
    });

    // Update changes
    const changes = [
        { id: 'eth-change', value: prices.ethChange },
        { id: 'btc-change', value: prices.btcChange },
        { id: 'doge-change', value: prices.dogeChange },
        { id: 'pepe-change', value: prices.pepeChange },
        { id: 'brett-change', value: prices.brettChange },
        { id: 'toshi-change', value: prices.toshiChange }
    ];

    changes.forEach(change => {
        const el = document.getElementById(change.id);
        if (el) {
            const val = parseFloat(change.value);
            el.textContent = `${val > 0 ? '+' : ''}${change.value}%`;
            el.className = 'ticker-change ' + (val > 0 ? 'positive' : val < 0 ? 'negative' : 'neutral');
        }
    });
}

updatePrices();
setInterval(updatePrices, 5000);

// Connect Wallet
const connectBtn = document.getElementById('connect-btn');
if (connectBtn) {
    connectBtn.addEventListener('click', async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ 
                    method: 'eth_requestAccounts' 
                });
                const account = accounts[0];
                const short = `${account.slice(0, 6)}...${account.slice(-4)}`;
                connectBtn.innerHTML = `<i class="fas fa-check-circle"></i><span>${short}</span>`;
                connectBtn.style.background = 'rgba(16, 185, 129, 0.1)';
                connectBtn.style.borderColor = '#10b981';
                connectBtn.style.color = '#10b981';
            } catch (error) {
                console.error('Connection failed:', error);
            }
        } else {
            alert('Please install MetaMask or another Web3 wallet');
        }
    });
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all
        faqItems.forEach(i => i.classList.remove('active'));
        
        // Open clicked if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 72; // navbar height
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
    }
    
    lastScroll = currentScroll;
});

console.log('Base Portfolio Tracker loaded');
console.log('Built with ❤️ on Base chain');