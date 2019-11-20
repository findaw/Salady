const idInput = document.getElementById("idInput");
const pwInput = document.getElementById("pwInput");
const loginBtn= document.getElementById("loginBtn");

const prdCheckBox1 = document.getElementById("prdCheckBox1");


const setTokenCookie = (token, days) =>{
    if(days===-1){
        document.cookie = "token"  + "=" + token + "; path=/";
    }else{
        let date = new Date();
        date.setTime(date.getTime() + days * 24*60*60*1000); 
        document.cookie = "token"  + "=" + token + "; expires=" + date.toUTCString() +  "; path=/";
    }
    
}

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
    }
    
    let formData = new FormData();
    formData.append("id", idInput.value);
    formData.append("pw", pwInput.value);

    fetch("/api/login/account", {
        method : "POST",
        body : formData
    }).then(async res=>{
        let data = await res.json();
        console.log(res);
        console.log(data);

        if(prdCheckBox1.checked){
            setTokenCookie(data.token, 60);
        }else{
            setTokenCookie(data.token, -1);
        }

        alert('완료되었습니다.'); 
        location.href='/';

    }).catch(err=>{
        console.log(err);
    })

});