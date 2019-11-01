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

const idCheckBtn =  document.getElementById("idCheckBtn");
let isIdChecked = false;
let isIdExist = null;

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
    }else if(isIdExist){
        alert("이미 존재하는 아이디입니다. 아이디를 변경해주세요.");
        idInput.focus();
        e.preventDefault();
    }else if(!isIdChecked){
        alert("아이디 중복검사를 해주세요.");
        idCheckBtn.focus();
        e.preventDefault();
    }
});
idInput.addEventListener("keydown", e=>{
    isIdChecked = false;
    isIdExist = null;
    idInputMsg.innerText = ""; 
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
idCheckBtn.addEventListener("click", e=>{
    if(idInput.value.trim() !== ""){
        idInputMsg.innerText = "";
        fetch("/api/check/join/" + idInput.value.trim(),{method:"POST"}).then( async res=>{
            let data = await res.json();
            
            if(data.isExist){
                idInputMsg.innerText = "※이미 존재하는 아이디입니다.";       
            }else{
                idInputMsg.innerText = "";       
                alert("사용가능한 아이디입니다.");
                isIdChecked = true;
            }

            isIdExist = data.isExist;
        }).catch(err=>{
            console.error(err);
        });
    }else{
        idInputMsg.innerText = "아이디를 입력해주세요.";
    }
    
});


