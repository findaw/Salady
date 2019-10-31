const joinForm = document.getElementById("joinForm");

const idInput = document.getElementById("idInput");
const pwInput = document.getElementById("pwInput");
const pwChkInput = document.getElementById("pwChkInput");
const nameInput = document.getElementById("nameInput");
const birthInput = document.getElementById("birthInput");
const genderInput = document.getElementsByName("gender");

const idInputMsg = document.getElementById("idInputMsg");
const pwInputMsg = document.getElementById("pwInputMsg");
const pwChkInputMsg = document.getElementById("pwChkInputMsg");
const nameInputMsg = document.getElementById("nameInputMsg");
const birthInputMsg = document.getElementById("birthInputMsg");
const submitBtnMsg = document.getElementById("submitBtnMsg");

joinForm.addEventListener("submit", (e)=>{
    
    if(idInput.value.trim() === "" || pwInput.value.trim() === "" || pwChkInput.value.trim() === "" || nameInput.value.trim() === "" || birthInput.value.trim() === ""
    ){
        submitBtnMsg.innerText = "※입력되지 않은 값이 있습니다.";
        e.preventDefault();
    }else {
        submitBtnMsg.innerText = "";
    }
    if(pwChkInput.value !== pwChkInput.value){
        e.preventDefault();
    }else if(birthInput.value < 100000){
        alert("주민번호 6자리를 정확히 입력해주세요.");
        birthInput.value = "";
        e.preventDefault();
    }

});
pwInput.addEventListener("keyup", ()=>{
    
    if(pwChkInput.value !== "" && pwInput.value !== pwChkInput.value){
        pwChkInputMsg.innerText = "※비밀번호가 일치하지 않습니다.";
    }else{
        pwChkInputMsg.innerText = "";
    }
});
pwChkInput.addEventListener("keyup", ()=>{
    if(pwInput.value !== "" && pwInput.value !== pwChkInput.value){
        pwChkInputMsg.innerText = "※비밀번호가 일치하지 않습니다.";
    }else{
        pwChkInputMsg.innerText = "";
    }
});

birthInput.addEventListener("keyup", (e)=>{
    let regex = /^[0-9]+$/g;
    if(e.target.value.trim() !== ""  && !regex.test(e.target.value)){
        alert("숫자만 입력하세요");
        birthInput.value = "";
    }
    else{
        birthInputMsg.innerText ="";
    }
});


