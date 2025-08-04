document.addEventListener('DOMContentLoaded', function() {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('hasVisited');
    let visitorCount = localStorage.getItem('visitorCount') || 0;
    
    // Only increment if it's a new session
    if (!hasVisited) {
        visitorCount++;
        localStorage.setItem('visitorCount', visitorCount);
        localStorage.setItem('hasVisited', 'true');
    }
    
    // Update the counter display
    const visitorCountElement = document.getElementById('visitorCount');
    if (visitorCountElement) {
        // Format the number with commas for better readability
        visitorCountElement.textContent = Number(visitorCount).toLocaleString();
    }
    
    // Reset the session flag when the page is unloaded
    window.addEventListener('beforeunload', function() {
        localStorage.removeItem('hasVisited');
    });
});
