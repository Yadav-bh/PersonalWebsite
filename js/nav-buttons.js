// Function to add navigation buttons to the page
document.addEventListener('DOMContentLoaded', function() {
    // Create buttons container
    const navButtons = document.createElement('div');
    navButtons.className = 'nav-buttons';
    
    // Create Home button
    const homeButton = document.createElement('a');
    homeButton.href = 'index.html';
    homeButton.className = 'nav-button';
    homeButton.title = 'Go to Home';
    homeButton.innerHTML = '<i class="bi bi-house"></i>';
    
    // Create Back button
    const backButton = document.createElement('button');
    backButton.className = 'nav-button';
    backButton.title = 'Go Back';
    backButton.innerHTML = '<i class="bi bi-arrow-left"></i>';
    backButton.onclick = function() {
        window.history.back();
    };
    
    // Add buttons to container
    navButtons.appendChild(backButton);
    navButtons.appendChild(homeButton);
    
    // Add container to body
    document.body.appendChild(navButtons);
    
    // Add some bottom padding to the body to prevent content from being hidden behind buttons
    document.body.style.paddingBottom = '80px';
});
