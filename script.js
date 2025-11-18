
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
// DOM Elements
    const carousel = document.getElementById('carousel');
    const aboutSection = document.getElementById('aboutSection');
    const slides = document.querySelectorAll('#carousel > div > div');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // State variables
    let currentIndex = 0;
    let autoSlideInterval;
    let isAboutSectionVisible = false;
    let slideCount = 0;
    const totalSlides = slides.length;
    const slideDuration = 5000; // 5 seconds per slide
    const aboutDuration = 7000; // 7 seconds for about section
    
    // Initialize carousel
    function initCarousel() {
        updateCarousel();
        startAutoSlide();
        setupEventListeners();
    }
    
    // Update carousel position
    function updateCarousel() {
        const offset = -currentIndex * 100;
        document.querySelector('#carousel > div').style.transform = `translateX(${offset}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('bg-white', index === currentIndex);
            indicator.classList.toggle('bg-white/50', index !== currentIndex);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = (index + totalSlides) % totalSlides;
        updateCarousel();
        slideCount++;
        
        // After all slides have been shown once, show about section
        if (slideCount >= totalSlides && !isAboutSectionVisible) {
            showAboutSection();
        }
    }
    
    // Next slide
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    // Previous slide
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // Show about section
    function showAboutSection() {
        isAboutSectionVisible = true;
        slideCount = 0;
        
        // Fade out carousel and fade in about section
        carousel.classList.add('opacity-0', 'pointer-events-none');
        aboutSection.classList.remove('opacity-0', 'pointer-events-none');
        
        // After about duration, return to carousel
        setTimeout(() => {
            hideAboutSection();
        }, aboutDuration);
    }
    
    // Hide about section
    function hideAboutSection() {
        isAboutSectionVisible = false;
        
        // Fade out about section and fade in carousel
        aboutSection.classList.add('opacity-0', 'pointer-events-none');
        carousel.classList.remove('opacity-0', 'pointer-events-none');
        
        // Reset to first slide
        goToSlide(0);
    }
    
    // Auto slide functionality
    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            if (!isAboutSectionVisible) {
                nextSlide();
            }
        }, slideDuration);
    }
    
    // Event listeners setup
    function setupEventListeners() {
        // Navigation buttons
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
        
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
        
        // Indicators
        indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                const index = parseInt(indicator.getAttribute('data-index'));
                goToSlide(index);
                resetAutoSlide();
            });
        });
        
        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            if (!isAboutSectionVisible) {
                startAutoSlide();
            }
        });
    }
    
    // Reset auto slide timer
    function resetAutoSlide() {
        if (!isAboutSectionVisible) {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }
    }
    
    // Initialize everything
    initCarousel();
});
