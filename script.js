console.log("JS sudah nyambung, Bos!");

// 1. Deklarasi Variabel
const textElement = document.getElementById('typing-text');
const phrase = "Computer Engineering Student | System Analyst | Data entry";
let index = 0;
const backToTopBtn = document.getElementById("backToTop");

// 2. Fungsi Efek Mengetik
function typeEffect() {
    if (!textElement) return;
    if (index < phrase.length) {
        textElement.innerHTML += phrase.charAt(index);
        index++;
        setTimeout(typeEffect, 50);
    }
}

// 3. Fungsi Reveal (Scroll Animation)
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 50; // Kita naikkan dikit biar pas munculnya

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add("active");
        } else {
            element.classList.remove("active");
        }
    });
}

// 4. Global Scroll Handler (Menggabungkan semua fungsi scroll jadi satu)
window.addEventListener("scroll", () => {
    reveal();          // Animasi muncul
    handleNavbar();    // Transparansi Navbar
    updateActiveMenu(); // Highlight menu
    
    // Logika Back to Top Button
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        if (backToTopBtn) backToTopBtn.style.display = "block";
    } else {
        if (backToTopBtn) backToTopBtn.style.display = "none";
    }
});

// 5. Navbar Scroll Effect
function handleNavbar() {
    const nav = document.querySelector(".navbar");
    if (!nav) return;
    if (window.scrollY > 80) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
}

// 6. Auto-highlight Menu
function updateActiveMenu() {
    const navItems = document.querySelectorAll(".nav-menu li");
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const sections = document.querySelectorAll("section[id]");
    let currentSectionId = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
            currentSectionId = section.getAttribute("id");
        }
    });

    navItems.forEach(li => {
        const link = li.querySelector("a");
        const href = link.getAttribute("href");
        li.classList.remove("active-menu");

        if (href === currentPath) {
            li.classList.add("active-menu");
        } else if (currentPath === "index.html" && href.includes("#" + currentSectionId)) {
            li.classList.add("active-menu");
        }
    });
}

// 7. Event Listeners Saat DOM Siap
document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
    reveal();

    // Logika Filter Project
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projects = document.querySelectorAll(".project-wrapper");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            projects.forEach(project => {
                if (filterValue === "all" || project.classList.contains(filterValue)) {
                    project.style.display = "block";
                    setTimeout(() => {
                        project.classList.remove("project-hidden");
                        // Trigger reveal ulang supaya project yang muncul langsung terlihat
                        reveal(); 
                    }, 50);
                } else {
                    project.classList.add("project-hidden");
                    setTimeout(() => {
                        project.style.display = "none";
                    }, 500); 
                }
            });
        });
    });

    // Back to Top Click
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});

// 8. Smooth Page Transitions
document.addEventListener('click', function(e) {
    const target = e.target.closest('a');
    if (!target) return;
    const href = target.getAttribute('href');

    if (href && href.endsWith('.html')) {
        e.preventDefault();
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = href;
        }, 500);
    }
});