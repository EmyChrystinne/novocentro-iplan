document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.incentivo');

    sections.forEach(section => {
        const slides = section.querySelector('.slides');
        const indicatorsContainer = section.querySelector('.progress-bar');
        const beneficios = section.querySelectorAll('.beneficio');
        const totalSlides = beneficios.length; // Total de benefícios (slides)
        let currentSlide = 0; // Slide atual
        let autoPlayInterval;
        let startX; // Para rastrear o ponto inicial do toque
        let isDragging = false; // Flag para verificar se estamos arrastando

        // Criação dos marcadores dinamicamente
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (i === 0) {
                indicator.classList.add('active');
            }
            indicatorsContainer.appendChild(indicator);

            // Event listener para cada marcador
            indicator.addEventListener('click', function () {
                currentSlide = i; // Define o slide atual para o índice clicado
                updateSlider();
                resetAutoplay(); // Reseta o autoplay ao clicar
            });
        }

        // Função para atualizar o slider e os marcadores
        function updateSlider() {
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
            const indicators = indicatorsContainer.querySelectorAll('.indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }

        // Função de autoplay para mudar o slide automaticamente
        function autoplay() {
            autoPlayInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % totalSlides; // Muda para o próximo slide
                updateSlider();
            }, 5000); // Mudar a cada 5 segundos
        }

        // Reseta o autoplay quando o usuário interage
        function resetAutoplay() {
            clearInterval(autoPlayInterval);
            autoplay();
        }

        // Inicializa o slider e o autoplay
        updateSlider();
        autoplay();

        // Controles de teclado para navegação
        document.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowRight') {
                currentSlide = (currentSlide + 1) % totalSlides; // Próximo slide
                updateSlider();
                resetAutoplay();
            } else if (e.key === 'ArrowLeft') {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // Slide anterior
                updateSlider();
                resetAutoplay();
            }
        });

        // Funções de arrasto
        slides.addEventListener('mousedown', startDrag);
        slides.addEventListener('touchstart', startDrag);
        slides.addEventListener('mousemove', drag);
        slides.addEventListener('touchmove', drag);
        slides.addEventListener('mouseup', endDrag);
        slides.addEventListener('touchend', endDrag);
        slides.addEventListener('mouseleave', endDrag);

        function startDrag(event) {
            startX = event.type === 'mousedown' ? event.pageX : event.touches[0].pageX;
            isDragging = true;
        }

        function drag(event) {
            if (!isDragging) return;
            const x = event.type === 'mousemove' ? event.pageX : event.touches[0].pageX;
            const diff = startX - x;

            // Se o arrasto for suficiente, mudar o slide
            if (Math.abs(diff) > 50) {
                currentSlide = (currentSlide + (diff > 0 ? 1 : -1) + totalSlides) % totalSlides; // Muda o slide
                updateSlider();
                resetAutoplay();
                isDragging = false; // Para evitar múltiplos cliques
            }
        }

        function endDrag() {
            isDragging = false; // Finaliza o arrasto
        }
    });
});
