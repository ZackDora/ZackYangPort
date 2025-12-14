document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation Elements ---
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link'); 
    
    // --- Index Page Elements (These will be null on project pages) ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workBlocks = document.querySelectorAll('.work-block');
    const workTitle = document.querySelector('.works-title');


    // ==========================================================================
    // 1. Works Filtering and Smooth Scroll (Index Page only)
    // ==========================================================================

    function setActiveButton(type) {
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === type);
        });
    }

    function filterWorks(type) {
        let hasVisibleBlock = false;
        workBlocks.forEach(block => {
            const isVisible = type === 'all' || block.classList.contains(type);
            block.style.display = isVisible ? 'flex' : 'none';
            if (isVisible) {
                hasVisibleBlock = true;
            }
        });

        setActiveButton(type);

        // Smooth scroll to works section for better mobile UX after filtering
        if (hasVisibleBlock) {
            const worksSection = document.querySelector('.works');
            if (worksSection) {
                worksSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    // Initialize filtering only if elements exist (i.e., we are on the index page)
    if (workTitle) {
        // Event listeners for filter buttons
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterWorks(btn.dataset.type);
            });
        });

        // Event listener for work title to show all
        workTitle.addEventListener('click', () => {
            filterWorks('all');
        });

        // Default state: show all works on page load
        filterWorks('all');
    }


    // ==========================================================================
    // 2. Mobile Navigation Toggle Functionality (All Pages)
    // ==========================================================================
    
    function toggleNavMenu() {
        // Only run if nav elements exist
        if (navToggle && navList) {
            const isOpen = navList.classList.toggle('active');
            navToggle.classList.toggle('open', isOpen);
            // Update Aria attribute for screen readers
            navToggle.setAttribute('aria-expanded', isOpen);
        }
    }

    // Click event for the hamburger button
    if (navToggle) {
        navToggle.addEventListener('click', toggleNavMenu);
    }

    // Close menu when a navigation link is clicked (Standard mobile behavior)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList && navList.classList.contains('active')) {
                toggleNavMenu();
            }
        });
    });
});