# 🎈 Interactive Balloon Animation

This is an interactive animation project built with [p5.js](https://p5js.org/), featuring a hot air balloon floating through various themes, ambient sounds, and engaging user interactions.

🌐 **Live Demo (GitHub Pages):**  


---

## 🌟 Features

- 5 dynamic themes: **sunny**, **sunset**, **rain**, **snow**, **night**
- Each theme has its own ambient sound
- 🎨 Balloon color selector (red, blue, yellow)
- ⏯ Pause/resume animation with `Space` key or mouse click
- ⏳ Timer displayed at top-right corner
- "Loading..." splash screen at the beginning
- 📸 Take screenshot button
- 🕊 Animated birds and ☁ clouds in the background
- ❓ Help menu (bottom-left icon)
- 🚀 Balloon reaches space and ends animation when high enough

---

## 📁 Project Structure

⚠️ **Note:** File and folder names are in **Turkish**. Their English meanings are provided below for clarity.

| File/Folder          | English Meaning      | Description                              |
|----------------------|----------------------|------------------------------------------|
| `balon.js`           | balloon              | Handles the hot air balloon logic        |
| `kus.js`             | bird                 | Controls flying bird animation           |
| `bulut.js`           | cloud                | Manages cloud movements                  |
| `sayac.js`           | timer                | Tracks and displays elapsed time         |
| `arkaplanlar.js`     | backgrounds          | Switches between different themes        |
| `sesler/`            | sounds               | Folder for theme sound files (MP3)       |
| `gorseller/`         | visuals / images     | Folder for icons, UI assets, etc.        |
| `index.html`         | —                    | Main HTML file                           |
| `style.css`          | —                    | Stylesheet                               |
| `sketch.js`          | —                    | Main p5.js logic (`setup`, `draw`, etc.) |
| `p5.min.js`          | —                    | p5.js library                            |
| `p5.sound.min.js`    | —                    | p5.js sound library                      |

---

## 🚀 How to Run

**Option 1: View online (recommended)**  
Visit: [https://kullaniciadi.github.io/proje-adi/](https://kullaniciadi.github.io/proje-adi/)

**Option 2: Run locally**  
1. Clone or download the repository  
2. Open `index.html` in your browser  
(No server or installation needed)

---

## 🛠️ Technologies

- JavaScript (ES6)
- [p5.js](https://p5js.org/)
- HTML5 / CSS3

---

## ⚠ Notes

- Sounds may take a few seconds to load due to file size
- Most browsers require user interaction to start audio (see `mousePressed()` usage)
- File names in this project are in Turkish to reflect the developer’s native language. English equivalents are listed above.

---

## 👤 Author

**Canan Erva Aydın**  
**Project Date:** June 2025

---

## 📄 License

This project is for educational purposes. Free to use with attribution for non-commercial work.
