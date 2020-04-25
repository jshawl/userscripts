// ==UserScript==
// @name         Disable Netflix Autoplay
// @version      0.1
// @description  No auto playing videos
// @author       @jshawl
// @match        https://www.netflix.com/*
// @license      MIT; https://opensource.org/licenses/MIT
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    document.addEventListener("play", (e) => {
        if (!location.pathname.match(/watch/)) {
            e.target.pause()
        }
    }, true)
})();
