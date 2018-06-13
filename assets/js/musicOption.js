var musicFn=(function($,undefined){
    var ObjProvite=(function(){
        return{
            _setPara: function(options){
                this.$mode=options.$mode;
                this.listIndex=options.listIndex ||1;
                this.musicIndex=options.musicIndex || 1;  

                this.round = options.round;
                this.line = options.line;
                this.leftTime = options.leftTime;
                this.rightTime = options.rightTime;
                this.musicList = options.musicList;
                this.circle = options.circle;
                this.leftArrow = options.leftArrow;
                this.rightArrow = options.rightArrow;
                this.play = options.play;
                this.flag = options.flag;
                this.autoPlay = options.autoPlay||true;
                this.evType = options.evType||'onclick';
                this.callback = options.callback||null;
                this.deg=0;


                // this.data = {
                //     id: "1", 
                //     url: "./server/media/成都.mp3", 
                //     img_src: "./server/img/pic-01.jpg", 
                //     author: "赵雷", 
                //     title: "成都"
                // }


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
            console.log(this.$mode);
            this.getMusic();
            this.disPlayMusic(this.data);
            this.bindPlay();
            this.bindLeft();
            this.bindRight();
            this.musicOn();
            this.bindLine();
            this.bindRound();
            
            

        },
        disPlayMusic:function(data){
            _this=this;
            var strhead="<h4>"+this.data.title+"</h4><h5>"+this.data.author+"</h5>"
            var img=new Image();
            img.src=this.data.img_src;
            $(this.$mode).children().first().children().remove()
            $(this.$mode).children().first().append(strhead);
            $(this.$mode).children(".main").children(".circle").children(".small-circle").children().remove();
            $(this.$mode).children(".main").children(".circle").children(".small-circle")[0].append(img);
            
            this.oAudio=new Audio(data.url);
            // this.oAudio.oncanplay=(function(){
            //     _this.leftTime.innerHTML=_this.calDuration(0);
            //     _this.rightTime.innerHTML=_this.calDuration(_this.oAudio.duration);
            //     console.log(_this.oAudio.duration)
            // })()

            this.oAudio.addEventListener('ended', function () {  
                _this.moveRight();
            }, false);
            this.oAudio.addEventListener("canplay", function(){
                _this.rightTime.innerHTML=_this.calDuration(_this.oAudio.duration);
            });
            $(this.musicList).children().remove();
            $(this.musicList).append(_this.oAudio);
            // this.leftTime.innerHTML=this.calDuration(0);
            // this.rightTime.innerHTML=this.calDuration(_this.oAudio.duration);
          
      
        },

        calDuration(duration){
            duration=parseInt(duration);
            var min=parseInt(duration/60);
            var sec=duration%60;
            if(sec<10) sec="0"+sec;
            return min+":"+sec
        },

        getMusic:function(){
            _this=this;
            $.ajax({
                type:'GET',
                url:'../php/musicList1.php',
                cache:false,
                data:{
                    musicIndex:_this.musicIndex,
                },
                dataType:'json',
            }).done(function(data){

                this.length=data.length;
                if(data.err == 1){
                    _this.data= _this.searchMusic(data.info.id);
                } else {
                    alert(data.message);
                }
            }).fail(function(err){
                console.log(err);
            })
            // this.length=3;
            // if(this.musicIndex==1)
            // this.data={
            //     "id": "1", 
            //     "url": "./server/media/成都.mp3", 
            //     "img_src": "./server/img/pic-01.jpg", 
            //     "author": "赵雷", 
            //     "title": "成都",
            //     "album":"空"
            // }

            // if(this.musicIndex==2)
            // this.data={
            //     "id": "2", 
            //     "url": "./server/media/有没有那么一首歌.mp3", 
            //     "img_src": "./server/img/pic-02.jpg", 
            //     "author": "周华健", 
            //     "title": "有没有那么一首歌",
            //     "album":"乐无极限——梦圆东方"
            // }

            // if(this.musicIndex==3)
            // this.data={
            //     id:"3", 
            //     url:"./server/media/漂洋过海来看你.mp3", 
            //     img_src:"./server/img/pic-03.jpg", 
            //     author:"周深", 
            //     title:"漂洋过海来看你",
            //     album:"漂洋过海来看你"
            // }

        },
        searchMusic:function(id){
            $.ajax({
                type:'GET',
                url:'../json/music/'+id+'.json',
                cache:false,
                
                dataType:'json',
            }).done(function(data){
                return data;

            }).fail(function(err){

            });
        },




        setPlayTimer:function(){
            var _this=this;
            this.playTimer=setInterval(function(){
                _this.leftTime.innerHTML=_this.calDuration(_this.oAudio.currentTime);
                // _this.rightTime.innerHTML=_this.calDuration(_this.oAudio.duration);
                _this.round.style.left=(_this.oAudio.currentTime/_this.oAudio.duration)*(_this.line.clientWidth - _this.round.offsetWidth)+"px"
            },100)
        },


        musicOn:function(){
            var _this=this;
            this.flag = 1;    
            $(this.play).removeClass('icon-play3');
            $(this.play).addClass('icon-controller-paus');
            this.oAudio.play();
            this.rotate();

            this.setPlayTimer();
            
            
        },
        musicPause:function(){
            this.flag = 0;
            $(this.play).removeClass('icon-controller-paus');
            $(this.play).addClass('icon-play3'); 
            this.oAudio.pause();
            this.rotate();
            clearInterval(this.playTimer);
        },
        bindPlay:function(){
            
            var  _this = this;
            
             $(this.play).on('click', function(){
                 if(_this.flag == 1){
                     _this.musicPause();
                    
                 }else{
                     _this.musicOn();
                 }
                
                 console.log(_this.flag)
              })
         },
 
         rotate:function(){
             var _this = this;
             console.log(_this)
             if(this.flag == 1){

                 this.timer=setInterval(function(){
                          _this.circle.style.transform= "rotate("+_this.deg+"deg)";
                          _this.deg+=1.8;
                         if(_this.deg>360){
                            _this.deg=0;
                         }
                  },30);
             }else{
                 clearInterval(this.timer);
             }   
           },
 

        bindLine: function(){
            // $(this.line).on('click', function(){
            //     console.log(0)
            //  })

            var _this=this;
            this.line.onclick=function(ev){
                if(ev.target.className=="round") return
                _this.oAudio.currentTime=_this.oAudio.duration*(ev.clientX-this.offsetLeft)/(this.clientWidth);
                // _this.round.style.left=(_this.oAudio.currentTime/_this.oAudio.duration)*(_this.line.clientWidth - _this.round.offsetWidth)+"px"
            
            }
        },
        

        bindRound: function(){
            var objThis = this;
            this.round.ontouchstart = function(ev){
                //_this表示oDiv  ！！！

                // console.log(ev.target.className)
                clearInterval(objThis.playTimer);

                var _this = this;
                var disX = ev.changedTouches[0].clientX - this.offsetLeft;
                // var disY = ev.changedTouches[0].clientY - this.offsetTop; 
                document.ontouchmove = function(ev){  
                    l = ev.changedTouches[0].clientX - disX;
                    // t = ev.changedTouches[0].clientY - disY; 
                    if(l<0)
                        l  = 0;
                    // if(t<0)
                    //     t = 0;     
                    if(l >objThis.line.clientWidth - _this.offsetWidth){
            
                        l = objThis.line.clientWidth - _this.offsetWidth;
                        console.log(l)
                    }
                    // if(t > objThis.line.clientHeight - _this.offsetHeight){
                    //     t = objThis.line.clientHeight - _this.offsetHeight;
                    // }
                        // console.log(t)}
                        // console.log(_this.style.left);
                        _this.style.left = l + 'px';   
                        
                        
                        objThis.leftTime.innerHTML = objThis.calDuration(objThis.oAudio.duration*l/(objThis.line.clientWidth - _this.offsetWidth)); 
                        // _this.style.top = t + 'px';
                        // oDiv4.style.opacity = oDiv3.innerHTML;
                }

                _this.ontouchend = function(){
                    document.ontouchmove = null;
                    document.ontouchend = null;
                    objThis.setPlayTimer();
                    objThis.oAudio.currentTime=objThis.oAudio.duration*l/(objThis.line.clientWidth - _this.offsetWidth);
                }
                //解决字体能被选中
                return false;
            }
        },



        bindLeft:function(){
            var  _this = this;
            $(this.leftArrow).on('click', function(){
                _this.moveLeft();
             })
        },
        bindRight:function(){
            var  _this = this;
            $(this.rightArrow).on('click', function(){
                _this.moveRight();
             })
        },
        moveLeft:function(){
            if(--this.musicIndex<=0) this.musicIndex=3;
            clearInterval(this.timer);
            clearInterval(this.playTimer);
            this.getMusic();
            this.disPlayMusic(this.data);
            this.musicOn();
            
            

        },
        moveRight:function(){
            if(++this.musicIndex>3) this.musicIndex=1;
            clearInterval(this.timer);
            clearInterval(this.playTimer);
            this.getMusic();
            this.disPlayMusic(this.data);
            this.musicOn();
            

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