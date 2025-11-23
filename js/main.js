function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-list a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('.section, .news-card, .card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

let slideIndex = 1;
let slideTimer;

function initSlider() {
    showSlide(slideIndex);
    slideTimer = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    if (!slides.length) return;

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    slides[slideIndex - 1].classList.add('active');
    dots[slideIndex - 1].classList.add('active');
}

function changeSlide(n) {
    clearInterval(slideTimer);
    slideIndex += n;
    showSlide(slideIndex);
    slideTimer = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function currentSlide(n) {
    clearInterval(slideTimer);
    slideIndex = n;
    showSlide(slideIndex);
    slideTimer = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    setActiveNavLink();
    initSmoothScroll();
    initScrollAnimations();
    
    if (document.getElementById('heroSlider')) {
        initSlider();
    }
});