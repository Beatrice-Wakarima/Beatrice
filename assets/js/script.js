document.addEventListener('DOMContentLoaded', () => {

    // --- CLICKABLE PROJECT CARDS ---
    const projectCards = document.querySelectorAll('.project-card[data-href]');
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('a')) return; // let real links behave natively
            const href = card.getAttribute('data-href');
            if (href) window.location.href = href;
        });
    });

    // --- SMOOTH SCROLL & ACTIVE NAV ON CLICK ---
    const navLinks = document.querySelectorAll('.navlink');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Only intercept if the link is an internal anchor link (starts with #)
            if (targetId.startsWith('#')) {
                e.preventDefault(); // Stop normal navigation ONLY for anchors

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
            // If it doesn't start with '#', this block is skipped,
            // e.preventDefault() is never called, and the link navigates normally.
        });
    });

    // --- DYNAMIC FOOTER YEAR ---
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // --- JOURNEY CARD SKILLS TOGGLE (about/journey page) ---
    const skillToggles = document.querySelectorAll('.toggle-skills-btn');
    skillToggles.forEach(button => {
        button.addEventListener('click', () => {
            const list = button.nextElementSibling;
            const icon = button.querySelector('.toggle-icon');
            const buttonText = button.querySelector('span');

            list.classList.toggle('open');

            if (list.classList.contains('open')) {
                if (buttonText) buttonText.textContent = 'Hide Key Skills';
                if (icon) icon.style.transform = 'rotate(180deg)';
            } else {
                if (buttonText) buttonText.textContent = 'View Key Skills';
                if (icon) icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // --- CASE STUDY MODAL ---
    const modalBackdrop = document.getElementById('modal-backdrop');
    if (modalBackdrop) {
        const modal = modalBackdrop.querySelector('.modal');
        const closeModalBtn = document.getElementById('close-modal-btn');
        const openModalBtns = document.querySelectorAll('.view-btn');

        const openModal = (data) => {
            modal.querySelector('#modal-title').textContent = data.title;
            modal.querySelector('#modal-desc').textContent = data.desc;
            modal.querySelector('#modal-github-link').href = data.github;

            const tagsWrap = modal.querySelector('#modal-tags');
            if (tagsWrap) {
                tagsWrap.innerHTML = '';
                (data.tags || []).forEach(t => {
                    const span = document.createElement('span');
                    span.className = 'tag';
                    span.textContent = t;
                    tagsWrap.appendChild(span);
                });
            }

            modalBackdrop.style.display = 'flex';
            setTimeout(() => modalBackdrop.classList.add('visible'), 10);
        };

        const closeModal = () => {
            modalBackdrop.classList.remove('visible');
            setTimeout(() => modalBackdrop.style.display = 'none', 300);
        };

        openModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const projectData = JSON.parse(btn.dataset.project);
                openModal(projectData);
            });
        });

        closeModalBtn.addEventListener('click', closeModal);
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalBackdrop.classList.contains('visible')) closeModal();
        });
    }

    // --- SCROLL-SPY TO HIGHLIGHT ACTIVE NAV LINK ---
    const sections = document.querySelectorAll('main section[id]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => observer.observe(section));

    // --- DIGITAL GARDEN: ANIMATED KNOWLEDGE-GRAPH CANVAS ---
    const canvas = document.getElementById('gardenCanvas');
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext('2d');
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let width = canvas.width;
        let height = canvas.height;

        const resize = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            width = rect.width;
            height = rect.height;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const NODE_COUNT = 22;
        const nodes = [];
        for (let i = 0; i < NODE_COUNT; i++) {
            nodes.push({
                x: Math.random(),
                y: Math.random(),
                vx: (Math.random() - 0.5) * 0.0006,
                vy: (Math.random() - 0.5) * 0.0006,
                r: 2 + Math.random() * 2.4
            });
        }

        // Build a sparse set of edges (each node links to 1-2 nearby nodes)
        const edges = [];
        nodes.forEach((n, i) => {
            const linkCount = 1 + Math.floor(Math.random() * 2);
            for (let k = 0; k < linkCount; k++) {
                const j = Math.floor(Math.random() * NODE_COUNT);
                if (j !== i) edges.push([i, j]);
            }
        });

        function draw() {
            ctx.clearRect(0, 0, width, height);

            // edges
            ctx.lineWidth = 1;
            edges.forEach(([a, b]) => {
                const na = nodes[a], nb = nodes[b];
                const x1 = na.x * width, y1 = na.y * height;
                const x2 = nb.x * width, y2 = nb.y * height;
                const dist = Math.hypot(x2 - x1, y2 - y1);
                const maxDist = Math.hypot(width, height) * 0.55;
                const alpha = Math.max(0, 0.22 - (dist / maxDist) * 0.18);
                ctx.strokeStyle = `rgba(61, 245, 143, ${alpha + 0.06})`;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            });

            // nodes
            nodes.forEach(n => {
                const x = n.x * width, y = n.y * height;
                const glow = ctx.createRadialGradient(x, y, 0, x, y, n.r * 5);
                glow.addColorStop(0, 'rgba(61, 245, 143, 0.55)');
                glow.addColorStop(1, 'rgba(61, 245, 143, 0)');
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.arc(x, y, n.r * 5, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#3df58f';
                ctx.beginPath();
                ctx.arc(x, y, n.r, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        function step() {
            nodes.forEach(n => {
                n.x += n.vx;
                n.y += n.vy;
                if (n.x < 0.02 || n.x > 0.98) n.vx *= -1;
                if (n.y < 0.05 || n.y > 0.95) n.vy *= -1;
            });
            draw();
            if (!reduceMotion) requestAnimationFrame(step);
        }

        resize();
        window.addEventListener('resize', resize);
        draw();
        if (!reduceMotion) requestAnimationFrame(step);
    }
});
