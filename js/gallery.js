function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    

    if (!filterBtns.length || !galleryItems.length) {
        console.log('Кнопки фільтрації або елементи галереї не знайдені');
        return;
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('Натиснуто кнопку:', this.getAttribute('data-filter'));


            filterBtns.forEach(b => b.classList.remove('active'));


            this.classList.add('active');

            const filter = this.getAttribute('data-filter');


            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all') {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else if (category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {

                    item.style.display = 'none';
                }
            });
        });
    });

    console.log('Фільтрація галереї ініціалізована');
}


function initImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const captionText = document.querySelector('.modal-caption');
    const closeBtn = document.querySelector('.modal-close');
    const galleryImages = document.querySelectorAll('.gallery-item img');


    if (!modal || !modalImg || !captionText || !closeBtn) {
        console.log('Елементи модального вікна не знайдені');
        return;
    }


    galleryImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            modalImg.src = this.src;
            modalImg.alt = this.alt;


            const overlay = this.nextElementSibling;
            if (overlay && overlay.classList.contains('gallery-overlay')) {
                const title = overlay.querySelector('h4');
                const desc = overlay.querySelector('p');

                if (title && desc) {
                    captionText.innerHTML = `<strong>${title.textContent}</strong><br>${desc.textContent}`;
                } else {
                    captionText.innerHTML = this.alt;
                }
            } else {
                captionText.innerHTML = this.alt;
            }
        });
    });


    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });

    console.log('Модальне вікно ініціалізовано');
}


function initScrollAnimation() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!galleryItems.length) {
        console.log('Елементи галереї для анімації не знайдені');
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    console.log('Анімація прокрутки ініціалізована');
}

function addGalleryStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }


        .gallery-item {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .gallery-item.hidden {
            display: none !important;
        }
    `;
    document.head.appendChild(style);
}


function updateFilterCounts() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        const filter = btn.getAttribute('data-filter');
        let count = 0;

        if (filter === 'all') {
            count = galleryItems.length;
        } else {
            galleryItems.forEach(item => {
                if (item.getAttribute('data-category') === filter) {
                    count++;
                }
            });
        }

        // Додаємо кількість до тексту кнопки
        const currentText = btn.textContent.split(' (')[0];
        btn.textContent = `${currentText} (${count})`;
    });
}


document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM завантажено, ініціалізація галереї...');

    addGalleryStyles();

    initGalleryFilter();
    initImageModal();
    initScrollAnimation();

    console.log('Галерея повністю ініціалізована');
});



function initGallerySearch() {
    const searchInput = document.getElementById('gallerySearch');
    if (!searchInput) return;

    const galleryItems = document.querySelectorAll('.gallery-item');

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();

        galleryItems.forEach(item => {
            const overlay = item.querySelector('.gallery-overlay');
            if (overlay) {
                const title = overlay.querySelector('h4').textContent.toLowerCase();
                const desc = overlay.querySelector('p').textContent.toLowerCase();

                if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            }
        });
    });
}