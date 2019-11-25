const mainList = document.querySelectorAll(".mainList");
mainList.forEach(item=>{
    item.addEventListener("click", ()=>{
        item.nextElementSibling.classList.toggle("subListActive");
    });
});

const menuBtn = document.getElementById("menuBtn");
menuBtn.addEventListener("click", ()=>{
    let menuLine = document.getElementById("menuLine");
    console.log(menuLine);
    menuLine.classList.toggle("menuHidden");
})