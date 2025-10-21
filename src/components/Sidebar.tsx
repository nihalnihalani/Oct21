"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  BarChart3, 
  FileText, 
  Settings, 
  AlertTriangle,
  Users,
  Activity
} from 'lucide-react';
import { AuroraText } from './ui/typography/AuroraText';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const pathname = usePathname();
  const menuItems = [
    { href: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { href: '/live-monitor', icon: Activity, label: 'Live Monitor' },
    { href: '/audit-logs', icon: FileText, label: 'Audit Logs' },
    { href: '/violations', icon: AlertTriangle, label: 'Violations' },
    { href: '/agents', icon: Users, label: 'Agents' },
    { href: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <motion.div 
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 glass-dark border-r border-gray-700/50 h-screen flex flex-col backdrop-blur-xl"
    >
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center space-x-3">
          <Shield className="h-7 w-7 text-blue-400" />
          <div>
            <h1 className="text-lg font-semibold text-white">
              <AuroraText
                colors={["#ffffff", "#60a5fa", "#3b82f6", "#1d4ed8"]}
                speed={1.5}
              >
                ClerkLens
              </AuroraText>
            </h1>
            <p className="text-sm text-gray-400">AI Governance</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 mt-6">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={`w-full flex items-center space-x-3 px-6 py-2.5 text-left transition-all duration-200 hover-lift ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400 border-r-2 border-blue-400'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }`}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="h-4 w-4" />
                <span className="font-medium text-sm">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-gray-700/50">
        <div className="glass-dark border border-gray-700/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-white">System Status</span>
          </div>
          <p className="text-xs text-gray-400">All agents operational</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;