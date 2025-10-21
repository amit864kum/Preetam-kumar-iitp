// ====================== Navbar Dropdown (Click-based) ======================
        document.addEventListener("DOMContentLoaded", () => {
            const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

            dropdownToggles.forEach(toggle => {
                toggle.addEventListener("click", e => {
                    e.stopPropagation();
                    const parent = toggle.parentElement;

                    // Close all other dropdowns
                    document.querySelectorAll(".dropdown").forEach(d => {
                        if (d !== parent) d.classList.remove("open");
                    });

                    // Toggle clicked dropdown
                    parent.classList.toggle("open");
                });
            });

            // Close dropdown when clicking outside
            document.addEventListener("click", e => {
                if (!e.target.closest(".dropdown")) {
                    document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("open"));
                }
            });

            // Close dropdown when clicking on a dropdown link
            document.querySelectorAll(".dropdown-menu a").forEach(link => {
                link.addEventListener("click", () => {
                    document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("open"));
                });
            });
        });

        // ======  Navbar Scroll Shadow
        window.addEventListener("scroll", () => {
            const navbar = document.getElementById("navbar");
            if (window.scrollY > 20) navbar.classList.add("scrolled");
            else navbar.classList.remove("scrolled");
        });

        // === Mobile Navbar Toggle
        const menuToggle = document.getElementById("menu-toggle");
        const navMenu = document.getElementById("nav-menu");

        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // ===== Carousel Functionality
        const carouselImages = document.querySelectorAll(".carousel-image");
        const progressDots = document.querySelectorAll(".progress-dot");
        const prevBtn = document.querySelector(".carousel-btn.prev");
        const nextBtn = document.querySelector(".carousel-btn.next");

        let currentIndex = 0;

        function showImage(index) {
            carouselImages.forEach((img, i) => {
                img.classList.toggle("active", i === index);
                progressDots[i]?.classList.toggle("active", i === index);
            });
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % carouselImages.length;
            showImage(currentIndex);
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
            showImage(currentIndex);
        }

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener("click", nextImage);
            prevBtn.addEventListener("click", prevImage);
        }

        // Auto slide every 5 seconds
        setInterval(nextImage, 5000);

        // ====== Scroll Animation for Sections
        const sections = document.querySelectorAll(".section");

        function revealSections() {
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (sectionTop < windowHeight - 100) { section.classList.add("visible"); }
            });
        }
        window.addEventListener("scroll", revealSections); revealSections(); // PhD Students Toggle Functionality
        function togglePhdList(type) {
            const ongoingBtn = document.getElementById('ongoing-btn'); const
                completedBtn = document.getElementById('completed-btn'); const ongoingList = document.getElementById('ongoing-phd');
            const completedList = document.getElementById('completed-phd'); if (type === 'ongoing') {
                ongoingBtn.classList.add('active'); completedBtn.classList.remove('active');
                completedList.classList.add('hidden'); setTimeout(() => {
                    ongoingList.classList.remove('hidden');
                }, 250);
            } else {
                completedBtn.classList.add('active');
                ongoingBtn.classList.remove('active');

                ongoingList.classList.add('hidden');
                setTimeout(() => {
                    completedList.classList.remove('hidden');
                }, 250);
            }
        }



        // Collapsible Sections Functionality
        function toggleCollapsible(header) {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.collapsible-icon');

            header.classList.toggle('active');
            content.classList.toggle('active');

            if (content.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        }

        // ====== Horizontal Scroll (Research, Projects, Teaching)
        document.querySelectorAll(".scroll-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const targetId = btn.getAttribute("data-scroll");
                const scrollContainer = document.getElementById(`${targetId}-scroll`);
                const scrollAmount = 400;

                if (btn.classList.contains("left")) scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
                else scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
            });
        });

        // Stats counter animation
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number, .stat-mini-number');

                    statNumbers.forEach(stat => {
                        const text = stat.textContent;
                        const finalNumber = parseInt(text.replace(/\D/g, ''));
                        const hasPlus = text.includes('+');

                        if (finalNumber > 0) {
                            const increment = Math.max(1, Math.floor(finalNumber / 30));
                            let current = 0;

                            const timer = setInterval(() => {
                                current += increment;
                                if (current >= finalNumber) {
                                    stat.textContent = finalNumber + (hasPlus ? '+' : '');
                                    clearInterval(timer);
                                } else {
                                    stat.textContent = current + (hasPlus ? '+' : '');
                                }
                            }, 50);
                        }
                    });

                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        // Observe stats sections
        document.querySelectorAll('.stats, .profile-stats').forEach(stats => {
            statsObserver.observe(stats);
        });

        // Scroll to top functionality
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 18px;
            cursor: pointer;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(30, 60, 114, 0.3);
        `;

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        document.body.appendChild(scrollToTopBtn);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        });
