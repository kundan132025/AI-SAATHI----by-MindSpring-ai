// Pure JavaScript OAuth handler - runs before React
(function() {
    console.log('🚀 Pre-React OAuth Handler Loading...');
    
    // Check if we're on the callback page
    if (window.location.pathname === '/auth/callback') {
        console.log('📍 Detected OAuth callback page');
        
        // Get URL parameters immediately
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const userDataParam = urlParams.get('user');
        
        console.log('🔑 Token:', token ? 'Found' : 'Missing');
        console.log('👤 User data:', userDataParam ? 'Found' : 'Missing');
        
        if (token) {
            try {
                // Store in localStorage immediately
                localStorage.setItem('token', token);
                console.log('💾 Token stored in localStorage');
                
                if (userDataParam) {
                    const userData = JSON.parse(decodeURIComponent(userDataParam));
                    localStorage.setItem('user', JSON.stringify(userData));
                    console.log('💾 User data stored in localStorage');
                }
                
                // Clear URL and redirect immediately
                console.log('🔄 Redirecting to chat...');
                window.location.replace('/chat');
                
            } catch (error) {
                console.error('❌ Pre-React OAuth failed:', error);
                window.location.replace('/login?error=oauth_failed');
            }
        } else {
            console.error('❌ No token found in callback');
            window.location.replace('/login?error=no_token');
        }
    }
})();