const idInput = document.getElementById("idInput");
const pwInput = document.getElementById("pwInput");
const loginBtn= document.getElementById("loginBtn");

const prdCheckBox1 = document.getElementById("prdCheckBox1");

loginBtn.addEventListener("click", e=>{
    if(idInput.value.trim() === ""){
        alert("입력되지 않은 항목이 있습니다.");
        idInput.focus();
        e.preventDefault();
    }
    else if(pwInput.value.trim() === "") {
        alert("입력되지 않은 항목이 있습니다.");
        pwInput.focus();
        e.preventDefault();
    }else{
        let formData = new FormData();
        formData.append("id", idInput.value);
        formData.append("pw", pwInput.value);
        formData.append("isChecked", prdCheckBox1.checked);
        
        fetch("/api/login/account", {
            method : "POST",
            body : formData
        }).then(async res=>{
            let data = await res.json();
            console.log(res);
            console.log(data);
            if(data.isSuccess){
                alert('완료되었습니다.'); 
                location.href='/';
            }else{
                alert('아이디 또는 비밀번호가 일치하지 않습니다.'); 
            }
    
    
        }).catch(err=>{
            console.err(err);
        });
    
    }
    
});