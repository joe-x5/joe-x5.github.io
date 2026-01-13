if (navigator.userAgent.toLowerCase().indexOf('kaios') > -1){
    getKaiAd({
        publisher: '58d21092-87f8-47c3-883d-fcd67eb318d8',
        app: 'joe-x5.github.io',
        slot: 'joe-x5.github.io',
        onerror: err => console.error('Custom catch:', err),
        onready: ad => {
            // Ad is ready to be displayed
            // calling 'display' will display the ad
            ad.call('display')
        }
    })
}	