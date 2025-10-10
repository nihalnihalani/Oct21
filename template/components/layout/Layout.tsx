import React from 'react';
import GridBeamsBackground from '../backgrounds/GridBeamsBackground';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div className={`min-h-screen relative ${className}`}>
      <GridBeamsBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        {children}
      </div>
    </div>
  );
}
