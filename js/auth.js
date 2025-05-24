// js/auth.js
document.addEventListener('DOMContentLoaded', function() {
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName') || 'Usuário'; // Pega o nome do usuário salvo

    const currentPage = window.location.pathname.split('/').pop();
    const protectedPagesForNonLoggedIn = [
        'meu-perfil.html',
        'editar-perfil.html',
        'notificacoes.html',
        'criar-editar-competicao.html', // Apenas criador
        'analisar-envios-competicao.html', // Apenas criador
        'pagamento.html', // Adicionado
        'submeter-video.html' // Adicionado
        // Adicione aqui 'submeter-video.html', 'pagamento.html' quando os tiver (Apenas atleta)
    ];
    const creatorOnlyPages = ['criar-editar-competicao.html', 'analisar-envios-competicao.html'];
    const athleteOnlyPages = ['submeter-video.html', 'pagamento.html']; // Adicionar quando tiver

    // 1. Se não há perfil salvo e a página é protegida, redireciona para login
    if (!userRole && protectedPagesForNonLoggedIn.includes(currentPage)) {
        alert('Você precisa estar logado para acessar esta página. Redirecionando para o login.');
        window.location.href = 'login.html';
        return; // Interrompe a execução do script se redirecionar
    }

    // 2. Se o perfil é atleta e a página é apenas para criadores, redireciona
    if (userRole === 'atleta' && creatorOnlyPages.includes(currentPage)) {
        alert('Acesso negado. Esta página é apenas para Criadores. Redirecionando...');
        window.location.href = 'index.html';
        return;
    }

    // 3. (Futuro) Se o perfil é criador e a página é apenas para atletas, redireciona
    if (userRole === 'criador' && athleteOnlyPages.includes(currentPage)) {
         alert('Acesso negado. Esta página é apenas para Atletas. Redirecionando...');
         window.location.href = 'index.html';
         return;
     }

    // 4. Funcionalidade de Logout para todos os links "Sair" no cabeçalho
    //    Procura por um link dentro de 'nav.nav-links' que vá para 'login.html' e contenha 'Sair'
    const navLinksContainer = document.querySelector('header nav.nav-links');
    if (navLinksContainer) {
        const logoutLinks = navLinksContainer.querySelectorAll('a[href="login.html"]');
        logoutLinks.forEach(link => {
            if (link.textContent.trim().toLowerCase() === 'sair') {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    localStorage.removeItem('userRole');
                    localStorage.removeItem('userName');
                    // localStorage.removeItem('userEmail'); // Se você salvar o email
                    alert('Você saiu. Redirecionando para o login.');
                    window.location.href = 'login.html';
                });
            }
        });
    }


    // 5. Atualizar dinamicamente o nome do usuário e tipo em locais específicos
    // Exemplo: Título da página de perfil
    if (currentPage === 'meu-perfil.html') {
        const profileTitle = document.querySelector('.profile-header .profile-info h1');
        if (profileTitle && userRole) { // Certifica-se que userRole existe
            profileTitle.textContent = `${userName} (${userRole === 'atleta' ? 'Atleta' : 'Criador'})`;
        }
    }

    // Exemplo: Campo nome completo na página de editar perfil
    if (currentPage === 'editar-perfil.html') {
        const fullNameInput = document.getElementById('fullName'); // Certifique-se que o input tem id="fullName"
        if (fullNameInput) {
            fullNameInput.value = userName;
        }
        // const emailInput = document.getElementById('email'); // Seu input de email já tem id="email"
        // const userEmail = localStorage.getItem('userEmail');
        // if (emailInput && userEmail) {
        // emailInput.value = userEmail; // O campo de email está desabilitado, então isso é mais visual
        // }
    }

    // 6. Lógica para links ativos na navegação (substituindo os placeholders [active_se_...])
    const navLinks = navLinksContainer ? navLinksContainer.querySelectorAll('a') : [];
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        // Limpa classes de active placeholder
        link.className = link.className.replace(/\[active_se_[^\]]+\]/g, '').trim();

        if (linkPage === currentPage) {
            link.classList.add('active'); // Adiciona uma classe 'active' real
        } else {
            link.classList.remove('active');
        }
    });
    // Casos especiais para navegação, se houver
    if (currentPage === 'editar-perfil.html' && navLinksContainer) {
        const meuPerfilLink = navLinksContainer.querySelector('a[href="meu-perfil.html"]');
        if (meuPerfilLink) meuPerfilLink.classList.add('active');
    }
    if ((currentPage === 'criar-editar-competicao.html' || currentPage === 'analisar-envios-competicao.html' || currentPage === 'detalhes-competicao.html') && navLinksContainer) {
         const competicoesLink = navLinksContainer.querySelector('a[href="index.html"]');
         if(competicoesLink) competicoesLink.classList.add('active');
    }


});