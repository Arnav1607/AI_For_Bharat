# AI_For_Bharat
GitRepo For "AI For Bharat " Compitition
> AI-Powered Focus Platform for Indian Students · Powered by Amazon Bedrock

## File Structure

```
focusbharat-mvp/
├── index.html              ← Main entry point (SPA — all pages here)
├── README.md
│
├── assets/
│   ├── logo.svg
│   ├── aws-bedrock.svg
│   └── dashboard-preview.png.txt
│
├── css/
│   ├── animations.css      ← @keyframes + animation utility classes
│   ├── main.css            ← Variables, reset, navbar, buttons, cards,
│   │                          landing, dashboard, responsive
│   ├── auth.css            ← Login / signup page styles
│   ├── onboarding.css      ← 3-step onboarding flow styles
│   ├── ai-loading.css      ← AI analysis loading screen styles
│   └── results.css         ← Results & recommendations page styles
│
├── js/
│   ├── main.js             ← Navigation, toast, stat counter, charts,
│   │                          dashboard personalization
│   ├── auth.js             ← Login, signup, Google auth, password strength
│   ├── onboarding.js       ← Step navigation, sliders, habit chart
│   ├── ai-loading.js       ← Loading animation & progress ring
│   └── animations.js       ← Results helpers (toggleWhy, acceptRec)
│
└── pages/                  ← Standalone page reference files
    ├── dashboard.html
    ├── login.html
    ├── onboarding.html
    ├── ai-loading.html
    └── results.html
```

## Architecture

This is a **Single Page Application (SPA)** — all 6 page views live inside `index.html`
and are toggled with the `.page.active` CSS class via `navigate(pageName)` in JavaScript.

The `pages/` directory contains lightweight reference/redirect files for VS Code
file navigation and future multi-page refactoring.

## Pages

| Page ID           | Route          | Description                        |
|-------------------|----------------|------------------------------------|
| `#page-landing`   | `/`            | Marketing landing page             |
| `#page-login`     | `login`        | Sign in / create account           |
| `#page-onboarding`| `onboarding`   | 3-step habit assessment            |
| `#page-loading`   | `loading`      | AI analysis progress screen        |
| `#page-results`   | `results`      | AI recommendations & daily plan    |
| `#page-dashboard` | `dashboard`    | Live analytics dashboard           |

## CSS Load Order

```html
<link rel="stylesheet" href="css/animations.css">   <!-- 1st: keyframes needed by others -->
<link rel="stylesheet" href="css/main.css">          <!-- 2nd: variables + base styles -->
<link rel="stylesheet" href="css/auth.css">          <!-- page-specific -->
<link rel="stylesheet" href="css/onboarding.css">
<link rel="stylesheet" href="css/ai-loading.css">
<link rel="stylesheet" href="css/results.css">
```

## JS Load Order

```html
<script src="js/main.js"></script>       <!-- navigate(), showToast(), charts -->
<script src="js/auth.js"></script>       <!-- handleLogin(), handleSignup() -->
<script src="js/onboarding.js"></script> <!-- goToStep(), startAnalysis() -->
<script src="js/ai-loading.js"></script"> <!-- runLoadingAnimation() -->
<script src="js/animations.js"></script"> <!-- toggleWhy(), acceptRec() -->
```

## User Flow
1. **Landing Page** → Learn about FocusBharat
2. **Sign Up/Login** → Create account
3. **Onboarding** → Input daily habits, distractions, and goals (3 steps)
4. **AI Analysis** → Watch AI process your data (Amazon Bedrock simulation)
5. **Results** → View personalized recommendations
6. **Dashboard** → Access your focus plan and analytics

## AWS Integration
This MVP demonstrates AI capabilities through:
- Behavioral pattern analysis
- Personalized recommendation generation
- Continuous learning from user feedback
- All powered by Amazon Bedrock foundation models

## Design Principles
- 🎨 Blue & Purple gradient theme
- 🇮🇳 Subtle India-inspired accents
- ✨ Smooth, purposeful animations
- 📱 Fully responsive design
- ♿ Accessible and user-friendly

## Demo Credentials
- Email: Any valid email format
- Password: Any password (mock authentication)

## Future Enhancements
- Real AWS Bedrock API integration
- Mobile app (React Native)
- Chrome extension for app blocking
- Gamification and rewards system
- Community features and leaderboards

## License
Created for AI for Bharat Program evaluation purposes.

## Live Server

Open with VS Code Live Server on port 5501 (configured in `.vscode/settings.json`).

## Tech Stack

- Vanilla HTML, CSS, JavaScript (no framework)
- Chart.js 4.4.0 (CDN) for data visualizations
- Google Fonts: Syne (display) + DM Sans (body)
- Amazon Bedrock (AI backend — to be integrated)

## ScreenShots OF Website 

<img width="1920" height="1080" alt="Screenshot 2026-02-28 144617" src="https://github.com/user-attachments/assets/345ad3f0-f6a6-4a79-8c5a-6e8f2ccfebf5" />
<img width="1920" height="1080" alt="Screenshot 2026-02-28 144639" src="https://github.com/user-attachments/assets/c288518c-3578-4dbb-ab35-9cbfc0c15c9d" />
<img width="1920" height="1080" alt="Screenshot 2026-02-28 144649" src="https://github.com/user-attachments/assets/b5b34f7b-fa49-4128-8b7c-638ab59f44c5" />
