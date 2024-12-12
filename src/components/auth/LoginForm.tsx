import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Mail, Shield } from 'lucide-react';
import { useAuth } from '../../lib/supabase/hooks';
import { config } from '../../lib/supabase/config';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(email);
      setSent(true);
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-[#E5FFCA] rounded-full flex items-center justify-center mb-6">
              <Mail className="w-6 h-6 text-[#18181B]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Check your email</h2>
            <p className="mt-2 text-gray-600 text-center">
              We've sent a magic link to {email}.<br />
              Click the link to sign in to your account.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-[#E5FFCA] rounded-full flex items-center justify-center mb-6">
            <Shield className="w-6 h-6 text-[#18181B]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome to {config.env.appName}</h2>
          <p className="mt-2 text-gray-600">Sign in to manage your team's passwords</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Work Email
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                  placeholder="you@company.com"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Sending magic link...' : 'Continue with Email'}
            </Button>
          </form>
        </Card>

        <p className="text-center text-sm text-gray-500">
          By continuing, you agree to our{' '}
          <a href="#" className="text-[#18181B] hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-[#18181B] hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};