class ProductAddForm extends AddForm{
    constructor(form){
        super(form);

        this.productImg = document.getElementById("productImg");
        this.detailImg = document.getElementById("detailImg");
        this.promoImg = document.getElementById("promoImg");
        this.indgList = document.getElementsByName("indg[]");
        
        this.onSubmitEvent(e=>{
            if(this.isFormInputEmpty()){
                alert("입력되지 않은 항목이 있습니다.");
                e.preventDefault();
            }else if(this.productImg.files.length <= 0 || this.pdetailImg.files.length <= 0){
                let checked = confirm("등록되지 않은 이미지 항목이 있습니다. 이대로 제품을 등록 하시겠습니까? ");
                if(!checked){
                    e.preventDefault();
                }
            }
            
        });
    }


}

const productAddForm = new ProductAddForm(document.getElementById("paForm"));