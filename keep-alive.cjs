// Keep-alive service to prevent server from sleeping
const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes
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
      
      const { default: fetch } = await import('node-fetch');
      const response = await fetch(`${SERVER_URL}/api/ping`, {
        method: 'GET',
        headers: {
          'User-Agent': 'KeepAlive-Service/1.0',
          'Cache-Control': 'no-cache'
        },
        timeout: 30000
      });

      const responseTime = Date.now() - startTime;
      
      if (response.ok) {
        this.pingCount++;
        this.lastPingTime = new Date();
        console.log(`✅ Keep-alive ping successful (${responseTime}ms) - Total pings: ${this.pingCount}`);
        
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
      
      if (this.errors.length > 5) {
        this.errors = this.errors.slice(-5);
      }
      
      // Try health endpoint as fallback
      try {
        const { default: fetch } = await import('node-fetch');
        const healthResponse = await fetch(`${SERVER_URL}/api/health`, { timeout: 30000 });
        if (healthResponse.ok) {
          console.log('🏥 Health endpoint reachable, server is alive');
        }
      } catch (healthError) {
        console.error('💔 Health endpoint also failed:', healthError.message);
      }
    }
  }

  start() {
    if (this.isRunning) return;

    console.log(`🚀 Starting keep-alive service (ping every ${PING_INTERVAL / 1000 / 60} minutes)`);
    console.log(`🎯 Target server: ${SERVER_URL}`);
    
    this.isRunning = true;
    this.ping();
    
    this.intervalId = setInterval(() => {
      this.ping();
    }, PING_INTERVAL);
  }

  stop() {
    if (!this.isRunning) return;
    console.log('🛑 Stopping keep-alive service');
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

// Auto-start
const keepAlive = new KeepAliveService();
keepAlive.start();

process.on('SIGINT', () => {
  console.log('\n📤 Shutting down keep-alive service...');
  keepAlive.stop();
  process.exit(0);
});