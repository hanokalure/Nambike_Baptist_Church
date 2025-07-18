document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    // Hamburger menu toggle
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 140; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email) {
                alert('Please fill in your name and email.');
                return;
            }
            
            // Simulate form submission (replace with actual backend integration)
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('Thank you! We\'ll be in touch soon.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Map button functionality
    const mapButton = document.querySelector('.map-button');
    if (mapButton) {
        mapButton.addEventListener('click', function () {
            // Replace with actual church address coordinates
            const churchAddress = 'Nambike Baptist Church, Church Address Here';
            const encodedAddress = encodeURIComponent(churchAddress);
            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
            window.open(mapUrl, '_blank');
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.ministry-card, .event-card, .info-card, .about-content, .section-header');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Search functionality
    const searchIcon = document.getElementById('searchIcon');
    const searchField = document.getElementById('searchField');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');

    if (searchIcon && searchField && searchInput && searchClose) {
        // Open search field
        searchIcon.addEventListener('click', function () {
            searchField.classList.add('active');
            searchInput.focus();
        });

        // Close search field
        searchClose.addEventListener('click', function () {
            searchField.classList.remove('active');
            searchInput.value = '';
        });

        // Handle search input
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });

        // Close search field when clicking outside
        document.addEventListener('click', function (e) {
            if (!searchField.contains(e.target) && !searchIcon.contains(e.target)) {
                searchField.classList.remove('active');
                searchInput.value = '';
            }
        });

        // Search function
        function performSearch(query) {
            if (query.trim() === '') return;
            
            // Search through page content
            const searchableContent = [
                { text: 'About Us', link: '#about' },
                { text: 'Ministries', link: '#ministry' },
                { text: 'Events', link: '#events' },
                { text: 'Plan Your Visit', link: '#visit' },
                { text: 'Youth Ministry', link: '#ministry' },
                { text: 'Worship Team', link: '#ministry' },
                { text: 'Outreach', link: '#ministry' },
                { text: 'Bible Study', link: '#ministry' },
                { text: 'Prayer Team', link: '#ministry' },
                { text: 'Women Ministry', link: '#ministry' },
                { text: 'Christmas Eve Service', link: '#events' },
                { text: 'New Year Prayer Service', link: '#events' },
                { text: 'Bible Study Kickoff', link: '#events' },
                { text: 'Service Times', link: '#visit' },
                { text: 'Contact', link: '#visit' },
                { text: 'Children Ministry', link: '#visit' }
            ];

            const results = searchableContent.filter(item => 
                item.text.toLowerCase().includes(query.toLowerCase())
            );

            if (results.length > 0) {
                // Navigate to first result
                const targetSection = document.querySelector(results[0].link);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 140;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                // Show search results
                setTimeout(() => {
                    alert(`Found ${results.length} result(s):\n${results.map(r => r.text).join('\n')}`);
                }, 1000);
            } else {
                alert('No results found for: ' + query);
            }

            // Close search field
            searchField.classList.remove('active');
            searchInput.value = '';
        }
    }

    // Add active class to current navigation item
    function updateActiveNavItem() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-bottom .nav-right a[href^="#"]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Update active nav item on scroll
    window.addEventListener('scroll', updateActiveNavItem);
    
    // Initial call
    updateActiveNavItem();
});
