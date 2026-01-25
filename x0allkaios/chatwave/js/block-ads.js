function replaceDomain() {
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walk.nextNode()) {
        node.nodeValue = node.nodeValue.replace(/ssp\.kaiads\.com/g, '#');
    }
    const elements = document.querySelectorAll('*');
    elements.forEach(function(el) {
        Array.from(el.attributes).forEach(function(attr) {
            if (attr.value.includes('ssp.kaiads.com')) {
                el.setAttribute(attr.name, attr.value.replace(/ssp\.kaiads\.com/g, '#'));
            }
        });
    });
}
document.addEventListener('DOMContentLoaded', replaceDomain);