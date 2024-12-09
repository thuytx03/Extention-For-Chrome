// background.js
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed!");
  });
  
  chrome.action.onClicked.addListener(() => {
    console.log("Extension icon clicked!");
  });
  