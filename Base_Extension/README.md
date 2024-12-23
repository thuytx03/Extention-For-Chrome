# Extension-For-Chrome
## Giải Thích Các Tệp Chính Trong Chrome Extension

Tài liệu này sẽ giải thích về ba tệp JavaScript chính trong một Chrome extension: `background.js`, `popup.js`, và `contentScript.js`, cùng với các ví dụ minh họa.

---

## **1. `background.js`**

### **Chức Năng:**
`background.js` quản lý các tác vụ nền của extension. Nó không tương tác trực tiếp với nội dung của trang web, mà chủ yếu xử lý các sự kiện như khi extension được cài đặt, khi người dùng nhấp vào biểu tượng extension, hoặc khi cần quản lý các tác vụ dài hạn, chẳng hạn như lưu trữ dữ liệu hoặc theo dõi sự kiện toàn cục.

### **Khi Nào Chạy:**
`background.js` chỉ chạy khi có sự kiện hoặc yêu cầu cần xử lý từ các phần khác của extension, như nhấn vào biểu tượng extension hoặc khi extension được cài đặt.

### **Ví Dụ:**
```javascript
// background.js

// Lắng nghe sự kiện khi extension được cài đặt
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension đã được cài đặt!");
});

// Lắng nghe sự kiện khi người dùng nhấp vào biểu tượng extension
chrome.action.onClicked.addListener((tab) => {
  console.log("Biểu tượng extension đã được nhấp!");

  // Thực thi một script trên tab hiện tại khi nhấp vào biểu tượng extension
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      document.body.style.backgroundColor = "black";  // Đổi màu nền thành đen
      document.body.style.color = "white";  // Đổi màu chữ thành trắng
    },
  });
});

```
## **2. `popup.js`**

### **Chức Năng:**
`popup.js` quản lý giao diện người dùng (UI) trong popup của extension. Khi người dùng nhấp vào biểu tượng extension, popup này sẽ mở ra và xử lý các sự kiện từ người dùng, như nhấn nút hoặc nhập dữ liệu.

### **Khi Nào Chạy:**
`popup.js` chỉ chạy khi người dùng mở popup của extension, tức là khi nhấp vào biểu tượng extension.

### **Ví Dụ:**
```javascript
// popup.js

// Thêm sự kiện cho nút chuyển chế độ Dark Mode trong popup
document.getElementById("toggleDarkMode").addEventListener("click", () => {
  // Chuyển chế độ Dark Mode trên tab hiện tại
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        // Chuyển đổi giữa chế độ Dark Mode và Light Mode
        document.body.style.backgroundColor = document.body.style.backgroundColor === "black" ? "white" : "black";
        document.body.style.color = document.body.style.color === "white" ? "black" : "white";
      },
    });
  });
});
```
## **3. `contentScript.js`**

### **Chức Năng:**
`contentScript.js` chạy trong bối cảnh của trang web mà người dùng đang xem và có thể thay đổi nội dung của trang web đó, ví dụ như thay đổi kiểu dáng, chèn HTML, hoặc thay đổi hành vi của trang web.

### **Khi Nào Chạy:**
`contentScript.js` tự động chạy trên các trang web mà bạn định nghĩa trong phần `matches` của `manifest.json` (ví dụ: `"<all_urls>"`). Nó tương tác trực tiếp với nội dung trang web và có thể thay đổi cách trang web hiển thị hoặc hoạt động.

### **Ví Dụ:**
```javascript
// contentScript.js

// Thay đổi màu nền và màu chữ của trang web thành đen và trắng
document.body.style.backgroundColor = "black";
document.body.style.color = "white";

// Tạo và thêm một nút vào trang web
let btn = document.createElement("button");
btn.textContent = "Click me!";
document.body.appendChild(btn);

// Thêm sự kiện cho nút khi người dùng nhấp vào
btn.addEventListener("click", () => {
  alert("Nút đã được nhấp từ content script!");  // Hiển thị thông báo khi nút được nhấp
});
```