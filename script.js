// ===========================
// EFN - European Football News
// JavaScript Functionality
// ===========================

// DOM Elements
const searchToggle = document.getElementById('searchToggle');
const menuToggle = document.getElementById('menuToggle');
const searchBar = document.getElementById('searchBar');
const mainNav = document.querySelector('.main-nav');
const standingsTabs = document.querySelectorAll('.standings-tab');
const standingsTables = document.querySelectorAll('.standings-table');
const newsCards = document.querySelectorAll('.news-card');
const newsletterForm = document.getElementById('newsletterForm');

// ===========================
// SEARCH BAR TOGGLE
// ===========================

searchToggle.addEventListener('click', () => {
    searchBar.classList.toggle('active');
});

// Close search bar when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-actions') && !e.target.closest('.search-bar')) {
        searchBar.classList.remove('active');
    }
});

// ===========================
// MOBILE MENU TOGGLE
// ===========================

menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-content') && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// ===========================
// STANDINGS TABS FUNCTIONALITY
// ===========================

standingsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const leagueId = tab.dataset.league;
        
        // Remove active class from all tabs and tables
        standingsTabs.forEach(t => t.classList.remove('active'));
        standingsTables.forEach(table => table.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding table
        tab.classList.add('active');
        document.querySelector(`.standings-table[data-league="${leagueId}"]`)?.classList.add('active');
    });
});

// ===========================
// TRANSFER ACTIVITY CHART (Chart.js)
// ===========================

function initChart() {
    const ctx = document.getElementById('transferChart');
    
    if (!ctx) return;
    
    const chartData = {
        labels: ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1'],
        datasets: [
            {
                label: 'Transfer Spending (Millions €)',
                data: [850, 720, 680, 590, 520],
                backgroundColor: [
                    'rgba(0, 214, 68, 0.8)',
                    'rgba(26, 255, 102, 0.8)',
                    'rgba(0, 170, 255, 0.8)',
                    'rgba(255, 100, 100, 0.8)',
                    'rgba(100, 150, 255, 0.8)'
                ],
                borderColor: [
                    'rgb(0, 214, 68)',
                    'rgb(26, 255, 102)',
                    'rgb(0, 170, 255)',
                    'rgb(255, 100, 100)',
                    'rgb(100, 150, 255)'
                ],
                borderWidth: 2,
                borderRadius: 6,
                hoverBackgroundColor: [
                    'rgba(0, 214, 68, 1)',
                    'rgba(26, 255, 102, 1)',
                    'rgba(0, 170, 255, 1)',
                    'rgba(255, 100, 100, 1)',
                    'rgba(100, 150, 255, 1)'
                ]
            }
        ]
    };
    
    const config = {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#b0b8c1',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1000,
                    ticks: {
                        color: '#7a8390',
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return '€' + value + 'M';
                        }
                    },
                    grid: {
                        color: 'rgba(58, 68, 81, 0.3)',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: '#b0b8c1',
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            }
        }
    };
    
    new Chart(ctx, config);
}

// ===========================
// NEWSLETTER FORM SUBMISSION
// ===========================

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (email) {
        // Show success message
        const btn = newsletterForm.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = '✓ Subscribed!';
        btn.style.background = 'linear-gradient(135deg, #00d644, #1aff66)';
        
        // Reset after 3 seconds
        setTimeout(() => {
            emailInput.value = '';
            btn.textContent = originalText;
            btn.style.background = '';
        }, 3000);
        
        // Here you would typically send the email to a backend service
        console.log('Newsletter signup:', email);
    }
});

// ===========================
// NEWS CARD ANIMATIONS
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

newsCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// ===========================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===========================
// ACTIVE NAV LINK HIGHLIGHTING
// ===========================

const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    // This would be connected to sections in a full implementation
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    // Set first link as active by default
    navLinks[0]?.classList.add('active');
});

