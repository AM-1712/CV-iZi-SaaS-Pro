document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const header = document.querySelector('.header');
    const contactModal = document.getElementById('contactModal');
    const contactForm = document.getElementById('contactForm');
    const planInput = document.getElementById('planInput');
    const closeContactButton = document.querySelector('[data-close-contact]');
    const contactTriggers = document.querySelectorAll('.js-contact-trigger');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            const icon = mobileToggle?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                const headerHeight = header?.offsetHeight || 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const openContactModal = (plan = 'Demande générale') => {
        if (planInput) {
            planInput.value = plan;
        }
        contactModal?.classList.add('active');
        contactModal?.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');
    };

    const closeContactModal = () => {
        contactModal?.classList.remove('active');
        contactModal?.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll');
    };

    contactTriggers.forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            const plan = trigger.dataset.plan || 'Demande générale';
            openContactModal(plan);
        });
    });

    closeContactButton?.addEventListener('click', closeContactModal);

    contactModal?.addEventListener('click', (event) => {
        if (event.target === contactModal) {
            closeContactModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeContactModal();
        }
    });

    contactForm?.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const fullName = formData.get('name')?.toString().trim() || 'Non renseigné';
        const phone = formData.get('phone')?.toString().trim() || 'Non renseigné';
        const address = formData.get('address')?.toString().trim() || 'Non renseigné';
        const message = formData.get('message')?.toString().trim() || 'Aucune précision';
        const selectedPlan = formData.get('plan')?.toString().trim() || 'Demande générale';

        const whatsappText = encodeURIComponent(
            `Bonjour LivrExpress, je souhaite être recontacté.\n\nNom: ${fullName}\nTéléphone: ${phone}\nAdresse: ${address}\nOffre: ${selectedPlan}\nMessage: ${message}`
        );

        window.open(`https://wa.me/24166669197?text=${whatsappText}`, '_blank', 'noopener,noreferrer');
        contactForm.reset();
        closeContactModal();
    });
});
