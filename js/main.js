// It waits until all elements are loaded4
// It prevents JavaScript from running before elements exist
document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation Elements ---
    //Getting the navigation elements
    //document.querySelector "Find one element in the HTML"
    //doucument.querySelectorAll "Find all elements in the HTML that match"
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link'); 
    
    // --- Index Page Elements (These will be null on project pages) ---
    // Get elements realted to the Works section
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workBlocks = document.querySelectorAll('.work-block');
    const workTitle = document.querySelector('.works-title');


    // ==========================================================================
    // 1. Works Filtering and Smooth Scroll (Index Page only)
    // ==========================================================================

    //THIS FUNCTION CHANGES THE CSS OF THE HIGHLIGHTED BUTTON
    function setActiveButton(type) {

        // Go through every filter button
        // For each button in the list, call it btn
        // btn is just a name
        // filterButtons.addEventListener('click', ...) will not work here because filterButtons has many buttons and addEventListener works on one element only, so we need to loop and handle each button separately
        // forEach is a way to loop through all items in a list
        filterButtons.forEach(btn => {

            // every button in HTML has data-type
            // dataset is a special object JS gives you for every element
            // dataset is an object that holds all the data- attributes
            
            // btn.dataset.type reads the data-type of the clicked button

            // data-type --> dataset.type
            // data-user-id --> dataset.userId (use camelCase for hyphens)

            // btn.dataset.type === type checks if the button matches the type we want
            // If true, this button is the active one. If false, this button is not active
            // If true, active one, add the class "active" to the button, which in the css will highlight the button by changing its style
            // If false, remove the highlight, return to being a normal button
            
            btn.classList.toggle('active', btn.dataset.type === type);
        });
    }

    // THIS FUNCTION DOES THE FILTERING JOB AFTER IT RECEIVES THE TYPE OF THE CLICKED BUTTON
    function filterWorks(type) {

        // This variable tracks whether at least one work block is visible after filtering
        let hasVisibleBlock = false;

        // loops through all the work items in the works section
        // block is one work item (one article) in the loop
        workBlocks.forEach(block => {

            /*
                if (type === 'all') {
                    block.style.display = 'flex';
                } else if (block.classList.contains(type)) {
                    block.style.display = 'flex';
                } else {
                    block.style.display = 'none';
                }

            */

            // type === 'all' checks if the selected filter is 'all'
            // if yes, the isVisible is true
            // if no, the isVisible is false
            // block.classList.contains(type) check if this work block has a class that matches the selected filter
            // || means OR; the result is true if either side is true
            // SHOW THIS BLOCK (THE WORK) IF EITHER THE SELECTED FILTER IS ALL OR THIS BLOCK BELONGS TO THE SELECTED CATEGORY
            const isVisible = type === 'all' || block.classList.contains(type);


            // block.style.display
            // .style.display lets you set the CSS display property directly via JS

            // ? : is a short way of writing an if else

            /*
                if (isVisible) {
                    block.style.display = 'flex';
                } else {
                    block.style.display = 'none';
                }
            */

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
        // THIS IS WHERE THE PARAMETER 'type' COMES FROM!
        // btn.dataset.type reads the data-type attribute of the clicked button in HTML
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
    
    // The function opens or close the mobile menu
    // "toggle" means if it's ON, turn it OFF, if it's OFF, turn it ON
    function toggleNavMenu() {

        // If navList does not have the class "active" then add it
        // If it has, remove it
        // The CSS .nav-list.active controls whether the menu is visible
        navList.classList.toggle('active');

        // The same thing, but for the hamburger button
        // This for the animation of the hamburger menu
        navToggle.classList.toggle('open');
    }

    // This is for safety check. Check if both navToggle and navList actually exist on the page
    if (navToggle && navList) {

        // Add a click event to the hamburger button
        // When the button is clicked, then run the function toggleNavMenu
        navToggle.addEventListener('click', toggleNavMenu)

        // navLinks is a list of all links inside the nav menu
        // forEach means: "do this for every link"
        navLinks.forEach(link => {
        
        // When any navigation link is clicked, run the same toggleNavMenu function
        // Since links can only be clicked when the menu is open, toggling the menu here will close it
        link.addEventListener('click', toggleNavMenu)
        })
    }
    

    
});