// ===========================
// SEARCH FUNCTIONALITY
// ===========================

const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
        console.log('Searching for:', query);
        // In a real implementation, this would filter news cards or perform API call
        alert(`Searching for: "${query}"\n\nThis feature would connect to a backend search API.`);
        searchBar.classList.remove('active');
        searchInput.value = '';
    }
}

// ===========================
// LAZY LOAD IMAGES
// ===========================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// PAGE LOAD ANIMATIONS
// ===========================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===========================
// INITIALIZE CHART ON PAGE LOAD
// ===========================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChart);
} else {
    initChart();
}

// ===========================
// RESPONSIVE BREAKPOINT DETECTION
// ===========================

function detectBreakpoint() {
    const width = window.innerWidth;
    
    if (width <= 768) {
        document.body.classList.add('mobile');
        document.body.classList.remove('desktop');
    } else {
        document.body.classList.add('desktop');
        document.body.classList.remove('mobile');
    }
}

window.addEventListener('resize', detectBreakpoint);
detectBreakpoint();

// ===========================
// KEYBOARD NAVIGATION
// ===========================

document.addEventListener('keydown', (e) => {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        searchBar.classList.remove('active');
        mainNav.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// ===========================
// API INTEGRATION HELPERS
// ===========================

// These functions are placeholders for API calls that will connect to
// a backend football API like football-data.org, RapidAPI, or custom API

const APIHelpers = {
    // Fetch live scores
    getLiveScores: async function() {
        try {
            // Placeholder for actual API call
            // const response = await fetch('/api/live-scores');
            // const data = await response.json();
            console.log('Fetching live scores...');
        } catch (error) {
            console.error('Error fetching live scores:', error);
        }
    },

    // Fetch latest news
    getLatestNews: async function() {
        try {
            // Placeholder for actual API call
            // const response = await fetch('/api/news');
            // const data = await response.json();
            console.log('Fetching latest news...');
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    },

    // Fetch transfer news
    getTransferNews: async function() {
        try {
            // Placeholder for actual API call
            // const response = await fetch('/api/transfers');
            // const data = await response.json();
            console.log('Fetching transfer news...');
        } catch (error) {
            console.error('Error fetching transfers:', error);
        }
    },

    // Fetch league standings
    getStandings: async function(league) {
        try {
            // Placeholder for actual API call
            // const response = await fetch(`/api/standings/${league}`);
            // const data = await response.json();
            console.log('Fetching standings for:', league);
        } catch (error) {
            console.error('Error fetching standings:', error);
        }
    },

    // Fetch fixtures
    getFixtures: async function() {
        try {
            // Placeholder for actual API call
            // const response = await fetch('/api/fixtures');
            // const data = await response.json();
            console.log('Fetching fixtures...');
        } catch (error) {
            console.error('Error fetching fixtures:', error);
        }
    },

    // Fetch top scorers
    getTopScorers: async function() {
        try {
            // Placeholder for actual API call
            // const response = await fetch('/api/scorers');
            // const data = await response.json();
            console.log('Fetching top scorers...');
        } catch (error) {
            console.error('Error fetching scorers:', error);
        }
    }
};

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Format time ago
function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    
    return Math.floor(seconds) + ' seconds ago';
}

// Truncate text
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

// ===========================
// CONSOLE WELCOME MESSAGE
// ===========================

console.log('%c🎉 Welcome to EFN - European Football News!', 
    'font-size: 20px; color: #00d644; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
console.log('%cVersion 1.0.0', 
    'font-size: 12px; color: #1aff66; font-weight: bold;');
console.log('%cFeel free to integrate with your favorite football API!', 
    'font-size: 12px; color: #b0b8c1; font-style: italic;');

// ===========================
// EXPORT FOR USE IN OTHER MODULES
// ===========================

window.EFN = {
    APIHelpers,
    formatDate,
    timeAgo,
    truncateText,
    performSearch
};
