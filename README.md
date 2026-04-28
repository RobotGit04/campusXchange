# 🚀 CampusXchange

**CampusXchange** is a verified, campus-only ecosystem designed to empower students. It's more than just a marketplace—it's a community resource network where students can buy, sell, rent, borrow, donate, and swap items using only their university credentials.

---

## 🌟 Core Functional Modules

- **🔐 Verified Campus Access**: Security first. Sign up is restricted to university email domains with OTP verification and optional student ID uploads.
- **🏠 Smart Home Feed**: A personalized dashboard featuring nearby listings, trending items, and urgent campus requests.
- **🛒 Marketplace Engine**: Robust support for Buying, Selling, Renting (daily/weekly), Borrowing, Donating, and Swapping.
- **🚑 Emergency Needs Board**: Instant help for students (e.g., "Need a calculator for an exam in 1 hour").
- **🤝 Live Chat & Deal Room**: Built-in secure negotiations with location sharing and transaction confirmation.
- **🛡️ Campus Trust System**: Every user has a reliability score, verified status, and transaction history.
- **📊 Admin Control Panel**: Advanced moderation tools for suspicious listings, report management, and campus analytics.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: Vanilla HTML5, CSS3 (Modern SaaS Aesthetic), and JavaScript.
- **Icons**: Lucide Icons.
- **Typography**: Google Fonts (Inter & Poppins).
- **Deployment**: Firebase Hosting & GitHub Pages.
- **Structure**:
  - `public/`: Production-ready static assets.
  - `src/`: Source code for future logic/backend integration.

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed (optional, for Firebase CLI).
- A static web server (like Live Server or Python's `http.server`).

### Running Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/RobotGit04/campusXchange.git
   ```
2. Navigate to the project folder:
   ```bash
   cd campusXchange
   ```
3. Serve the `public` directory:
   ```bash
   # Using Python
   python -m http.server 8000
   # Then browse to http://localhost:8000/public/landing.html
   ```

### Deployment (Firebase)
1. Initialize Firebase:
   ```bash
   npx firebase-tools login
   ```
2. Deploy to hosting:
   ```bash
   npx firebase-tools deploy
   ```

---

## 🎨 Design Philosophy
Inspired by **Airbnb, Stripe, and Discord**, CampusXchange uses a "Red + Black" branding with rounded cards, soft shadows, and clean spacing to create a premium, Gen-Z friendly experience.

---

## 📜 License
This project is for demonstration purposes as part of a startup-grade product design.
