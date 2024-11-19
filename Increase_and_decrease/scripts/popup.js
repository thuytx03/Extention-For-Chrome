console.log("extension popup - popup.js");

let increaseBtn=document.querySelector("#increaseBtn");
let decreaseBtn=document.querySelector("#decreaseBtn");
let countEl=document.querySelector("#countEl");
let count=0
increaseBtn.addEventListener("click",function(){
    count++;
    countEl.textContent=count;
    localStorage.setItem("count",count);
})
decreaseBtn.addEventListener("click",function(){
    count--;
    countEl.textContent=count;
    localStorage.setItem("count",count);
})
function renderCount(){
    if(localStorage.getItem("count")){
        count=localStorage.getItem("count");
        countEl.textContent=count;
    }else{
        console.log('không có data')
    }
}
renderCount()
