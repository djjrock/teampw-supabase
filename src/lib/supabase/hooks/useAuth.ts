import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import { useAuthStore } from '../../../store/authStore';
import { signInWithMagicLink } from '../services/auth';

export function useAuth() {
  const navigate = useNavigate();
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [setUser, setLoading]);

  const signIn = async (email: string) => {
    await signInWithMagicLink(email);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate('/login');
  };

  return {
    signIn,
    signOut,
  };
}