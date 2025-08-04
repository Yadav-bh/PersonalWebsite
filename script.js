// Language translations
const translations = {
    en: {
        // Navbar
        'home': 'Home',
        'about': 'About',
        'education': 'Education',
        'portfolio': 'Portfolio',
        'blog': 'Blog',
        'testimonials': 'Testimonials',
        'contact': 'Contact',
        
        // Hero Section
        'hero_title': 'Yadav Bhandari',
        'hero_subtitle': 'NEPSE Investment Expert | Stock Market Trader | Financial Advisor',
        'view_portfolio': 'View Portfolio',
        'get_in_touch': 'Get in Touch',
        
        // About Section
        'about_me': 'About Me',
        'about_text': 'I am a passionate NEPSE investment expert with years of experience in the stock market...',
        
        // Education Dropdown
        'commercial_banks': 'Commercial Banks',
        'development_banks': 'Development Banks',
        'finance': 'Finance',
        'hotels': 'Hotels',
        'hydro_power': 'Hydro Power',
        'investment': 'Investment',
        'life_insurance': 'Life Insurance',
        'manufacturing': 'Manufacturing',
        'microfinance': 'Microfinance',
        'non_life_insurance': 'Non Life Insurance',
        'others': 'Others',
        'tradings': 'Tradings',
        
        // Contact Section
        'contact_me': 'Contact Me',
        'name_placeholder': 'Your Name',
        'email_placeholder': 'Your Email',
        'subject_placeholder': 'Subject',
        'message_placeholder': 'Your Message',
        'send_message': 'Send Message'
    },
    np: {
        // Navbar
        'home': 'गृहपृष्ठ',
        'about': 'मेरो बारेमा',
        'education': 'शिक्षा',
        'portfolio': 'पोर्टफोलियो',
        'blog': 'ब्लग',
        'testimonials': 'ग्राहक प्रतिक्रिया',
        'contact': 'सम्पर्क',
        
        // Hero Section
        'hero_title': 'यादव भण्डारी',
        'hero_subtitle': 'नेप्से लगानी विशेषज्ञ | शेयर बजार व्यापारी | वित्तीय सल्लाहकार',
        'view_portfolio': 'पोर्टफोलियो हेर्नुहोस्',
        'get_in_touch': 'सम्पर्क गर्नुहोस्',
        
        // About Section
        'about_me': 'मेरो बारेमा',
        'about_text': 'म नेप्से लगानी विशेषज्ञ हुँ र मेरो धेरै वर्षको शेयर बजारको अनुभव छ...',
        
        // Education Dropdown
        'commercial_banks': 'वाणिज्य बैंक',
        'development_banks': 'विकास बैंक',
        'finance': 'वित्त',
        'hotels': 'होटल',
        'hydro_power': 'जलविद्युत',
        'investment': 'लगानी',
        'life_insurance': 'जीवन बीमा',
        'manufacturing': 'उत्पादन',
        'microfinance': 'सूक्ष्मवित्त',
        'non_life_insurance': 'गैर-जीवन बीमा',
        'others': 'अन्य',
        'tradings': 'ट्रेडिङ',
        
        // Contact Section
        'contact_me': 'मलाई सम्पर्क गर्नुहोस्',
        'name_placeholder': 'तपाईंको नाम',
        'email_placeholder': 'तपाईंको इमेल',
        'subject_placeholder': 'विषय',
        'message_placeholder': 'तपाईंको सन्देश',
        'send_message': 'सन्देश पठाउनुहोस्'
    }
};

