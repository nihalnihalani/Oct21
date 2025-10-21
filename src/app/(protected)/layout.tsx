"use client";
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { UserButton } from '@clerk/nextjs';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen relative dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute right-4 top-4 z-20"><UserButton /></div>
      <div className="flex flex-1 overflow-hidden relative z-10">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}


