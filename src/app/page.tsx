import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <SignedOut>
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold mb-4">Welcome to Clerk Next.js App</h1>
            <p className="text-lg text-gray-600 mb-8">
              Please sign in or sign up to access the application.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
              <ol className="text-left space-y-2">
                <li>1. Sign up for a free Clerk account at <a href="https://clerk.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">clerk.com</a></li>
                <li>2. Create a new application</li>
                <li>3. Copy your publishable and secret keys</li>
                <li>4. Update the .env.local file with your keys</li>
                <li>5. Restart the development server</li>
              </ol>
            </div>
          </div>
        </SignedOut>
        
        <SignedIn>
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-lg text-gray-600 mb-8">
              You are successfully authenticated with Clerk.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">🎉 Authentication Success!</h2>
              <p className="text-gray-700">
                Your Clerk integration is working perfectly. You can now:
              </p>
              <ul className="text-left mt-4 space-y-2">
                <li>• Access protected routes</li>
                <li>• Manage user profiles</li>
                <li>• Implement role-based access control</li>
                <li>• Add more authentication features</li>
              </ul>
            </div>
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
