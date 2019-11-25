class BestItem{
    constructor(){
        this.bestItems = [];
        this.listClassName = "bestItem";
        this.nameClassName = "productName";
        this.textClassName = "productText";
        this.priceClassName = "productPrice";
        this.bestItemWrap = document.getElementById("bestItemWrap");
    }
    getBestItems(){
        this.bestItems = [
            {img : "https://picsum.photos/527",  name : "제품이름1", text : "제품설명제품설명제품설명제품설명제품설명제품",  price : "58,000", type : ""},
            {img : "https://picsum.photos/125",  name : "제품이름3331", text : "제품설명제품설명제품설명제품설명제품설명제품",  price : "58,000", type : ""},
            {img : "https://picsum.photos/622",  name : "제품이름1", text : "제품설명제품설명제품설명제품설명제품설명제품",  price : "58,000", type : ""},
            {img : "https://picsum.photos/111",  name : "제품이름1", text : "제품설명제품설명제품설명제품설명제품설명제품",  price : "58,000", type : ""},
            {img : "https://picsum.photos/755",  name : "제품이름1", text : "제품설명제품설명제품설명제품설명제품설명제품",  price : "58,000", type : ""},
            {img : "https://picsum.photos/436",  name : "제품이름1", text : "제품설명제품설명제품설명제품설명제품설명제품",  price : "58,000", type : ""},
            {img : "https://picsum.photos/858",  name : "제품이름1", text : "제품설명제품설명제품설명제품설명제품설명제품",  price : "58,000", type : ""},
        ];
    }
    setBestItemLine(){
        this.getBestItems();

        this.bestItems.forEach(item=>{
            let li = document.createElement("li");
            let a = document.createElement("a");
            let img = document.createElement("img");
            let nameDiv = document.createElement("div");
            let textDiv = document.createElement("div");
            let priceDiv = document.createElement("div");
            

            li.classList.add(this.listClassName);
            nameDiv.classList.add(this.nameClassName);
            textDiv.classList.add(this.textClassName);
            priceDiv.classList.add(this.priceClassName);

            img.src = item.img;
            nameDiv.innerText = item.name;
            textDiv.innerText = item.text;
            priceDiv.innerText = item.price;

            li.appendChild(img);
            li.appendChild(nameDiv);
            li.appendChild(textDiv);
            li.appendChild(priceDiv);
            a.appendChild(li);
            a.href="/view/productDetail";
            this.bestItemWrap.appendChild(a);
        });
    }

}

class BrandItem{
    constructor(){
        this.brandItems = [];
        this.className = "brand";
        this.brandWrap = document.getElementById("brandWrap");
    }
    getBrandItems(){
        this.brandItems = [
            {img:"https://via.placeholder.com/605",name:"기업이름1", type:""},
            {img:"https://via.placeholder.com/605",name:"기업이름2", type:""},
            {img:"https://via.placeholder.com/605",name:"기업이름3", type:""},
            {img:"https://via.placeholder.com/605",name:"기업이름4", type:""},
            {img:"https://via.placeholder.com/605",name:"기업이름5", type:""},
            {img:"https://via.placeholder.com/605",name:"기업이름6", type:""},
            {img:"https://via.placeholder.com/605",name:"기업이름7", type:""},
            {img:"https://via.placeholder.com/605",name:"기업이름8", type:""},
            {img:"https://via.placeholder.com/605",name:"기업이름9", type:""},
            {img:"https://via.placeholder.com/605",name:"기업이름10", type:""},
            {img:"https://via.placeholder.com/605",name:"기업이름11", type:""},
            {img:"https://via.placeholder.com/605",name:"기업이름12", type:""},
            {img:"https://via.placeholder.com/605",name:"기업이름13", type:""}

        ];
    }
    setBrandItemLine(){
        this.getBrandItems();

        this.brandItems.forEach(item=>{
            let img = document.createElement("img");
            img.src = item.img;
            img.classList.add(this.className);
            img.title=item.name;
            brandWrap.appendChild(img);
        });
    }
}

class TypeItem{
    constructor(){
        this.typeItems = [];
        this.className = "typeItem";
        this.typeItemWrap = document.getElementById("typeItemWrap");
    }
    getTypeItems(){
        //서버에서 정보를 가져온다.

        //가져와서 저장한 형태 
        this.typeItems = [
            { text:"비타민B", type:"vitaminB", isActive:false },
            { text:"비타민C", type:"vitaminC", isActive:false },
            { text:"칼슘", type:"vitaminB", isActive:false },
            { text:"공액리놀레산", type:"vitaminB", isActive:false },
            { text:"유산균", type:"vitaminB", isActive:false },
            { text:"프로바이오틱스", type:"vitaminB", isActive:true },
            { text:"홍삼", type:"vitaminB", isActive:false },
            { text:"콜라겐", type:"vitaminB", isActive:false },
            { text:"단백질", type:"vitaminB", isActive:false },
            { text:"쏘팔메토", type:"vitaminB", isActive:false },
            { text:"가르시니아", type:"vitaminB", isActive:false },
            { text:"홍경천", type:"vitaminB", isActive:false },
            { text:"미네랄", type:"vitaminB", isActive:false },
            { text:"프로폴리스", type:"vitaminB", isActive:false },
            { text:"발효제품", type:"vitaminB", isActive:false },
        ]
    }
    setTypeItemLine(){
        this.getTypeItems();

        this.typeItems.forEach(item=>{
            let a = document.createElement("a");
            a.innerText = item.text;
            a.classList.add(this.className);
            a.classList.add(item.isActive ? "ti-active" : "ti-inactive");
            this.typeItemWrap.appendChild(a);
        });

    }

        
}

const bestItem = new BestItem();
bestItem.setBestItemLine();

const brandItem = new BrandItem();
brandItem.setBrandItemLine();

const typeItem = new TypeItem();
typeItem.setTypeItemLine();