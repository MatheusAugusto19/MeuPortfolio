// script.js

document.addEventListener('DOMContentLoaded', () => {
    const menuHamburguer = document.querySelector('.menu-hamburguer');
    menuHamburguer.addEventListener('click', toggleMenu);

    // Adicionando a funcionalidade de troca de idiomas
    const toggleButton = document.getElementById('toggleLanguage');
    let isPortuguese = false; // Começa em inglês

    toggleButton.addEventListener('click', () => {
        isPortuguese = !isPortuguese; // Alterna o estado

        // Atualiza o texto do botão
        toggleButton.textContent = isPortuguese ? "English" : "Português";

        // Atualiza o conteúdo
        document.querySelectorAll('[data-en], [data-pt]').forEach(element => {
            element.textContent = isPortuguese ? element.getAttribute('data-pt') : element.getAttribute('data-en');
        });
    });

    function toggleMenu() {
        const nav = document.querySelector('.nav-responsive');
        menuHamburguer.classList.toggle('change');

        if (menuHamburguer.classList.contains('change')) {
            nav.style.display = 'block';
        } else {
            nav.style.display = 'none';
        }
    }

    // Lógica para o botão "Read more"
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Impede o redirecionamento

            const servicesBox = button.closest('.services-box');
            const shortText = servicesBox.querySelector('.short-text');
            const fullText = servicesBox.querySelector('.full-text');

            // Alterna a visibilidade do texto curto e do texto completo
            if (fullText.style.display === 'none') {
                fullText.style.display = 'block';
                shortText.style.display = 'none';
                button.textContent = isPortuguese ? 'Ler menos' : 'Read less'; // Muda o texto do botão
            } else {
                fullText.style.display = 'none';
                shortText.style.display = 'block';
                button.textContent = isPortuguese ? 'Ler mais' : 'Read more'; // Restaura o texto do botão
            }
        });
    });
});