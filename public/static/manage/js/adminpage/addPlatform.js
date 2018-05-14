$('document').ready(function() {
	// 配置验证
	ko.validation.init({
		errorElementClass: 'has-error',
		insertMessages: true
	}); 

	var addPlatformViewModel = function() {
		var self = this;
		// 姓名
		self.name = ko.observable('').extend({
			required: {
				params: true, 
				message: '姓名不能为空'
			}, 
			minLength: {
				params: 2, 
				message: '姓名最少为两个字符'
			}, 
			maxLength: {
				params: 50, 
				message: '姓名最多为50个字符'
			}
		});
		// 邮箱
		self.email = ko.observable('').extend({
			required: {
                params: true,
                message: '邮箱不能为空'
            },  
            email: {
                params: true,
                message: "邮箱格式错误"
            }
		});
		// 密码
		self.password = ko.observable('').extend({
			required: {
				params: true, 
				message: '密码不能为空'
			}, 
			minLength: {
				params: 6, 
				message: '密码最少为6个字符'
			}, 
			maxLength: {
				params: 15, 
				message: '密码最多为15个字符'
			}
		});
		// 手机号
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
				params: 500, 
				message: '备注最多为500个字符'
			}
		});
		// 校验错误信息
		self.errors = ko.validation.group([self.name, self.email, self.password, self.mobile, self.note]);
		// 校验是否通过
		self.isValid = ko.computed(function() {
			return self.errors().length === 0;
		}); 
		// 初始化
		self.init = function() {
			self.name('');
			self.name.isModified(false);
			self.email('');
			self.email.isModified(false);
			self.password('');
			self.password.isModified(false);	
			self.mobile('');
			self.mobile.isModified(false);
			self.note('');
			self.note.isModified(false);
		};
		// 添加平台账号
		self.add = function() {
			if (!self.isValid()) {
				self.errors.showAllMessages();
				return false;
			}

			var modelData = {
				name: self.name(), 
				email: self.email(), 
				password: self.password(), 
				mobile: self.mobile(), 
				note: self.note()
			};

			var message = '添加平台账号成功!';
            var type = 'tip-tb-black';
             $.ajax({
                url: '/manage/platform/addpost',
                data: JSON.stringify(modelData)
            }).done(function(res) {
                switch (res.code) {
                    case 1:
                    	self.init();
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
                        message = '添加平台账号失败!'
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
	};	

	var viewModel = new addPlatformViewModel();
	ko.applyBindings(viewModel);

	var init = function() {

	};

	init();

	head.load(
        '/static/manage/bootstrap/notify/bootstrap-notify.min.js?v=1'
    );
})
