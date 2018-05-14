$('document').ready(function() {
	// 配置验证
	ko.validation.init({
		errorElementClass: 'has-error',
		insertMessages: true
	}); 

	var addCooperationViewModel = function() {
		var self = this;
		// 企业名称
		self.name = ko.observable('').extend({
			required: {
				params: true, 
				message: '企业名称不能为空'
			}, 
			minLength: {
				params: 1, 
				message: '企业名称最少为1个字符'
			}, 
			maxLength: {
				params: 50, 
				message: '企业名称最多为50个字符'
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
		self.contact = ko.observable('').extend({
			required: {
				params: true, 
				message: '联系人不能为空'
			}, 
			minLength: {
				params: 1, 
				message: '联系人最少为1个字符'
			}, 
			maxLength: {
				params: 50, 
				message: '联系人最多为50个字符'
			}
		});
		// 手机号
		self.contactTel = ko.observable('').extend({
			required: {
                params: true, 
                message: '联系电话不能为空'
            },  
            pattern: {
                params: /(^(\d{2,4}[-]?)?\d{3,8}([-]?\d{3,8})?([-]?\d{1,7})?$)|(^1(3|4|5|7|8)\d{9}$)/, 
                message: '联系电话格式错误'
            }   
		});
		// 备注
		self.licence = ko.observable('').extend({
			required: {
				params: true, 
				message: '营业执照不能为空!'
			}
		});
		self.delImg = function(data, event) {
            self.img('');
        };
        // 显示产品图片
        self.showImg = function(img) {
        	if (img) {
        	    return 'http://' + jsParam.cdn + '/' + img;
        	}
        };

		// 校验错误信息
		self.errors = ko.validation.group([self.name, self.email, self.password, self.contact, self.contactTel, self.licence]);
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
			self.contact('');
			self.contact.isModified(false);
			self.contactTel('');
			self.contactTel.isModified(false);
			self.licence('');
			self.licence.isModified(false);
		};
		// 添加企业
		self.add = function() {
			if (!self.isValid()) {
				self.errors.showAllMessages();
				return false;
			}

			var modelData = {
				name: self.name(), 
				email: self.email(), 
				password: self.password(), 
				contact: self.contact(), 
				contactTel: self.contactTel(), 
				licence: self.licence()
			};

			var message = '添加企业成功!';
            var type = 'tip-tb-black';
             $.ajax({
                url: '/manage/cooperation/addpost',
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
                        message = '添加企业失败!'
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

	var viewModel = new addCooperationViewModel();
	ko.applyBindings(viewModel);

	var init = function() {

	};

	init();

	head.load(
		'/static/manage/qiniu/plupload.full.min.js', 
		'/static/manage/qiniu/qiniu.min.js', 
		function() {
			uploaderLicence = Qiniu.uploader({
				runtimes: 'html5,flash,html4',
				browse_button: 'addLicence',
				uptoken_url: 'uptokenUrl',
				uptoken: jsParam.upToken, 
				unique_names: false,
				save_key: false,
				domain: jsParam.bucket,
				container: 'container',
				max_file_size: '8mb',
				flash_swf_url: '../qiniu/js/Moxie.swf',
				max_retries: 3,
				dragdrop: true,
				multiple_queues: false,
				drop_element: 'container',
				chunk_size: '4mb',
				auto_start: false,
				init: {
					'FilesAdded': function(up, files) {
						uploaderLicence.start();
					},
					'BeforeUpload': function(up, file) {
                    // 每个文件上传前,处理相关的事情
                },
                'UploadProgress': function(up, file) {
                    // 每个文件上传时,处理相关的事情
                },
                'FileUploaded': function(up, file, info) {
                	var res = jQuery.parseJSON(info);
                	var key = res.key;
                	viewModel.img(key);
                },
                'Error': function(up, err, errTip) {
            	    //上传出错时,处理相关的事情
            	},
            	'UploadComplete': function() {
            	    //队列文件处理完毕后,处理相关的事情
            	},
            	'Key': function(up, file) {
            	        // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
            	        // 该配置必须要在 unique_names: false , save_key: false 时才生效
            	        var key = "";
            	        key = jsParam.prefix + 'applepay_' + (new Date()).valueOf();
            	        // do something with key here
            	        return key;
            	    }
            	}
        	});
		}
	);


	head.load(
        '/static/manage/bootstrap/notify/bootstrap-notify.min.js?v=1'
    );
})
