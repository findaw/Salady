const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){
    logoutBtn.addEventListener("click", (e)=>{
   
        fetch("/api/logout/account").then(async res=>{
            console.log(res);
            let data = await res.json();
            
            if(data.isSuccess){
                alert("로그아웃 되었습니다");
                location.reload();
            }else{
                alert("로그아웃 실패");
                location.reload();
            }
    
        }).catch(err=>{
            alert("오류발생. 다시 시도해주세요.");
            location.reload();
            console.error(err);
        });
    });
}
