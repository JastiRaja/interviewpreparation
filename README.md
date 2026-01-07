# Interactive Learning Platform

A comprehensive learning application for React.js, TypeScript, Node.js, Git & GitHub, and Next.js with interactive examples, theory sections, and interview preparation.

## 🚀 Features

- **React.js** - 60 concepts covering fundamentals, hooks, state management, performance, and more
- **TypeScript** - 66 concepts from basics to advanced type system features
- **Node.js** - 65 concepts including Express, databases, authentication, and deployment
- **Git & GitHub** - 48 concepts covering version control and collaboration
- **Next.js** - 20 concepts from fundamentals to advanced features

Each concept includes:
- 📚 Theory sections with What, Why, How
- 💡 Key points and best practices
- 🎯 Interview questions and answers
- 💻 Interactive code examples

## 🛠️ Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "Add New Project"
   - Import your repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

3. **That's it!** Your app will be live in minutes.

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# For production deployment
vercel --prod
```

## 📝 Vercel Configuration

The project includes a `vercel.json` file with:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite
- SPA routing configuration (all routes redirect to index.html)

## 🌐 Environment Variables

If you need environment variables:
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add your variables
4. Redeploy

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── ReactModule.tsx
│   │   ├── TypeScriptModule.tsx
│   │   ├── NodeJSModule.tsx
│   │   ├── GitModule.tsx
│   │   ├── NextJSModule.tsx
│   │   ├── CodeExample.tsx
│   │   └── TheorySection.tsx
│   ├── App.tsx
│   └── main.tsx
├── vercel.json
├── vite.config.ts
└── package.json
```

## 🎓 Learning Modules

- **React.js** - Components, Hooks, State Management, Performance
- **TypeScript** - Types, Interfaces, Generics, Advanced Types
- **Node.js** - Express, Databases, Authentication, Deployment
- **Git & GitHub** - Version Control, Branching, Collaboration
- **Next.js** - SSR, SSG, Routing, API Routes, Deployment

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