// Function to set the language
function setLanguage(lang) {
    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Update active state of language switcher
    document.querySelectorAll('.language-option').forEach(option => {
        if (option.dataset.lang === lang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

// Initialize language switcher and set default language
document.addEventListener('DOMContentLoaded', function() {
    // Set default language based on browser language or saved preference
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLanguage);

    // Initialize all dropdowns
    const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    const dropdownList = dropdownElementList.map(function(dropdownToggleEl) {
        return new bootstrap.Dropdown(dropdownToggleEl, {
            autoClose: true
        });
    });

    // Add click event listeners to language switcher buttons
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = e.target.dataset.lang;
            setLanguage(lang);
        });
    });

    // Add hover functionality for desktop (screens wider than 992px)
    if (window.innerWidth > 992) {
        const dropdownItems = document.querySelectorAll('.dropdown');
        
        dropdownItems.forEach(function(dropdown) {
            // Show on hover
            dropdown.addEventListener('mouseenter', function() {
                const dropdownToggle = this.querySelector('[data-bs-toggle="dropdown"]');
                const dropdownMenu = this.querySelector('.dropdown-menu');
                
                if (dropdownToggle && dropdownMenu) {
                    // Close any open dropdowns first
                    const openDropdowns = document.querySelectorAll('.dropdown.show');
                    openDropdowns.forEach(function(openDropdown) {
                        if (openDropdown !== dropdown) {
                            const openToggle = openDropdown.querySelector('[data-bs-toggle="dropdown"]');
                            // Social Sharing Functionality
                            function initSocialSharing() {
                                const shareWidget = document.querySelector('.social-share-widget');
                                if (!shareWidget) return;

                                // Get current page URL and title
                                const pageUrl = encodeURIComponent(window.location.href);
                                const pageTitle = encodeURIComponent(document.title);
                                
                                // Set up share links
                                const shareLinks = {
                                    facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
                                    twitter: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`,
                                    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
                                    whatsapp: `https://wa.me/?text=${pageTitle}%20${pageUrl}`
                                };

                                // Initialize counters from data attributes or localStorage
                                function initializeCounters() {
                                    const counters = shareWidget.querySelectorAll('.share-count[data-count]');
                                    counters.forEach(counter => {
                                        const count = localStorage.getItem(`share-${counter.closest('a').dataset.social}-count`) || 0;
                                        counter.textContent = count;
                                        counter.setAttribute('data-count', count);
                                    });
                                }

                                // Update counter in both UI and storage
                                function updateCounter(button, increment = true) {
                                    const counter = button.querySelector('.share-count');
                                    if (!counter || !counter.hasAttribute('data-count')) return;
                                    
                                    let count = parseInt(counter.getAttribute('data-count')) || 0;
                                    if (increment) {
                                        count++;
                                        counter.setAttribute('data-count', count);
                                        localStorage.setItem(`share-${button.dataset.social}-count`, count);
                                    }
                                    counter.textContent = count > 1000 ? (count / 1000).toFixed(1) + 'k' : count.toString();
                                }

                                // Add click handlers for share buttons
                                shareWidget.addEventListener('click', function(e) {
                                    e.preventDefault();
                                    const link = e.target.closest('a');
                                    if (!link) return;

                                    const socialType = link.getAttribute('data-social');
                                    
                                    if (socialType === 'link') {
                                        // Copy link to clipboard
                                        navigator.clipboard.writeText(window.location.href).then(() => {
                                            const countSpan = link.querySelector('.share-count');
                                            const originalText = countSpan.textContent;
                                            countSpan.textContent = 'Copied!';
                                            setTimeout(() => {
                                                countSpan.textContent = originalText;
                                            }, 2000);
                                        });
                                        return;
                                    }

                                    // Open share dialog for social networks
                                    if (shareLinks[socialType]) {
                                        const width = 600, height = 500;
                                        const left = (window.innerWidth - width) / 2;
                                        const top = (window.innerHeight - height) / 2;
                                        
                                        const shareWindow = window.open(
                                            shareLinks[socialType],
                                            'Share Dialog',
                                            `width=${width},height=${height},top=${top},left=${left}`
                                        );
                                        
                                        // Update counter when the share window is closed or after a short delay
                                        const checkWindow = setInterval(() => {
                                            if (shareWindow.closed) {
                                                clearInterval(checkWindow);
                                                updateCounter(link);
                                            }
                                        }, 500);
                                        
                                        // Fallback in case we can't detect window close
                                        setTimeout(() => {
                                            clearInterval(checkWindow);
                                            updateCounter(link);
                                        }, 2000);
                                    }
                                });

                                // Initialize counters when the page loads
                                initializeCounters();
                            }
                            if (openToggle) {
                                const bsDropdown = bootstrap.Dropdown.getInstance(openToggle);
                                if (bsDropdown) {
                                    bsDropdown.hide();
                                }
                            }
                        }
                    });
                    
                    // Show this dropdown
                    const bsDropdown = bootstrap.Dropdown.getInstance(dropdownToggle) || new bootstrap.Dropdown(dropdownToggle);
                    bsDropdown.show();
                }
            });

            // Close when mouse leaves the dropdown
            dropdown.addEventListener('mouseleave', function() {
                const dropdownToggle = this.querySelector('[data-bs-toggle="dropdown"]');
                if (dropdownToggle) {
                    const bsDropdown = bootstrap.Dropdown.getInstance(dropdownToggle);
                    if (bsDropdown) {
                        // Small delay to allow moving to the dropdown menu
                        setTimeout(() => {
                            const isHovering = this.matches(':hover') || 
                                            (this.querySelector('.dropdown-menu') && 
                                             this.querySelector('.dropdown-menu').matches(':hover'));
                            if (!isHovering) {
                                bsDropdown.hide();
                            }
                        }, 100);
                    }
                }
            });

            // Keep dropdown open when hovering over the menu
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.addEventListener('mouseenter', function() {
                    const parentDropdown = this.closest('.dropdown');
                    if (parentDropdown) {
                        const dropdownToggle = parentDropdown.querySelector('[data-bs-toggle="dropdown"]');
                        if (dropdownToggle) {
                            const bsDropdown = bootstrap.Dropdown.getInstance(dropdownToggle);
                            if (bsDropdown) {
                                bsDropdown.show();
                            }
                        }
                    }
                });

                dropdownMenu.addEventListener('mouseleave', function() {
                    const parentDropdown = this.closest('.dropdown');
                    if (parentDropdown) {
                        const dropdownToggle = parentDropdown.querySelector('[data-bs-toggle="dropdown"]');
                        if (dropdownToggle) {
                            const bsDropdown = bootstrap.Dropdown.getInstance(dropdownToggle);
                            if (bsDropdown) {
                                setTimeout(() => {
                                    if (!parentDropdown.matches(':hover') && !this.matches(':hover')) {
                                        bsDropdown.hide();
                                    }
                                }, 100);
                            }
                        }
                    }
                });
            }
        });
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.matches('.dropdown-toggle') && !event.target.closest('.dropdown-menu')) {
            const openDropdowns = document.querySelectorAll('.dropdown.show');
            openDropdowns.forEach(function(openDropdown) {
                const openToggle = openDropdown.querySelector('[data-bs-toggle="dropdown"]');
                if (openToggle) {
                    const bsDropdown = bootstrap.Dropdown.getInstance(openToggle);
                    if (bsDropdown) {
                        bsDropdown.hide();
                    }
                }
            });
        }
    });
});

