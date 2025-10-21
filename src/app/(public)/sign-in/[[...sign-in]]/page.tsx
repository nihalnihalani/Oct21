import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen grid place-items-center p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <SignIn afterSignInUrl="/dashboard" signUpUrl="/sign-up" />
      </div>
    </div>
  );
}


