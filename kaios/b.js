// ====================================================
// KaiOS Ads – Multi Publisher + SoftLeft Dismiss + Timer
// ====================================================

(function () {

  const CONFIG = {
    publishers: [
      "566c4d75-f28c-4f26-ba75-4cbecfe54965",
      "72183fd2-d463-4969-9659-99e78130751d",
      "4c312590-8682-4703-9820-d9ea5857c7ce"
    ],

    app:  "aichat",
    slot: "aichat",

    banner: {
      enabled: false,
      width: 240,
      height: 50,
      repeat: 30000,      // 🔔 Banner refresh timer (ms)
      timerOn: true       // 🔔 Enable / Disable banner refresh timer
    },

    fullscreen: {
      enabled: false,
      cooldown: 180000
    }
  };

  let adBox = null;
  let bannerTimer = null;
  let pubIndex = 0;
  let lastFullscreen = 0;

  function nextPublisher() {
    pubIndex = (pubIndex + 1) % CONFIG.publishers.length;
    return CONFIG.publishers[pubIndex];
  }

  function currentPublisher() {
    return CONFIG.publishers[pubIndex];
  }

  function ensureBox() {
    adBox = document.getElementById("ad-container");
    if (!adBox) {
      adBox = document.createElement("div");
      adBox.id = "ad-container";
      adBox.style.cssText =
        "position:fixed;bottom:0;left:0;width:240px;height:50px;z-index:9999;";
      document.body.appendChild(adBox);
    }
  }

  // -------- Banner ----------
  function loadBanner(pub) {
    if (!CONFIG.banner.enabled || !window.getKaiAd) return;

    getKaiAd({
      publisher: pub,
      app: CONFIG.app,
      slot: CONFIG.slot,
      w: CONFIG.banner.width,
      h: CONFIG.banner.height,
      container: adBox,
      onerror: () => loadBanner(nextPublisher()),
      onready: ad => {
        ad.call("display", {
          tabindex: 0,
          navClass: "ad-block",
          display: "block"
        });
      }
    });
  }

  function bannerLoop() {
    if (bannerTimer) clearTimeout(bannerTimer);
    if (!CONFIG.banner.enabled || !CONFIG.banner.timerOn) return;

    bannerTimer = setTimeout(() => {
      loadBanner(nextPublisher());
      bannerLoop();
    }, CONFIG.banner.repeat);
  }

  // -------- Fullscreen ----------
  function showFullscreen(pub) {
    if (!CONFIG.fullscreen.enabled || !window.getKaiAd) return;

    const now = Date.now();
    if (now - lastFullscreen < CONFIG.fullscreen.cooldown) return;
    lastFullscreen = now;

    getKaiAd({
      publisher: pub,
      app: CONFIG.app,
      slot: CONFIG.slot,
      onerror: () => showFullscreen(nextPublisher()),
      onready: ad => ad.call("display")
    });
  }

  // -------- SoftLeft Dismiss ----------
  document.addEventListener("keydown", e => {
    if (e.key === "SoftLeft" && adBox && adBox.style.display !== "none") {
      adBox.style.display = "none";
    }
  });

  // -------- Public Controls ----------
  window.KaiAds = {

    fullscreenOn()  { CONFIG.fullscreen.enabled = true; },
    fullscreenOff() { CONFIG.fullscreen.enabled = false; },
    showFullscreen() { showFullscreen(currentPublisher()); },

    bannerOn() {
      CONFIG.banner.enabled = true;
      adBox.style.display = "block";
      loadBanner(currentPublisher());
      bannerLoop();
    },

    bannerOff() {
      CONFIG.banner.enabled = false;
      if (bannerTimer) clearTimeout(bannerTimer);
      if (adBox) adBox.innerHTML = "";
    },

    setBannerRepeat(ms) {
      CONFIG.banner.repeat = ms;
      bannerLoop();
    },

    timerOn()  { CONFIG.banner.timerOn = true; bannerLoop(); },
    timerOff() { CONFIG.banner.timerOn = false; if (bannerTimer) clearTimeout(bannerTimer); }
  };

  function init() {
    ensureBox();
    if (CONFIG.banner.enabled) {
      loadBanner(currentPublisher());
      bannerLoop();
    }
    if (CONFIG.fullscreen.enabled) {
      showFullscreen(currentPublisher());
    }
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();

})();



        getKaiAd({
	publisher: '58d21092-87f8-47c3-883d-fcd67eb318d8',
	app: '10',
	onerror: err => console.error('Custom catch:', err),
	onready: ad => {
		// Ad is ready to be displayed
		// calling 'display' will display the ad
		ad.call('display')
	}
})




        getKaiAd({
	publisher: '4c312590-8682-4703-9820-d9ea5857c7ce',
	app: '11',
	onerror: err => console.error('Custom catch:', err),
	onready: ad => {
		// Ad is ready to be displayed
		// calling 'display' will display the ad
		ad.call('display')
	}
})



        getKaiAd({
	publisher: '72183fd2-d463-4969-9659-99e78130751d',
	app: '12',
	onerror: err => console.error('Custom catch:', err),
	onready: ad => {
		// Ad is ready to be displayed
		// calling 'display' will display the ad
		ad.call('display')
	}
})
