import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const returnTo = searchParams.get('returnTo') || '/practice';

  // Debug info (only in development)
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    if (user) {
      navigate(returnTo, { replace: true });
    }
  }, [user, navigate, returnTo]);

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsLoading(true);

    const redirectUrl = `${window.location.origin}/auth/callback`;
    
    // Debug logging
    console.log('[Auth Debug] Origin:', window.location.origin);
    console.log('[Auth Debug] Redirect URL:', redirectUrl);
    console.log('[Auth Debug] Return To:', returnTo);

    // Store return URL before redirecting
    localStorage.setItem('auth_return_to', returnTo);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl
        }
      });

      console.log('[Auth Debug] OAuth response - data:', data);
      console.log('[Auth Debug] OAuth response - error:', error);

      if (error) {
        console.error('[Auth Debug] OAuth error:', error.message);
        setError(error.message);
        setIsLoading(false);
        return;
      }

      // Explicitly redirect if URL is provided
      if (data?.url) {
        console.log('[Auth Debug] Redirecting to:', data.url);
        window.location.href = data.url;
      } else {
        console.error('[Auth Debug] No redirect URL returned');
        setError('No redirect URL returned from authentication service');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('[Auth Debug] Unexpected error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <Card>
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto">
              <span className="text-2xl font-bold text-primary font-serif">
                Afrolinguistic Academy
              </span>
            </div>
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription className="text-base">
              Sign in to sync your progress across devices. All lessons are free and public.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Sign in failed</AlertTitle>
                <AlertDescription>
                  {error.includes('provider is not enabled') ? (
                    <div className="space-y-2">
                      <p>Google Sign-In is not configured yet.</p>
                      <p className="text-xs">Admin: Enable Google provider in Lovable Cloud → Users → Auth Settings</p>
                    </div>
                  ) : (
                    error
                  )}
                </AlertDescription>
              </Alert>
            )}
            
            <Button 
              onClick={handleGoogleSignIn}
              variant="outline" 
              className="w-full h-12 text-base gap-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current" />
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              )}
              Continue with Google
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              100% Free Forever • No payment required
            </p>
          </CardContent>
        </Card>

        {/* Setup checklist for admins */}
        {(error?.includes('provider is not enabled') || isDev) && (
          <Card className="border-amber-500/50 bg-amber-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                Admin Setup Checklist
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-3">
              <div>
                <p className="font-medium mb-1">1. Enable Google in Lovable Cloud:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Go to Cloud → Users → Auth Settings → Google</li>
                  <li>Enable Google provider</li>
                  <li>Add Google Client ID and Client Secret</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-1">2. Google Cloud Console setup:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Create OAuth 2.0 credentials</li>
                  <li>Add Authorized JavaScript origins: <code className="bg-muted px-1 rounded">https://afrolinguistic-academy.lovable.app</code></li>
                  <li>Add Authorized redirect URI: <code className="bg-muted px-1 rounded">https://gtagjahymvdtpxkhiqce.supabase.co/auth/v1/callback</code></li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-1">3. Lovable Cloud redirect URLs:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Site URL: <code className="bg-muted px-1 rounded">https://afrolinguistic-academy.lovable.app</code></li>
                  <li>Redirect URLs should include: <code className="bg-muted px-1 rounded">https://afrolinguistic-academy.lovable.app/**</code></li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
