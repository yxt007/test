<?php

namespace app\index\controller;

use app\common\controller\Frontend;
use think\Db;
use app\index\model\Test;   //引入model层
use think\Request;    //判断是否请求
class Index extends Frontend
{

    protected $noNeedLogin = '*';
    protected $noNeedRight = '*';
    protected $layout = '';

    public function index()
    {
        //查询相关链接的信息
        $skip = Db::name('config')->where(array('name'=>'skip'))->find(); 
        if($skip['value'] == 1){
             $this->redirect('backstage.php/index/login');
        }
        return $this->view->fetch();
    }

    public function news()
    {
        $newslist = [];
        return jsonp(['newslist' => $newslist, 'new' => count($newslist), 'url' => 'https://www.fastadmin.net?ref=news']);
    }
    
    //测试显示输出
    //访问路径是：http://127.0.0.1:39008/public/index/index/test
    public function test(){
        //判断是否是post请求
        if (Request::instance()->isPost()){
            $title = input('title');  //获取标题
            $content = input('content');//获取内容
            //调用添加方法
        $data['title'] = $title;
        $data['content'] = $content;
        $data['category_id'] = 1;
        $data['category_ids'] = 1;
        $data['hobbydata'] = 1;
            $list = Test::toadd($data);   //这个方法是直接写死的，所以放在判断post请求那里是失效的
            //判断返回的主键不是为空，则添加成功！
            if($list){
                $this->success('留言成功', 'Index/test');
            } 
        }
        $map['id'] = 2;   //传入where条件
        $page = 10;  //每页显示的数量
        $list = Test::test("",$page); //调用model层里边写好的逻辑，如果不想传入某个参数，直接为空就可以
        $this->view->assign('list', $list);
        return $this->view->fetch();
        //渲染给index页面
        // return $this->view->fetch('index');
    }

    public function testview(){
        $id = input('id');  
        // $where['category_id'] = 12;   //可以直接传入where条件参数路进去查询
        $list = Test::testview($id);
        $this->view->assign('list', $list);
        return $this->view->fetch();
    }


}
