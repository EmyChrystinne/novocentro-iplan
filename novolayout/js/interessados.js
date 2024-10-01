document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.incentivo');

    sections.forEach(section => {
        const buttons = section.querySelectorAll('.navegacao-interessados button');
        const contents = section.querySelectorAll('.interessados-content');

        // Função para ocultar todos os conteúdos
        function hideAllContents() {
            contents.forEach(content => content.classList.remove('active'));
        }

        // Função para remover a classe active-btn de todos os botões
        function removeActiveClass() {
            buttons.forEach(button => button.classList.remove('active-btn'));
        }

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                hideAllContents(); // Oculta todos os conteúdos
                removeActiveClass(); // Remove a classe active de todos os botões

                // Mostra o conteúdo correspondente ao botão clicado
                const targetContentId = button.id.replace('-btn', '') + '-content';
                const targetContent = section.querySelector(`#${targetContentId}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }

                button.classList.add('active-btn'); // Adiciona a classe active ao botão clicado
            });
        });

        // Exibe o conteúdo inicial e define o botão ativo
        hideAllContents();
        const initialButton = section.querySelector('#principios-btn');
        const initialContent = section.querySelector('#principios-content');
        if (initialContent) {
            initialContent.classList.add('active');
        }
        if (initialButton) {
            initialButton.classList.add('active-btn');
        }
    });
});
