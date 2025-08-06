document.addEventListener('DOMContentLoaded', function() {
    // Function to format the number with K, M, etc.
    function formatNumber(num) {
        num = parseInt(num);
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    // Function to update the counter with animation
    function updateCounter() {
        const counterElement = document.getElementById('visitorCount');
        if (!counterElement) return;
        
        // Show loading state
        counterElement.textContent = '...';
        
        // First try to get the count from the server
        fetch('visitor_counter.php')
            .then(response => response.text())
            .then(count => {
                // If we got a valid number from the server, use it
                if (/^\d+$/.test(count.trim())) {
                    const serverCount = parseInt(count);
                    
                    // Get the local count for comparison
                    const localCount = parseInt(localStorage.getItem('visitorCount') || '0');
                    
                    // Use the larger of the two counts
                    const displayCount = Math.max(serverCount, localCount);
                    
                    // Store the count locally
                    localStorage.setItem('visitorCount', displayCount);
                    
                    // Animate the counter
                    animateCounter(0, displayCount, counterElement);
                } else {
                    // If server returns formatted number (with K/M), just display it
                    counterElement.textContent = count.trim();
                }
            })
            .catch(error => {
                console.error('Error fetching visitor count:', error);
                // Fallback to local storage if server is unavailable
                const localCount = parseInt(localStorage.getItem('visitorCount') || '0');
                if (localCount > 0) {
                    counterElement.textContent = formatNumber(localCount);
                } else {
                    counterElement.textContent = '1K+'; // Fallback value
                }
            });
            
        // Mark this session
        if (!localStorage.getItem('hasVisited')) {
            // Increment the local counter
            const currentCount = parseInt(localStorage.getItem('visitorCount') || '0') + 1;
            localStorage.setItem('visitorCount', currentCount);
            localStorage.setItem('hasVisited', 'true');
            
            // Update the display with the new count
            if (counterElement) {
                animateCounter(0, currentCount, counterElement);
            }
        }
    }
    
    // Function to animate the counter
    function animateCounter(start, end, element) {
        const duration = 2000; // 2 seconds
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;
        
        const counter = setInterval(() => {
            frame++;
            
            // Calculate progress (easeOutQuad)
            const progress = frame / totalFrames;
            const easeProgress = progress * (2 - progress);
            
            // Calculate current value
            const current = Math.round(start + easeProgress * (end - start));
            
            // Update the display
            element.textContent = formatNumber(current);
            
            // Stop the animation when done
            if (frame === totalFrames) {
                clearInterval(counter);
                // Ensure we end on the exact value
                element.textContent = formatNumber(end);
            }
        }, frameDuration);
    }

    // Update the counter when the page loads
    updateCounter();
    
    // Update the counter every 5 minutes (in case of multiple tabs open)
    setInterval(updateCounter, 5 * 60 * 1000);
    
    // Reset the session flag when the page is unloaded
    window.addEventListener('beforeunload', function() {
        localStorage.removeItem('hasVisited');
    });
});