// Smooth Scroll for anchor links
const navLinks = document.querySelectorAll('a.nav-link:not(.dropdown-toggle)');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.hash) {
            e.preventDefault();
            document.querySelector(this.hash).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Activate Bootstrap Scrollspy
const dataSpyList = [].slice.call(document.querySelectorAll('[data-bs-spy="scroll"]'));
dataSpyList.forEach(function (dataSpyEl) {
    bootstrap.ScrollSpy.getOrCreateInstance(dataSpyEl);
});

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();
        let valid = true;
        // Name
        const name = document.getElementById('name');
        if (!name.value.trim()) {
            name.classList.add('is-invalid');
            valid = false;
        } else {
            name.classList.remove('is-invalid');
        }
        // Email
        const email = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailPattern.test(email.value)) {
            email.classList.add('is-invalid');
            valid = false;
        } else {
            email.classList.remove('is-invalid');
        }
        // Message
        const message = document.getElementById('message');
        if (!message.value.trim()) {
            message.classList.add('is-invalid');
            valid = false;
        } else {
            message.classList.remove('is-invalid');
        }
        if (valid) {
            contactForm.reset();
            alert('Thank you for reaching out! I will get back to you soon.');
        }
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('section, .service-card, .portfolio-card, .blog-card');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            el.classList.add('animate');
        }
    });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Image Slider
