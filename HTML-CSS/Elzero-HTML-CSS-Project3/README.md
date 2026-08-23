# Elzero Web School – Template Three (HTML & CSS Clone)

A pixel-focused clone of [Elzero Web School's HTML & CSS Template Three](https://elzerowebschool.github.io/HTML_And_CSS_Template_Three/), built section by section using **pure CSS** (no frameworks, no JavaScript for layout).

🔗 **Live Demo:** [Live Site](https://hagarniazi.github.io/Elzero-HTML-CSS-Project3/)

---

## 📸 Preview

_Add a screenshot of the landing section here, e.g._
`![Landing Page](images/preview.png)`

---

## ✨ Features

- Fully responsive design (mobile, tablet, laptop, desktop)
- 15 sections built from scratch: Header, Landing, Articles, Gallery, Features, Testimonials, Team, Services, Skills, How It Works, Events, Pricing Plans, Videos, Stats, Discount, and Footer
- CSS-only interactive effects:
  - Mega menu with `:has()` selector
  - Zigzag "torn paper" section divider using layered gradients
  - Animated hover effects (rotating gallery images, growing service borders, bouncing scroll arrow)
  - CSS Counters for auto-numbered service cards
  - `attr()` tooltips for animated skill progress bars
  - `skewX` transforms and diagonal shape tricks

## 🛠️ Built With

- **HTML5** – semantic markup
- **CSS3** – Flexbox, CSS Grid, custom properties (variables), pseudo-elements, keyframe animations
- [Font Awesome](https://fontawesome.com/) – icons
- [Google Fonts (Cairo)](https://fonts.google.com/specimen/Cairo) – typography

## 📱 Responsive Breakpoints

| Breakpoint | Width |
|---|---|
| Mobile | < 576px |
| Tablet | 768px |
| Small Laptop | 991px |
| Desktop | 1200px |

## 📂 Project Structure

```
├── index.html
├── css/
│   ├── normalize.css
│   ├── Elzero.css        # Base styles for all sections
│   └── Responsive.css    # All media queries, organized by breakpoint
└── images/
```

## 🚀 Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/hagarniazi/Elzero-HTML-CSS-Project3.git
   ```
2. Open `index.html` in your browser — no build step or dependencies required.

## 📚 What I Learned

This project was built as a hands-on exercise in translating a real-world design into CSS from scratch, including:

- Structuring a large stylesheet into logical, maintainable sections
- Debugging real layout issues (stacking contexts, `auto-fill` vs `auto-fit`, flex sibling selectors)
- Separating base styles from responsive overrides for cleaner code organization
- Recreating design details (mega menus, animated counters, decorative dividers) using only CSS

## 👩‍💻 Author

**Hagar Niazi**
Front-End Developer

---

*This project is for educational purposes, following [Elzero Web School](https://elzero.org/)'s tutorial series.*