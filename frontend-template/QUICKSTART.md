# ⚡ Quick Start Guide

Get up and running with the NIMEdge Frontend Template in 5 minutes!

---

## 🎯 Method 1: Fresh Vite Project (Recommended)

### Step 1: Create New Project
```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
```

### Step 2: Install Dependencies
```bash
npm install
npm install framer-motion lucide-react clsx tailwind-merge class-variance-authority @radix-ui/react-slot
npm install -D tailwindcss postcss autoprefixer
```

### Step 3: Initialize Tailwind
```bash
npx tailwindcss init -p
```

### Step 4: Copy Template Files
From the `frontend-template` folder, copy:

```bash
# Components
cp -r frontend-template/components src/

# Styles
cp frontend-template/styles/globals.css src/index.css

# Config (overwrite generated tailwind.config.js)
cp frontend-template/config/tailwind.config.js ./
cp frontend-template/config/vite.config.ts ./

# Example (optional)
cp frontend-template/examples/ExampleApp.tsx src/
```

### Step 5: Update main.tsx
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import ExampleApp from './ExampleApp.tsx'; // or your App
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ExampleApp />
  </React.StrictMode>,
);
```

### Step 6: Run!
```bash
npm run dev
```

Visit `http://localhost:5173` 🎉

---

## 🎯 Method 2: Add to Existing Project

### Step 1: Install Dependencies
```bash
npm install framer-motion lucide-react clsx tailwind-merge class-variance-authority @radix-ui/react-slot
```

### Step 2: Copy Files
```bash
# Copy components to your components folder
cp -r frontend-template/components/* src/components/

# Merge or replace your styles
cat frontend-template/styles/globals.css >> src/index.css

# Update configs (be careful not to overwrite custom settings!)
```

### Step 3: Update Tailwind Config
Add the content from `frontend-template/config/tailwind.config.js` to your existing config.

### Step 4: Import and Use
```typescript
import { AuroraText } from './components/typography/AuroraText';
import { RainbowButton } from './components/buttons/RainbowButton';

function App() {
  return (
    <div className="bg-gray-950 min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">
        <AuroraText colors={["#fff", "#60a5fa"]}>
          Hello World
        </AuroraText>
      </h1>
      <RainbowButton onClick={() => alert('Hi!')}>
        Click Me
      </RainbowButton>
    </div>
  );
}
```

---

## 📦 What You Get

After setup, you'll have access to:

### Components
```typescript
import { AuroraText } from './components/typography/AuroraText';
import { RainbowButton } from './components/buttons/RainbowButton';
import { Card } from './components/cards/Card';
import { GridBeamsBackground } from './components/backgrounds/GridBeamsBackground';
```

### Utility Classes
```html
<div class="card-premium glass-dark hover-lift">
  Content
</div>
```

### Animations
- Aurora gradient animation
- Rainbow border animation
- Grid beams animation
- Smooth transitions

---

## ✨ First Component

Create a simple hero section:

```typescript
import { motion } from 'framer-motion';
import { AuroraText } from './components/typography/AuroraText';
import { RainbowButton } from './components/buttons/RainbowButton';
import { GridBeamsBackground } from './components/backgrounds/GridBeamsBackground';

function Hero() {
  return (
    <GridBeamsBackground>
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold mb-6">
            <AuroraText 
              colors={["#ffffff", "#60a5fa", "#3b82f6"]}
              speed={1.5}
            >
              Your Project Name
            </AuroraText>
          </h1>
          
          <p className="text-xl text-gray-400 mb-8">
            Beautiful UI, built with React & Tailwind
          </p>
          
          <RainbowButton onClick={() => console.log('Started!')}>
            Get Started
          </RainbowButton>
        </motion.div>
      </div>
    </GridBeamsBackground>
  );
}

export default Hero;
```

---

## 🎨 Color Customization

Want to change the color scheme? Edit `src/index.css`:

```css
:root {
  /* Change primary blue to purple */
  --primary: 270 70% 50%;
  
  /* Change accent color */
  --accent: 340 75% 55%;
}
```

---

## 🔥 Pro Tips

1. **Use with Framer Motion**
   ```typescript
   <motion.div
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     className="card-premium"
   >
     Content
   </motion.div>
   ```

2. **Combine Utility Classes**
   ```html
   <div class="glass-dark hover-lift focus-ring-dark">
     Interactive element
   </div>
   ```

3. **Customize Aurora Colors**
   ```typescript
   <AuroraText colors={[
     "#ff0080",  // Pink
     "#7928ca",  // Purple
     "#00d4ff"   // Cyan
   ]}>
     Custom Colors
   </AuroraText>
   ```

4. **Stack Backgrounds**
   ```typescript
   <GridBeamsBackground>
     <div className="glass-dark rounded-lg p-8">
       Layered effects
     </div>
   </GridBeamsBackground>
   ```

---

## 🐛 Common Issues

**"Cannot find module './components/..."**
- Check your import paths
- Make sure you copied the components folder correctly

**"Tailwind classes not applying"**
- Verify `import './index.css'` is in `main.tsx`
- Check `tailwind.config.js` content paths

**"Animations not working"**
- Ensure Framer Motion is installed
- Check keyframes are in `index.css`

---

## 📚 Next Steps

1. Read the full `README.md` for detailed documentation
2. Explore the `ExampleApp.tsx` for usage examples
3. Check out individual component files for props and options
4. Customize colors and styles to match your brand

---

## 🚀 Deploy

Ready to deploy?

```bash
npm run build
```

Deploy the `dist/` folder to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting

---

## 💬 Need Help?

- Check the full README.md
- Review example code in examples/
- Inspect component source code
- Look at Tailwind documentation

---

**You're all set! Start building beautiful UIs! 🎨**

