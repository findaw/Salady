const logoutBtn = document.getElementById("logoutBtn");

const getCookie = (key) =>{
    const cookieArr = document.cookie.split(";");
    let token = "";
    cookieArr.forEach(item=>{
        let data = item.split("=");
        if(data[0].trim() === key){
            token = data[1];
        }
    });
    console.log(token);
    return token;
}


const deleteTokenCookie = (token, days) =>{
    let date = new Date();
    date.setTime(date.getTime() + days * 24*60*60*1000); 
    document.cookie = "token"  + "=" + token + "; expires=" + date.toUTCString() +  "; path=/";
}
if(logoutBtn){
    logoutBtn.addEventListener("click", (e)=>{
        let token = getCookie("token");
        console.log(token);
        let myHeader = new Headers({
            "x-access-token" :  token,
        });
    
        fetch("/api/logout/account",{
            method:"POST",
            headers : myHeader,
            
        }).then(async res=>{
            console.log(res);
            let data = await res.json();
            
            if(data.isSuccess){
                deleteTokenCookie("", 0);
                alert("로그아웃 되었습니다");
                location.reload();
            }
    
        }).catch(err=>{
            console.error(err);
        });
    });
}
