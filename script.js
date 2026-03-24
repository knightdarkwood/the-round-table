document.addEventListener('DOMContentLoaded', function() {
    
    // === MOBILE MENU ===
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navbar = document.querySelector('.navbar');
    const navUl = document.querySelector('.navbar ul');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navbar.classList.toggle('mobile-open');
            this.classList.toggle('active');
        });
        
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('mobile-open');
                mobileToggle.classList.remove('active');
            });
        });
        
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navbar.classList.contains('mobile-open')) {
                navbar.classList.remove('mobile-open');
                mobileToggle.classList.remove('active');
            }
        });
    }
    
    // === ACTIVE NAV LINK ===
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === './index.html') || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // === SCROLL ANIMATIONS ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.pillar-card, .duty-card, .trial-card, .tournament-card, .charge-card, .house-card, .knight-entry, .blade-entry, .champion-card, .testimonial-card, .faq-item, .sin-card, .degree-card, .mission-card, .humility-card, .sign-card, .rival-card, .maintenance-card, .chronicle-entry, .devotion-item, .schedule-item, .activity-item, .equipment-item, .ledger-entry').forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });
    
    // === OATH MODAL ===
    const modal = document.getElementById('oath-modal');
    const oathButtons = document.querySelectorAll('.oath-button');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const oathForm = document.getElementById('oath-form');
    
    if (modal) {
        oathButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (btn.tagName === 'A') return;
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        document.querySelectorAll('.oath-button[href="#oath-modal"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }
        
        if (modalOverlay) {
            modalOverlay.addEventListener('click', closeModal);
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
        
        if (oathForm) {
            oathForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('oath-name').value;
                const success = document.getElementById('oath-success');
                oathForm.style.display = 'none';
                success.classList.add('active');
                success.querySelector('p').innerHTML = '<strong>' + name + '</strong>, your name has been inscribed in the Ledger of Aspirants. The Council will review your petition within thirty days.';
            });
        }
    }
    
    // === FAQ ACCORDION ===
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        if (question && answer) {
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');
                
                document.querySelectorAll('.faq-item.open').forEach(openItem => {
                    openItem.classList.remove('open');
                    openItem.querySelector('p').style.maxHeight = null;
                });
                
                if (!isOpen) {
                    item.classList.add('open');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });
    
    // === QUOTE ROTATOR ===
    const quotes = [
        {
            text: '"In this hall, no man sits above another; for here, we are bound by a circle of equality, tempered by the fire of our shared vows."',
            author: 'The Round Table'
        },
        {
            text: '"Better to die with honour than to live with shame. For death is brief, but the memory of dishonour endures forever."',
            author: 'The Code of Chivalry'
        },
        {
            text: '"A knight is sworn to be: defender of the faith, protector of the realm, and servant to justice."',
            author: 'The Book of Chivalry, 1284'
        },
        {
            text: '"The sword may have changed—its edge now lies in the boardroom as much as the battlefield—but the duty remains: to stand between darkness and light, and to never flinch."',
            author: 'The High Marshal'
        },
        {
            text: '"Give me the strength to defend the weak, the courage to face the strong, and the humility to remember that I am but a servant of the Light."',
            author: "The Knight's Prayer"
        }
    ];
    
    let currentQuote = 0;
    const quoteText = document.getElementById('rotating-quote-text');
    const quoteAuthor = document.getElementById('rotating-quote-author');
    const quotePrev = document.getElementById('quote-prev');
    const quoteNext = document.getElementById('quote-next');
    
    function showQuote(index) {
        if (quoteText && quoteAuthor) {
            quoteText.style.opacity = 0;
            
            setTimeout(() => {
                quoteText.textContent = quotes[index].text;
                quoteAuthor.textContent = '— ' + quotes[index].author;
                quoteText.style.opacity = 1;
            }, 300);
        }
    }
    
    if (quoteText) {
        setInterval(() => {
            currentQuote = (currentQuote + 1) % quotes.length;
            showQuote(currentQuote);
        }, 6000);
        
        if (quotePrev) {
            quotePrev.addEventListener('click', () => {
                currentQuote = (currentQuote - 1 + quotes.length) % quotes.length;
                showQuote(currentQuote);
            });
        }
        
        if (quoteNext) {
            quoteNext.addEventListener('click', () => {
                currentQuote = (currentQuote + 1) % quotes.length;
                showQuote(currentQuote);
            });
        }
    }
    
    // === COUNTER ANIMATION ===
    const statNumbers = document.querySelectorAll('.stat-number, .weight-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = el.textContent;
                const numericPart = parseInt(target.replace(/[^0-9]/g, ''));
                
                if (numericPart && !isNaN(numericPart)) {
                    const suffix = target.replace(/[0-9]/g, '');
                    let current = 0;
                    const increment = numericPart / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= numericPart) {
                            el.textContent = target;
                            clearInterval(timer);
                        } else {
                            el.textContent = Math.floor(current) + suffix;
                        }
                    }, 30);
                }
                
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(el => counterObserver.observe(el));
    
    console.log('The Round Table initialized.');
});
