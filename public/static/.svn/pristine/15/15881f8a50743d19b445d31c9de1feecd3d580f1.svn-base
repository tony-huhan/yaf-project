$('document').ready(function() {
	// 配置验证
	ko.validation.init({
		errorElementClass: 'has-error',
        insertMessages: true 
    }); 

	var loginViewModel = function() {
		var self = this;
		// 用户名
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
        // 密码
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
        // 错误信息
        self.errMsg = ko.observable('');
		// 校验错误信息
		self.errors = ko.validation.group([self.username, self.password]);
		// 校验是否通过
		self.isValid = ko.computed(function() {
			return self.errors().length === 0;
		});
        // 登录函数
		self.login = function() {
			if (!self.isValid()) {
				self.errors.showAllMessages();
				return false;
			}

			var modelData = {
				username: self.username(), 
				password: self.password()
			};

			$.ajax({
				url: '/manage/adminlogin/loginpost',
				data: JSON.stringify(modelData)
			}).done(function(res) {
				switch (res.code) {
					case 1: 
						var redirectUrl = decodeURIComponent($.getParams()['redirectUrl']);
						if (redirectUrl == 'undefined') {
							window.location.href='/manage/adminpage/index';
						} else {
							window.location.href = redirectUrl; 
						}   
						break;
					default: 
						self.errMsg('用户名或者密码错误');
						break;
				}
			});
		};
	};

	var viewModel = new loginViewModel();
	ko.applyBindings(viewModel);

	var init = function() {
	};

	init();
});
