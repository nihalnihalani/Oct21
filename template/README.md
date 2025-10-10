# OneClick UI Template

This template contains all the premium UI components and effects that make the OneClick interface so visually stunning. Use these components to replicate the same modern, professional look in your own projects.

## 🎨 Key Design Elements

### 1. **Grid Beams Background**
- Animated light rays with subtle glow effects
- Dynamic grid overlay with fade masks
- Radial gradient backgrounds
- Configurable ray count, opacity, and animation speed

### 2. **Aurora Text Effect**
- Animated gradient text with flowing colors
- Customizable color schemes
- Smooth animation transitions
- Perfect for hero titles and headings

### 3. **Rainbow Border Button**
- Animated rainbow gradient borders
- Blur effects for depth
- Smooth color transitions
- Eye-catching call-to-action buttons

### 4. **Glass Morphism Cards**
- Semi-transparent backgrounds with backdrop blur
- Subtle borders and shadows
- Modern card layouts
- Perfect for content containers

### 5. **Dark Theme with Accents**
- Deep dark backgrounds (#0a0a0a)
- Blue and yellow accent colors
- High contrast text
- Professional color scheme

## 📁 Folder Structure

```
template/
├── components/
│   ├── backgrounds/
│   │   ├── GridBeams.tsx          # Main grid beams component
│   │   ├── GridBeamsBackground.tsx # Background wrapper
│   │   └── NoiseEffect.tsx        # Noise overlay effect
│   ├── typography/
│   │   └── AuroraText.tsx         # Animated gradient text
│   ├── buttons/
│   │   ├── RainbowButton.tsx      # Rainbow border button
│   │   └── Button.tsx             # Standard button variants
│   ├── cards/
│   │   └── Card.tsx               # Glass morphism cards
│   ├── inputs/
│   │   ├── Input.tsx              # Styled input fields
│   │   └── Tabs.tsx               # Tab navigation
│   └── layout/
│       └── Layout.tsx             # Main layout wrapper
├── styles/
│   ├── globals.css                # Global styles and CSS variables
│   ├── animations.css             # Keyframe animations
│   └── components.css             # Component-specific styles
├── assets/
│   └── fonts/                     # Custom fonts (if any)
└── README.md                      # This file
```

## 🚀 Quick Start

1. Copy the `template` folder to your project
2. Install required dependencies:
   ```bash
   npm install motion react lucide-react
   ```
3. Import and use components:
   ```tsx
   import { GridBeamsBackground } from './template/components/backgrounds/GridBeamsBackground'
   import { AuroraText } from './template/components/typography/AuroraText'
   import { RainbowButton } from './template/components/buttons/RainbowButton'
   ```

## 🎯 Usage Examples

### Background with Grid Beams
```tsx
<GridBeamsBackground>
  <div className="relative z-10">
    {/* Your content here */}
  </div>
</GridBeamsBackground>
```

### Aurora Text
```tsx
<AuroraText 
  colors={["#ffffff", "#f3f4f6", "#e5e7eb", "#d1d5db"]}
  speed={1.2}
>
  Your Title Here
</AuroraText>
```

### Rainbow Button
```tsx
<RainbowButton onClick={handleClick}>
  <Sparkles className="h-5 w-5" />
  Generate Content
</RainbowButton>
```

## 🎨 Customization

### Grid Beams
- `rayCount`: Number of light rays (default: 20)
- `rayOpacity`: Opacity of rays (default: 0.55)
- `raySpeed`: Animation speed (default: 1.5)
- `gridColor`: Grid line color
- `backgroundColor`: Background color

### Aurora Text
- `colors`: Array of colors for gradient
- `speed`: Animation speed multiplier
- `className`: Additional CSS classes

### Rainbow Button
- `className`: Additional CSS classes
- All standard button props supported

## 🎭 Color Palette

- **Background**: `#0a0a0a` (Deep black)
- **Primary**: `#3b82f6` (Blue)
- **Accent**: `#fbbf24` (Yellow)
- **Text**: `#ffffff` (White)
- **Muted**: `#6b7280` (Gray)
- **Border**: `#374151` (Dark gray)

## 📱 Responsive Design

All components are fully responsive and work on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔧 Dependencies

- React 18+
- Tailwind CSS
- Framer Motion
- Lucide React (for icons)
- Radix UI (for accessible components)

## 💡 Tips

1. Use the grid beams background sparingly - it's quite visually intense
2. Aurora text works best with 3-5 colors
3. Rainbow buttons should be used for primary actions only
4. Maintain good contrast ratios for accessibility
5. Test on different screen sizes and devices

## 🎨 Inspiration

This template is inspired by modern SaaS applications and premium design systems. The combination of subtle animations, glass morphism, and carefully chosen colors creates a professional, trustworthy appearance that users love.

---

**Happy designing! 🎨✨**
