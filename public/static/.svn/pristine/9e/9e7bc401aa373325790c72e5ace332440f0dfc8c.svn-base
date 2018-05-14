$(document).ready(function() {
	// 配置验证
	ko.validation.init({
		errorElementClass: 'has-error',
        insertMessages: true 
    }); 

	var superViewModel = function() {
		var self = this;
		self.username = ko.observable('').extend({
			required: {
                params: true,
                message: '请输入用户名'
            }, 
            minLength: {
                params: 5,
                message: '用户名最短长度为5'
            },
            maxLength: {
                params: 15,
                message: '用户名最大长度为15'
            }
		});
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
		self.init = function() {
			self.username('');
			self.password('');
		};
		// 校验错误信息
		self.addErrors = ko.validation.group([self.username, self.password]);
		// 校验是否通过
		self.addIsValid = ko.computed(function() {
			return self.addErrors().length === 0;
		});
		self.add = function() {
			if (!self.addIsValid()) {
				self.addErrors.showAllMessages();	
				return false;
			}

			var modelData = {
				username: self.username(), 
				password: self.password()
			};

			var message = '添加超级管理员成功!';
        	var type = 'tip-tb-black';
        	$.ajax({
                url: '/manage/adminlogin/addsuperpost',
                data: JSON.stringify(modelData)
            }).done(function(res) {
                switch (res.code) {
                    case 1:
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
                        message = '添加超级管理员失败!'
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
				setTimeout(function() {
					window.location.href = '/manage/adminlogin/login';
				}, 2000);
            });
		};
	};

	var viewModel = new superViewModel();
	ko.applyBindings(viewModel);

	var init = function() {
	};

	init();

	head.load(
		'/static/manage/bootstrap/notify/bootstrap-notify.min.js?v=1'
	);

});
