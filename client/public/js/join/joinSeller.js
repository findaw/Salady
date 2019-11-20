
class SellerJoinForm extends JoinForm{
    constructor(){
        super();
        this.sellerNoInput = document.getElementById("sellerNoInput");
    }

    initEvent(){
        super.initEvent();

        this.sellerNoInput.addEventListener("keyup", (e)=>{
            let regex = /^[0-9]+$/g;
            if(e.target.value.trim() !== ""  && !regex.test(e.target.value)){
                alert("숫자만 입력하세요");
                this.sellerNoInput.value = "";
            }
        });
    }
}

const sellerJoinForm = new SellerJoinForm();
sellerJoinForm.initEvent();

