$('document').ready(function() {
    // 配置验证
    ko.validation.init({
        errorElementClass: 'has-error',
        insertMessages: true
    });

    var addSellerViewModel = function() {
        var self = this;
        // 登录邮箱
        self.email = ko.observable('').extend({
            required: {
                params: true,
                message: '请输入Email'
            },
            email: {
                params: true,
                message: "Email格式不正确"
            }
        });
        // 登录密码
        self.password = ko.observable('').extend({
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
            }
        });
        self.name = ko.observable('').extend({
            required: {
                params: true,
                message: '请输入姓名'
            },
            minLength: {
                params: 2,
                message: '姓名最小长度为2个字符'
            },
            maxLength: {
                params: 20,
                message: '姓名最大长度为20个字符'
            }
        });
        // 电话
        self.mobile = ko.observable('').extend({
            required: {
                params: true,
                message: '请输入手机号码'
            },
            pattern: {
                params: /^\d{11}$/,
                message: '手机号码格式错误'
            }
        });
        // 备注
        self.note = ko.observable('').extend({
            maxLength: {
                params: 200,
                message: '最大长度为200个字符'
            }
        })
        // 重置参数值
        self.reset = function() {
            self.email('');
            self.email.isModified(false);
            self.password('');
            self.password.isModified(false);
            self.name('');
            self.name.isModified(false);
            self.mobile('');
            self.mobile.isModified(false);
            self.note('');
            self.note.isModified(false);
        };
        // 添加商家
        self.add = function() {
            if (!self.isValid()) {
                self.errors.showAllMessages();
                return false;
            }

            var modelData = {
                email: self.email(),
                password: self.password(),
                name: self.name(),
                mobile: self.mobile(),
                note: self.note()
            };

            var message = '添加商家成功!';
            var type = 'tip-tb-black';
            $.ajax({
                url: '/manage/seller/addpost',
                data: JSON.stringify(modelData)
            }).done(function(res) {
                switch (res.code) {
                    case 1:
                        self.reset();
                        break;
                    case 911:
                        var redirectUrl = window.location.href;
                        window.location.href = res.url + '?redirectUrl=' + encodeURIComponent(redirectUrl);
                        break;
                    case 2003:
                        message = res.message + '!';
                        type = 'tip-tb-red';
                        break;
                    default:
                        message = '添加商家失败';
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
            });
        };
        // 校验错误信息
        self.errors = ko.validation.group([self.email, self.password, self.name, self.mobile, self.note]);
        // 校验是否通过
        self.isValid = ko.computed(function() {
            return self.errors().length === 0;
        });
    };

    var viewModel = new addSellerViewModel();
    ko.applyBindings(viewModel);

    var init = function() {

    };

    init();

    head.load(
        staticurl + '/static/backend/js/plugins/notify/bootstrap-notify.min.js'
    );
});
