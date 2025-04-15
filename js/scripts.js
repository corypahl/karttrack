document.addEventListener('DOMContentLoaded', function() {
    // Load header.html into the header-placeholder
    fetch('_includes/header.html')
      .then(response => response.text())
      .then(html => {
        document.getElementById('header-placeholder').innerHTML = html;
        // Once header is loaded, load the navbar into the placeholder inside the header
        return fetch('navbar.html');
      })
      .then(response => response.text())
      .then(navHtml => {
        const navbarPlaceholder = document.getElementById('navbar-placeholder');
        if (navbarPlaceholder) {
          navbarPlaceholder.innerHTML = navHtml;
        }
      })
      .catch(error => {
        console.error('Error loading header or navbar:', error);
      });
  
    // Load footer.html into the footer-placeholder
    fetch('_includes/footer.html')
      .then(response => response.text())
      .then(html => {
        document.getElementById('footer-placeholder').innerHTML = html;
      })
      .catch(error => {
        console.error('Error loading footer:', error);
      });
  });
  