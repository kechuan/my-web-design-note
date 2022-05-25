const carouselList = [  //列表
    {num:'01'},
    {num:'02'},
    {num:'03'}
]

var i = 0;
const standard = carouselList[0];
let status = standard;

const carousel = function(){
    return{
        prev:function(){
            var flag = "prev"
            return this.change(flag)
        },

        next:function(){
            var flag = "next"
            return this.change(flag)
        },

        custom:function(num){
            var flag = num;
        },

        change:function(flag){
            switch(flag){
                case "prev":
                    if(status==standard){
                        status = carouselList[carouselList.length-1];
                        i = carouselList.length-1;
                    
                    }

                    else{
                        i--;
                    }

                    status = carouselList[i];
                    var flag = require(`../\images/\mediabox/\carousel_${status.num}.png`); //commonJS引入节流
                    return flag;

                    break;
    
                
                case "next":
                    if(carouselList.length==status.num){
                        status = standard;
                        i = 0;
                    }

                    else{
                        i++;
                    }
                
                    status = carouselList[i];
                    var flag = require(`../\images/\mediabox/\carousel_${status.num}.png`);
                    return flag;

                    break;
            }  
        }
    }
}

export {carousel}