import { useEffect } from 'react';
import { useAuthCallback } from '../../lib/supabase/hooks/useAuthCallback';

export const AuthCallback = () => {
  useAuthCallback();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Setting up your account...</h2>
        <p className="text-gray-500">Please wait while we configure your workspace.</p>
      </div>
    </div>
  );
};