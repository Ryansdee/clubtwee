        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const closeMenuBtn = document.getElementById('close-menu');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuBtn?.addEventListener('click', () => {
            mobileMenu.classList.remove('-translate-x-full');
        });

        closeMenuBtn?.addEventListener('click', () => {
            mobileMenu.classList.add('-translate-x-full');
        });

        // Close menu when clicking on a link
        mobileMenu?.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('-translate-x-full');
            });
        });

        // Back to top button
        const backToTopBtn = document.getElementById('back-to-top');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                backToTopBtn.classList.add('opacity-100');
            } else {
                backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
                backToTopBtn.classList.remove('opacity-100');
            }
        });

        backToTopBtn?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Open/Closed status
        function updateStatus() {
            const now = new Date();
            const day = now.getDay();
            const hour = now.getHours();
            const minute = now.getMinutes();
            const time = hour + minute / 60;

            const indicator = document.getElementById('status-indicator');
            const text = document.getElementById('status-text');

            let isOpen = false;

            if (day >= 1 && day <= 5) {
                // Mon-Fri: 8:30 - 17:00
                isOpen = time >= 8.5 && time < 17;
            } else if (day === 6) {
                // Sat: 10:00 - 15:00
                isOpen = time >= 10 && time < 15;
            }

            if (isOpen) {
                indicator.classList.remove('bg-red-500');
                indicator.classList.add('bg-green-500');
                text.textContent = 'Nu open';
            } else {
                indicator.classList.remove('bg-green-500');
                indicator.classList.add('bg-red-500');
                text.textContent = 'Gesloten';
            }
        }

        updateStatus();
        setInterval(updateStatus, 60000);

        // Next TGIF date
        function getNextSecondFriday() {
            const now = new Date();
            let year = now.getFullYear();
            let month = now.getMonth();

            for (let i = 0; i < 3; i++) {
                const firstDay = new Date(year, month, 1);
                const firstFriday = (12 - firstDay.getDay()) % 7 + 1;
                const secondFriday = firstFriday + 7;
                const targetDate = new Date(year, month, secondFriday);

                if (targetDate > now) {
                    const options = { day: 'numeric', month: 'long' };
                    return targetDate.toLocaleDateString('nl-BE', options);
                }

                month++;
                if (month > 11) {
                    month = 0;
                    year++;
                }
            }
            return 'TBA';
        }

        const dateEl = document.getElementById('date');
        if (dateEl) {
            dateEl.textContent = getNextSecondFriday();
        }