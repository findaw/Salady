class EventSlider{
    constructor(container){
        this.container = container;
        this.items = container.querySelectorAll("#evtSlide > span");
        this.nav = document.querySelectorAll(".evtSlideNav");
        this.index = 0;
        this.items[0].classList.add('fadeIn');
        this.nav[0].classList.add('nav-active');
        this.itvId = null;
    }
    fadeIn (num){
        this.items[this.index].classList.remove('fadeIn');
        this.nav[this.index].classList.remove('nav-active');

        if(this.index >= 2 && num > 0){
            this.index = 0;
        }else if(this.index <= 0 && num < 0){
            this.index = 2;
        }
        else{
            this.index += num;
        }
        this.items[this.index].classList.add('fadeIn');
        this.nav[this.index].classList.add('nav-active');
        
    }
    startCarousel = () => {
        this.itvId = setInterval(()=>{this.fadeIn(1)}, 4300);
    }
    endCarousel = () =>{
        clearInterval(this.itvId);
    }
}
const es = new EventSlider(document.querySelector("#evtSlide"));
es.startCarousel();
es.container.addEventListener("mouseover", es.endCarousel);
es.container.addEventListener("mouseleave", es.startCarousel);

const slideBtnPrev = document.querySelector("#slideBtnPrev");
const slideBtnNext = document.querySelector("#slideBtnNext");


slideBtnPrev.addEventListener("click", es.fadeIn.bind(es, -1));
slideBtnNext.addEventListener("click", es.fadeIn.bind(es, 1));


class ProductSlider{
    constructor(){
        this.wrapper = document.querySelector('#bestItemWrap');
        this.items = this.wrapper.querySelectorAll(".bestItem");
        this.index = 0;
    }
    fadeIn(num){
        let wrapWidth = document.querySelector("#productList").offsetWidth;
        if(this.index <= 0 && num === -1){
            this.index = this.items.length - ((wrapWidth - 100)/ (this.items[0].offsetWidth)) + 1;
        }
        else if(this.index >= this.items.length - ((wrapWidth - 100) / (this.items[0].offsetWidth)) + 1  && num === 1){
            this.index = 0; //move to first item
        }else{
            this.index += num;
        }

        this.wrapper.style.left = -((this.items[0].offsetWidth+5) * this.index) + 'px';
    }
}

const ps = new ProductSlider();
const plPrevBtn = document.querySelector("#plPrevBtn");
const plNextBtn = document.querySelector("#plNextBtn");

plPrevBtn.addEventListener("click", ps.fadeIn.bind(ps, -1));
plNextBtn.addEventListener("click", ps.fadeIn.bind(ps, 1));