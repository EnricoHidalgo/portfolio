document.addEventListener('DOMContentLoaded', function() {
    // Loader
    setTimeout(function() {
        document.querySelector('.loader').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loader').style.display = 'none';
        }, 500);
    }, 1000);

    // Cursor Personalizado
    const cursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card, .menu-toggle');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });

    // Menu Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const backToTop = document.querySelector('.back-to-top');
        
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            backToTop.classList.add('active');
        } else {
            navbar.classList.remove('scrolled');
            backToTop.classList.remove('active');
        }
    });

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação ao rolar
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-card, .project-card, .contact-content > *');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executar uma vez ao carregar a página

    // Ano atual no footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Habilidades
// Habilidades (no arquivo script.js)
const skills = [
    { name: 'HTML', icon: 'fab fa-html5', level: 90 },
    { name: 'CSS', icon: 'fab fa-css3-alt', level: 85 },
    { name: 'JavaScript', icon: 'fab fa-js', level: 80 },
    { name: 'Node.js', icon: 'fab fa-node-js', level: 75 },
    { name: 'Python', icon: 'fab fa-python', level: 70 },
    { name: 'SQL', icon: 'fas fa-database', level: 75 },
    { name: 'Git', icon: 'fab fa-git-alt', level: 80 },
    { name: 'GitHub', icon: 'fab fa-github', level: 85 },
    { name: 'Photoshop', icon: 'custom-icon-photoshop', level: 75 },
    { name: 'UI Design', icon: 'fas fa-paint-brush', level: 80 },
    { name: 'UX Design', icon: 'fas fa-user-tie', level: 85 }
];

    const skillsGrid = document.querySelector('.skills-grid');
    
    skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card fade-in';
        skillCard.innerHTML = `
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
            </div>
            <h3 class="skill-name">${skill.name}</h3>
            <div class="skill-level">
                <div class="skill-level-bar" style="width: ${skill.level}%"></div>
            </div>
        `;
        skillsGrid.appendChild(skillCard);
    });

    // GitHub API - Pegar repositórios
    const token = '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';
    const username = 'EnricoHidalgo';
    const projectsGrid = document.querySelector('.projects-grid');
    
    // Remover skeletons após carregar os projetos
    function removeSkeletons() {
        document.querySelectorAll('.project-skeleton').forEach(skeleton => {
            skeleton.remove();
        });
    }

    // Função para detectar linguagem principal do repositório
    function getMainLanguage(languages) {
        if (!languages) return '';
        
        let mainLanguage = '';
        let maxLines = 0;
        
        for (const [lang, lines] of Object.entries(languages)) {
            if (lines > maxLines) {
                maxLines = lines;
                mainLanguage = lang;
            }
        }
        
        return mainLanguage;
    }

    // Função para formatar a descrição
    function formatDescription(desc) {
        if (!desc) return 'Sem descrição';
        return desc.length > 100 ? desc.substring(0, 100) + '...' : desc;
    }

    // Função para criar card de projeto
    function createProjectCard(repo) {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card fade-in';
        
        // Verificar se é um repositório de portfolio ou github.io (geralmente não queremos mostrar esses)
        if (repo.name.toLowerCase().includes('portfolio') || repo.name.toLowerCase().includes(username.toLowerCase() + '.github.io')) {
            return null;
        }
        
        const mainLanguage = getMainLanguage(repo.languages);
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="https://raw.githubusercontent.com/${username}/${repo.name}/main/screenshot.jpg" alt="${repo.name}" onerror="this.src='https://via.placeholder.com/600x400?text=No+Image'">
            </div>
            <div class="project-content">
                <h3 class="project-title">${repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}</h3>
                <p class="project-description">${formatDescription(repo.description)}</p>
                <div class="project-tech">
                    ${mainLanguage ? `<span class="tech-tag">${mainLanguage}</span>` : ''}
                </div>
                <div class="project-links">
                    <a href="${repo.html_url}" class="project-link" target="_blank">
                        <i class="fab fa-github"></i>
                        <span>Código</span>
                    </a>
                    ${repo.homepage ? `
                    <a href="${repo.homepage}" class="project-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i>
                        <span>Demo</span>
                    </a>
                    ` : ''}
                </div>
            </div>
        `;
        
        // Adicionar atributo de filtro
        if (mainLanguage) {
            projectCard.setAttribute('data-tech', mainLanguage);
        }
        
        return projectCard;
    }

    // Função para filtrar projetos
    function filterProjects(filter) {
        const allProjects = document.querySelectorAll('.project-card');
        
        allProjects.forEach(project => {
            const tech = project.getAttribute('data-tech') || '';
            
            if (filter === 'all' || tech.toLowerCase().includes(filter.toLowerCase())) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    }

    // Adicionar eventos aos botões de filtro
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterProjects(filter);
        });
    });

    // Carregar repositórios do GitHub
    async function fetchRepositories() {
        try {
            // Primeiro, pegar a lista de repositórios
            const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`, {
                headers: {
                    'Authorization': `token ${token}`
                }
            });
            
            if (!reposResponse.ok) {
                throw new Error('Falha ao carregar repositórios');
            }
            
            const repos = await reposResponse.json();
            
            // Pegar as linguagens para cada repositório
            const reposWithLanguages = await Promise.all(repos.map(async repo => {
                const langsResponse = await fetch(repo.languages_url, {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                });
                
                if (langsResponse.ok) {
                    repo.languages = await langsResponse.json();
                }
                
                return repo;
            }));
            
            // Ordenar por data de atualização (mais recentes primeiro)
            reposWithLanguages.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
            
            // Limitar a 6 repositórios para não sobrecarregar
            const recentRepos = reposWithLanguages.slice(0, 6);
            
            // Remover skeletons
            removeSkeletons();
            
            // Adicionar cards de projeto
            recentRepos.forEach(repo => {
                const projectCard = createProjectCard(repo);
                if (projectCard) {
                    projectsGrid.appendChild(projectCard);
                }
            });
            
            // Inicializar filtro
            filterProjects('all');
            
        } catch (error) {
            console.error('Erro ao carregar projetos:', error);
            removeSkeletons();
            
            // Mostrar mensagem de erro
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Não foi possível carregar os projetos do GitHub. Por favor, tente novamente mais tarde.';
            projectsGrid.appendChild(errorMessage);
        }
    }

    fetchRepositories();

    // Formulário de contato (redirecionar para LinkedIn)
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Aqui você poderia adicionar validações
        
        // Redirecionar para o LinkedIn com mensagem pré-preenchida
        const linkedinUrl = `https://www.linkedin.com/in/EnricoHidalgo/`;
        
        // Simular envio (na prática, você pode querer usar um serviço de backend)
        setTimeout(() => {
            contactForm.reset();
            alert(`Obrigado pela mensagem, ${name}! Você será redirecionado para meu LinkedIn.`);
            window.open(linkedinUrl, '_blank');
        }, 1000);
    });

    // Efeito de digitação no hero
    const heroDescription = document.querySelector('.hero-description');
    const texts = [
        "Transformando ideias em soluções digitais com código limpo e eficiente.",
        "Desenvolvedor Full Stack apaixonado por tecnologia.",
        "Criando experiências digitais incríveis."
    ];
    let currentTextIndex = 0;
    
    function typeWriter(text, i, fnCallback) {
        if (i < text.length) {
            heroDescription.textContent = text.substring(0, i + 1);
            setTimeout(() => typeWriter(text, i + 1, fnCallback), 50);
        } else if (typeof fnCallback == 'function') {
            setTimeout(fnCallback, 2000);
        }
    }
    
    function startTextAnimation() {
        if (currentTextIndex < texts.length) {
            typeWriter(texts[currentTextIndex], 0, () => {
                setTimeout(() => {
                    deleteText(() => {
                        currentTextIndex = (currentTextIndex + 1) % texts.length;
                        startTextAnimation();
                    });
                }, 2000);
            });
        }
    }
    
    function deleteText(fnCallback) {
        const text = heroDescription.textContent;
        let i = text.length;
        
        const timer = setInterval(() => {
            if (i > 0) {
                heroDescription.textContent = text.substring(0, i - 1);
                i--;
            } else {
                clearInterval(timer);
                if (typeof fnCallback == 'function') {
                    fnCallback();
                }
            }
        }, 30);
    }
    
    // Iniciar animação após um pequeno delay
    setTimeout(startTextAnimation, 2000);
});