import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Global flag to prevent multiple OAuth processing
window.oauthProcessed = window.oauthProcessed || false;

function AuthCallback() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    // Check global flag first - PREVENT ALL DUPLICATE PROCESSING
    if (window.oauthProcessed) {
      console.log('🛑 OAuth already processed globally, redirecting to chat...');
      navigate('/chat', { replace: true });
      return;
    }

    // Mark as processed immediately at global level
    window.oauthProcessed = true;
    console.log('🔄 AuthCallback: Starting OAuth processing (GLOBAL FLAG SET)');
    
    // Get URL params immediately and only once
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userDataParam = urlParams.get('user');
    
    console.log('� AuthCallback: Starting OAuth processing...');
    console.log('🔑 Token:', token ? 'Found' : 'Missing');
    console.log('👤 User data:', userDataParam ? 'Found' : 'Missing');
    
    // Clear URL immediately to prevent any re-processing
    window.history.replaceState({}, '', '/auth/callback');
    
    if (!token) {
      console.error('❌ No token found');
      window.oauthProcessed = false; // Reset flag on error
      navigate('/login?error=no_token', { replace: true });
      return;
    }

    try {
      if (userDataParam) {
        // We have both token and user data
        const userData = JSON.parse(decodeURIComponent(userDataParam));
        const userWithToken = { ...userData, token };
        
        // Store everything
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userWithToken));
        
        // Update context
        login(userWithToken);
        
        console.log('✅ OAuth complete with user data');
      } else {
        // Only token available
        localStorage.setItem('token', token);
        login(token);
        
        console.log('✅ OAuth complete with token only');
      }
      
      // Redirect after a small delay
      setTimeout(() => {
        navigate('/chat', { replace: true });
      }, 100);
      
    } catch (error) {
      console.error('❌ OAuth processing failed:', error);
      window.oauthProcessed = false; // Reset flag on error
      navigate('/login?error=oauth_failed', { replace: true });
    }
  }, []); // NO dependencies to prevent any re-runs

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}

export default AuthCallback;