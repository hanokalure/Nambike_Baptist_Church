document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    // Hamburger menu toggle
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    const allNavLinks = document.querySelectorAll('.nav-top a, .nav-bottom a, .nav-right a, .dropdown-menu a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // If About Us dropdown toggle, let dropdown logic handle
            if (this.classList.contains('dropdown-toggle')) return;
            // If anchor link (starts with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 140;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            } else if (href && href.endsWith('.html')) {
                // If .html link, go to page
                window.location.href = href;
                return;
            } else if (href && href.startsWith('http')) {
                // External link, let default
                return;
            }
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
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

    // Slide-to-left effect for see-you-section (service name and time)
    const seeYouServiceNames = [
      'Sunday School',
      'Sunday Service',
      'Wednesday Bible Study'
    ];
    const seeYouServiceTimes = [
      '10am',
      '11am',
      '7pm'
    ];
    const seeYouServiceName = document.getElementById('seeYouServiceName');
    const seeYouServiceTime = document.getElementById('seeYouServiceTime');
    let seeYouMsgIdx = 0;

    function showSeeYouMessage(idx) {
      if (!seeYouServiceName || !seeYouServiceTime) return;
      // Remove previous animation classes
      [seeYouServiceName, seeYouServiceTime].forEach(el => {
        el.classList.remove('slide-in-left', 'slide-out-left');
      });
      // Slide out to left
      seeYouServiceName.classList.add('slide-out-left');
      seeYouServiceTime.classList.add('slide-out-left');
      setTimeout(() => {
        // Update text
        if (idx === 2) { // Wednesday Bible Study
          seeYouServiceName.textContent = '';
          seeYouServiceTime.innerHTML = `Wednesday Bible Study <i class='fa-solid fa-clock'></i> 7pm`;
        } else {
          seeYouServiceName.textContent = seeYouServiceNames[idx];
          seeYouServiceTime.innerHTML = `<i class='fa-solid fa-clock'></i> ${seeYouServiceTimes[idx]}`;
        }
        // Instantly reset slide
        [seeYouServiceName, seeYouServiceTime].forEach(el => {
          el.classList.remove('slide-out-left');
          el.classList.add('slide-in-left');
        });
      }, 500);
    }

    function startSeeYouSlider() {
      showSeeYouMessage(seeYouMsgIdx);
      setInterval(() => {
        seeYouMsgIdx = (seeYouMsgIdx + 1) % seeYouServiceNames.length;
        showSeeYouMessage(seeYouMsgIdx);
      }, 2000);
    }

    if (seeYouServiceName && seeYouServiceTime) {
      // Initial state
      seeYouServiceName.style.transform = 'translateX(0)';
      seeYouServiceName.style.opacity = 1;
      seeYouServiceTime.style.transform = 'translateX(0)';
      seeYouServiceTime.style.opacity = 1;
      startSeeYouSlider();
    }

    // Read More / Show Less for about-belief section
    document.querySelectorAll('.readmore-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-target');
        const content = document.getElementById(targetId);
        if (content) {
          const expanded = content.classList.toggle('expanded');
          this.textContent = expanded ? 'Show Less' : 'Read More';
        }
      });
    });

    // The Truth Modal logic
    const theTruthLink = document.getElementById('theTruthLink');
    const theTruthModal = document.getElementById('theTruthModal');
    const theTruthModalClose = document.getElementById('theTruthModalClose');

    if (theTruthLink && theTruthModal && theTruthModalClose) {
      theTruthLink.addEventListener('click', function(e) {
        e.preventDefault();
        theTruthModal.classList.add('show');
        document.body.style.overflow = 'hidden';
      });
      theTruthModalClose.addEventListener('click', function() {
        theTruthModal.classList.remove('show');
        document.body.style.overflow = '';
      });
      theTruthModal.addEventListener('click', function(e) {
        if (e.target === theTruthModal) {
          theTruthModal.classList.remove('show');
          document.body.style.overflow = '';
        }
      });
      // ESC key closes modal
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && theTruthModal.classList.contains('show')) {
          theTruthModal.classList.remove('show');
          document.body.style.overflow = '';
        }
      });
    }

    // Animated About Us dropdown effect
    document.querySelectorAll('.dropdown-toggle').forEach(function(toggle) {
      toggle.style.pointerEvents = 'auto';
      toggle.addEventListener('click', function(e) {
        var parent = this.closest('.dropdown');
        var isAboutUs = this.textContent.toLowerCase().includes('about us');
        if (isAboutUs) {
          e.preventDefault();
          var isOpen = parent.classList.contains('dropdown-animated-open');
          // Close all other animated dropdowns
          document.querySelectorAll('.dropdown-animated-open').forEach(function(d) {
            if (d !== parent) d.classList.remove('dropdown-animated-open');
          });
          parent.classList.toggle('dropdown-animated-open');
        }
      });
    });
    // Close About Us dropdown if clicking outside
    document.addEventListener('click', function(e) {
      var isDropdown = e.target.closest('.dropdown');
      if (!isDropdown) {
        document.querySelectorAll('.dropdown-animated-open').forEach(function(d) {
          d.classList.remove('dropdown-animated-open');
        });
      }
    });

    // Standard dropdown hide/show: toggle .open on click, close others if opening
    document.querySelectorAll('.dropdown-toggle').forEach(function(toggle) {
      toggle.style.pointerEvents = 'auto';
      toggle.addEventListener('click', function(e) {
        var parent = this.closest('.dropdown');
        var isOpen = parent.classList.contains('open');
        if (!isOpen) {
          // Close other open dropdowns
          document.querySelectorAll('.dropdown.open').forEach(function(d) {
            if (d !== parent) d.classList.remove('open');
          });
        }
        parent.classList.toggle('open');
        // Prevent navigation for About Us toggle
        if (this.textContent.toLowerCase().includes('about us')) {
          e.preventDefault();
        }
      });
    });
    // Close dropdown if clicking outside (on both desktop and mobile)
    document.addEventListener('click', function(e) {
      var isDropdown = e.target.closest('.dropdown');
      if (!isDropdown) {
        document.querySelectorAll('.dropdown.open').forEach(function(d) {
          d.classList.remove('open');
        });
      }
    });

    // --- Three Things God Cannot Do: Auto play/pause video when in view ---
    (function() {
      var videoSection = document.querySelector('.three-things-section');
      var iframe = document.getElementById('threeThingsVideo');
      var player;
      function onYouTubeIframeAPIReady() {
        if (iframe) {
          player = new YT.Player(iframe, {
            events: {
              'onReady': function() {
                setupObserver();
              }
            }
          });
        }
      }
      function setupObserver() {
        if (!videoSection || !player) return;
        var observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              player.playVideo();
            } else {
              player.pauseVideo();
            }
          });
        }, { threshold: 0.5 });
        observer.observe(videoSection);
      }
      // Load YouTube IFrame API if not present
      if (!window.YT || !window.YT.Player) {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
      } else {
        onYouTubeIframeAPIReady();
      }
    })();
});
