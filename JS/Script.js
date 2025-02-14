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
        console.log(nav);
        menuHamburguer.classList.toggle('change');

        if (menuHamburguer.classList.contains('change')) {
            nav.style.display = 'block';
        } else {
            nav.style.display = 'none';
        }
    }
});