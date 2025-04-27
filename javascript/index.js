// JavaScript to handle navigation highlighting and smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
    // Get all sections that we want to track
    const sections = document.querySelectorAll('#intro, #skills, #aboutMe, #projects, #contact');
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Calculate header height (for offset)
    const headerHeight = document.querySelector('.sticky-top').offsetHeight;
    
    // Add click event listeners to navigation links for smooth scrolling with offset
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section id from the href
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate position with offset for header
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                // Smooth scroll to the section
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Function to update active navigation based on scroll position
    function updateActiveNavigation() {
        // Default to intro section when at the top
        let currentSection = 'intro';
        
        // Check if user has scrolled to bottom of page
        const bottomOfPage = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 50;
        
        if (bottomOfPage) {
            // If at bottom, always highlight contact section
            currentSection = 'contact';
        } else if (window.pageYOffset > 50) {
            // Determine which section is in view, accounting for header height
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                
                // Check if we've scrolled to this section (with offset for header)
                if(pageYOffset >= (sectionTop - headerHeight - 50)) {
                    currentSection = section.getAttribute('id');
                }
            });
        }
        
        // Update navigation classes
        navLinks.forEach(link => {
            // Remove active and textPrimary class from all links
            link.classList.remove('active', 'textPrimary');
            
            // Add active and textPrimary class to current section's link
            const href = link.getAttribute('href');
            if(href === `#${currentSection}`) {
                link.classList.add('active', 'textPrimary');
            }
        });
    }
    
    // Initial call to set the active navigation on page load
    updateActiveNavigation();
    
    // Add scroll event listener
    window.addEventListener('scroll', updateActiveNavigation);
});