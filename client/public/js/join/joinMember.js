

class MemberJoinForm extends JoinForm{
    constructor(){
        super();

        this.birthInput = document.getElementById("birthInput");
        this.genderInput = document.getElementsByName("gender");
    }
    formCheck = (e)=>{
        super.formCheck();
        if(this.birthInput.value < 100000){
            alert("주민번호 6자리를 정확히 입력해주세요.");
            this.birthInput.value = "";
            e.preventDefault();
        }
    }
    initEvent(){
        super.initEvent();

        this.birthInput.addEventListener("keyup", (e)=>{
            let regex = /^[0-9]+$/g;
            if(e.target.value.trim() !== ""  && !regex.test(e.target.value)){
                alert("숫자만 입력하세요");
                this.birthInput.value = "";
            }
        });
    }

}


const memberJoinForm = new MemberJoinForm();
memberJoinForm.initEvent();