const initImageSlider = () => {
    console.log('Initializing image slider...');
    const slider = document.getElementById('imageSlider');
    if (!slider) {
        console.error('Slider element not found!');
        return;
    }
    
    // Make sure slider container is visible for debugging
    slider.style.border = '2px solid red'; // Temporary for debugging
    console.log('Slider element found:', slider);

    // List of image filenames with full paths
    const images = [
        'download.jpg',
        'images (1).jpg',
        'images (2).jpg',
        'images (3).jpg',
        'images (4).jpg',
        'images (5).jpg',
        'images (6).jpg',
        'images (7).jpg',
        'images (8).jpg',
        'images (9).jpg',
        'images (10).jpg',
        'images.jpg',
        'download (1).jpeg',
        'download.jpeg',
        'images.png',
        'yadav.jpg.jpg'
    ];
    
    console.log('Found', images.length, 'images to display in slider');

    const sliderContainer = slider.querySelector('.slider-container');
    const dotsContainer = slider.querySelector('.slider-dots');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');
    
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 3000; // 3 seconds per slide (increased from 300ms)
    const transitionSpeed = 800; // Animation speed in milliseconds

    // Create slides
    images.forEach((image, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.style.display = index === 0 ? 'block' : 'none';
        
        const img = document.createElement('img');
        img.src = image;
        img.alt = `Slide ${index + 1}`;
        img.loading = 'eager'; // Changed from 'lazy' to 'eager' for immediate loading
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        
        // Add error handling for images
        img.onerror = function() {
            console.error('Failed to load image:', image);
            this.style.display = 'none';
        };
        
        img.onload = function() {
            console.log('Successfully loaded image:', image);
        };
        
        slide.appendChild(img);
        sliderContainer.appendChild(slide);

        // Create dot
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.dataset.slide = index;
        dot.title = `Go to slide ${index + 1}`;
        dotsContainer.appendChild(dot);
    });
    
    console.log('Created', images.length, 'slides in the slider');

    const slides = sliderContainer.querySelectorAll('.slide');
    const dots = dotsContainer.querySelectorAll('.slider-dot');
    const totalSlides = slides.length;

    // Function to show a specific slide
    const showSlide = (index) => {
        console.log('Showing slide', index);
        
        // Reset all slides and dots
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.style.display = 'block';
                slide.style.opacity = '1';
            } else {
                slide.style.display = 'none';
                slide.style.opacity = '0';
            }
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    };

    // Function to go to next slide
    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    };

    // Function to go to previous slide
    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    };

    // Start auto-sliding
    const startSlider = () => {
        slideInterval = setInterval(nextSlide, slideDuration);
    };

    // Stop auto-sliding
    const stopSlider = () => {
        clearInterval(slideInterval);
    };

    // Event Listeners
    nextBtn.addEventListener('click', () => {
        stopSlider();
        nextSlide();
        startSlider();
    });

    prevBtn.addEventListener('click', () => {
        stopSlider();
        prevSlide();
        startSlider();
    });

    // Click on dot to navigate to specific slide
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            stopSlider();
            showSlide(parseInt(dot.dataset.slide));
            startSlider();
        });
    });

    // Pause on hover
    slider.addEventListener('mouseenter', stopSlider);
    slider.addEventListener('mouseleave', startSlider);

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopSlider();
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startSlider();
    }, { passive: true });

    const handleSwipe = () => {
        const swipeThreshold = 50; // Minimum swipe distance
        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                nextSlide(); // Swipe left
            } else {
                prevSlide(); // Swipe right
            }
        }
    };

    // Show first slide and start the slider
    showSlide(0);
    startSlider();
};

// Function to open PDF without controls
function openPdf(pdfUrl) {
    // Create a modal dialog
    const modalId = 'pdfViewerModal';
    let modal = document.getElementById(modalId);
    
    // If modal doesn't exist, create it
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
        modal.style.zIndex = '9999';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        
        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '20px';
        closeBtn.style.right = '30px';
        closeBtn.style.color = 'white';
        closeBtn.style.fontSize = '40px';
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.cursor = 'pointer';
        closeBtn.onclick = function() {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        };
        
        // Create iframe for PDF
        const iframe = document.createElement('iframe');
        iframe.id = 'pdfFrame';
        iframe.style.width = '90%';
        iframe.style.height = '90%';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '8px';
        iframe.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
        
        // Add elements to modal
        modal.appendChild(closeBtn);
        modal.appendChild(iframe);
        
        // Add modal to body
        document.body.appendChild(modal);
        
        // Disable scrolling when modal is open
        document.body.style.overflow = 'hidden';
        
        // Close modal when clicking outside content
        modal.onclick = function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            }
        };
    }
    
    // Set PDF source with parameters to hide all controls
    const iframe = document.getElementById('pdfFrame');
    if (iframe) {
        iframe.src = `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;
    }
    
    // Show the modal
    modal.style.display = 'flex';
    
    // Prevent default link behavior
    return false;
}

// Initialize the slider when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initImageSlider();
});

// Testimonial Carousel (autoplay)
const testimonialCarousel = document.getElementById('testimonialCarousel');
if (testimonialCarousel) {
    const carousel = new bootstrap.Carousel(testimonialCarousel, {
        interval: 5000,
        pause: 'hover'
    });
}
