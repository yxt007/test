<?php

namespace app\index\model;

use app\common\model\MoneyLog;
use think\Model;

class Test extends Model
{

    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';
    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
  

    public function getOriginData()
    {
        return $this->origin;
    }

    //  static  必须是静态，才可以调用
    public static function test($where,$page)
    {
        //分页查询，每页查询10条数据
        $list = Test::where($where)->order('createtime desc')->paginate($page);
        return $list;
    }

    // 把时间戳转换成时间格式   这个是把创建时间转换城时间格式
    public function getcreatetimeAttr($value, $data)
    {
        $value = $value ? $value : $data['createtime'];
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }

    //表单提交  保存数据  （字段数据写死，调用方法直接保存数据）
    public static function toadd($data){
        $user           = new Test;    //实例化表名
        //可以直接往里传数据，也可以直接把要保存的数据以数组形式传入，然后添加
        // $user->title     = $title;
        // $user->content    = $content;
        // $user->category_id    = $category_id;
        // $user->category_ids    = $category_ids;    
        // $user->hobbydata    = $hobbydata; 
        $user->save($data);
        // 获取自增ID
        return $user->id;
    }

    //可以直接传主键查询数据，也可以直接传入条件直接查询相关信息
    //查询一条数据，查看详情
    //也可以传入条件  例如:$where['category_id'] = 12;
    public static function testview($id){
        $testview = Test::get($id);
        return $testview;
    }


}
