
class IngreAddForm extends AddForm{
    constructor(form){
        super(form);

        this.onSubmitEvent(e=>{
            if(this.isFormInputEmpty()){
                alert("입력되지 않은 항목이 있습니다.");
                e.preventDefault();
            }
            else{
            }
        });
    }
}

const ingreAddForm = new IngreAddForm(document.getElementById("paForm"));