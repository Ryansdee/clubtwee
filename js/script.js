// Mobile menu functionality
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeMenu = document.getElementById('close-menu');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('-translate-x-full');
        });

        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.add('-translate-x-full');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('-translate-x-full');
            });
        });

        // Back to top functionality
        const backToTopBtn = document.getElementById('back-to-top');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                backToTopBtn.classList.add('opacity-100');
            } else {
                backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
                backToTopBtn.classList.remove('opacity-100');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Calculate next second Friday of the month
        function getNextSecondFriday() {
            const now = new Date();
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();
            
            let date = new Date(currentYear, currentMonth, 1);
            let fridayCount = 0;
            
            while (fridayCount < 2) {
                if (date.getDay() === 5) {
                    fridayCount++;
                }
                if (fridayCount < 2) {
                    date.setDate(date.getDate() + 1);
                }
            }
            
            if (date < now) {
                date = new Date(currentYear, currentMonth + 1, 1);
                fridayCount = 0;
                
                while (fridayCount < 2) {
                    if (date.getDay() === 5) {
                        fridayCount++;
                    }
                    if (fridayCount < 2) {
                        date.setDate(date.getDate() + 1);
                    }
                }
            }
            
            return date.toLocaleDateString('nl-NL', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        }

        // Check opening hours and update status
        function updateStatus() {
            const now = new Date();
            const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
            const hour = now.getHours();
            const minute = now.getMinutes();
            const currentTime = hour + (minute / 60);

            const statusIndicator = document.getElementById('status-indicator');
            const statusText = document.getElementById('status-text');

            let isOpen = false;

            if (day >= 1 && day <= 5) { // Monday to Friday
                if (currentTime >= 8.5 && currentTime < 17) { // 8:30 to 17:00
                    isOpen = true;
                }
            } else if (day === 6) { // Saturday
                if (currentTime >= 10 && currentTime < 15) { // 10:00 to 15:00
                    isOpen = true;
                }
            }

            if (isOpen) {
                statusIndicator.className = 'w-3 h-3 rounded-full mr-2 animate-pulse bg-green-500';
                statusText.textContent = 'Nu Open!';
                statusText.className = 'text-sm font-semibold text-green-400';
            } else {
                statusIndicator.className = 'w-3 h-3 rounded-full mr-2 animate-pulse bg-red-500';
                statusText.textContent = 'Gesloten';
                statusText.className = 'text-sm font-semibold text-red-400';
            }
        }

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('[class*="animate-"]').forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });

        // Initialize
        document.getElementById('date').textContent = getNextSecondFriday();
        updateStatus();
        
        // Update status every minute
        setInterval(updateStatus, 60000);

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Add some interactive particles effect
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'fixed pointer-events-none z-0';
            particle.style.width = Math.random() * 6 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = Math.random() > 0.5 ? '#ffa6c9' : '#ff2400';
            particle.style.borderRadius = '50%';
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = window.innerHeight + 'px';
            
            document.body.appendChild(particle);
            
            const animation = particle.animate([
                { transform: 'translateY(0px) rotate(0deg)', opacity: particle.style.opacity },
                { transform: `translateY(-${window.innerHeight + 100}px) rotate(360deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'linear'
            });
            
            animation.onfinish = () => particle.remove();
        }

        // Create particles occasionally
        setInterval(createParticle, 3000);