import React from 'react';
import { motion } from 'framer-motion';
import { AuroraText } from '../components/typography/AuroraText';
import { RainbowButton } from '../components/buttons/RainbowButton';
import { Card } from '../components/cards/Card';
import { GridBeamsBackground } from '../components/backgrounds/GridBeamsBackground';
import { Shield, Activity, Database } from 'lucide-react';

/**
 * Example App Component
 * 
 * This demonstrates how to use the NIMEdge UI components
 * together to create a beautiful, modern interface.
 */

const ExampleApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Background with animated grid beams */}
      <GridBeamsBackground>
        <div className="container mx-auto px-4 py-16 relative z-10">
          
          {/* Hero Section with Aurora Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl font-bold mb-4">
              <AuroraText
                colors={["#ffffff", "#60a5fa", "#3b82f6", "#1d4ed8"]}
                speed={1.5}
              >
                NIMEdge
              </AuroraText>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Beautiful UI Components for Modern Applications
            </p>
            
            {/* Rainbow Button Example */}
            <RainbowButton
              onClick={() => alert('Button clicked!')}
              className="px-8 py-3"
            >
              Get Started
            </RainbowButton>
          </motion.div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="card-premium p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-8 w-8 text-blue-400" />
                <h3 className="text-xl font-semibold">Secure</h3>
              </div>
              <p className="text-gray-400">
                Built with security and compliance in mind.
              </p>
            </Card>

            <Card className="card-premium p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="h-8 w-8 text-green-400" />
                <h3 className="text-xl font-semibold">Real-time</h3>
              </div>
              <p className="text-gray-400">
                Monitor and analyze data in real-time.
              </p>
            </Card>

            <Card className="card-premium p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Database className="h-8 w-8 text-purple-400" />
                <h3 className="text-xl font-semibold">Scalable</h3>
              </div>
              <p className="text-gray-400">
                Built to scale with your needs.
              </p>
            </Card>
          </div>

          {/* Demo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-dark rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold mb-4">Interactive Demo</h2>
            <p className="text-gray-300 mb-6">
              This template includes all the components, styles, and configuration
              needed to build a modern React application with beautiful UI.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass rounded-lg p-4">
                <h4 className="font-semibold mb-2">Components Included:</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>✓ Aurora Text Animation</li>
                  <li>✓ Rainbow Button</li>
                  <li>✓ Card Components</li>
                  <li>✓ Grid Beams Background</li>
                  <li>✓ Glass Morphism Effects</li>
                </ul>
              </div>
              
              <div className="glass rounded-lg p-4">
                <h4 className="font-semibold mb-2">Styling System:</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>✓ Tailwind CSS Configuration</li>
                  <li>✓ Custom CSS Utilities</li>
                  <li>✓ Dark Mode Support</li>
                  <li>✓ Responsive Design</li>
                  <li>✓ Animation Keyframes</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </GridBeamsBackground>
    </div>
  );
};

export default ExampleApp;

