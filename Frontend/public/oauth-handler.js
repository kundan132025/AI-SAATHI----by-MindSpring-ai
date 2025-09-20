// OAuth handler that runs before React loads
(function() {
    console.log('🔧 OAuth Handler: Checking for OAuth callback...');
    
    // Only run on the auth callback page
    if (window.location.pathname === '/auth/callback') {
        console.log('🎯 OAuth Handler: On callback page, processing...');
        
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const userDataParam = urlParams.get('user');
        
        if (token) {
            console.log('✅ OAuth Handler: Token found, processing...');
            
            try {
                // Store the token
                localStorage.setItem('token', token);
                
                // Store user data if available
                if (userDataParam) {
                    const userData = JSON.parse(decodeURIComponent(userDataParam));
                    const userWithToken = { ...userData, token };
                    localStorage.setItem('user', JSON.stringify(userWithToken));
                    console.log('✅ OAuth Handler: User data stored');
                }
                
                // Clear the URL and redirect
                window.history.replaceState({}, '', '/chat');
                console.log('✅ OAuth Handler: Redirecting to chat...');
                
                // Force reload to the chat page
                window.location.href = '/chat';
                
            } catch (error) {
                console.error('❌ OAuth Handler: Failed to process:', error);
                window.location.href = '/login?error=oauth_failed';
            }
        } else {
            console.error('❌ OAuth Handler: No token found');
            window.location.href = '/login?error=no_token';
        }
    }
})();