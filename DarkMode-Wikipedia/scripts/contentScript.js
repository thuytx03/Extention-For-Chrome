console.log("contentScript.js");
renderTheme();
function renderTheme() {
  chrome.runtime.sendMessage(
    { data: "darkTheme", formTitle: "contentScript.js" },
    (response) => {
      if(response.darkTheme === true){
        document.querySelector("body").setAttribute("theme", "dark")
      }
    }
  );
}
