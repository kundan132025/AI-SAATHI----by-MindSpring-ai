import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    console.log('🔄 AuthCallback: Processing OAuth callback...');
    
    // Get URL params directly to avoid dependency issues
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userDataParam = urlParams.get('user');
    
    console.log('🔑 AuthCallback: Token received:', token ? 'YES' : 'NO');
    console.log('👤 AuthCallback: User data received:', userDataParam ? 'YES' : 'NO');
    
    // Early exit if no token to prevent multiple runs
    if (!token) {
      console.error('❌ AuthCallback: No token found');
      navigate('/login?error=no_oauth_data', { replace: true });
      return;
    }

    // Clear URL parameters immediately to prevent re-runs
    const urlWithoutParams = window.location.pathname;
    window.history.replaceState({}, '', urlWithoutParams);
    
    if (token && userDataParam) {
      try {
        // Parse user data
        const userData = JSON.parse(decodeURIComponent(userDataParam));
        console.log('📋 AuthCallback: Parsed user data:', userData);
        
        // Add token to user data
        const userWithToken = {
          ...userData,
          token: token
        };
        
        // Store in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userWithToken));
        
        console.log('💾 AuthCallback: Stored token in localStorage');
        console.log('💾 AuthCallback: Stored user in localStorage:', userWithToken);
        
        // Update AuthContext
        login(userWithToken);
        console.log('✅ AuthCallback: Updated AuthContext with user');
        
        // Redirect to chat page
        console.log('🔗 AuthCallback: Redirecting to chat...');
        navigate('/chat', { replace: true });
        
      } catch (error) {
        console.error('❌ AuthCallback: Failed to process OAuth data:', error);
        navigate('/login?error=oauth_processing_failed', { replace: true });
      }
    } else if (token) {
      // Fallback: only token provided
      try {
        console.log('🔄 AuthCallback: Only token provided, using fallback...');
        localStorage.setItem('token', token);
        login(token);
        console.log('✅ AuthCallback: Used token fallback');
        navigate('/chat', { replace: true });
      } catch (error) {
        console.error('❌ AuthCallback: Token fallback failed:', error);
        navigate('/login?error=token_invalid', { replace: true });
      }
    }
  }, [navigate, login]); // Only navigate and login as dependencies

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600">Completing authentication...</p>
        <p className="mt-2 text-sm text-gray-500">Processing your login credentials...</p>
      </div>
    </div>
  );
}

export default AuthCallback;