const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const backToTopBtn = document.getElementById('back-to-top');
const menuTrigger = document.getElementById('mobile-menu-trigger');

let isMenuOpen = false;

function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('-translate-x-full');
    document.body.classList.add('overflow-hidden');
    menuTrigger?.classList.add('hidden');
    isMenuOpen = true;
}

function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('-translate-x-full');
    document.body.classList.remove('overflow-hidden');
    menuTrigger?.classList.remove('hidden');
    isMenuOpen = false;
}

mobileMenuBtn?.addEventListener('click', openMenu);
closeMenuBtn?.addEventListener('click', closeMenu);

mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
    }
});

// Back to top
window.addEventListener('scroll', () => {
    if (!backToTopBtn) return;
    backToTopBtn.classList.toggle('opacity-0', window.scrollY <= 300);
    backToTopBtn.classList.toggle('pointer-events-none', window.scrollY <= 300);
    backToTopBtn.classList.toggle('opacity-100', window.scrollY > 300);
});

backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function updateStatus() {
    const indicator = document.getElementById('status-indicator');
    const text = document.getElementById('status-text');
    if (!indicator || !text) return;

    const now = new Date();
    const day = now.getDay();
    const time = now.getHours() + now.getMinutes() / 60;

    let isOpen = false;

    if (day >= 1 && day <= 5) isOpen = time >= 8.5 && time < 17;
    else if (day === 6) isOpen = time >= 10 && time < 15;

    indicator.classList.toggle('bg-green-500', isOpen);
    indicator.classList.toggle('bg-red-500', !isOpen);
    text.textContent = isOpen ? 'Nu open' : 'Gesloten';
}

updateStatus();
setInterval(updateStatus, 60000);
