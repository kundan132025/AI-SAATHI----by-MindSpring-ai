// Keep-alive service to prevent server from sleeping
// This service pings the server every 14 minutes to prevent Render free tier sleep

const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes in milliseconds
const SERVER_URL = 'https://ai-saathi-backend.onrender.com';

class KeepAliveService {
  constructor() {
    this.isRunning = false;
    this.intervalId = null;
    this.pingCount = 0;
    this.lastPingTime = null;
    this.errors = [];
  }

  async ping() {
    try {
      const startTime = Date.now();
      console.log(`🏓 Keep-alive ping #${this.pingCount + 1} starting...`);
      
      const response = await fetch(`${SERVER_URL}/api/ping`, {
        method: 'GET',
        headers: {
          'User-Agent': 'KeepAlive-Service/1.0',
          'Cache-Control': 'no-cache'
        }
      });

      const responseTime = Date.now() - startTime;
      
      if (response.ok) {
        this.pingCount++;
        this.lastPingTime = new Date();
        console.log(`✅ Keep-alive ping successful (${responseTime}ms) - Total pings: ${this.pingCount}`);
        
        // Clear old errors on successful ping
        if (this.errors.length > 0) {
          console.log(`🧹 Clearing ${this.errors.length} previous errors`);
          this.errors = [];
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      this.errors.push({
        time: new Date(),
        error: error.message
      });
      
      console.error(`❌ Keep-alive ping failed:`, error.message);
      
      // Keep only last 5 errors
      if (this.errors.length > 5) {
        this.errors = this.errors.slice(-5);
      }
    }
  }

  start() {
    if (this.isRunning) {
      console.log('⚠️ Keep-alive service is already running');
      return;
    }

    console.log(`🚀 Starting keep-alive service (ping every ${PING_INTERVAL / 1000 / 60} minutes)`);
    console.log(`🎯 Target server: ${SERVER_URL}`);
    
    this.isRunning = true;
    
    // First ping immediately
    this.ping();
    
    // Then ping at intervals
    this.intervalId = setInterval(() => {
      this.ping();
    }, PING_INTERVAL);
  }

  stop() {
    if (!this.isRunning) {
      console.log('⚠️ Keep-alive service is not running');
      return;
    }

    console.log('🛑 Stopping keep-alive service');
    this.isRunning = false;
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      pingCount: this.pingCount,
      lastPingTime: this.lastPingTime,
      totalErrors: this.errors.length,
      recentErrors: this.errors.slice(-3),
      nextPingIn: this.isRunning ? Math.ceil((PING_INTERVAL - (Date.now() - (this.lastPingTime?.getTime() || Date.now()))) / 1000) : null
    };
  }
}

// Export for use in other modules
module.exports = KeepAliveService;

// Auto-start if running directly
if (require.main === module) {
  const keepAlive = new KeepAliveService();
  keepAlive.start();

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n📤 Received SIGINT, shutting down keep-alive service...');
    keepAlive.stop();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.log('\n📤 Received SIGTERM, shutting down keep-alive service...');
    keepAlive.stop();
    process.exit(0);
  });
}