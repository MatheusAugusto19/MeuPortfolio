// Script.js Completo e Corrigido

document.addEventListener('DOMContentLoaded', () => {

     const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o recarregamento da página

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const statusMessage = document.getElementById('form-status');

        // Mostra "Enviando..." e desabilita o botão
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        const formData = new FormData(contactForm);

        fetch('send_email.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Define a cor da mensagem baseada no status
            statusMessage.style.color = data.status === 'success' ? '#00eeff' : '#ff0000';
            statusMessage.textContent = data.message;

            // Se for sucesso, limpa o formulário
            if (data.status === 'success') {
                contactForm.reset();
            }
        })
        .catch(error => {
            // Em caso de erro de rede ou JSON inválido
            statusMessage.style.color = '#ff0000';
            statusMessage.textContent = 'Ocorreu um erro inesperado. Tente novamente.';
            console.error('Error:', error);
        })
        .finally(() => {
            // Reabilita o botão e restaura o texto original
             const isPortuguese = document.getElementById('toggleLanguage').textContent === "English";
             submitButton.textContent = isPortuguese ? 'Enviar Mensagem' : 'Send Message';
             submitButton.disabled = false;
        });
    });
    
    const menuHamburguer = document.querySelector('.menu-hamburguer');
    const toggleButton = document.getElementById('toggleLanguage');
    const navResponsive = document.querySelector('.nav-responsive');

    // Estado inicial do idioma
    let isPortuguese = false; // Começa em inglês por padrão

    // --- Lógica para o Menu Hambúrguer ---
    function toggleMenu() {
        menuHamburguer.classList.toggle('change');
        // Usamos uma classe para mostrar/esconder o menu, é uma prática melhor
        navResponsive.classList.toggle('active'); 
    }
    menuHamburguer.addEventListener('click', toggleMenu);


    // --- Lógica para a Troca de Idioma ---
    toggleButton.addEventListener('click', () => {
        isPortuguese = !isPortuguese; // Alterna o estado do idioma

        // Atualiza o texto do botão de idioma
        toggleButton.textContent = isPortuguese ? "English" : "Português";

        // Atualiza todo o conteúdo da página que tem os atributos de idioma
        document.querySelectorAll('[data-en], [data-pt]').forEach(element => {
            const textPt = element.getAttribute('data-pt');
            const textEn = element.getAttribute('data-en');
            element.textContent = isPortuguese ? textPt : textEn;
        });

        // Atualiza o texto dos botões "Ler mais" que podem estar abertos ou fechados
        document.querySelectorAll('.services-box').forEach(box => {
            const button = box.querySelector('.read-more');
            if (box.classList.contains('expanded')) {
                button.textContent = isPortuguese ? 'Ler menos' : 'Read less';
            } else {
                button.textContent = isPortuguese ? 'Ler mais' : 'Read more';
            }
        });
    });


    // --- Lógica para o botão "Read more" (Versão Melhorada) ---
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Impede que a página recarregue

            const servicesBox = event.target.closest('.services-box');
            servicesBox.classList.toggle('expanded');

            // Atualiza o texto do botão que foi clicado
            if (servicesBox.classList.contains('expanded')) {
                button.textContent = isPortuguese ? 'Ler menos' : 'Read less';
            } else {
                button.textContent = isPortuguese ? 'Ler mais' : 'Read more';
            }
        });
    });

}); // Fim do addEventListener de DOMContentLoaded