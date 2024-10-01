document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    const body = document.querySelector('body');

    menuToggle.addEventListener('click', function () {
        nav.classList.toggle('active'); // Alterna a classe active no menu
        menuToggle.classList.toggle('active'); // Alterna a classe active no botão de menu
    });

    // Fecha o menu ao clicar fora dele
    body.addEventListener('click', function (e) {
        if (!menuToggle.contains(e.target) && !nav.contains(e.target)) {
            nav.classList.remove('active'); // Remove a classe active do menu
            menuToggle.classList.remove('active'); // Remove a classe active do botão de menu
        }
    });
});
