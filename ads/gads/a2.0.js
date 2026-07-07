// script.js

// Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[[]/, '\\[').replace(/[]]/, '\\]');
    var regex = new RegExp('[?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Get width and height from URL parameters
var adWidth = getUrlParameter('w');
var adHeight = getUrlParameter('h');

// Fallback to default if not specified
if (!adWidth) {
    adWidth = 200;
}
if (!adHeight) {
    adHeight = 250;
}

// Assign ad client and other variables
var google_ad_client = "pub-2089626273805937";
var google_ad_host = "pub-1556223355139109";
var google_ad_width = parseInt(adWidth, 10);
var google_ad_height = parseInt(adHeight, 10);
var google_ad_type = "text_image";

var google_color_border = "FFFFFF";
var google_color_bg = "ffffff";
var google_color_link = "0000ff";
var google_color_text = "000000";
var google_color_url = "008000";

var google_page_url = "https://weiweikev.blogspot.com/";