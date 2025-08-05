// Simple JavaScript for KartTrack website

// Add hover effects for navigation images
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to navigation images
    const navImages = document.querySelectorAll('.nav-image');
    
    navImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
    
    // Add hover effects to sponsor logos
    const sponsorLogos = document.querySelectorAll('.sponsor-logo');
    
    sponsorLogos.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
    
    // Simple image preloading for better performance
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.src) {
            const newImg = new Image();
            newImg.src = img.src;
        }
    });
});

// Console message
console.log('🏁 Welcome to East Lansing Kart Track! 🏁');
console.log('"Real Racing for the Whole Family"'); 