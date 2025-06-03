// Script.js Final

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica para o Menu Hambúrguer ---
    const menuHamburguer = document.querySelector('.menu-hamburguer');
    const navResponsive = document.querySelector('.nav-responsive');
    menuHamburguer.addEventListener('click', () => {
        menuHamburguer.classList.toggle('change');
        navResponsive.classList.toggle('active'); 
    });

    // --- Lógica para a Troca de Idioma ---
    const toggleButton = document.getElementById('toggleLanguage');
    let isPortuguese = false; // Começa em inglês por padrão

    function updateContentLanguage() {
        toggleButton.textContent = isPortuguese ? "English" : "Português";

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
    toggleButton.addEventListener('click', () => {
        isPortuguese = !isPortuguese;
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

    // --- Lógica para o Formulário de Contato com AJAX (Fetch) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const statusMessage = document.getElementById('form-status');
            const originalButtonText = submitButton.textContent;

            submitButton.textContent = isPortuguese ? 'Enviando...' : 'Sending...';
            submitButton.disabled = true;
            
            const formData = new FormData(contactForm);

            fetch('send_email.php', { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                statusMessage.style.color = data.status === 'success' ? '#00eeff' : '#ff0000';
                statusMessage.textContent = data.message;
                if (data.status === 'success') {
                    contactForm.reset();
                }
            })
            .catch(error => {
                statusMessage.style.color = '#ff0000';
                statusMessage.textContent = 'Ocorreu um erro inesperado. Tente novamente.';
                console.error('Error:', error);
            })
            .finally(() => {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                setTimeout(() => { statusMessage.textContent = ''; }, 5000); // Limpa a mensagem após 5 segundos
            });
        });
    }

    // Inicializa a biblioteca de animações
    AOS.init({
        duration: 800, // Duração da animação
        once: true,    // Animação acontece apenas uma vez
    });
});