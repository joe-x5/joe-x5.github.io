/**
 * Country Blocker Script
 * GitHub: https://github.com/yourusername/country-blocker
 * Version: 1.0.0
 */

class CountryBlocker {
    constructor() {
        this.config = null;
        this.currentCountry = null;
        this.isBanned = false;
        this.configPath = 'config.json';
        this.init();
    }

    async init() {
        try {
            // Load configuration
            await this.loadConfig();
            
            if (!this.config.enabled) {
                console.log('🔓 Country blocker is disabled');
                return;
            }

            // Get user's country
            await this.detectCountry();
            
            // Check if banned
            this.checkBanStatus();
            
            // Set up periodic checking
            if (this.config.check_interval > 0) {
                setInterval(() => this.checkBanStatus(), this.config.check_interval * 1000);
            }
        } catch (error) {
            console.error('❌ Initialization error:', error);
        }
    }

    async loadConfig() {
        try {
            const timestamp = new Date().getTime();
            const response = await fetch(`${this.configPath}?t=${timestamp}`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            this.config = await response.json();
            console.log('✅ Configuration loaded:', this.config);
        } catch (error) {
            console.error('⚠️ Error loading config, using defaults:', error);
            this.config = this.getDefaultConfig();
        }
    }

    getDefaultConfig() {
        return {
            enabled: true,
            banned_countries: [],
            dark_screen_message: "Access Restricted",
            check_interval: 60,
            allow_localhost: true,
            api_endpoint: "https://ipapi.co/json/",
            fallback_api: "https://worldtimeapi.org/api/ip"
        };
    }

    async detectCountry() {
        try {
            // Try primary API
            const response = await fetch(this.config.api_endpoint);
            const data = await response.json();
            this.currentCountry = data.country_name || data.country;
            console.log('📍 Detected country:', this.currentCountry);
        } catch (error) {
            console.warn('⚠️ Primary API failed, trying fallback...');
            
            // Try fallback API
            try {
                const response = await fetch(this.config.fallback_api);
                const data = await response.json();
                const timezone = data.timezone || '';
                this.currentCountry = timezone.split('/')[0] || 'Unknown';
            } catch (error2) {
                console.error('❌ Both APIs failed:', error2);
                this.currentCountry = 'Unknown';
            }
        }
    }

    checkBanStatus() {
        if (!this.config.enabled) {
            this.removeBanScreen();
            return;
        }
        
        // Allow localhost if configured
        if (this.config.allow_localhost && this.isLocalhost()) {
            console.log('🏠 Localhost access allowed');
            this.removeBanScreen();
            return;
        }

        // Check if country is banned
        const isBanned = this.isCountryBanned();
        
        if (isBanned && !this.isBanned) {
            console.log('⛔ Country banned:', this.currentCountry);
            this.isBanned = true;
            this.showBanScreen();
        } else if (!isBanned && this.isBanned) {
            console.log('✅ Country access granted');
            this.isBanned = false;
            this.removeBanScreen();
        }
    }

    isLocalhost() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.hostname === '';
    }

    isCountryBanned() {
        if (!this.currentCountry || this.currentCountry === 'Unknown') {
            return false; // Don't ban if we can't detect country
        }
        
        const normalizedCountry = this.currentCountry.toLowerCase();
        return this.config.banned_countries.some(country => 
            country.toLowerCase() === normalizedCountry
        );
    }

    showBanScreen() {
        // Remove existing overlay if any
        this.removeBanScreen();
        
        // Create dark screen overlay
        const overlay = document.createElement('div');
        overlay.id = 'country-ban-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
            color: #fff;
            z-index: 2147483647;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            text-align: center;
            padding: 40px;
            box-sizing: border-box;
            overflow: hidden;
        `;

        // Create animated background pattern
        const pattern = document.createElement('div');
        pattern.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                radial-gradient(circle at 25% 25%, rgba(255, 0, 0, 0.1) 0%, transparent 55%),
                radial-gradient(circle at 75% 75%, rgba(255, 0, 0, 0.1) 0%, transparent 55%);
            z-index: -1;
        `;

        // Main message container
        const container = document.createElement('div');
        container.style.cssText = `
            max-width: 600px;
            background: rgba(30, 30, 30, 0.9);
            padding: 40px;
            border-radius: 20px;
            border: 1px solid rgba(255, 0, 0, 0.3);
            box-shadow: 0 20px 60px rgba(255, 0, 0, 0.2);
            backdrop-filter: blur(10px);
        `;

        // Warning icon
        const icon = document.createElement('div');
        icon.style.cssText = `
            font-size: 64px;
            margin-bottom: 20px;
            animation: pulse 2s infinite;
        `;
        icon.innerHTML = '🚫';

        // Main message
        const message = document.createElement('h1');
        message.style.cssText = `
            font-size: 28px;
            margin: 0 0 20px 0;
            color: #ff6b6b;
            font-weight: 600;
            line-height: 1.3;
        `;
        message.textContent = this.config.dark_screen_message;

        // Country info
        const countryInfo = document.createElement('div');
        countryInfo.style.cssText = `
            font-size: 18px;
            margin: 15px 0;
            color: #aaa;
            background: rgba(255, 255, 255, 0.05);
            padding: 12px 20px;
            border-radius: 10px;
            border-left: 4px solid #ff6b6b;
        `;
        countryInfo.innerHTML = `<strong>📍 Detected Location:</strong> ${this.currentCountry || 'Unknown'}`;

        // Banned countries list
        const bannedList = document.createElement('div');
        bannedList.style.cssText = `
            font-size: 14px;
            color: #888;
            margin: 20px 0;
            padding: 15px;
            background: rgba(255, 0, 0, 0.1);
            border-radius: 8px;
            text-align: left;
        `;
        bannedList.innerHTML = `
            <strong>Restricted Countries:</strong><br>
            ${this.config.banned_countries.map(country => 
                `• ${country}${country === this.currentCountry ? ' <span style="color:#ff6b6b">(Your Country)</span>' : ''}`
            ).join('<br>')}
        `;

        // Contact info
        const contact = document.createElement('div');
        contact.style.cssText = `
            font-size: 12px;
            color: #666;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        `;
        contact.textContent = 'If you believe this is an error, please contact support.';

        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.8; }
                100% { transform: scale(1); opacity: 1; }
            }
        `;

        // Assemble overlay
        container.appendChild(icon);
        container.appendChild(message);
        container.appendChild(countryInfo);
        container.appendChild(bannedList);
        container.appendChild(contact);
        overlay.appendChild(pattern);
        overlay.appendChild(container);
        overlay.appendChild(style);
        
        document.body.appendChild(overlay);
        
        // Prevent all interactions
        document.body.style.overflow = 'hidden';
        document.body.style.pointerEvents = 'none';
        overlay.style.pointerEvents = 'auto';
        
        // Disable keyboard shortcuts
        overlay.addEventListener('keydown', (e) => e.preventDefault());
        overlay.tabIndex = -1;
        overlay.focus();
    }

    removeBanScreen() {
        const overlay = document.getElementById('country-ban-overlay');
        if (overlay) {
            overlay.remove();
            document.body.style.overflow = '';
            document.body.style.pointerEvents = '';
        }
    }

    // Public method to update config
    async updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        this.checkBanStatus();
    }

    // Public method to refresh country detection
    async refreshCountry() {
        await this.detectCountry();
        this.checkBanStatus();
    }
}

// Initialize automatically
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        window.CountryBlocker = new CountryBlocker();
        console.log('🌍 Country Blocker initialized');
    });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CountryBlocker;
}