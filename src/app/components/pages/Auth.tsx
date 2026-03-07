// src/app/components/pages/Auth.tsx
import { SignIn } from "@clerk/clerk-react";
import { CheckCircle } from "lucide-react";

export default function Auth() {
  const benefits = [
    'Access to all disease prediction models',
    'Unlimited prediction history',
    'Downloadable PDF reports',
    'Advanced analytics dashboard',
    'Research-grade datasets',
    'Community support',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="hidden lg:block">
            {/* ... (Keep existing benefits UI) ... */}
          </div>

          <div className="flex justify-center lg:justify-end">
             {/* UPDATED: Redirect to /pricing on sign up */}
             <SignIn 
                routing="hash" 
                fallbackRedirectUrl="/dashboard" 
                signUpFallbackRedirectUrl="/pricing" 
             />
          </div>

        </div>
      </div>
    </div>
  );
}