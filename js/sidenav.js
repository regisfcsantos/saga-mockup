document.addEventListener('DOMContentLoaded', function() {
    const burgerIcon = document.getElementById('burgerIcon');
    const sidenav = document.getElementById('mySidenav');
    const closeBtn = document.getElementById('closeBtn');

    // Verifica se os elementos existem na página atual antes de adicionar listeners
    if (burgerIcon && sidenav) {
        burgerIcon.addEventListener('click', function() {
            sidenav.classList.add('open');
        });
    }

    if (closeBtn && sidenav) {
        closeBtn.addEventListener('click', function() {
            sidenav.classList.remove('open');
        });
    }

    // Opcional: Fechar a sidenav se o usuário clicar em um link dentro dela
    // (útil para Single Page Applications, mas pode ser bom para navegação geral também)
    if (sidenav) {
        const navLinksInSidenav = sidenav.querySelectorAll('.nav-links a');
        navLinksInSidenav.forEach(link => {
            link.addEventListener('click', function() {
                // Não feche se for um link 'javascript:void(0)' como o closebtn
                if (this.getAttribute('href') !== 'javascript:void(0)') {
                    sidenav.classList.remove('open');
                }
            });
        });
    }

    // Opcional: Fechar a sidenav se o usuário clicar fora dela (em qualquer lugar do body)
    // Pode ser um pouco mais complexo de acertar para não fechar ao clicar no próprio burger.
    // document.addEventListener('click', function(event) {
    //     if (sidenav && burgerIcon && sidenav.classList.contains('open')) {
    //         const isClickInsideSidenav = sidenav.contains(event.target);
    //         const isClickOnBurger = burgerIcon.contains(event.target);
    //         if (!isClickInsideSidenav && !isClickOnBurger) {
    //             sidenav.classList.remove('open');
    //         }
    //     }
    // });
});