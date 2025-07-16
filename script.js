// Smooth Scroll for anchor links
const navLinks = document.querySelectorAll('a.nav-link');
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

// Testimonial Carousel (autoplay)
const testimonialCarousel = document.getElementById('testimonialCarousel');
if (testimonialCarousel) {
    const carousel = new bootstrap.Carousel(testimonialCarousel, {
        interval: 5000,
        pause: 'hover'
    });
}
