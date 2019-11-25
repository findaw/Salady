
class AddForm {
    constructor(form){
        this.form = form;
    }
    isFormInputEmpty = ()=>{
        
        let isEmpty = false;

        //빈 입력값이 있는치 체크
        this.form.querySelectorAll("input").forEach(input=>{
            if(input.type === "text" || input.type === "password"){
                if(input.value.trim() === ""){
                    isEmpty = true;
                }
            }
        });

        return isEmpty;
    }
    onSubmitEvent = (cbFunc)=>{
        this.form.addEventListener("submit", e=>{
            cbFunc(e);
        });
    }
}