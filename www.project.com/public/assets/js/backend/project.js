define(['jquery', 'bootstrap', 'backend', 'table', 'form','clipboard.min'], function ($, undefined, Backend, Table, Form,ClipboardJS) {
    // 这里引入对应的js，并把ClipboardJS传入进来
    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'project/index' + location.search,
                    add_url: 'project/add',
                    edit_url: 'project/edit',
                    del_url: 'project/del',
                    multi_url: 'project/multi',
                    table: 'project',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'weigh',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'projecttype.type', title: __('Projecttype.type')},
                        // {field: 'typeid', title: __('Typeid')},
                        {field: 'title', title: __('Title')},
                        // {field: 'link', title: __('Link')},
                        // 点击直接跳转路径 : 百度网盘地址
                        {
                            field: 'link',
                            title: __('Link'),
                            align: 'left',
                            // searchList: $.getJSON('example/bootstraptable/searchlist?search=a&field=row[user_id]'),
                            formatter: Controller.api.formatter.url
                        },

                        // {field: 'password', title: __('Password')},
                        // 点击复制密码
                        {
                            field: 'password',
                            title: __('Password'),
                            events: Controller.api.events.copy,
                            formatter: Controller.api.formatter.copy
                        },
                        // 点击直接跳转路径 : 原网址地址
                        // {field: 'source', title: __('Source')},
                        {
                            field: 'source',
                            title: __('Source'),
                            align: 'left',
                            // searchList: $.getJSON('example/bootstraptable/searchlist?search=a&field=row[user_id]'),
                            formatter: Controller.api.formatter.url
                        },
                        // {field: 'sourceid', title: __('Sourceid')},
                        // {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        // {field: 'updatetime', title: __('Updatetime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        // {field: 'weigh', title: __('Weigh')},
                        // {field: 'status', title: __('Status'), searchList: {"normal":__('Normal'),"hidden":__('Hidden')}, formatter: Table.api.formatter.status},
                        
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
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
                url: 'project/recyclebin' + location.search,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'title', title: __('Title'), align: 'left'},
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
                                    url: 'project/restore',
                                    refresh: true
                                },
                                {
                                    name: 'Destroy',
                                    text: __('Destroy'),
                                    classname: 'btn btn-xs btn-danger btn-ajax btn-destroyit',
                                    icon: 'fa fa-times',
                                    url: 'project/destroy',
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
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },

        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            },
            formatter: {//渲染的方法
                //跳转路径
                url: function (value, row, index) {
                    //这里是自定义样式和自己想要的按钮
                    return '<div class="input-group input-group-sm" style="width:250px;"><input type="text" class="form-control input-sm" value="' + value + '"><span class="input-group-btn input-group-sm"><a href="' + value + '" target="_blank" class="btn btn-default btn-sm"><i class="fa fa-link"></i></a></span></div>';
                },
                copy: function (value, row, index) {
                    return '<button class="btn btn-copy" data-clipboard-text="'+value+'">点击复制密码</button>';

                },
            },
            //点击复制文本密码
            events: {//绑定事件的方法
                copy: {
                    //格式为：方法名+空格+DOM元素
                    'click .btn-copy': function (e, value, row, index) {
                        var clipboard = new ClipboardJS('.btn');
                        //打印输出信息
                        // clipboard.on('success', function(e) {
                        //     console.log(e);
                        // });
                        Toastr.info("复制成功！");
                    }
                },
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