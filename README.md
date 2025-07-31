# 🌙 Umrah Dua Guide - Your Spiritual Journey Companion

A beautiful, interactive web application designed to guide users through duas and prayers for Umrah and travel. This app includes all essential Islamic prayers with step-by-step guidance, bookmark functionality, and the ability to add custom duas.

## ✨ Features

### 🧭 Journey Guidance
- **Travel Duas**: Essential prayers for leaving home, starting journey, safe travel, and entering new places
- **Step-by-step Instructions**: Organized prayers with context and proper guidance
- **Hadith References**: Authentic sources for travel-related duas

### 🕋 Umrah Section
- **5-Step Progressive Guide**: Organized duas in logical sequence for Umrah
- **Interactive Navigation**: Click steps or use arrow keys to navigate
- **Custom Dua Addition**: Add your personal duas to the Umrah collection
- **Visual Progress Tracking**: See your progress through the spiritual journey

### 👨‍👩‍👧‍👦 Family Prayers
- **Parents**: Duas for living and deceased parents
- **Children**: Prayers for righteous offspring and protection
- **Siblings**: Special prayers for brothers and sisters
- **Family Health**: Healing and protection prayers

### 🕌 Madinah Visits
- **Prophet's Mosque**: Proper etiquette and duas for entering
- **Sending Salaam**: Authentic salutations to Prophet Muhammad ﷺ
- **Companions**: Respectful greetings to Abu Bakr and Umar (رضي الله عنهما)

### 🔧 Interactive Features

#### Bookmark System
- **Save Favorite Duas**: Click the bookmark icon to save important prayers
- **Persistent Storage**: Bookmarks saved locally on your device
- **Visual Indicators**: Bookmarked duas are highlighted with golden icons

#### Tasbih Counter
- **Built-in Counter**: For duas requiring repetition (like 100x سبحان اللهِ وبحمدِه)
- **Visual Feedback**: Smooth animations and celebration at 100 completions
- **Progress Tracking**: Keep track of your dhikr easily

#### Audio Features
- **Play Button**: Audio playback capability for proper pronunciation
- **Visual Feedback**: Button animations provide immediate response

#### Responsive Design
- **Mobile Optimized**: Perfect for use during travel on smartphones
- **Tablet Friendly**: Excellent experience on tablets
- **Desktop Compatible**: Beautiful interface on larger screens

### ⌨️ Keyboard Shortcuts
- **1-4 Keys**: Navigate between sections (Journey, Umrah, Family, Madinah)
- **Arrow Keys**: Navigate steps in Umrah section
- **Ctrl/Cmd + N**: Open "Add New Dua" modal in Umrah section
- **Escape**: Close modal windows

### 💾 Data Persistence
- **Local Storage**: All bookmarks and custom duas saved locally
- **Offline Capability**: App works without internet connection
- **Data Export/Import**: Backup and restore your data (future feature)

## 🚀 Getting Started

### Option 1: Simple Setup
1. Download all files to a folder on your computer
2. Open `index.html` in your web browser
3. Start using the app immediately!

### Option 2: Web Server (Recommended)
1. Install a simple web server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```
2. Open `http://localhost:8000` in your browser
3. Enjoy full functionality including service worker features

## 📱 Mobile Installation (PWA)

1. Open the app in your mobile browser
2. Look for "Add to Home Screen" option
3. Install as a Progressive Web App for native-like experience
4. Access offline anytime during your journey

## 🎯 How to Use

### Basic Navigation
1. **Start with Journey Section**: Prepare for travel with essential duas
2. **Move to Umrah Section**: Follow the 5-step guide during your pilgrimage
3. **Use Family Section**: Pray for your loved ones
4. **Visit Madinah Section**: Proper etiquette for the Prophet's Mosque

### Adding Custom Duas
1. Navigate to the "Umrah Duas" section
2. Click the "Add New Dua" button
3. Enter Arabic text and optional context
4. Your dua will be saved permanently and appear with delete option

### Bookmark Management
1. Click the bookmark icon on any dua card
2. Bookmarked duas show a golden bookmark icon
3. Bookmarks persist between app sessions
4. Click again to remove bookmark

### Counter Usage
1. Find duas with counter (like the 100x tasbih)
2. Use + and - buttons to track your progress
3. App celebrates when you reach 100 repetitions

## 🌟 Special Features

### Islamic Design Elements
- **Respectful Typography**: Beautiful Arabic fonts (Amiri) for Quranic text
- **Right-to-Left Support**: Proper RTL layout for Arabic text
- **Islamic Color Scheme**: Calming blues and greens inspired by Islamic art
- **Crescent Moon Icon**: Beautiful Islamic symbolism

### Accessibility
- **Large Text**: Easy-to-read Arabic text with proper spacing
- **High Contrast**: Clear visibility in various lighting conditions
- **Touch Friendly**: Large buttons optimized for touch interaction
- **Screen Reader Compatible**: Semantic HTML for accessibility

### Performance
- **Fast Loading**: Optimized CSS and JavaScript
- **Smooth Animations**: 60fps animations for better experience
- **Efficient Storage**: Minimal memory usage for bookmarks and custom duas
- **Offline First**: Works without internet after first load

## 📖 Included Duas

The app includes all duas from your original collection:

- **Travel Prayers**: Leaving house, starting journey, safe travel, entering cities
- **Umrah Duas**: Comprehensive collection organized in 5 progressive steps
- **Family Prayers**: Parents, children, siblings, health
- **Madinah Etiquette**: Prophet's Mosque, salutations, companions
- **General Supplications**: Forgiveness, guidance, protection, gratitude

## 🔒 Privacy & Security

- **No Data Collection**: Your personal data never leaves your device
- **Local Storage Only**: All data stored locally in your browser
- **No Tracking**: No analytics or user tracking
- **Secure**: No external API calls or data transmission

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup for accessibility
- **CSS3**: Modern styling with Grid and Flexbox
- **JavaScript ES6+**: Modern JavaScript features
- **Web Storage API**: For persistent data
- **Service Worker**: For offline functionality
- **Progressive Web App**: PWA features for mobile experience

### Browser Support
- **Chrome/Chromium**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile Browsers**: Optimized experience

### File Structure
```
umrah-dua-guide/
├── index.html          # Main application file
├── styles.css          # Styling and responsive design
├── script.js           # All interactive functionality
├── sw.js              # Service worker for offline capability
├── manifest.json      # PWA manifest
└── README.md          # This documentation
```

## 🤝 Contributing

This is a community project aimed at helping Muslims during their spiritual journey. Contributions are welcome:

1. **Report Issues**: If you find any bugs or have suggestions
2. **Add Duas**: Suggest additional authentic duas with proper sources
3. **Translations**: Help with translations to other languages
4. **Audio**: Contribute audio recordings for proper pronunciation

## 📜 Islamic Guidelines

- All duas included are from authentic Islamic sources
- Arabic text has been carefully reviewed for accuracy
- Contexts and translations provided where beneficial
- App follows Islamic etiquette for digital Quran/Hadith presentation

## 🙏 Duas for the Developers

> "اللَّهُمَّ ارْزُقْ كَاتِبَ وَنَاقِلَ وَقَارِئَ الرِّسَالَةِ، اللَّهُمَّ آمِينَ"

*"O Allah, bless the writer, transmitter, and reader of this message, O Allah, Amen."*

May Allah accept our efforts and make this app beneficial for all Muslims undertaking the blessed journey of Umrah.

## 📧 Support

For support, suggestions, or contributions, please create an issue in the repository or contact the development team.

---

**Barakallahu feeki** - May Allah bless you on your spiritual journey! 🌙✨ 