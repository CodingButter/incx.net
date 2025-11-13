/**
 * Image Error Handler
 * Gracefully handles failed image loads by hiding broken images
 */

(function() {
    // Function to handle image errors
    function handleImageError(img) {
        // For hero/background images in sections
        if (img.classList.contains('hero-image') || img.parentElement.classList.contains('absolute')) {
            // Hide the image
            img.style.display = 'none';

            // If it's a hero section background, we might want to show a fallback gradient
            const section = img.closest('section');
            if (section && section.classList.contains('relative')) {
                // The gradient overlays will still work without the image
                console.warn(`Hero image failed to load: ${img.src}`);
            }
        } else {
            // For regular images, hide them
            img.style.display = 'none';
            console.warn(`Image failed to load: ${img.src}`);
        }
    }

    // Function to check if image exists
    function checkImage(img) {
        // Skip if already processed
        if (img.dataset.errorHandled) return;

        // Mark as processed
        img.dataset.errorHandled = 'true';

        // Add error handler
        img.addEventListener('error', function() {
            handleImageError(this);
        });

        // Check if already failed (for cached errors)
        if (img.complete && img.naturalHeight === 0) {
            handleImageError(img);
        }
    }

    // Initialize on DOM ready
    function initImageHandler() {
        // Handle all current images
        const images = document.querySelectorAll('img');
        images.forEach(checkImage);

        // Watch for new images added dynamically
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        if (node.tagName === 'IMG') {
                            checkImage(node);
                        }
                        // Check for images within added elements
                        const imgs = node.querySelectorAll ? node.querySelectorAll('img') : [];
                        imgs.forEach(checkImage);
                    }
                });
            });
        });

        // Start observing
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initImageHandler);
    } else {
        initImageHandler();
    }

    // Also add a global function to manually check images
    window.checkAllImages = function() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.dataset.errorHandled = null; // Reset
            checkImage(img);
        });
    };
})();