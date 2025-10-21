"use client";
import { SignedIn, SignedOut, SignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const hasClerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!hasClerkKey) {
    return (
      <main className="min-h-screen grid place-items-center p-8">
        <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-6 text-white">ClerkLens</h1>
        <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-6 text-left">
            <h2 className="text-xl font-semibold text-yellow-400 mb-3">⚠️ Setup Required</h2>
            <p className="text-gray-300 mb-4">Clerk authentication is not configured. Please set up your environment variables:</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm mb-4">
              <li>Create a <code className="bg-black/30 px-2 py-1 rounded">.env.local</code> file in the project root</li>
              <li>Add your Clerk keys from <a href="https://dashboard.clerk.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">dashboard.clerk.com</a></li>
              <li>Restart the dev server</li>
            </ol>
            <pre className="bg-black/40 p-4 rounded text-xs text-green-400 overflow-x-auto">
{`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...`}
            </pre>
            <button
              onClick={() => router.push('/dashboard')}
              className="mt-4 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
            >
              Skip to Dashboard (Development Only)
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen grid place-items-center p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-6 text-white">ClerkLens</h1>
        <p className="text-gray-400 mb-8">AI Governance Platform</p>
        <SignedOut>
          <div className="mx-auto flex flex-col items-center gap-6">
            <div className="bg-white rounded-lg shadow-xl p-8">
              <SignIn 
                appearance={{ 
                  elements: { 
                    rootBox: 'mx-auto',
                    card: 'shadow-none'
                  } 
                }}
                afterSignInUrl="/dashboard"
                signUpUrl="/sign-up"
              />
            </div>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex flex-col gap-4 items-center">
            <p className="text-gray-300">✓ You are signed in!</p>
            <button 
              onClick={() => router.push('/dashboard')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Go to Dashboard →
            </button>
          </div>
        </SignedIn>
      </div>
    </main>
  );
}


