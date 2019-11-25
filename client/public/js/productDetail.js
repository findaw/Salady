const ingrs = document.querySelectorAll(".ingr");
const ingrInfoBox = document.querySelector("#ingrInfoBox");

ingrs.forEach(ingr=>{
    ingr.addEventListener("mouseover", ({target})=>{
        document.querySelectorAll(".ingrInfoText").forEach(node=>{
            if(node.getAttribute("for") === target.id
                && ingrInfoBox.classList.contains("infoBoxHide")){
                ingrInfoBox.innerHTML = node.innerHTML;
                ingrInfoBox.classList.remove("infoBoxHide");
                
            }
        });
    });
    ingr.addEventListener("mouseout", ({target})=>{
        if(!ingrInfoBox.classList.contains("infoBoxHide")){
            ingrInfoBox.classList.add("infoBoxHide");
            ingrInfoBox.innerHTML = "";
        }
    });
});