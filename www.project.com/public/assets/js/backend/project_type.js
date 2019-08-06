define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'project_type/index' + location.search,
                    add_url: 'project_type/add',
                    edit_url: 'project_type/edit',
                    del_url: 'project_type/del',
                    multi_url: 'project_type/multi',
                    table: 'project_type',
                    import_url: 'project_type/import',
                }
            });

            var table = $("#table");
            //定义快速搜索框默认显示文字
            $.fn.bootstrapTable.locales[Table.defaults.locale]['formatSearch'] = function(){return "请输入项目分类名字";};
            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'weigh',
                // search:false,   //关闭快搜索
                // toolbar: ".toolbar",  //工具栏
                // commonSearch: false,    //禁用通用搜索
                // searchFormVisible:true,    //通用搜索，是否始终显示搜素表单
                // titleForm:'这里是某某搜索',   //在通用搜索上边设置标题，为空默认显示：普通搜索
                // clickToSelect:false,  //是否启用点击选中当前数据
                // dblClickToEdit:false,//是否启用双击编辑
                // pageList:[10,20,50,'All'],  //定义显示数量
                // pageSize:20,//定义每页显示数量
                // showExport:false,  //是否显示导出按钮
                // exportDataType:"all",  //导出显示所有导出格式
                exportTypes:['excel'],  //定义显示导出的格式
                columns: [
                    [
                        {checkbox: true},
                        {field: 'uid', title: __('编号')},   //这里重新定义显示字段，显示后续重拼接的字段uid，不显示默认的id，因为点击查看详情是通过主键的，所以不能重新定义主键
                        {field: 'type', title: __('Type')},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'updatetime', title: __('Updatetime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        // {field: 'weigh', title: __('Weigh')},
                        // {field: 'status', title: __('Status'), searchList: {"normal":__('Normal'),"hidden":__('Hidden')}, formatter: Table.api.formatter.status},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });
            // 点击下载导入模板
            $(document).on("click", "#moban", function () {
                 alert("点击下载导入模板");
                // var select = $('#server_name').val();//获取当前域名信息
                // var url = select + "/public/uploads/moban/2222.xls";
                // window.open(url);
                //
            });
            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        recyclebin: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    'dragsort_url': ''
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: 'project_type/recyclebin' + location.search,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {
                            field: 'deletetime',
                            title: __('Deletetime'),
                            operate: 'RANGE',
                            addclass: 'datetimerange',
                            formatter: Table.api.formatter.datetime
                        },
                        {
                            field: 'operate',
                            width: '130px',
                            title: __('Operate'),
                            table: table,
                            events: Table.api.events.operate,
                            buttons: [
                                {
                                    name: 'Restore',
                                    text: __('Restore'),
                                    classname: 'btn btn-xs btn-info btn-ajax btn-restoreit',
                                    icon: 'fa fa-rotate-left',
                                    url: 'project_type/restore',
                                    refresh: true
                                },
                                {
                                    name: 'Destroy',
                                    text: __('Destroy'),
                                    classname: 'btn btn-xs btn-danger btn-ajax btn-destroyit',
                                    icon: 'fa fa-times',
                                    url: 'project_type/destroy',
                                    refresh: true
                                }
                            ],
                            formatter: Table.api.formatter.operate
                        }
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            // 点击添加按钮调用自定义方法
            // test.test();
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    
    // //调用自定义下边的方法
    // var test = {
    //    test: function(){
    //        alert(1111);
    //    }
    // };
    return Controller;
});