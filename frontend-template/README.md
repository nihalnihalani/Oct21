# 🎨 NIMEdge Frontend Template

**A complete UI component library and styling system extracted from the NIMEdge project.**

This template contains everything you need to recreate the beautiful, modern UI of the NIMEdge platform in your own projects. It includes custom components, Tailwind CSS configuration, animations, and a complete design system.

---

## 📦 What's Included

### Components
- ✅ **AuroraText** - Animated gradient text with dynamic color shifting
- ✅ **RainbowButton** - Button with animated rainbow border gradient
- ✅ **Card** - Flexible card component with variants
- ✅ **GridBeamsBackground** - Animated grid background with beams of light
- ✅ **GridBeams** - Individual beam components

### Styling System
- ✅ **Tailwind CSS Configuration** - Custom colors, utilities, and theme
- ✅ **Global CSS** - Custom animations, glass morphism, and utility classes
- ✅ **Dark Mode Support** - Complete dark mode color scheme
- ✅ **Utility Functions** - `cn()` for className merging

### Configuration Files
- ✅ **tailwind.config.js** - Tailwind configuration
- ✅ **postcss.config.js** - PostCSS configuration
- ✅ **vite.config.ts** - Vite build configuration
- ✅ **package.json** - All required dependencies

### Examples
- ✅ **ExampleApp.tsx** - Full example application showing component usage

---

## 🚀 Quick Start

### 1. Create a New Vite + React + TypeScript Project

```bash
npm create vite@latest my-project -- --template react-ts
cd my-project
```

### 2. Install Dependencies

```bash
npm install react react-dom framer-motion lucide-react clsx tailwind-merge class-variance-authority @radix-ui/react-slot
npm install -D @types/react @types/react-dom @vitejs/plugin-react autoprefixer postcss tailwindcss typescript vite
```

### 3. Copy Template Files

Copy the following files from this template to your project:

```bash
# Copy components
cp -r frontend-template/components/* src/components/

# Copy styles
cp frontend-template/styles/globals.css src/index.css

# Copy configuration
cp frontend-template/config/tailwind.config.js ./
cp frontend-template/config/postcss.config.js ./
cp frontend-template/config/vite.config.ts ./

# Optional: Copy example
cp frontend-template/examples/ExampleApp.tsx src/
```

### 4. Update Your Main Files

**src/main.tsx**
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // This is your globals.css

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

**src/App.tsx**
```typescript
import ExampleApp from './ExampleApp';
// or import your own components

function App() {
  return <ExampleApp />;
}

export default App;
```

### 5. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see your application!

---

## 📚 Component Usage Guide

### AuroraText

Animated text with gradient color shifting.

```typescript
import { AuroraText } from './components/typography/AuroraText';

<AuroraText
  colors={["#ffffff", "#60a5fa", "#3b82f6", "#1d4ed8"]}
  speed={1.5}
>
  Your Text Here
</AuroraText>
```

**Props:**
- `colors`: Array of color hex codes for the gradient
- `speed`: Animation speed (default: 1)
- `children`: Text content

---

### RainbowButton

Button with animated rainbow border.

```typescript
import { RainbowButton } from './components/buttons/RainbowButton';

<RainbowButton
  onClick={() => console.log('Clicked!')}
  className="px-6 py-3"
>
  Click Me
</RainbowButton>
```

**Props:**
- `onClick`: Click handler function
- `className`: Additional CSS classes
- `disabled`: Disable state
- `children`: Button content

---

### Card

Flexible card component with variants.

```typescript
import { Card } from './components/cards/Card';

<Card className="p-6 card-premium">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

**Available Classes:**
- `card-premium`: Dark card with glass effect
- `glass`: Glass morphism light effect
- `glass-dark`: Glass morphism dark effect

---

### GridBeamsBackground

Animated grid background with light beams.

```typescript
import { GridBeamsBackground } from './components/backgrounds/GridBeamsBackground';

<GridBeamsBackground>
  <div className="your-content">
    Your content here
  </div>
</GridBeamsBackground>
```

**Features:**
- Animated grid pattern
- Random light beams
- Gradient overlay
- Responsive design

---

## 🎨 Styling System

### Custom Utility Classes

```css
/* Glass Effects */
.glass          - Light glass morphism
.glass-dark     - Dark glass morphism

/* Card Styles */
.card-premium   - Premium dark card with glow

/* Button Styles */
.btn-primary    - Primary blue button
.btn-secondary  - Secondary gray button

/* Input Styles */
.input-premium  - Premium input with focus effects
.input-transparent - Transparent input

/* Text Styles */
.text-gradient  - Gradient text effect
.text-accent    - Yellow accent color
.text-muted     - Gray muted color

/* Layout */
.container-premium - Centered container with padding
.section-spacing   - Vertical spacing for sections

/* Hover Effects */
.hover-lift     - Lift on hover
.hover-glow     - Glow on hover

