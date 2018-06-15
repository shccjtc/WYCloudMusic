var indexLoading = (function(){
    var ObjProvite = (function(){
        return {
            _setPara: function(options){
                this.$wrapperList = options.$wrapperList;
                if (!this.$wrapperList){
                    throw new Error('组件传参有误~~~');
                }
            }
        };
    })();
    var Obj = function(options){
        if (this instanceof Obj){
            ObjProvite._setPara.call(this, options);
        } else {
            return new Obj(options);
        }
    };
    Obj.prototype = {
        constructor: Obj,
        install: function(){
            // this.bindInsert();
            var j=0;

            for(var i=1; i<6; i++){
                this.getList(i, j);
                j=j+2;
            }
        },
        getList: function(listIndex, divIndex){
            var _this=this;
            $.ajax({
                type:'GET',
                // url:'../json/list/'+_this.listIndex+'.json',
                url:'./assets/json/list/'+listIndex+'.json',
                cache:false,
                dataType:'json',
            }).done(function(data){
                _this.getMusicData(divIndex, data, data.length, 0);
                _this.getMusicData(divIndex+1, data, data.length, 3);
                // _this.$wrapperList[listIndex].append('</div>');

            }).fail(function(err){
                console.log(err);
            })
        },
        getMusicData: function(listId, listData, listLength, row){
            var _this=this;
            // _this.$wrapperList[listId].append('<div class="list-music">');
            for(var j=row; j<row+3; j++){
                _this.getData(listId, listData, j)
            }
        },
        getData: function(listId, ldata, i){
            _this=this;
            $.ajax({
                type: 'GET',
                url: './assets/json/music/'+ldata["id"+i]+'.json',
                // url: '../server/index-data.json',
                data: {
                    // classid: 1,
                },
                dataType: 'json',
            })
            .done(function(data){
                // console.log(data)
                // callback && callback(data);
                _this.insertDom(listId, data,i);
            }).fail(function(err){
                console.log(err)
            });
        },
        insertDom: function(listId, arr,i){
            var str='<a href="" musicid="'+ i +'"><img src="'+ arr.img_src +'" alt=""><p>'+ arr.title + '--' + arr.author +'</p></a>';
            $(this.$wrapperList[listId]).append(str)
        },
        update: function(options){
            ObjProvite._setPara.call(this, options);
        },
        remove: function(){
            for (var attr in this){
                this[attr] = null;
            }
        }
    };
    return Obj;
})();