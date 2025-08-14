// Data Loader for Dynamic Content Management
class DataLoader {
    constructor() {
        this.cache = {};
    }

    async loadData(file) {
        if (this.cache[file]) {
            return this.cache[file];
        }

        try {
            const response = await fetch(file);
            const data = await response.json();
            this.cache[file] = data;
            return data;
        } catch (error) {
            console.error(`Error loading ${file}:`, error);
            return null;
        }
    }

    // Load kittens data and update gallery
    async loadKittens() {
        const data = await this.loadData('data/kittens.json');
        if (!data) return;

        this.updateGallery(data);
    }

    // Load cats data and update homepage
    async loadCats() {
        const data = await this.loadData('data/cats.json');
        if (!data) return;

        this.updateHomepage(data);
    }

    // Load content data and update pages
    async loadContent() {
        const data = await this.loadData('data/content.json');
        if (!data) return;

        this.updateContent(data);
    }

    // Update gallery with kittens data
    updateGallery(data) {
        const currentLittersContainer = document.getElementById('current-litters');
        const previousLittersContainer = document.getElementById('previous-litters');

        if (currentLittersContainer) {
            currentLittersContainer.innerHTML = this.generateCurrentLittersHTML(data.current_litters);
        }

        if (previousLittersContainer) {
            previousLittersContainer.innerHTML = this.generatePreviousLittersHTML(data.previous_litters);
        }
    }

