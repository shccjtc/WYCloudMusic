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
            var _this=this;
            this.getData(function(list){
                _this.insertDom(0, list);
                _this.insertDom(3, list)
            })
            // console.log(9)
        },
        getData: function(callback){
            $.ajax({
                type: 'GET',
                url: 'http://127.0.0.1/WYCloudMusic/server/index-data.json',
                // url: '../server/index-data.json',
                data: {
                    // classid: 1,
                },
                dataType: 'json',
            })
            .done(function(data){
                // console.log(data)
                callback && callback(data.info);
            }).fail(function(err){
                console.log(err)
            });
        },
        insertDom: function(row, arr){
            var str = '<div class="list-music">';
            for (var i = row; i < row+3; i++){
                var tmp = [
                    '<a href="" musicid="'+ arr[i].id +'">',
                        '<img src="'+ arr[i].img_src +'" alt="">',
                        '<p>'+ arr[i].title + '--' + arr[i].author + '</p>',
                    '</a>',
                ];
                str += tmp.join('');
                tmp = null; // 考虑js变量内存释放的问题
            }
            str += '</div>';
            this.$wrapperList.append(str);
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