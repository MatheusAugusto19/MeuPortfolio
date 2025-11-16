// src/main.js - entrypoint for Vite
// Migrated from JS/Script.js to an ES module entry

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica para o Menu Hambúrguer ---
    const menuHamburguer = document.querySelector('.menu-hamburguer');
    const navResponsive = document.querySelector('.nav-responsive');
    menuHamburguer && menuHamburguer.addEventListener('click', () => {
        menuHamburguer.classList.toggle('change');
        navResponsive.classList.toggle('active'); 
    });

    // --- Lógica para a Troca de Idioma ---
    const toggleButton = document.getElementById('toggleLanguage');
    let isPortuguese = false; // Começa em inglês por padrão

    function updateContentLanguage() {
        // Show the target language on the button (e.g. show "EN" when page is PT)
        if (toggleButton) {
            toggleButton.textContent = isPortuguese ? 'EN' : 'PT';
            // Keep an accessible label describing the action
            toggleButton.setAttribute('aria-label', isPortuguese ? 'Switch to English' : 'Switch to Portuguese');
        }

        document.querySelectorAll('[data-en], [data-pt]').forEach(element => {
            const text = isPortuguese ? element.getAttribute('data-pt') : element.getAttribute('data-en');
            if (text) element.textContent = text;
        });

        document.querySelectorAll('[data-en-placeholder], [data-pt-placeholder]').forEach(element => {
            const placeholder = isPortuguese ? element.getAttribute('data-pt-placeholder') : element.getAttribute('data-en-placeholder');
            if (placeholder) element.placeholder = placeholder;
        });

        document.querySelectorAll('.services-box').forEach(box => {
            const button = box.querySelector('.read-more');
            if (button) {
                if (box.classList.contains('expanded')) {
                    button.textContent = isPortuguese ? 'Ler menos' : 'Read less';
                } else {
                    button.textContent = isPortuguese ? 'Ler mais' : 'Read more';
                }
            }
        });
    }
    toggleButton && toggleButton.addEventListener('click', () => {
        isPortuguese = !isPortuguese;
        // persist choice
        try { localStorage.setItem('lang', isPortuguese ? 'pt' : 'en'); } catch(e) {}
        updateContentLanguage();
    });

    // --- Lógica para o botão "Read more" ---
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const servicesBox = event.target.closest('.services-box');
            servicesBox.classList.toggle('expanded');
            updateContentLanguage(); // Atualiza o texto do botão
        });
    });

    // Restore persisted language preference (if any) and apply initial content
    try {
        const stored = localStorage.getItem('lang');
        if (stored === 'pt') isPortuguese = true;
        else if (stored === 'en') isPortuguese = false;
    } catch (e) {}
    updateContentLanguage();

    // --- Lógica para o Formulário de Contato com AJAX (Fetch) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const statusMessage = document.getElementById('form-status');
            const originalButtonText = submitButton ? submitButton.textContent : '';

            if (submitButton) {
                submitButton.textContent = isPortuguese ? 'Enviando...' : 'Sending...';
                submitButton.disabled = true;
            }
            
            const formData = new FormData(contactForm);

            fetch('/send_email.php', { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                if (statusMessage) statusMessage.style.color = data.status === 'success' ? '#00eeff' : '#ff0000';
                if (statusMessage) statusMessage.textContent = data.message;
                if (data.status === 'success') {
                    contactForm.reset();
                }
            })
            .catch(error => {
                if (statusMessage) {
                    statusMessage.style.color = '#ff0000';
                    statusMessage.textContent = 'Ocorreu um erro inesperado. Tente novamente.';
                }
                console.error('Error:', error);
            })
            .finally(() => {
                if (submitButton) {
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                }
                setTimeout(() => { const s = document.getElementById('form-status'); if (s) s.textContent = ''; }, 5000);
            });
        });
    }

    // Inicializa a biblioteca de animações (AOS) que é carregada via CDN no index.html
    if (typeof AOS !== 'undefined' && AOS && AOS.init) {
        AOS.init({
            duration: 800,
            once: true,
        });
    }
});
