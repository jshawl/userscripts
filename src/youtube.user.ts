// ==UserScript==
// @name         Censor Ads
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Mute, hide, skip, and close youtube ads
// @author       @jshawl
// @match        https://www.youtube.com/*
// @downloadURL  https://unpkg.com/@jshawl/userscripts/dist/youtube.user.js
// @grant        none
// ==/UserScript==

const isVideoPlaying = (video: HTMLVideoElement) =>
  !!(
    video.currentTime > 0 &&
    !video.paused &&
    !video.ended &&
    video.readyState > 2
  );

const censor = (video: HTMLVideoElement) => {
  let overlay = document.querySelector(".userscript-censor") as HTMLDivElement;
  if (overlay) return;
  overlay = document.createElement("div") as HTMLDivElement;
  overlay.className = "userscript-censor";
  overlay.style.height = "1000px";
  overlay.style.width = "100%";
  overlay.style.position = "absolute";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.background = "black";
  overlay.style.zIndex = "2";
  video.parentElement?.appendChild(overlay);
};

const uncensor = () => {
  const overlay = document.querySelector(".userscript-censor");
  if (overlay) overlay.remove();
};

const click = (selector: string) => {
  const element = document.querySelector(selector) as HTMLElement;
  if (element) {
    element.click();
  }
};

const loop = () => {
  const video = document.querySelector("video");
  if (!video || !isVideoPlaying(video)) return;
  const adIsShowing = !!document.querySelector(".ad-showing");
  video.muted = adIsShowing;
  adIsShowing ? censor(video) : uncensor();
  click(".ytp-ad-skip-button");
  click(".ytp-ad-overlay-close-button");
  requestAnimationFrame(loop);
};

requestAnimationFrame(loop);
