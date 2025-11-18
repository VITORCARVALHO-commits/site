document.addEventListener('DOMContentLoaded', () => {
    // Interactive Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.createElement('div');
    lightbox.className = 'fixed inset-0 bg-black/90 z-50 flex items-center justify-center hidden';
    lightbox.innerHTML = `
        <div class="relative max-w-4xl w-full p-4">
            <button class="absolute top-4 right-4 text-white text-2xl z-50">&times;</button>
            <img id="lightbox-img" class="w-full h-auto max-h-[80vh] object-contain">
        </div>
    `;
    document.body.appendChild(lightbox);

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('src');
            const lightboxImg = document.getElementById('lightbox-img');
            lightboxImg.src = imgSrc;
            lightbox.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });

    lightbox.querySelector('button').addEventListener('click', () => {
        lightbox.classList.add('hidden');
        document.body.style.overflow = '';
    });

    // -------------------------------------------------------
    //                CARROSSEL COM PAUSE ON HOVER
    // -------------------------------------------------------

    const carousel = document.getElementById('carousel');
    const aboutSection = document.getElementById('aboutSection');
    const slides = document.querySelectorAll('#carousel > div > div');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentIndex = 0;
    let slideCount = 0;
    let isAboutSectionVisible = false;

    const totalSlides = slides.length;
    const slideDuration = 5000; // tempo por slide
    const aboutDuration = 7000;

    let autoSlideInterval; // intervalo autoplay

    // Atualizar carrossel
    function updateCarousel() {
        const offset = -currentIndex * 100;
        document.querySelector('#carousel > div').style.transform = `translateX(${offset}%)`;

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('bg-white', index === currentIndex);
            indicator.classList.toggle('bg-white/50', index !== currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = (index + totalSlides) % totalSlides;
        updateCarousel();
        slideCount++;

        if (slideCount >= totalSlides && !isAboutSectionVisible) {
            showAboutSection();
        }
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function showAboutSection() {
        isAboutSectionVisible = true;
        slideCount = 0;

        carousel.classList.add('opacity-0', 'pointer-events-none');
        aboutSection.classList.remove('opacity-0', 'pointer-events-none');

        setTimeout(() => hideAboutSection(), aboutDuration);
    }

    function hideAboutSection() {
        isAboutSectionVisible = false;

        aboutSection.classList.add('opacity-0', 'pointer-events-none');
        carousel.classList.remove('opacity-0', 'pointer-events-none');

        goToSlide(0);
    }

    // -------------------------------------------------------
    //                  AUTO SLIDE + PAUSE ON HOVER
    // -------------------------------------------------------

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (!isAboutSectionVisible) nextSlide();
        }, slideDuration);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Pausa ao passar o mouse
    carousel.addEventListener('mouseenter', () => {
        stopAutoSlide();
    });

    // Continua ao tirar o mouse
    carousel.addEventListener('mouseleave', () => {
        if (!isAboutSectionVisible) startAutoSlide();
    });

    // -------------------------------------------------------
    //                   EVENT LISTENERS
    // -------------------------------------------------------

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const index = parseInt(indicator.getAttribute('data-index'));
            goToSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // -------------------------------------------------------
    // Inicializar carrossel
    // -------------------------------------------------------
    updateCarousel();
    startAutoSlide();
});
