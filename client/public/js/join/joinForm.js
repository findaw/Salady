class JoinForm{
    constructor(){
        //form
        this.joinForm = document.getElementById("joinForm");

        //input
        this.idInput = document.getElementById("idInput");
        this.pwInput = document.getElementById("pwInput");
        this.pwChkInput = document.getElementById("pwChkInput");
        this.nameInput = document.getElementById("nameInput");

        //message line
        this.idInputMsg= document.getElementById("idInputMsg");
        this.pwInputMsg = document.getElementById("pwInputMsg");
        this.pwChkInputMsg = document.getElementById("pwChkInputMsg");
        this.nameInputMsg = document.getElementById("nameInputMsg");

        //submit btn
        this.submitBtnMsg = document.getElementById("submitBtnMsg");

        //id check btn
        this.idCheckBtn =  document.getElementById("idCheckBtn");

        this.isIdChecked = false;
        this.isIdExist = null;
        this.isPwSame = false;
        this.inputList = [];
    }
    formCheck = (e)=>{
        try{
            let isEmpty = false;
            //빈 입력값이 있는치 체크
            this.joinForm.querySelectorAll("input").forEach(input=>{
                if(input.type === "text" || input.type === "password"){
                    if(input.value.trim() === ""){
                        isEmpty = true;
                    }
                }
            });

            if(isEmpty){
                this.submitBtnMsg.innerText = "※입력되지 않은 값이 있습니다.";
                e.preventDefault();
            }else{
                this.submitBtnMsg.innerText = "";
            }

            if(!this.isPwSame){
                alert("비밀번호가 일치하지 않습니다.");
                e.preventDefault();
            }
            if(this.pwChkInput.value !== this.pwChkInput.value){
                e.preventDefault();
            }
            if(!this.isIdChecked){
                console.log("dd");
                alert("아이디 중복검사를 해주세요.");
                this.idCheckBtn.focus();
                e.preventDefault();
            }
            else if(this.isIdExist){
                alert("이미 존재하는 아이디입니다. 아이디를 변경해주세요.");
                this.idInput.focus();
                e.preventDefault();
            }
        }catch(err){
            console.log(err);
            e.preventDefault();
        }
        
    }
    initEvent(){
        this.idInput.addEventListener("keydown", e=>{
            this.isIdChecked = false;
            this.isIdExist = null;
        });
        this.pwInput.addEventListener("keyup", ()=>{
            if(this.pwChkInput.value !== "" && this.pwInput.value !== this.pwChkInput.value){
                this.pwChkInputMsg.innerText = "※비밀번호가 일치하지 않습니다.";
                this.isPwSame = false;
            }else{
                this.pwChkInputMsg.innerText = "";
                this.isPwSame = true;
            }
        });
        this.pwChkInput.addEventListener("keyup", ()=>{
            if(this.pwInput.value !== "" && this.pwInput.value !== this.pwChkInput.value){
                this.pwChkInputMsg.innerText = "※비밀번호가 일치하지 않습니다.";
                this.isPwSame = false;
            }else{
                this.pwChkInputMsg.innerText = "";
                this.isPwSame = true;
            }
        });
        
        this.idCheckBtn.addEventListener("click", e=>{
            if(this.idInput.value.trim() !== ""){
                this.idInputMsg.innerText = "";
                fetch("/api/check/join/" + this.idInput.value.trim(),{method:"POST"}).then( async res=>{
                    let data = await res.json();
                    
                    if(data.isExist){
                        this.idInputMsg.innerText = "※이미 존재하는 아이디입니다.";    
                        this.isIdChecked = false;
                    }else{
                        this.idInputMsg.innerText = "사용가능한 아이디입니다.";       
                        this.isIdChecked = true;
                    }
        
                    this.isIdExist = data.isExist;
                }).catch(err=>{
                    console.error(err);
                });
            }else{
                this.idInputMsg.innerText = "아이디를 입력해주세요.";
            }
            
        });

        this.joinForm.addEventListener("submit", this.formCheck);
    }
}




