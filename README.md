# CampusPulse Frontend

Student Feedback Analysis System - React TypeScript Web Application

## 🚀 Tech Stack

- **React 18.2.0**
- **TypeScript 5.3.3**
- **Vite 5.0.11** - Build tool
- **React Router 6.21.0** - Navigation
- **Axios 1.6.5** - HTTP client
- **Chart.js 4.4.1** - Data visualization
- **JWT Decode 4.0.0** - Token management

## 📋 Features

- ✅ User authentication (Login/Register)
- ✅ JWT token management
- ✅ Protected routes
- ✅ Feedback submission form
- ✅ Interactive dashboard with charts
- ✅ Sentiment analysis visualization
- ✅ Responsive design
- ✅ Real-time analytics

## 🛠️ Setup

### Prerequisites

- Node.js 16+ or 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/adityavardhini15/campuspulse-frontend.git
cd campuspulse-frontend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment
Create `.env` file:
```
VITE_API_URL=http://localhost:9090
```

4. Run development server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

Build output will be in `dist/` folder.

## 📁 Project Structure

```
src/
├── components/
│   ├── Auth/           # Login, Register
│   ├── Dashboard/      # Charts, Analytics
│   ├── Feedback/       # Feedback form & list
│   ├── Layout/         # Header, Sidebar
│   └── Common/         # Shared components
├── context/
│   └── AuthContext.tsx # Global auth state
├── services/
│   ├── api.ts          # Axios configuration
│   ├── authService.ts  # Auth API calls
│   ├── feedbackService.ts
│   └── analyticsService.ts
├── types/
│   └── index.ts        # TypeScript interfaces
├── utils/
│   └── tokenUtils.ts   # JWT helpers
└── styles/
    └── App.css         # Global styles
```

## 🎨 Features

### Authentication
- User registration with validation
- Secure login with JWT
- Automatic token refresh
- Session expiry handling

### Dashboard
- Service-wise rating charts (Bar chart)
- Sentiment distribution (Pie chart)
- Feedback trends (Line chart)
- Key metrics cards
- Recent feedback table

### Feedback System
- Service selection dropdown
- Star rating (1-5)
- Comment textarea with character limit
- Real-time validation
- Success/error notifications

## 🔐 Authentication Flow

1. User registers/logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Axios automatically attaches token to requests
5. Protected routes check authentication
6. Token expiry handled gracefully

## 📊 Charts & Visualizations

- **Chart.js** for all visualizations
- Bar chart for service ratings
- Pie chart for sentiment distribution
- Line chart for trends over time
- Responsive and interactive

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
# Add to package.json: "deploy": "gh-pages -d dist"
npm run deploy
```

## 🔧 Environment Variables

```
VITE_API_URL=http://localhost:9090  # Backend API URL
```

## 👨‍💻 Author

**Aditya Vardhini Vemulapudi**
- Roll Number: 24EG110B60
- Section: Data Science B
- GitHub: [@adityavardhini15](https://github.com/adityavardhini15)

## 📄 License

This project is for educational purposes.

## 🔗 Related Repository

Backend: [campuspulse-backend](https://github.com/adityavardhini15/campuspulse-backend)
