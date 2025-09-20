import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      console.log('🔑 Processing OAuth token...');
      
      try {
        // Store token and login user
        localStorage.setItem('token', token);
        login(token);
        console.log('✅ OAuth login successful');
        
        // Redirect to chat page
        navigate('/chat', { replace: true });
      } catch (error) {
        console.error('❌ OAuth login failed:', error);
        navigate('/login?error=oauth_failed', { replace: true });
      }
    } else {
      console.error('❌ No token found in callback');
      navigate('/login?error=no_token', { replace: true });
    }
  }, [searchParams, navigate, login]);

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