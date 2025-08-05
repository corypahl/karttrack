# KartTrack Website Recreation

A faithful recreation of the original East Lansing Kart Track website (karttrack.com) using modern HTML, CSS, and JavaScript while maintaining the classic design and layout.

## 🏁 About

This project recreates the original KartTrack website that was known for its classic racing track aesthetic with:
- Black background with red accents
- Left-side navigation menu with image buttons
- Classic racing imagery
- Sponsor section with local business logos
- "Real Racing for the Whole Family" branding

## 📁 Project Structure

```
karttrack/
├── index.html          # Main homepage recreation
├── css/
│   └── styles.css      # Classic styling with black/red theme
├── js/
│   └── main.js         # Simple interactive functionality
├── assets/             # Images and graphics (see assets/README.md)
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Pages deployment
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- Git (for version control)
- GitHub account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/karttrack.git
   cd karttrack
   ```

2. **Add required images**
   - Place the required images in the `assets/` folder
   - See `assets/README.md` for the complete list of needed images

3. **Open in your browser**
   - Simply open `index.html` in your web browser
   - Or use a local server for development:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js
     npx http-server
     ```

4. **View the website**
   - Navigate to `http://localhost:8000` (if using a local server)
   - Or open `index.html` directly in your browser

## 🖼️ Required Images

The website requires several images to display properly. See `assets/README.md` for the complete list, including:

- **Main Banner**: `top_logo.gif` (760x110px)
- **Navigation Buttons**: 15 menu button images (148px wide)
- **Content Images**: Racing photos and graphics
- **Sponsor Logos**: Local business logos

### Quick Image Setup

If you don't have the original images:
1. Create simple colored rectangles as placeholders
2. Add text overlays to identify each image
3. Use the exact dimensions specified in `assets/README.md`

## 🌐 Deployment to GitHub Pages

### Automatic Deployment

1. **Push to main branch**
   ```bash
   git add .
   git commit -m "Initial KartTrack recreation"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Choose **main** branch and **/(root)** folder
   - Click **Save**

3. **Your site will be available at**
   ```
   https://yourusername.github.io/karttrack
   ```

## 🎨 Design Features

### Classic Layout
- **Fixed Width**: 760px maximum width (original design)
- **Left Navigation**: Image-based menu buttons
- **Black Background**: Authentic racing track aesthetic
- **Red Accents**: Classic racing color scheme

### Responsive Design
- Mobile-friendly adaptations
- Flexible image scaling
- Maintains original proportions

### Modern Enhancements
- CSS Grid and Flexbox for layout
- Hover effects on interactive elements
- Image preloading for performance
- Print-friendly styles

## 📱 Responsive Design

The recreation includes responsive design features:
- Mobile-first approach for smaller screens
- Flexible navigation layout on mobile
- Optimized image scaling
- Touch-friendly interactive elements

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 Original Website

This is a recreation of the original East Lansing Kart Track website:
- **Original URL**: https://karttrack.com
- **Location**: East Lansing, Michigan
- **Tagline**: "Real Racing for the Whole Family"

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/Improvement`)
3. Commit your changes (`git commit -m 'Add improvement'`)
4. Push to the branch (`git push origin feature/Improvement`)
5. Open a Pull Request

## 📞 Contact

For questions about this recreation:
- Email: info@karttrack.com (original contact)
- GitHub Issues: Use the repository issues page

## 🚀 Future Enhancements

Potential improvements to consider:
- [ ] Add missing page recreations (schedule, results, etc.)
- [ ] Implement photo gallery functionality
- [ ] Add race results database
- [ ] Create mobile app companion
- [ ] Add modern contact forms
- [ ] Implement real-time race updates

---

**Recreated with ❤️ to preserve the classic KartTrack experience** 