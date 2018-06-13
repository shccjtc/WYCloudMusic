<?php

    $cid = intval($_GET['classid']);

    $str = '';

    switch ($cid){
        case 1:
            $str = '{"err":1,"message":"","info":[{"id":"1","url":"http://www.baidu.com/","img_src":"http://192.168.2.123/2018-4-13/img/1.jpg","title":"你好你好你好你好你好1"},{"id":"2","url":"http://www.baidu.com/","img_src":"http://192.168.2.123/2018-4-13/img/2.jpg","title":"你好你好你好你好你好2"},{"id":"3","url":"http://www.baidu.com/","img_src":"http://192.168.2.123/2018-4-13/img/1.jpg","title":"你好你好你好你好你好3"},{"id":"4","url":"http://www.baidu.com/","img_src":"http://192.168.2.123/2018-4-13/img/2.jpg","title":"你好你好你好你好你好4"}]}';
            break;
        case 2:
            $str = '{"err":1,"message":"","info":[{"id":"1","url":"http://www.baidu.com/","img_src":"http://192.168.2.123/2018-4-13/img/2.jpg","title":"哈哈哈哈哈哈哈哈1"},{"id":"2","url":"http://www.baidu.com/","img_src":"http://192.168.2.123/2018-4-13/img/1.jpg","title":"请问饿请问饿请问饿"},{"id":"3","url":"http://www.baidu.com/","img_src":"http://192.168.2.123/2018-4-13/img/2.jpg","title":"你好你好你好你好你好3"},{"id":"4","url":"http://www.baidu.com/","img_src":"http://192.168.2.123/2018-4-13/img/2.jpg","title":"你好你好你好你好你好4"}]}';
            break;
        case 3:
            $str = '{"err":1,"message":"","info":[{"id":"1","url":"http://www.baidu.com/","img_src":"http://192.168.2.123/2018-4-13/img/1.jpg","title":"撒发的撒发的水电费水电费1"},{"id":"2","url":"http://www.baidu.com/","img_src":"http://192.168.2.123/2018-4-13/img/2.jpg","title":"你好你好你好你好你好2"},{"id":"3","url":"http://www.baidu.com/","img_src":"http://192.168.2.123/2018-4-13/img/1.jpg","title":"你好你好你好你好你好3"},{"id":"4","url":"http://www.baidu.com/","img_src":"http://192.168.2.123/2018-4-13/img/2.jpg","title":"你好你好你好你好你好4"}]}';
            break;
        default:
            $str = '{"err":1,"message":"数据查询有误","info": []}';
            break;
    }

    echo $str;