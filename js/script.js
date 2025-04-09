// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation highlight for active section
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Add smooth scrolling to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update URL hash without scrolling
            history.pushState(null, null, targetId);
        });
    });

    // Function to highlight active nav item based on scroll position
    function highlightNav() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');
            
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if(link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', highlightNav);
    
    // Initial call to highlight the current section
    highlightNav();

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image img');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        if(heroSection.offsetTop - scrollTop < window.innerHeight && scrollTop < heroSection.offsetTop + heroSection.offsetHeight) {
            heroImage.style.transform = `perspective(800px) rotateY(-8deg) translateY(${scrollTop * 0.1}px)`;
        }
    });

    // Screenshot hover effect
    const screenshots = document.querySelectorAll('.screenshot');
    
    screenshots.forEach(screenshot => {
        screenshot.addEventListener('mouseenter', function() {
            screenshots.forEach(s => {
                if(s !== screenshot) {
                    s.style.opacity = '0.7';
                    s.style.transform = 'scale(0.98)';
                }
            });
        });
        
        screenshot.addEventListener('mouseleave', function() {
            screenshots.forEach(s => {
                s.style.opacity = '1';
                s.style.transform = '';
            });
        });
    });

    // Add a download counter for analytics (simulated)
    const downloadButton = document.querySelector('.download-link');
    if (downloadButton) {
        downloadButton.addEventListener('click', function(e) {
            // In a real-world scenario, this would send analytics data to a server
            console.log('Download clicked!');
            
            // For demo purposes, show a small notification
            const notification = document.createElement('div');
            notification.className = 'download-notification';
            notification.textContent = 'Starting download...';
            
            document.body.appendChild(notification);
            
            // Remove the notification after 3 seconds
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 3000);
        });
    }

    // Add stars particles effect
    createStars();

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinksMobile = document.getElementById('nav-links');
    
    // Toggle mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinksMobile.classList.toggle('active');
            const isOpen = navLinksMobile.classList.contains('active');
            mobileMenuToggle.innerHTML = isOpen ? 
                '<i class="fas fa-times"></i>' : 
                '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItemsMobile = document.querySelectorAll('.nav-links a');
    navItemsMobile.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 600) {
                navLinksMobile.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Highlight active nav item on scroll
    const sectionsMobile = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let scrollYMobile = window.pageYOffset;
        
        sectionsMobile.forEach(section => {
            const sectionHeightMobile = section.offsetHeight;
            const sectionTopMobile = section.offsetTop - 100;
            const sectionIdMobile = section.getAttribute('id');
            
            if (scrollYMobile > sectionTopMobile && scrollYMobile <= sectionTopMobile + sectionHeightMobile) {
                document.querySelector('.nav-links a[href*=' + sectionIdMobile + ']').classList.add('active');
            } else {
                document.querySelector('.nav-links a[href*=' + sectionIdMobile + ']').classList.remove('active');
            }
        });
    });
    
    // Add parallax effect to hero section
    const heroImgMobile = document.querySelector('.hero-image img');
    if (heroImgMobile) {
        window.addEventListener('mousemove', (e) => {
            const xMobile = e.clientX / window.innerWidth;
            const yMobile = e.clientY / window.innerHeight;
            
            heroImgMobile.style.transform = `perspective(800px) rotateY(${xMobile * 10 - 5}deg) rotateX(${yMobile * -5 + 2.5}deg)`;
        });
    }
    
    // Animate screenshots on hover
    const screenshotsMobile = document.querySelectorAll('.screenshot');
    screenshotsMobile.forEach(screenshot => {
        screenshot.addEventListener('mouseenter', () => {
            screenshot.style.transform = 'translateY(-10px)';
        });
        
        screenshot.addEventListener('mouseleave', () => {
            screenshot.style.transform = 'translateY(0)';
        });
    });
});

// Function to create random stars in the background
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const numberOfStars = 100;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 3;
        
        // Random opacity
        const opacity = Math.random() * 0.8 + 0.2;
        
        // Random twinkle animation delay
        const delay = Math.random() * 5;
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.opacity = opacity;
        star.style.animationDelay = `${delay}s`;
        
        starsContainer.appendChild(star);
    }
}

// Add CSS for the download notification
const style = document.createElement('style');
style.textContent = `
    .download-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(45deg, #6C14F0, #5DE0E6);
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        box-shadow: 0 0 20px rgba(93, 224, 230, 0.5);
        z-index: 1000;
        font-family: 'Orbitron', sans-serif;
        transition: opacity 0.5s ease;
    }
    
    .star {
        position: absolute;
        background: white;
        border-radius: 50%;
        animation: twinkle 5s infinite ease-in-out;
    }
    
    @keyframes twinkle {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Detect if the browser is Internet Explorer
function isIE() {
    const ua = window.navigator.userAgent;
    return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
}

// Show a warning for IE users
if (isIE()) {
    alert('You are using Internet Explorer, which is not fully supported. For the best experience, please use a modern browser like Chrome, Firefox, or Edge.');
} 