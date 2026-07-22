// src/main.js - Módulo de scripts principais do Portfólio
import '../CSS/Style.scss';

document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------------------------------------
    // 1. Menu Hambúrguer (Mobile)
    // -------------------------------------------------------------
    const menuHamburguer = document.querySelector('.menu-hamburguer');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');

    if (menuHamburguer && navbar) {
        // Toggle de abrir/fechar menu
        menuHamburguer.addEventListener('click', () => {
            menuHamburguer.classList.toggle('change');
            navbar.classList.toggle('active');
            document.body.classList.toggle('no-scroll', navbar.classList.contains('active'));
        });

        // Fechar o menu ao clicar em qualquer link da navegação
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuHamburguer.classList.remove('change');
                navbar.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // -------------------------------------------------------------
    // 2. Lógica para a Troca de Idioma (i18n)
    // -------------------------------------------------------------
    const toggleButton = document.getElementById('toggleLanguage');
    let isPortuguese = true; // Idioma padrão do site atualizado

    function updateContentLanguage() {
        if (toggleButton) {
            toggleButton.textContent = isPortuguese ? 'EN' : 'PT';
            toggleButton.setAttribute('aria-label', isPortuguese ? 'Mudar para Inglês' : 'Switch to Portuguese');
        }

        // Atualiza textos comuns
        document.querySelectorAll('[data-en], [data-pt]').forEach(element => {
            const text = isPortuguese ? element.getAttribute('data-pt') : element.getAttribute('data-en');
            if (text) element.textContent = text;
        });

        // Atualiza placeholders dos inputs
        document.querySelectorAll('[data-en-placeholder], [data-pt-placeholder]').forEach(element => {
            const placeholder = isPortuguese ? element.getAttribute('data-pt-placeholder') : element.getAttribute('data-en-placeholder');
            if (placeholder) element.placeholder = placeholder;
        });

        // Atualiza texto dos botões de "Saiba mais / Read more"
        document.querySelectorAll('.services-box').forEach(box => {
            const button = box.querySelector('.read-more');
            if (button) {
                if (box.classList.contains('expanded')) {
                    button.textContent = isPortuguese ? 'Ler menos' : 'Read less';
                } else {
                    button.textContent = isPortuguese ? 'Saiba mais' : 'Read more';
                }
            }
        });
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            isPortuguese = !isPortuguese;
            try {
                localStorage.setItem('lang', isPortuguese ? 'pt' : 'en');
            } catch (e) {
                console.warn('Não foi possível salvar a preferência no localStorage:', e);
            }
            updateContentLanguage();
        });
    }

    // Restaura a preferência de idioma gravada
    try {
        const storedLang = localStorage.getItem('lang');
        if (storedLang === 'en') isPortuguese = false;
        else if (storedLang === 'pt') isPortuguese = true;
    } catch (e) { }

    updateContentLanguage();

    // -------------------------------------------------------------
    // 3. Botão "Saiba mais" nos Cards de Serviços
    // -------------------------------------------------------------
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const servicesBox = event.target.closest('.services-box');
            if (servicesBox) {
                servicesBox.classList.toggle('expanded');
                updateContentLanguage();
            }
        });
    });

    // -------------------------------------------------------------
    // 4. Formulário de Contato (Suporta Formspree e Backend PHP)
    // -------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const statusMessage = document.getElementById('form-status');
            const originalButtonText = submitButton ? submitButton.textContent : '';

            if (submitButton) {
                submitButton.textContent = isPortuguese ? 'Enviando...' : 'Sending...';
                submitButton.disabled = true;
            }

            const formData = new FormData(contactForm);
            const actionUrl = contactForm.getAttribute('action') || '/send_email.php';
            const isFormspree = actionUrl.includes('formspree.io');

            try {
                const response = await fetch(actionUrl, {
                    method: 'POST',
                    body: isFormspree ? formData : formData,
                    headers: isFormspree ? { 'Accept': 'application/json' } : {}
                });

                if (response.ok) {
                    if (statusMessage) {
                        statusMessage.style.color = '#00eeff';
                        statusMessage.textContent = isPortuguese
                            ? 'Mensagem enviada com sucesso!'
                            : 'Message sent successfully!';
                    }
                    contactForm.reset();
                } else {
                    const data = await response.json().catch(() => null);
                    throw new Error((data && data.error) ? data.error : 'Erro ao enviar.');
                }

            } catch (error) {
                console.error('Erro no formulário de contato:', error);
                if (statusMessage) {
                    statusMessage.style.color = '#ff4d4d';
                    statusMessage.textContent = isPortuguese
                        ? 'Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.'
                        : 'An error occurred while sending the message. Please try again later.';
                }
            } finally {
                if (submitButton) {
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                }

                // Limpa a mensagem de status após 6 segundos
                setTimeout(() => {
                    if (statusMessage) statusMessage.textContent = '';
                }, 6000);
            }
        });
    }

    // -------------------------------------------------------------
    // 5. Animações de Scroll (AOS Library)
    // -------------------------------------------------------------
    if (typeof AOS !== 'undefined' && AOS && AOS.init) {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out'
        });
    }
});

// -------------------------------------------------------------
// Exibir / Ocultar Botão "Voltar ao Topo"
// -------------------------------------------------------------
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
}


// Highlight ativo no Menu ao rolar a página
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector('.navbar a[href*=' + sectionId + ']');

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.style.color = 'var(--main-color)';
            } else {
                navLink.style.color = 'var(--text-color)';
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);