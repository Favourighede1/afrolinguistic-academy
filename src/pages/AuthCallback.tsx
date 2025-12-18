import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      console.log('[Auth Callback] Processing callback...');
      console.log('[Auth Callback] URL:', window.location.href);
      console.log('[Auth Callback] Hash:', window.location.hash);
      console.log('[Auth Callback] Search:', window.location.search);

      // Check for error in URL params (Supabase returns errors this way)
      const params = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      
      const errorParam = params.get('error') || hashParams.get('error');
      const errorDescription = params.get('error_description') || hashParams.get('error_description');
      
      if (errorParam) {
        console.error('[Auth Callback] Error in URL:', errorParam, errorDescription);
        setError(errorDescription || errorParam);
        return;
      }

      try {
        const { data, error } = await supabase.auth.getSession();
        
        console.log('[Auth Callback] Session data:', data);
        
        if (error) {
          console.error('[Auth Callback] Session error:', error);
          setError(error.message);
          return;
        }

        if (!data.session) {
          // Try to exchange the code for a session (PKCE flow)
          const { data: exchangeData, error: exchangeError } = await supabase.auth.exchangeCodeForSession(
            window.location.href
          );
          
          if (exchangeError) {
            console.error('[Auth Callback] Code exchange error:', exchangeError);
            setError(exchangeError.message);
            return;
          }
          
          console.log('[Auth Callback] Code exchanged successfully:', exchangeData);
        }

        // Get return URL from localStorage
        const returnTo = localStorage.getItem('auth_return_to') || '/practice';
        localStorage.removeItem('auth_return_to');
        
        console.log('[Auth Callback] Redirecting to:', returnTo);
        navigate(returnTo, { replace: true });
      } catch (err) {
        console.error('[Auth Callback] Unexpected error:', err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authentication Failed</AlertTitle>
            <AlertDescription className="space-y-2">
              <p>{error}</p>
              {error.includes('provider') && (
                <p className="text-xs">
                  This usually means Google Sign-In is not properly configured. 
                  Please check the admin setup checklist on the login page.
                </p>
              )}
            </AlertDescription>
          </Alert>
          <Button 
            onClick={() => navigate('/login', { replace: true })}
            className="w-full"
          >
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  );
}
