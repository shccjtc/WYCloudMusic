var listFn=(function($,undefined){
    var ObjProvite=(function(){
        return{
            _setPara: function(options){
                this.listIndex=options.listIndex||1;
                this.article=options.article;
                // this.musicList= new Array();
                this.article.innerHTML=""


            }
        }
      
    })()
    var Obj = function(options){
        if (this instanceof Obj){
            ObjProvite._setPara.call(this, options);
        } else {
            return new Obj(options);
        }
    }
    Obj.prototype = {
        constructor: Obj,
        install: function(){ 
            this.getList();
            

        },

        getList:function(){
            _this=this;
            $.ajax({
                type:'GET',
                // url:'../json/list/'+_this.listIndex+'.json',
                url:'./assets/json/list/'+_this.listIndex+'.json',
                cache:false,

                dataType:'json',
            }).done(function(data){
                
                for(var i=0;i<data.length;i++){

                    _this.display(data,i);
                    
                    
                }

                // console.log(_this.musicList)
                


            }).fail(function(err){
                console.log(err);
            })
        },


        // getListArr:function(ldata){
            
        //     var a= new Array();
        //     for(var i=0;i<ldata.length;i++){
        //         console.log(this.applyMusic(ldata,1))
        //     }
        //     console.log("a:"+a)
        //     return a;
        // },

        display:function (ldata,i) {
            _this=this
            $.ajax({
                type:'GET',
                url:'./assets/json/music/'+ldata["id"+i]+'.json',
                cache:false,
                dataType:'json',
            }).done(function(data){
                // console.log(data)
                
                _this.displaySingle(data,i);
                // console.log(_this.musicList.length)
                // console.log(_this.musicList[i])
            }).fail(function(err){
                console.log(err);
            })
          },

        // displayList:function () {
        //     console.log(this.musicList)
        //     console.log(this.musicList.length)
        //     for(var i=0;i<this.musicList.length;i++){
        //         console.log(1)
        //         this.displaySingle(this.musicList[i]);
        //     }
        // },
        displaySingle:function(data,i){


            var str='<div>'+
                        '<a href="./play.html?listId='+this.listIndex+'&musicId='+i+'">'+
                            '<span>'+
                                '<img src="'+data.img_src+'" alt="">'+
                            '</span>'+
                            '<strong>'+
                                data.title+
                            '</strong>'+
                            '<p>'+
                                data.author+' - '+data.album+
                            '</p>'+
                            '<p class="play lnr lnr-volume-high"></p>'+
                            '<p class="play lnr lnr-camera-video"></p>'+
                        '</a>'+
                    '</div>'

            this.article.innerHTML+=str;
        },

        updated: function(options){
            ObjProvite._setPara.call(this, options);     
        },
        remove: function(){
            // 有事件，需要解绑事件
            // 有动态的DOM节点，需要移除节点
            // 释放内存
            for (var attr in this){
                this[attr] = null;
            }
        }
    }
    return Obj;
})(jQuery)