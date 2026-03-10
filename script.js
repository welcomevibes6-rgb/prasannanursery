document.addEventListener('DOMContentLoaded', () => {
    // --------------- STICKY HEADER ---------------
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // --------------- MOBILE MENU TOGGLE ---------------
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Toggle icon between bars and times
            const icon = mobileBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --------------- HERO SLIDESHOW ---------------
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length > 1) {
        setInterval(nextSlide, 8000); // Change slide every 8 seconds
    }

    // --------------- SCROLL & LOAD ANIMATIONS ---------------
    // Elements to animate on load
    setTimeout(() => {
        document.querySelectorAll('.fade-in-up, .fade-in-up-line-1, .fade-in-up-line-2, .fade-in-up-line-3, .fade-in-up-delay').forEach(el => {
            el.classList.add('appear');
        });
    }, 100);

    // Elements to animate on scroll
    const scrollElements = document.querySelectorAll('.fade-up-scroll');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };

    const displayScrollElement = (element) => {
        element.classList.add('appear');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.1)) {
                displayScrollElement(el);
            }
        });
        // Handle letter animations if in view
        ['about-heading', 'plants-heading'].forEach(id => {
            const heading = document.getElementById(id);
            if (heading && !heading.classList.contains('animated') && elementInView(heading, 1.1)) {
                heading.classList.add('animated');
                animateLetters(heading);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    // Trigger once on load
    handleScrollAnimation();

    // --------------- LETTER ANIMATIONS ---------------
    function animateLetters(element) {
        const htmlContent = element.innerHTML;
        element.innerHTML = '';
        const parts = htmlContent.split(/(<br\s*\/?>)/i);

        let delay = 0;
        const delayIncr = element.id === 'about-heading' ? 50 : 60; // 0.05s or 0.06s
        const spanClass = element.id === 'about-heading' ? 'highlight-letter-color' : 'highlight-letter-slide';

        parts.forEach(part => {
            if (part.toLowerCase().includes('<br')) {
                element.innerHTML += '<br>';
                return;
            }
            // Parse text
            const chars = part.split('');
            chars.forEach(char => {
                if (char === ' ') {
                    element.innerHTML += ' ';
                    return;
                }
                const span = document.createElement('span');
                span.textContent = char;
                span.className = spanClass;
                // Add initial specific color/style based on type
                if (element.id === 'about-heading') {
                    span.style.color = '#7BAE3B';
                }

                element.appendChild(span);

                setTimeout(() => {
                    if (element.id === 'about-heading') {
                        span.style.color = '#1B5E20';
                    } else {
                        span.classList.add('appear');
                    }
                }, delay);

                delay += delayIncr;
            });
        });
    }

    // --------------- EXPERIENCE COUNTER ---------------
    const counterElement = document.getElementById('exp-counter');
    let counted = false;

    const runCounter = () => {
        if (!counterElement || counted) return;

        if (elementInView(counterElement, 1)) {
            counted = true;
            let currentTemp = 1;
            const target = 20;
            const duration = 2000; // 2 seconds
            const intervalTime = duration / target; // count 1 to 20

            const interval = setInterval(() => {
                counterElement.innerText = currentTemp;

                if (currentTemp === target) {
                    counterElement.innerText = currentTemp + '+';
                    clearInterval(interval);
                } else {
                    currentTemp++;
                }
            }, intervalTime);
        }
    };

    window.addEventListener('scroll', runCounter);
    runCounter(); // Check on load

    // --------------- PLANT GRID GENERATION ---------------
    // List of available images provided
    const availableImages = [
        "f1.jpg", "f10.jpg", "f100.jpg", "f101.jpg", "f103.jpg", "f105.jpg", "f107.jpg", "f108.jpg", "f109.jpg",
        "f11.jpg", "f110.jpg", "f111.jpg", "f112.jpg", "f113.jpg", "f114.jpg", "f115.jpg", "f116.jpg", "f117.jpg",
        "f118.jpg", "f119.jpg", "f12.jpg", "f122.jpg", "f123.jpg", "f124.jpg", "f13.jpg", "f139.jpg", "f14.jpg",
        "f140.jpg", "f141.jpg", "f142.jpg", "f144.jpg", "f145.jpg", "f146.jpg", "f147.jpg", "f148.jpg", "f15.jpg",
        "f151.jpg", "f152.jpg", "f154.jpg", "f155.jpg", "f16.jpg", "f17.jpg", "f18.jpg", "f19.jpg", "f2.jpg",
        "f20.jpg", "f21.jpg", "f23.jpg", "f24.jpg", "f25.jpg", "f26.jpg", "f27.jpg", "f28.jpg", "f29.jpg",
        "f3.jpg", "f30.jpg", "f31.jpg", "f32.jpg", "f34.jpg", "f35.jpg", "f36.jpg", "f37.jpg", "f38.jpg",
        "f39.jpg", "f4.jpg", "f40.jpg", "f41.jpg", "f42.jpg", "f43.jpg", "f44.jpg", "f45.jpg", "f46.jpg",
        "f47.jpg", "f48.jpg", "f49.jpg", "f5.jpg", "f50.jpg", "f52.jpg", "f53.jpg", "f54.jpg", "f55.jpg",
        "f56.jpg", "f57.jpg", "f58.jpg", "f59.jpg", "f6.jpg", "f60.jpg", "f61.jpg", "f63.jpg", "f64.jpg",
        "f66.jpg", "f67.jpg", "f68.jpg", "f7.jpg", "f70.jpg", "f71.jpg", "f72.jpg", "f73.jpg", "f74.jpg",
        "f76.jpg", "f77.jpg", "f78.jpg", "f8.jpg", "f80.jpg", "f81.jpg", "f82.jpg", "f83.jpg", "f84.jpg",
        "f85.jpg", "f87.jpg", "f88.jpg", "f89.jpg", "f9.jpg", "f90.jpg", "f91.jpg", "f92.jpg", "f94.jpg",
        "f95.jpg", "f96.jpg", "f97.jpg", "f98.jpg", "f99.jpg"
    ];

    const categories = ['fruit', 'indoor', 'flowering', 'cactus', 'air', 'outdoor'];
    const plantGrid = document.getElementById('plant-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (plantGrid) {
        // Generate 160 cards
        for (let i = 0; i < 160; i++) {
            // Cycle through available images
            const imgSrc = availableImages[i % availableImages.length];

            // Assign all plants to fruit category based on instructions
            let category = 'fruit';

            const card = document.createElement('div');
            card.classList.add('plant-card');
            card.setAttribute('data-category', category);

            // Format nice title
            let plantTitle = category.charAt(0).toUpperCase() + category.slice(1) + ' Plant ' + (i + 1);
            if (category === "fruit") plantTitle = "Fruit Variety " + (i + 1);

            card.innerHTML = `
                <img src="${imgSrc}" alt="${plantTitle}" class="plant-img" loading="lazy">
                <div class="plant-info">
                    <h3>${plantTitle}</h3>
                    <a href="https://wa.me/919848617948?text=Hi,%20I%20would%20like%20to%20get%20a%20quote%20for%20${encodeURIComponent(plantTitle)}" target="_blank" class="btn-card-quote">Get Quote on WhatsApp</a>
                </div>
            `;

            plantGrid.appendChild(card);
        }

        // Filtering logic
        const cards = document.querySelectorAll('.plant-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active class
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                cards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // --------------- MODAL POPUP LOGIC ---------------
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.modal-close');

    if (modal && modalImg) {
        document.querySelectorAll('.plant-img, .gallery-img').forEach(img => {
            img.style.cursor = 'pointer'; // Ensure it looks clickable
            img.addEventListener('click', function () {
                modal.classList.add('show');
                modalImg.src = this.src;
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('show');
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }

    // --------------- SMOOTH SCROLLING ---------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    mobileBtn.click();
                }

                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });
});