    // Generate HTML for current litters
    generateCurrentLittersHTML(litters) {
        return litters.map(litter => `
            <div class="gallery-section fade-in">
                <h3>${litter.title} ${litter.status === 'accepting_reservations' ? '<span class="highlight-text">Accepting Reservations!</span>' : ''}</h3>
                
                <div class="litter-info slide-up">
                    <h4>${litter.title}</h4>
                </div>
                
                <div class="row g-4">
                    <div class="col-lg-6">
                        <div class="card">
                            <img src="${litter.parents.mom.image}" class="card-img-top" alt="Mom: ${litter.parents.mom.name}">
                            <div class="card-body">
                                <p class="card-text">Mom: ${litter.parents.mom.name}</p>
                                <p class="card-text">${litter.parents.mom.description}${litter.parents.mom.link ? ` <a href="${litter.parents.mom.link}" target="_blank">here for the report.</a>` : ''}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="card">
                            <img src="${litter.parents.dad.image}" class="card-img-top" alt="Dad: ${litter.parents.dad.name}">
                            <div class="card-body">
                                <p class="card-text">Dad: ${litter.parents.dad.name}</p>
                                <p class="card-text">${litter.parents.dad.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                ${litter.kittens.length > 0 ? `
                <div class="row g-4 mt-4">
                    ${litter.kittens.map(kitten => `
                        <div class="col-lg-4 col-md-6">
                            <div class="card">
                                <img src="${kitten.image}" class="card-img-top" alt="${kitten.name}">
                                <div class="card-body">
                                    <p class="card-text">${kitten.name}</p>
                                    <p class="card-text">${kitten.description}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                ` : ''}
            </div>
        `).join('');
    }

    // Generate HTML for previous litters
    generatePreviousLittersHTML(litters) {
        return litters.map(litter => `
            <div class="gallery-section fade-in">
                <h3>${litter.title}</h3>
                <div class="row g-4">
                    <div class="col-lg-6">
                        <div class="card">
                            <img src="${litter.parents.mom.image}" class="card-img-top" alt="Mom: ${litter.parents.mom.name}">
                            <div class="card-body">
                                <p class="card-text">Mom: ${litter.parents.mom.name}</p>
                                <p class="card-text">${litter.parents.mom.description}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="card">
                            <img src="${litter.parents.dad.image}" class="card-img-top" alt="Dad: ${litter.parents.dad.name}">
                            <div class="card-body">
                                <p class="card-text">Dad: ${litter.parents.dad.name}</p>
                                <p class="card-text">${litter.parents.dad.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                ${litter.kittens.length > 0 ? `
                <div class="row g-4 mt-4">
                    ${litter.kittens.map(kitten => `
                        <div class="col-lg-4 col-md-6">
                            <div class="card">
                                <img src="${kitten.image}" class="card-img-top" alt="${kitten.name}">
                                <div class="card-body">
                                    <p class="card-text">${kitten.name}</p>
                                    <p class="card-text">${kitten.description}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                ` : ''}
            </div>
        `).join('');
    }

    // Update homepage with cats data
    updateHomepage(data) {
        // Update slideshow
        const slideshowContainer = document.querySelector('.slideshow');
        if (slideshowContainer) {
            const slideshowHTML = data.slideshow_images.map((slide, index) => `
                <div class="mySlides ${index === 0 ? 'active' : ''}">
                    <div class="numbertext">${index + 1} / ${data.slideshow_images.length}</div>
                    <img src="${slide.image}" alt="${slide.alt}" class="cat-image">
                </div>
            `).join('');
            
            const existingSlides = slideshowContainer.querySelectorAll('.mySlides');
            existingSlides.forEach(slide => slide.remove());
            
            slideshowContainer.insertAdjacentHTML('afterbegin', slideshowHTML);
        }
    }

    // Update content with content data
    updateContent(data) {
        // Update homepage content
        if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
            this.updateHomepageContent(data.homepage);
        }

        // Update about page content
        if (window.location.pathname.includes('about.html')) {
            this.updateAboutContent(data.about);
        }

        // Update FAQ content
        if (window.location.pathname.includes('faq.html')) {
            this.updateFAQContent(data.faq);
        }

        // Update contact content
        if (window.location.pathname.includes('contact.html')) {
            this.updateContactContent(data.contact);
        }
    }

    // Update homepage content
    updateHomepageContent(homepageData) {
        // Update hero section
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroCta = document.querySelector('.hero-cta');

        if (heroTitle) heroTitle.textContent = homepageData.hero.title;
        if (heroSubtitle) heroSubtitle.textContent = homepageData.hero.subtitle;
        if (heroCta) {
            heroCta.textContent = homepageData.hero.cta_text;
            heroCta.href = homepageData.hero.cta_link;
        }

        // Update about preview
        const aboutTitle = document.querySelector('.about-content h3');
        const aboutContent = document.querySelector('.about-content');
        const aboutCta = document.querySelector('.about-content .btn');

        if (aboutTitle) aboutTitle.textContent = homepageData.about_preview.title;
        if (aboutContent) {
            const paragraphs = aboutContent.querySelectorAll('p');
            homepageData.about_preview.content.forEach((content, index) => {
                if (paragraphs[index]) paragraphs[index].textContent = content;
            });
        }
        if (aboutCta) {
            aboutCta.textContent = homepageData.about_preview.cta_text;
            aboutCta.href = homepageData.about_preview.cta_link;
        }

        // Update stats
        const statItems = document.querySelectorAll('.stat-item');
        homepageData.stats.forEach((stat, index) => {
            if (statItems[index]) {
                const number = statItems[index].querySelector('.stat-number');
                const label = statItems[index].querySelector('.stat-label');
                if (number) number.textContent = stat.number;
                if (label) label.textContent = stat.label;
            }
        });
    }

    // Update about page content
    updateAboutContent(aboutData) {
        // Update hero
        const heroTitle = document.querySelector('.about-hero-title');
        const heroSubtitle = document.querySelector('.about-hero-subtitle');

        if (heroTitle) heroTitle.textContent = aboutData.hero.title;
        if (heroSubtitle) heroSubtitle.textContent = aboutData.hero.subtitle;

        // Update story sections
        const storyCards = document.querySelectorAll('.story-card');
        aboutData.story.sections.forEach((section, index) => {
            if (storyCards[index]) {
                const title = storyCards[index].querySelector('.story-title');
                const content = storyCards[index].querySelector('.story-text');
                const image = storyCards[index].querySelector('.story-image');

                if (title) title.textContent = section.title;
                if (content) content.textContent = section.content;
                if (image) image.src = section.image;
            }
        });

        // Update timeline
        const timelineItems = document.querySelectorAll('.timeline-item');
        aboutData.timeline.forEach((item, index) => {
            if (timelineItems[index]) {
                const year = timelineItems[index].querySelector('.timeline-year');
                const title = timelineItems[index].querySelector('.timeline-title');
                const description = timelineItems[index].querySelector('.timeline-description');

                if (year) year.textContent = item.year;
                if (title) title.textContent = item.title;
                if (description) description.textContent = item.description;
            }
        });

        // Update values
        const valueCards = document.querySelectorAll('.value-card');
        aboutData.values.forEach((value, index) => {
            if (valueCards[index]) {
                const icon = valueCards[index].querySelector('.value-icon');
                const title = valueCards[index].querySelector('.value-title');
                const description = valueCards[index].querySelector('.value-description');

                if (icon) icon.textContent = value.icon;
                if (title) title.textContent = value.title;
                if (description) description.textContent = value.description;
            }
        });
    }

    // Update FAQ content
    updateFAQContent(faqData) {
        const faqContainer = document.querySelector('.faq-container');
        if (faqContainer) {
            const faqHTML = faqData.questions.map(q => `
                <div class="faq-item slide-up">
                    <div class="faq-question">${q.question}</div>
                    <div class="faq-answer">
                        <p>${q.answer}</p>
                    </div>
                </div>
            `).join('');
            
            const existingItems = faqContainer.querySelectorAll('.faq-item');
            existingItems.forEach(item => item.remove());
            
            faqContainer.insertAdjacentHTML('beforeend', faqHTML);
        }
    }

    // Update contact content
    updateContactContent(contactData) {
        const contactHeader = document.querySelector('.contact-header');
        const contactInfo = document.querySelector('.contact-info');

        if (contactHeader) contactHeader.textContent = contactData.hero.title;
        if (contactInfo) {
            const title = contactInfo.querySelector('h4');
            const paragraphs = contactInfo.querySelectorAll('p');
            
            if (title) title.textContent = contactData.info.title;
            contactData.info.content.forEach((content, index) => {
                if (paragraphs[index]) paragraphs[index].textContent = content;
            });
        }
    }
}

// Initialize data loader when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const dataLoader = new DataLoader();
    
    // Load appropriate data based on current page
    if (window.location.pathname.includes('gallery.html')) {
        dataLoader.loadKittens();
    }
    
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        dataLoader.loadCats();
        dataLoader.loadContent();
    }
    
    if (window.location.pathname.includes('about.html')) {
        dataLoader.loadContent();
    }
    
    if (window.location.pathname.includes('faq.html')) {
        dataLoader.loadContent();
    }
    
    if (window.location.pathname.includes('contact.html')) {
        dataLoader.loadContent();
    }
}); 