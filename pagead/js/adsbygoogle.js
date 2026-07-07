//?client=ca-pub-XXXXX&host=ca-host-XXXXX&url=https://yourwebsite.com/&w=250&h=300

// Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[[]/, '\\[').replace(/[]]/, '\\]');
    var regex = new RegExp('[?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Set default values
var defaultClient = "ca-pub-1786122365693674";
var defaultHost = "ca-host-pub-1556223355139109";
var defaultPageUrl = "https://tool-max.blogspot.com/";

// Get variables from URL or fallback to defaults
var google_ad_client = getUrlParameter('client') || defaultClient;
var google_ad_host = getUrlParameter('host') || defaultHost;
var google_page_url = getUrlParameter('url') || defaultPageUrl;

// Get width and height from URL parameters
var adWidth = getUrlParameter('w');
var adHeight = getUrlParameter('h');

// Fallback default values for width and height
if (!adWidth) {
    adWidth = '250';
}
if (!adHeight) {
    adHeight = '300';
}

// Parse width and height to integers
var google_ad_width = parseInt(adWidth, 10);
var google_ad_height = parseInt(adHeight, 10);

// Other ad settings
var google_ad_type = "text_image";

var google_color_border = "FFFFFF";
var google_color_bg = "ffffff";
var google_color_link = "0000ff";
var google_color_text = "000000";
var google_color_url = "008000";
