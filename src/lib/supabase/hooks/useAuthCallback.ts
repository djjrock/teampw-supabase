import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import { handleAuthCallback } from '../services/auth';

export function useAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        try {
          await handleAuthCallback(session.user);
          navigate('/');
        } catch (error) {
          console.error('Error setting up account:', error);
          navigate('/login');
        }
      }
    });
  }, [navigate]);
}