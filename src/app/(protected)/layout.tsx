"use client";
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { UserButton } from '@clerk/nextjs';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const isClerkConfigured = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <div className="flex flex-col h-screen relative dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {isClerkConfigured && (
        <div className="absolute right-4 top-4 z-20">
          <UserButton />
        </div>
      )}
      {!isClerkConfigured && (
        <div className="absolute right-4 top-4 z-20 text-xs text-yellow-400 bg-yellow-900/30 px-3 py-2 rounded-lg border border-yellow-600/50">
          ⚠️ Dev Mode (No Auth)
        </div>
      )}
      <div className="flex flex-1 overflow-hidden relative z-10">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}


