// Social Sharing Functionality
document.addEventListener('DOMContentLoaded', function() {
    const shareWidget = document.querySelector('.social-share-widget');
    if (!shareWidget) return;

    // Get current page URL and title
    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);
    
    // Set up share links
    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
        whatsapp: `https://wa.me/?text=${pageTitle}%20${pageUrl}`
    };

    // Initialize counters from localStorage or set to 0
    function initializeCounters() {
        const counters = shareWidget.querySelectorAll('.share-count[data-count]');
        counters.forEach(counter => {
            const socialType = counter.closest('a').dataset.social;
            const count = localStorage.getItem(`share-${socialType}-count`) || 0;
            counter.textContent = count;
            counter.setAttribute('data-count', count);
        });
    }

    // Update counter in both UI and storage
    function updateCounter(button) {
        const counter = button.querySelector('.share-count');
        if (!counter || !counter.hasAttribute('data-count')) return;
        
        let count = parseInt(counter.getAttribute('data-count')) || 0;
        count++;
        counter.setAttribute('data-count', count);
        localStorage.setItem(`share-${button.dataset.social}-count`, count);
        counter.textContent = count > 1000 ? (count / 1000).toFixed(1) + 'k' : count.toString();
    }

    // Add click handlers for share buttons
    shareWidget.addEventListener('click', function(e) {
        e.preventDefault();
        const link = e.target.closest('a');
        if (!link) return;

        const socialType = link.getAttribute('data-social');
        
        if (socialType === 'link') {
            // Copy link to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                const countSpan = link.querySelector('.share-count');
                const originalText = countSpan.textContent;
                countSpan.textContent = 'Copied!';
                setTimeout(() => {
                    countSpan.textContent = originalText;
                }, 2000);
            });
            return;
        }

        // Open share dialog for social networks
        if (shareLinks[socialType]) {
            const width = 600, height = 500;
            const left = (window.innerWidth - width) / 2;
            const top = (window.innerHeight - height) / 2;
            
            const shareWindow = window.open(
                shareLinks[socialType],
                'Share Dialog',
                `width=${width},height=${height},top=${top},left=${left}`
            );
            
            // Update counter when the share window is closed or after a short delay
            const checkWindow = setInterval(() => {
                if (shareWindow.closed) {
                    clearInterval(checkWindow);
                    updateCounter(link);
                }
            }, 500);
            
            // Fallback in case we can't detect window close
            setTimeout(() => {
                clearInterval(checkWindow);
                updateCounter(link);
            }, 2000);
        }
    });

    // Initialize counters when the page loads
    initializeCounters();
});
