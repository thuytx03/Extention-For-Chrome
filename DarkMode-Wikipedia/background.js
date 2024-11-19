let darkTheme = false;

chrome.storage.local.get("darkTheme", (storedTheme) => {
  if (storedTheme) {
    // console.log(storedTheme)
    darkTheme = storedTheme.darkTheme;
  }
});
chrome.runtime.onMessage.addListener((message, callback, sendResponse) => {
  console.log(message);
  // sendResponse({message:"hêlo b", formTitle:"background.js"})
  if (message.formTitle === "popup.js") {
    if (message.data === true) {
      console.log("dark theme");
      darkTheme = true;
      chrome.storage.local.set({ darkTheme: darkTheme });
    } else if (message.data === false) {
      darkTheme = false;
      chrome.storage.local.set({ darkTheme: darkTheme });
    } else if (message.data === "darkTheme") {
      sendResponse({ darkTheme });
    }
  } else if (message.formTitle === "contentScript.js") {
    sendResponse({ darkTheme });
  }
});
