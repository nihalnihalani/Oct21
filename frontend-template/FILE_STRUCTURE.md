# 📁 Frontend Template File Structure

Complete directory structure of the NIMEdge Frontend Template.

```
frontend-template/
│
├── 📄 README.md                    # Complete documentation
├── 📄 QUICKSTART.md                # 5-minute setup guide
├── 📄 FILE_STRUCTURE.md            # This file
├── 📄 package.json                 # Dependencies and scripts
│
├── 📁 components/                  # UI Components
│   │
│   ├── 📁 backgrounds/
│   │   ├── GridBeams.tsx           # Individual beam animations
│   │   └── GridBeamsBackground.tsx # Animated grid background
│   │
│   ├── 📁 buttons/
│   │   └── RainbowButton.tsx       # Rainbow gradient button
│   │
│   ├── 📁 cards/
│   │   └── Card.tsx                # Card component with variants
│   │
│   ├── 📁 typography/
│   │   └── AuroraText.tsx          # Animated gradient text
│   │
│   └── utils.ts                    # Utility functions (cn)
│
├── 📁 styles/
│   └── globals.css                 # Complete CSS system
│       ├── Tailwind base/components/utilities
│       ├── CSS Variables
│       ├── Dark mode styles
│       ├── Custom animations
│       ├── Glass morphism
│       ├── Card styles
│       ├── Button styles
│       ├── Input styles
│       └── Utility classes
│
├── 📁 config/
│   ├── tailwind.config.js          # Tailwind configuration
│   ├── postcss.config.js           # PostCSS configuration
│   ├── tsconfig.json               # TypeScript configuration
│   └── vite.config.ts              # Vite build configuration
│
└── 📁 examples/
    └── ExampleApp.tsx              # Full example application
```

---

## 📦 Component Details

### GridBeamsBackground
- **File**: `components/backgrounds/GridBeamsBackground.tsx`
- **Dependencies**: GridBeams.tsx
- **Features**: Animated grid, random beams, gradient overlay
- **Props**: children, className

### GridBeams
- **File**: `components/backgrounds/GridBeams.tsx`
- **Features**: Individual beam animations
- **Props**: None (internal component)

### RainbowButton
- **File**: `components/buttons/RainbowButton.tsx`
- **Dependencies**: @radix-ui/react-slot, class-variance-authority
- **Features**: Rainbow gradient border animation
- **Props**: children, className, onClick, disabled, asChild

### Card
- **File**: `components/cards/Card.tsx`
- **Features**: Flexible card with forwarded ref
- **Props**: children, className

### AuroraText
- **File**: `components/typography/AuroraText.tsx`
- **Features**: Animated gradient text, rotating colors
- **Props**: children, colors[], speed, className

### utils.ts
- **File**: `components/utils.ts`
- **Exports**: `cn()` function for className merging
- **Dependencies**: clsx, tailwind-merge

---

## 🎨 Styling System

### globals.css Sections

1. **Tailwind Directives**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

2. **CSS Variables**
   - Light mode colors
   - Dark mode colors
   - Border radius
   - Chart colors

3. **Layer: base**
   - Border defaults
   - Body styles

4. **Layer: utilities**
   - Background size utilities
   - Aurora animation
   - Input transparent styles
   - Autofill fixes

5. **Keyframes**
   - @keyframes aurora
   - @keyframes rainbow

6. **Glass Morphism**
   - .glass (light)
   - .glass-dark (dark)

7. **Card Styles**
   - .card-premium
   - Hover effects

8. **Button Styles**
   - .btn-primary
   - .btn-secondary

9. **Input Styles**
   - .input-premium
   - Focus effects

10. **Text Styles**
    - .text-gradient
    - .text-accent
    - .text-muted

11. **Layout Utilities**
    - .container-premium
    - .section-spacing

12. **Hover Effects**
    - .hover-lift
    - .hover-glow

13. **Focus States**
    - .focus-ring
    - .focus-ring-dark

---

## ⚙️ Configuration Files

### tailwind.config.js
- Content paths for purging
- Dark mode class strategy
- Custom color system (HSL variables)
- Custom border radius
- No additional plugins

### postcss.config.js
- Tailwind CSS plugin
- Autoprefixer plugin

### tsconfig.json
- Target: ES2020
- JSX: react-jsx
- Strict mode enabled
- Path alias: @/* → ./src/*

### vite.config.ts
- React plugin
- Path alias resolution
- Dev server on port 5173
- Auto-open browser

---

## 📋 Dependencies

### Production
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "framer-motion": "^12.23.0",
  "lucide-react": "^0.344.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.3.1",
  "class-variance-authority": "^0.7.1",
  "@radix-ui/react-slot": "^1.2.3"
}
```

### Development
```json
{
  "@types/react": "^18.3.5",
  "@types/react-dom": "^18.3.0",
  "@vitejs/plugin-react": "^4.3.1",
  "autoprefixer": "^10.4.18",
  "eslint": "^9.9.1",
  "postcss": "^8.4.35",
  "tailwindcss": "^3.4.1",
  "typescript": "^5.5.3",
  "vite": "^5.4.2"
}
```

---

## 🔨 Build Scripts

```json
{
  "dev": "vite",           # Start dev server
  "build": "vite build",   # Build for production
  "preview": "vite preview", # Preview production build
  "lint": "eslint ."       # Run linter
}
```

---

## 📏 File Sizes

Approximate uncompressed sizes:

- **Components**: ~15 KB total
- **Styles**: ~8 KB (globals.css)
- **Config**: ~3 KB total
- **Documentation**: ~45 KB total
- **Example**: ~3 KB

**Total Template Size**: ~75 KB (uncompressed)

---

## 🎯 Import Paths

When using in your project:

```typescript
// Components
import { AuroraText } from './components/typography/AuroraText';
import { RainbowButton } from './components/buttons/RainbowButton';
import { Card } from './components/cards/Card';
import { GridBeamsBackground } from './components/backgrounds/GridBeamsBackground';

// Utilities
import { cn } from './components/utils';

// Styles (in main.tsx)
import './index.css';
```

---

## 🔄 Update Instructions

To update the template in your project:

1. **Backup** your custom changes
2. **Copy** new template files
3. **Merge** custom modifications
4. **Test** components work correctly
5. **Commit** changes

---

## 📊 Component Dependency Graph

```
ExampleApp
├── GridBeamsBackground
│   └── GridBeams
├── AuroraText
├── RainbowButton
│   └── Slot (from @radix-ui)
└── Card

All components use:
└── utils.ts (cn function)
    ├── clsx
    └── tailwind-merge
```

---

## 🎓 Learning Path

Recommended order to learn components:

1. Start with **Card** (simplest)
2. Learn **RainbowButton** (animations)
3. Try **AuroraText** (gradient text)
4. Explore **GridBeamsBackground** (complex)
5. Study **ExampleApp** (everything together)

---

## 📝 Customization Guide

Files you'll most likely customize:

1. **globals.css** - Colors, variables, utilities
2. **tailwind.config.js** - Theme, colors, spacing
3. **ExampleApp.tsx** - Your actual app
4. **Component files** - Add new features

Files you probably won't change:

1. **utils.ts** - Core utility
2. **PostCSS config** - Standard setup
3. **Vite config** - Basic setup
4. **TypeScript config** - Good defaults

---

**Everything you need to build beautiful UIs! 🎨**

