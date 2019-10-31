const loginForm = document.getElementById("loginForm");
const idInput = document.getElementById("idInput");
const pwInput = document.getElementById("pwInput");

loginForm.addEventListener("submit", e=>{
    if(idInput.value.trim() === ""){
        alert("입력되지 않은 항목이 있습니다.");
        idInput.focus();
        e.preventDefault();
    }
    else if(pwInput.value.trim() === "") {
        alert("입력되지 않은 항목이 있습니다.");
        pwInput.focus();
        e.preventDefault();
    }

});