/* Focus States */
.focus-ring      - Blue focus ring (light mode)
.focus-ring-dark - Blue focus ring (dark mode)
```

### CSS Variables

The template uses CSS variables for theming:

```css
:root {
  --radius: 0.625rem;
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  --secondary: 0 0% 96.1%;
  /* ... and more */
}
```

Access them in Tailwind:
```typescript
<div className="bg-background text-foreground border-border">
```

---

## 🎭 Animations

### Aurora Animation

```css
@keyframes aurora {
  /* Rotating gradient background */
}
```

Used by `AuroraText` component.

### Rainbow Animation

```css
@keyframes rainbow {
  /* Sliding gradient border */
}
```

Used by `RainbowButton` component.

---

## 🔧 Tailwind Configuration

The template extends Tailwind with:

### Custom Colors
```javascript
colors: {
  border: 'hsl(var(--border))',
  background: 'hsl(var(--background))',
  primary: {
    DEFAULT: 'hsl(var(--primary))',
    foreground: 'hsl(var(--primary-foreground))',
  },
  // ... and more
}
```

### Custom Border Radius
```javascript
borderRadius: {
  lg: 'var(--radius)',
  md: 'calc(var(--radius) - 2px)',
  sm: 'calc(var(--radius) - 4px)',
}
```

---

## 💡 Example Use Cases

### 1. Hero Section

```typescript
<div className="min-h-screen bg-gray-950">
  <GridBeamsBackground>
    <div className="container-premium py-16">
      <h1 className="text-6xl font-bold text-center mb-4">
        <AuroraText colors={["#fff", "#60a5fa"]}>
          Welcome
        </AuroraText>
      </h1>
      <div className="text-center">
        <RainbowButton onClick={() => {}}>
          Get Started
        </RainbowButton>
      </div>
    </div>
  </GridBeamsBackground>
</div>
```

### 2. Feature Cards

```typescript
<div className="grid grid-cols-3 gap-6">
  <Card className="card-premium p-6">
    <h3 className="text-xl font-bold mb-2">Feature 1</h3>
    <p className="text-gray-400">Description here</p>
  </Card>
  <Card className="card-premium p-6">
    <h3 className="text-xl font-bold mb-2">Feature 2</h3>
    <p className="text-gray-400">Description here</p>
  </Card>
  <Card className="card-premium p-6">
    <h3 className="text-xl font-bold mb-2">Feature 3</h3>
    <p className="text-gray-400">Description here</p>
  </Card>
</div>
```

### 3. Dashboard Cards

```typescript
<div className="glass-dark rounded-lg p-6 hover-lift">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-semibold">Statistics</h3>
    <Activity className="h-5 w-5 text-blue-400" />
  </div>
  <p className="text-3xl font-bold">1,234</p>
  <p className="text-sm text-gray-400">Total Users</p>
</div>
```

---

## 🎯 Complete Project Structure

```
your-project/
├── src/
│   ├── components/
│   │   ├── backgrounds/
│   │   │   ├── GridBeams.tsx
│   │   │   └── GridBeamsBackground.tsx
│   │   ├── buttons/
│   │   │   └── RainbowButton.tsx
│   │   ├── cards/
│   │   │   └── Card.tsx
│   │   ├── typography/
│   │   │   └── AuroraText.tsx
│   │   └── utils.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css (globals.css)
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── package.json
└── index.html
```

---

## 🛠️ Customization

### Change Color Scheme

Edit the CSS variables in `src/index.css`:

```css
:root {
  --primary: 220 70% 50%;  /* Change primary color */
  --secondary: 160 60% 45%; /* Change secondary color */
}
```

### Add New Components

1. Create component in `src/components/`
2. Use existing utility classes
3. Import and use in your app

### Modify Animations

Edit keyframes in `src/index.css`:

```css
@keyframes your-animation {
  0% { /* start state */ }
  100% { /* end state */ }
}
```

---

## 📝 TypeScript Types

### Component Props

```typescript
// AuroraText
interface AuroraTextProps {
  children: React.ReactNode;
  colors?: string[];
  speed?: number;
  className?: string;
}

// RainbowButton
interface RainbowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

// Card
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}
```

---

## 🚨 Troubleshooting

### Tailwind classes not working
- Make sure you imported `./index.css` in `main.tsx`
- Check that `tailwind.config.js` content paths are correct

### Components not found
- Verify import paths match your folder structure
- Check that `utils.ts` is in the correct location

### Animations not working
- Ensure `@keyframes` are in `index.css`
- Check Framer Motion is installed

### Dark mode not working
- Add `className="dark"` to root element for dark mode
- Check CSS variables are defined for `.dark`

---

## 📦 Production Build

```bash
npm run build
```

This creates an optimized build in `dist/` folder.

Preview the build:
```bash
npm run preview
```

---

## 🎓 Learn More

### Technologies Used
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **Vite** - Build tool
- **Lucide React** - Icons

### Resources
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Vite Documentation](https://vitejs.dev/)

---

## 📄 License

MIT License - Feel free to use in your projects!

---

## 👨‍💻 Credits

Created as part of the **NIMEdge** project.

**Author**: Nihal Nihalani  
**Repository**: [github.com/aran-yogesh/nimedge](https://github.com/aran-yogesh/nimedge)

---

## 🤝 Contributing

Found a bug or want to improve the template?  
Feel free to submit issues or pull requests!

---

## ⭐ Show Your Support

If you found this template helpful, please give it a star on GitHub!

---

**Happy Coding! 🚀**

