// ==================== DOM READY ====================
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initMobileMenu();
    initMenuTabs();
    initNavbarScroll();
    initChefRecommends();
});

// ==================== THEME TOGGLE ====================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    
    // Check saved preference
    const savedTheme = localStorage.getItem('capri-theme');
    if (savedTheme === 'night') {
        body.classList.remove('day-mode');
        body.classList.add('night-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    
    themeToggle.addEventListener('click', function() {
        const isNight = body.classList.contains('night-mode');
        
        if (isNight) {
            body.classList.remove('night-mode');
            body.classList.add('day-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('capri-theme', 'day');
        } else {
            body.classList.remove('day-mode');
            body.classList.add('night-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('capri-theme', 'night');
        }
    });
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    document.body.appendChild(overlay);
    
    function openMenu() {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    mobileMenuToggle.addEventListener('click', openMenu);
    mobileMenuClose.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    
    mobileLinks.forEach(function(link) {
        link.addEventListener('click', closeMenu);
    });
}

// ==================== MENU TABS ====================
function initMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active tab
            menuTabs.forEach(function(t) {
                t.classList.remove('active');
            });
            this.classList.add('active');
            
            // Filter items with smooth fade
            menuItems.forEach(function(item) {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.classList.remove('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(function() {
                        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(function() {
                        item.classList.add('hidden');
                    }, 400);
                }
            });
        });
    });
}

// ==================== NAVBAR SCROLL ====================
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ==================== CHEF RECOMMENDS ROTATION ====================
function initChefRecommends() {
    const recommendations = [
        {
            item: 'Seafood Platter',
            desc: 'A coastal feast inspired by island living — fresh prawns, calamari, and line fish grilled to perfection.'
        },
        {
            item: 'Flame-Grilled T-Bone',
            desc: '500g of prime aged beef, seared over open flames and basted with our signature herb butter.'
        },
        {
            item: 'Sunset Mojito',
            desc: 'White rum, fresh lime, brown sugar, and hand-crushed mint. The perfect sundowner companion.'
        }
    ];
    
    let currentIndex = 0;
    const itemEl = document.getElementById('chefRecommendItem');
    const descEl = document.getElementById('chefRecommendDesc');
    
    if (!itemEl || !descEl) return;
    
    setInterval(function() {
        currentIndex = (currentIndex + 1) % recommendations.length;
        
        // Fade out
        itemEl.style.opacity = '0';
        descEl.style.opacity = '0';
        
        setTimeout(function() {
            itemEl.textContent = recommendations[currentIndex].item;
            descEl.textContent = recommendations[currentIndex].desc;
            
            // Fade in
            itemEl.style.transition = 'opacity 0.5s ease';
            descEl.style.transition = 'opacity 0.5s ease';
            itemEl.style.opacity = '1';
            descEl.style.opacity = '1';
        }, 500);
    }, 8000);
}

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

