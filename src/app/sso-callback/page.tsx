"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SSOCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Clerk handles the auth, just redirect to dashboard
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-300">Completing sign in...</p>
        <p className="text-gray-500 text-sm mt-2">Redirecting to dashboard</p>
      </div>
    </div>
  );
}

