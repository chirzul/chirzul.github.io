// =============================================
// Navigation
// =============================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navLinkEls = document.querySelectorAll('.nav-link');

// Scroll effect for nav
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu on link click
navLinkEls.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('.section, .hero');
function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
            navLinkEls.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === id) {
                    link.classList.add('active');
                }
            });
        }
    });
}
window.addEventListener('scroll', updateActiveNav);

// =============================================
// Typing Effect
// =============================================
const typedTextEl = document.getElementById('typedText');
const phrases = [
    'Backend Developer',
    'Golang Enthusiast',
    'Microservices Architect',
    'API Designer',
    'Clean Code Advocate',
    'Fintech Backend Engineer'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 80;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
    } else {
        typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause before next phrase
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing after page load
setTimeout(typeEffect, 1000);

// =============================================
// Counter Animation
// =============================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        function updateCounter() {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }

        updateCounter();
    });
}

// =============================================
// Expertise Bar Animation
// =============================================
function animateBars() {
    const bars = document.querySelectorAll('.expertise-fill');
    bars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// =============================================
// Scroll-triggered Animations
// =============================================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Trigger counter animation
            if (entry.target.querySelector('.stat-number')) {
                animateCounters();
            }

            // Trigger bar animation
            if (entry.target.querySelector('.expertise-fill')) {
                setTimeout(animateBars, 300);
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in class and observe elements
document.querySelectorAll('.skill-card, .highlight-card, .cert-card, .timeline-item, .project-card, .contact-link, .about-terminal').forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${(i % 6) * 0.1}s`;
    observer.observe(el);
});

// Observe hero stats
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    statsObserver.observe(heroStats);
}

// Observe expertise section
const expertiseSection = document.querySelector('.expertise-section');
if (expertiseSection) {
    const expObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateBars, 300);
                expObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    expObserver.observe(expertiseSection);
}

// =============================================
// Code Rain Background
// =============================================
function generateCodeRain() {
    const codeRain = document.getElementById('codeRain');
    if (!codeRain) return;

    const codeSnippets = [
        'func main() {',
        'package main',
        'import "fmt"',
        'http.HandleFunc("',
        'mux := gin.Default()',
        'db.Query("SELECT * FROM',
        'ctx.JSON(200, gin.H{',
        'go func() {',
        'ch <- msg',
        'select { case',
        'defer wg.Done()',
        'sync.Mutex{}',
        'type Service struct {',
        'func (s *Service) Handle()',
        'grpc.NewServer()',
        'proto.Marshal(data)',
        'redis.Get(ctx, key)',
        'kafka.NewProducer()',
        'docker-compose up',
        'kubectl apply -f',
        'INSERT INTO users',
        'CREATE TABLE orders',
        'ALTER TABLE',
        'json.Marshal(&resp)',
        'log.Fatal(err)',
        'if err != nil {',
        'return fmt.Errorf(',
        'middleware.Auth()',
        'router.GET("/api/v1/',
        'return c.JSON(200,',
    ];

    let content = '';
    for (let i = 0; i < 300; i++) {
        content += codeSnippets[Math.floor(Math.random() * codeSnippets.length)] + '  ';
    }
    codeRain.textContent = content;
}

generateCodeRain();

// =============================================
// Smooth scroll for anchor links
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// =============================================
// Reveal on scroll (basic)
// =============================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.section-header, .about-lead, .about-text p, .about-details');
    reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight - 80) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
}

// Initial state for reveals
document.querySelectorAll('.section-header, .about-lead, .about-text p, .about-details').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// =============================================
// Parallax effect for hero
// =============================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    if (hero && window.scrollY < window.innerHeight) {
        hero.style.transform = `translateY(${window.scrollY * 0.15}px)`;
        hero.style.opacity = 1 - (window.scrollY / window.innerHeight) * 0.5;
    }
});

console.log('%c Backend Developer Portfolio ', 'background: #22d3ee; color: #0a0e17; padding: 8px 16px; border-radius: 4px; font-weight: bold; font-size: 14px;');
console.log('%c Built with Go mindset: clean, efficient, scalable. ', 'color: #94a3b8; font-style: italic;');
