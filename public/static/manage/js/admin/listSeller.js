$('document').ready(function() {
    // 配置验证
    ko.validation.init({
        errorElementClass: 'has-error',
        insertMessages: true
    });

    var listSellerViewModel = function() {
        var self = this;
        // 每页显示数量
        self.pageSize = ko.observable(10);
        // 第几页
        self.pageNo = ko.observable(1);
        // 记录总数
        self.total = ko.observable(0);
        // 搜索关键字
        self.searchString = ko.observable('');
        // 搜索关键字
        self.searchString = ko.observable('');
        self.searchField = ko.observableArray(['email', 'tel', 'note']);
        // 搜索
        self.searchClick = function() {
            $('thead th i').show();
            listSeller();
        };
        // 排序
        self.order = ko.observable({'sellerid': -1});
        // 排序点击
        self.orderClick = function(data, event) {
            var th = $(event.currentTarget);
            th.siblings().find('i').show();
            var key = th.attr('name');
            var order = {}
            var i = th.find('i:visible');
            if (i.length == 2) {
                order[key] = -1;
                th.find('i.fa-sort-asc').hide();
            } else if (i.hasClass('fa-sort-asc')) {
                order[key] = -1;
                i.hide();
                th.find('i.fa-sort-desc').show();
            } else if (i.hasClass('fa-sort-desc')) {
                order[key] = 1;
                i.hide();
                th.find('i.fa-sort-asc').show();
            }

            self.order(order);
            listSeller();
        };
        // 显示时间
        self.showTime = function(time) {
            return $.timeChange(time, 'timestamp', 'Y-m-d H:i:s');
        };
        // 商家列表
        self.sellerList = ko.observableArray([]);
        // 规则id列表
        self.selleridList = ko.observableArray([]);
        // 操作id列表
        self.opIds = ko.observableArray([]);
        // 全选
        self.opAll = ko.computed(function() {
            self.opIds.sort(function(a, b) {
                return a - b;
            });

            // 没有评论选中
            if (self.opIds().length == 0) {
                return 0;
            }

            if (self.opIds().length != self.selleridList().length) {
                return 0;
            }

            if (self.opIds().toString() == self.selleridList().toString()) {
                return 1;
            }
            return 0;
        });
        // 全选点击
        self.selectAll = function() {
            if (self.opAll() == 0) {
                self.opIds(self.selleridList().concat());
            } else {
                self.opIds([]);
            }
        };
        // 分页修改
        self.pageChange = function() {
            listSeller();
        };
        // 表格当前操作的商家
        self.opSeller = ko.observable('');
        // 点击查看
        self.showClick = function() {
            self.opSeller(this);
        };
        // 登录邮箱
        self.setEmail = ko.observable('').extend({
            required: {
                params: true,
                message: '请输入Email'
            },
            email: {
                params: true,
                message: "Email格式不正确"
            },
            editable: true
        });
        // 登录密码
        self.setPassword = ko.observable('').extend({
            required: {
                params: true,
                message: '请输入密码'
            },
            minLength: {
                params: 6,
                message: '密码最短长度为6'
            },
            maxLength: {
                params: 15,
                message: '密码最大长度为15'
            },
            editable: true
        });
        // 名字
        self.setName = ko.observable('').extend({
            required: {
                params: true,
                message: '姓名不能为空'
            },
            minLength: {
                params: 2,
                message: '姓名最短长度为2个字符'
            },
            maxLength: {
                params: 20,
                message: '姓名最大长度为20个字符'
            },
            editable: true
        });
        // 电话
        self.setMobile = ko.observable('').extend({
            required: {
                params: true,
                message: '请输入手机号码'
            },
            pattern: {
                params: /^\d{11}$/,
                message: '手机号码格式错误'
            },
            editable: true
        });
        // 编辑备注
        self.setNote = ko.observable('').extend({
            maxLength: {
                params: 200,
                message: '备注最大长度为200个字符'
            },
            editable: true
        });
        self.reinit = function() {
            self.setEmail.commit();
            self.setEmail('');
            self.setEmail.isModified(false);
            self.setPassword.commit();
            self.setPassword('');
            self.setPassword.isModified(false);
            self.setName.commit();
            self.setName('');
            self.setName.isModified(false);
            self.setMobile.commit();
            self.setMobile('');
            self.setMobile.isModified(false);
            self.setNote.commit();
            self.setNote('');
            self.setNote.isModified(false);
        };
        // 校验错误信息
        self.setErrors = ko.validation.group([self.setEmail, self.setPasswrod, self.setName, self.setMobile, self.setNote]);
        // 校验是否通过
        self.setIsValid = ko.computed(function() {
            return self.setErrors().length === 0;
        });
        // 点击编辑
        self.setClick = function() {
            self.opSeller(this);
            self.setEmail(this.email);
            self.setEmail.beginEdit();
            self.setPassword.beginEdit();
            self.setName(this.name);
            self.setName.beginEdit();
            self.setMobile(this.mobile);
            self.setMobile.beginEdit();
            self.setNote(this.note);
            self.setNote.beginEdit();
        };
        // 取消商家编辑
        self.cancelSet = function() {
            self.reinit();
        }
        // 编辑商家
        self.set = function() {
            if (!self.setIsValid()) {
                self.setErrors.showAllMessages();
                return false;
            }

            var modelData = {};
            if (self.setEmail.hasChanges()) {
                modelData.email = self.setEmail();
            }
            if (self.setPassword.hasChanges()) {
                modelData.password = self.setPassword();
            }
            if (self.setName.hasChanges()) {
                modelData.name = self.setName();
            }
            if (self.setMobile.hasChanges()) {
                modelData.mobile = self.setMobile();
            }
            if (self.setNote.hasChanges()) {
                modelData.note = self.setNote();
            }

            $('#set').modal('hide');
            var message = '编辑商家成功!';
            var type = 'tip-tb-black';
            if ($.isEmpty(modelData)) {
                return true;
            } else {
                modelData.sellerid = self.opSeller().sellerid;
                $.ajax({
                    url: '/manage/seller/setpost',
                    data: JSON.stringify(modelData)
                }).done(function(res) {
                    switch (res.code) {
                        case 1:
                            self.reinit();
                            listSeller();
                            break;
                        case 2003:
                            message = res.message + '!';
                            type = 'tip-tb-red';
                            break;
                        default:
                            message = '编辑商家失败!';
                            type = 'tip-tb-red';
                    }
                    var notify = $.notify({
                        message: message,
                    }, {
                        allow_dismiss: false,
                        type: type,
                        delay: '50',
                        placement: {
                            align: 'center'
                        },
                        animate: {
                            enter: 'animated fadeInDown',
                            exit: 'animated fadeOutUp'
                        },
                        offset: {
                            x: $('body').hasClass('sidebar-collapse') ? 0 : 230,
                            y: 20
                        }
                    });
                });
            }
        };
        // 点击删除
        self.delClick = function() {
            self.opSeller(this);
        };
        // 删除商家
        self.del = function() {
            var modelData = {
                sellerid: self.opSeller().sellerid
            };

            var message = '';
            var type = 'tip-tb-black';
            $.ajax({
                url: '/manage/seller/delpost',
                data: JSON.stringify(modelData)
            }).done(function(res) {
                $('#del').modal('hide');

                switch (res.code) {
                    case 1:
                        message = '删除商家成功!';
                        listSeller();
                        break;
                    case 911:
                        var redirectUrl = window.location.href;
                        window.location.href = res.url + '?redirectUrl=' + encodeURIComponent(redirectUrl);
                        break;
                    default:
                        message = '删除商家失败';
                        type = 'tip-tb-red';
                }
                var notify = $.notify({
                    message: message,
                }, {
                    allow_dismiss: false,
                    type: type,
                    delay: '50',
                    placement: {
                        align: 'center'
                    },
                    animate: {
                        enter: 'animated fadeInDown',
                        exit: 'animated fadeOutUp'
                    },
                    offset: {
                        x: $('body').hasClass('sidebar-collapse') ? 0 : 230,
                        y: 20
                    }
                });
            });
        };
        // 批量删除商家
        self.dels = function() {
            if (self.opIds().length == 0) {
                return false;
            }

            var modelData = {
                selleridList: self.opIds()
            };

            var message = '';
            var type = 'tip-tb-black';
            $.ajax({
                url: '/manage/seller/delspost',
                data: JSON.stringify(modelData)
            }).done(function(res) {
                switch (res.code) {
                    case 1:
                        message = '批量删除商家成功!';
                        break;
                    case 911:
                        var redirectUrl = window.location.href;
                        window.location.href = res.url + '?redirectUrl=' + encodeURIComponent(redirectUrl);
                        break;
                    default:
                        message = '批量删除商家失败';
                        type = 'tip-tb-red';
                }
                // 提示
                var notify = $.notify({
                    message: message,
                }, {
                    allow_dismiss: false,
                    type: type,
                    delay: '50',
                    placement: {
                        align: 'center'
                    },
                    animate: {
                        enter: 'animated fadeInDown',
                        exit: 'animated fadeOutUp'
                    },
                    offset: {
                        x: $('body').hasClass('sidebar-collapse') ? 0 : 230,
                        y: 20
                    }
                });
                // 刷新
                listSeller();
            });
        };
    };

    var viewModel = new listSellerViewModel();
    ko.applyBindings(viewModel);

    // 商家列表
    var listSeller = function() {
        var modelData = {
            pageSize: +viewModel.pageSize(),
            pageNo: +viewModel.pageNo(),
            order: viewModel.order()
        };

        if (viewModel.searchString() != '') {
            modelData.searchField = viewModel.searchField();
            modelData.searchValue = viewModel.searchString().split(' ');
        }

        $.ajax({
            url: '/manage/seller/listpost',
            data: JSON.stringify(modelData)
        }).done(function(res) {
            switch (res.code) {
                case 1:
                    var sellerList = new Array();
                    var selleridList = new Array();
                    var i = 0;
                    $.each(res.list, function(index, data) {
                        selleridList[i] = data.sellerid;
                        sellerList[i] = data;
                        i++;
                    });
                    selleridList.sort(function(a, b) {
                        return a - b;
                    });
                    viewModel.selleridList(selleridList);
                    viewModel.sellerList(sellerList);
                    viewModel.total(res.total);
                    // 修复搜索bug, 搜索时可能页数过大
                    if (viewModel.total() < viewModel.pageSize() * (viewModel.pageNo() - 1)) {
                        viewModel.pageNo(1);
                    }
                    $.pagination(viewModel.pageNo(), viewModel.pageSize(), viewModel.total(), 5, $('.pagination'));
                    break;
                case 2000:
                    // 结果为空
                    viewModel.sellerList([]);
                    viewModel.total(0);
                    $.pagination(viewModel.pageNo(), viewModel.pageSize(), viewModel.total(), 5, $('.pagination'));
                    break;
            }
        });
    }

    // 页面初始化
    var init = function() {
        listSeller();
    };

    init();

    //上下页与任意页点击
    var nowPage = '',
        newPage = '';
    $(document).on('click', 'ul.pagination li', function() {
        var pageTotal = Math.ceil(viewModel.total()/viewModel.pageSize());

        if ($(this).hasClass('prev')) {
            nowPage = +$(this).siblings('.active').children('a').text();
            newPage = nowPage - 1;
        } else if ($(this).hasClass('next')) {
            nowPage = +$(this).siblings('.active').children('a').text();
            newPage = nowPage + 1;
        } else if ($(this).hasClass('first')) {
            newPage = 1;
        } else if ($(this).hasClass('last')) {
            newPage = pageTotal
        } else {
            newPage = +$(this).text();
        };


        if (newPage <= 0 || newPage > pageTotal || newPage == viewModel.pageNo()) {
            return false;
        };

        viewModel.pageNo(newPage);

        listSeller();
    });

    $('#search').on('blur', function() {
        if (viewModel.searchString() == '') {
            $('thead th i').show();
            viewModel.pageNo(1);
            viewModel.order({'sellerid': -1})
            listSeller();
        }
    });

    head.load(
        staticurl + '/static/backend/js/plugins/notify/bootstrap-notify.min.js?v=1'
    );
});
