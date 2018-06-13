<?php
    $cid = intval($_GET['musicIndex']) % 3;
    
    $str = '';

    switch ($cid){
        case 1:
            $str = '{
                "err": 1, 
                "message": "", 
                "info": {
                    "id": 1,
                    "length":3
                }
            }'
            break;
        case 2:
            $str = '{
                "err": 1, 
                "message": "", 
                "info": {
                    "id": 2,
                    "length":3
                }
            }'
            break;
        case 3:
            $str = '{
                "err": 1, 
                "message": "", 
                "info": {
                    "id": 3,
                    "length":3
                }
            }'
            break;
        default:
            $str = '{"err":1,"message":"数据查询有误","info": []}';
            break;
            
        }
    echo $str;
