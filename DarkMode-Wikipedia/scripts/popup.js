const checkbox = document.querySelector("#dark");
renderCheckbox();
checkbox.addEventListener("click", () => {
  chrome.runtime.sendMessage({ data: checkbox.checked, formTitle: "popup.js" });
});

// chrome.runtime.sendMessage({message:"hêlo", formTitle:"popup.js"}, (response)=>{
//     console.log(response)
// })
function renderCheckbox() {
  chrome.runtime.sendMessage(
    { data: "darkTheme", formTitle: "popup.js" },
    (response) => {
      console.log(response.darkTheme);
      if (response.darkTheme === true) {
        checkbox.click();
      }
    }
  );
}
