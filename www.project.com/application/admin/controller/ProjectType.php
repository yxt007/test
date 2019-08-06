<?php

namespace app\admin\controller;

use app\common\controller\Backend;

/**
 * 源码类型管理
 *
 * @icon fa fa-circle-o
 */
class ProjectType extends Backend
{
    
    protected $searchFields = "type";    //启用快速搜索，定义搜索的字段是哪个

    /**
     * ProjectType模型对象
     * @var \app\admin\model\ProjectType
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\ProjectType;
        $this->view->assign("statusList", $this->model->getStatusList());
    }
    
    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */
    public function import(){
        return parent::import();
    }

    public function index()
    {

        //设置过滤方法
        $this->request->filter(['strip_tags']);
        if ($this->request->isAjax()) {
            //如果发送的来源是Selectpage，则转发到Selectpage
            if ($this->request->request('keyField')) {
                return $this->selectpage();
            }
            //在buildparams(),括号里定义搜索字段可以
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();
            $total = $this->model
                ->where($where)
                ->order($sort, $order)
                ->count();

            $list = $this->model
                ->where($where)
                ->order($sort, $order)
                ->limit($offset, $limit)
                ->select();

            $list = collection($list)->toArray();
            //重新赋值id，从1开始自增，
            for ($i=0; $i < count($list); $i++) { 
                $list[$i]['uid'] = $i + 1;
            }
            $result = array("total" => $total, "rows" => $list);

            return json($result);
        }
        //获取当前域名，拼接下载模板链接
        $this->view->assign("server_name", $_SERVER['SERVER_NAME'].":".$_SERVER['SERVER_PORT']);
        return $this->view->fetch();
    }


}
