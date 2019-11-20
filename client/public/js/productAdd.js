const nameInput = document.getElementById("nameInput");
const priceInput = document.getElementById("priceInput");
const descInput = document.getElementById("descInput");

const productImg = document.getElementById("productImg");
const detailImg = document.getElementById("detailImg");
const promoImg = document.getElementById("promoImg");

const volumeInput1 = document.getElementById("volumeInput1");
const volumeUnit = document.getElementById("volumeUnit");

const volumeInput2 = document.getElementById("volumeInput2");
const takeDateUnit = document.getElementById("takeDateUnit");

const takeInput = document.getElementById("takeInput");
const allergyInput = document.getElementById("allergyInput");

const guideInput = document.getElementById("guideInput");

const indgList = document.getElementsByName("indg[]");

const paForm = document.getElementById("paForm");


paForm.addEventListener("submit", e=>{
    if(nameInput.value.trim() === "" || priceInput.value.trim() === "" || descInput.value.trim() === "" || volumeInput1.value.trim() === "" ||
    takeInput.value.trim() === "" || allergyInput.value.trim() === "" || guideInput.value.trim() === ""){
        alert("입력되지 않은 항목이 있습니다.");
        e.preventDefault();
    }else if(productImg.files.length <= 0 || detailImg.files.length <= 0){
        let checked = confirm("등록되지 않은 이미지 항목이 있습니다. 이대로 제품을 등록 하시겠습니까? ");
        if(!checked){
            e.preventDefault();
        }
    }
    console.log(e);
    
    
});

