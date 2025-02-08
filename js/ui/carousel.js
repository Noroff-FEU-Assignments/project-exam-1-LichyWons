/*import {fetchData} from '../api/fetch-posts.js';

let currentSlide = 0;
let slideWidth;
let visibleSlidesCount = 1;

export const loadCarouselPosts = async (elements) => {
    if (!elements.track || !elements.nextButton || !elements.prevButton) return;

    try {
        const posts = await fetchData('https://www.krzysztofbytniewski.com/wp-json/wp/v2/posts?_embed&per_page=10');

        if (!posts) {
            throw new Error("Fetching carousel posts failed!");
        }

        elements.track.innerHTML = '';
        for (const post of posts) {
            const slide = await createSlide(post);
            elements.track.appendChild(slide);
        }

        updateSlideWidth(elements.track);
        calculateVisibleSlides(elements);
        updateButtonVisibility(elements, posts.length);
        positionSlides(elements.track);

    } catch (error) {
        console.error("Error loadind carousel posts", error);
        alert("No posts for you today, sunshine. Sorry!!!");
    }
};

const createSlide = async (post) => {
    const slide = document.createElement('li');
    slide.classList.add('carousel-slide');

    const extractImageSrc = (htmlContent) => {
        const match = htmlContent.match(/<img.*?src=["'](.*?)["']/);
        return match ? match[1] : 'default-image.jpg';
    };
    
    const imgSrc = extractImageSrc(post.content.rendered);
    

    const link = document.createElement('a');
    link.href = `blog-post.html?id=${post.id}`;
    link.style.textDecoration = 'none';

    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = post.title.rendered;
    img.style.cssText = 'width:100%; height:200px; object-fit:cover;';

    const h3 = document.createElement('h3');
    h3.textContent = post.title.rendered;

    link.appendChild(img);
    link.appendChild(h3);

    slide.appendChild(link);
    return slide;
};

export const setupCarouselNavigation = (elements) => {
    elements.nextButton.addEventListener('click', () => {
        const slides = Array.from(elements.track.children);
        if (currentSlide < slides.length - visibleSlidesCount) {
            moveToSlide(elements, currentSlide + 1);
        }
    });

    elements.prevButton.addEventListener('click', () => {
        if (currentSlide > 0) {
            moveToSlide(elements, currentSlide - 1);
        }
    });

    window.addEventListener('resize', () => {
        updateSlideWidth(elements.track);
        calculateVisibleSlides(elements);
        positionSlides(elements.track);
        updateButtonVisibility(elements, elements.track.children.length);
    });
};

const updateSlideWidth = (track) => {
    const slides = Array.from(track.children);
    slideWidth = slides[0]?.getBoundingClientRect().width || 0;
};

const calculateVisibleSlides = (elements) => {
    const trackWidth = elements.track.getBoundingClientRect().width;
    visibleSlidesCount = Math.floor(trackWidth / slideWidth);
};

const positionSlides = (track) => {
    const slides = Array.from(track.children);
    slides.forEach((slide, index) => {
        slide.style.left = `${slideWidth * index}px`;
    });
};

const moveToSlide = (elements, targetSlide) => {
    currentSlide = targetSlide;
    elements.track.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
    updateButtonVisibility(elements, elements.track.children.length);
};

const updateButtonVisibility = (elements, totalSlides) => {
    elements.prevButton.style.display = currentSlide === 0 ? 'none' : 'block';
    elements.nextButton.style.display = currentSlide >= totalSlides - visibleSlidesCount ? 'none' : 'block';
};

*/





import { fetchData } from '../api/fetch-posts.js';

let currentSlide = 0;
let slideWidth;
let visibleSlidesCount = 1; // Zawsze 4 slajdy widoczne

export const loadCarouselPosts = async (elements) => {
    if (!elements.track || !elements.nextButton || !elements.prevButton) return;

    try {
        const posts = await fetchData('https://www.krzysztofbytniewski.com/wp-json/wp/v2/posts?_embed&per_page=10');

        if (!posts || posts.length === 0) {
            throw new Error("Fetching carousel posts failed!");
        }

        elements.track.innerHTML = '';

        // Dodajemy slajdy do tracka
        for (const post of posts) {
            const slide = await createSlide(post);
            elements.track.appendChild(slide);
        }

        updateSlideWidth(elements.track);
        positionSlides(elements.track);
        updateButtonVisibility(elements, posts.length);

    } catch (error) {
        console.error("Error loading carousel posts", error);
        alert("No posts for you today, sunshine. Sorry!!!");
    }
};

const createSlide = async (post) => {
    const slide = document.createElement('li');
    slide.classList.add('carousel-slide');

    const extractImageSrc = (htmlContent) => {
        const match = htmlContent.match(/<img.*?src=["'](.*?)["']/);
        return match ? match[1] : 'default-image.jpg';
    };

    const imgSrc = extractImageSrc(post.content.rendered);

    const link = document.createElement('a');
    link.href = `single-post.html?id=${post.id}`;
    link.style.textDecoration = 'none';

    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = post.title.rendered;
    img.style.cssText = 'width:100%; height:400px; object-fit:cover;';

    const h3 = document.createElement('h3');
    h3.textContent = post.title.rendered;

    link.appendChild(img);
    link.appendChild(h3);

    slide.appendChild(link);
    return slide;
};

export const setupCarouselNavigation = (elements) => {
    elements.nextButton.addEventListener('click', () => {
        const slides = Array.from(elements.track.children);
        if (currentSlide < slides.length - visibleSlidesCount) {
            moveToSlide(elements, currentSlide + visibleSlidesCount);
        }
    });

    elements.prevButton.addEventListener('click', () => {
        if (currentSlide > 0) {
            moveToSlide(elements, currentSlide - visibleSlidesCount);
        }
    });

    window.addEventListener('resize', () => {
        updateSlideWidth(elements.track);
        positionSlides(elements.track);
        updateButtonVisibility(elements, elements.track.children.length);
    });
};

const updateSlideWidth = (track) => {
    const slides = Array.from(track.children);
    slideWidth = slides[0]?.getBoundingClientRect().width || 0;
};

const positionSlides = (track) => {
    const slides = Array.from(track.children);
    slides.forEach((slide, index) => {
        slide.style.left = `${slideWidth * index}px`;
    });
};

const moveToSlide = (elements, targetSlide) => {
    currentSlide = targetSlide;
    elements.track.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
    updateButtonVisibility(elements, elements.track.children.length);
};

const updateButtonVisibility = (elements, totalSlides) => {
    elements.prevButton.style.display = currentSlide === 0 ? 'none' : 'block';
    elements.nextButton.style.display = currentSlide >= totalSlides - visibleSlidesCount ? 'none' : 'block';
};
