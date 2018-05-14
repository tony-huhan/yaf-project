$('document').ready(function() {
	$('.box-body').css("min-height", $(window).height() - 240); 

	var listPlatformViewModel = function() {
		var self = this;
		// 页码
		self.pageNo = ko.observable(1);	
		// 数量
		self.pageSize = ko.observable(10);
		// 排序
		self.order = ko.observable({platformid: -1});
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
            listPlatform();
        };  
		// 总数
		self.total = ko.observable(0);
		// 搜索关键字
        self.searchString = ko.observable('');
        self.searchField = ko.observableArray(['name', 'email', 'mobile']);
        // 搜索
        self.searchClick = function() {
            $('thead th i').show();
            listPlatform();
        };
		// 商家列表
		self.platformList = ko.observableArray([]);
		// 商家id列表
		self.platformidList = ko.observableArray([]);
		// 显示时间
        self.showTime = function(time) {
            return $.timeChange(time, 'timestamp', 'Y-m-d H:i:s');
        };
		// 表格当前操作的商家
        self.opItem = ko.observable('');
        // 昵称
		self.setNickname = ko.observable('').extend({
			required: {
				params: true, 
				message: '昵称不能为空'
			}, 
			minLength: {
				params: 2, 
				message: '昵称最少为两个字符'
			}, 
			maxLength: {
				params: 50, 
				message: '昵称最多为50个字符'
			}, 
			editable: true
		});
		// 邮箱
		self.setEmail = ko.observable('').extend({
			required: {
                params: true,
                message: '邮箱不能为空'
            },  
            email: {
                params: true,
                message: "邮箱格式错误"
            }, 
            editable: true
		});
		// 密码
		self.setPassword = ko.observable('').extend({
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
			}, 
			editable: true
		});
		// 手机号
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
		// 备注
		self.setNote = ko.observable('').extend({
			maxLength: {
				params: 500, 
				message: '备注最多为500个字符'
			}, 
			editable: true
		});
		// 校验错误信息
		self.setErrors = ko.validation.group([self.name, self.email, self.password, self.mobile, self.note]);
		// 校验是否通过
		self.setIsValid = ko.computed(function() {
			return self.setErrors().length === 0;
		}); 
		// 修改点击
		self.setClick = function() {
			self.opItem(this);
			self.setNickname(this.name);
			self.setNickname.beginEdit();
			self.setEmail(this.email);
			self.setEmail.beginEdit();
			self.setPassword.beginEdit();
			self.setMobile(this.mobile);
			self.setMobile.beginEdit();
			self.setNote(this.note);
			self.setNote.beginEdit();
		};
		// 重置
		self.setInit = function() {
            self.setNickname.commit();
            self.setNickname('');
            self.setNickname.isModified(false);
            self.setEmail.commit();
            self.setEmail('');
            self.setEmail.isModified(false);
            self.setPassword.commit();
            self.setPassword('');
            self.setPassword.isModified(false);
            self.setMobile.commit();
            self.setMobile('');
            self.setMobile.isModified(false);
           	self.setNote.commit();
           	self.setNote('');
           	self.setNote.isModified(false); 
		};
		self.set = function() {
			if (!self.setIsValid()) {
				self.errors.showAllMessages();
				return false;	
			}

			var modelData = {};
			if (self.setNickname.hasChanges()) {
				modelData.name = self.setNickname();	
			}				
			if (self.setEmail.hasChanges()) {
				modelData.email = self.setEmail();
			}
			if (self.setPassword.hasChanges()) {
				modelData.password = self.setPassword();
			}
			if (self.setMobile.hasChanges()) {
				modelData.mobile = self.setMobile();
			}
			if (self.setNote.hasChanges()) {
				modelData.note = self.setNote();
			}

			if ($.isEmpty(modelData)) {
                return false;
            }
            modelData.platformid = self.opItem().platformid;

			var message = '编辑商家成功!';
            var type = 'tip-tb-black';
            $.ajax({
                url: '/manage/platform/setpost',
                data: JSON.stringify(modelData)
            }).done(function(res) {
                switch (res.code) {
                    case 1:
                    	self.setInit();
                    	listPlatform();
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
                        message = '编辑商家失败!'
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
        // 删除点击
        self.delClick = function() {
        	self.opItem(this);
        };
		// 删除
		self.del = function() {
			var modelData = {
				platformid: self.opItem().platformid
			};

			var message = '删除商家成功!';
            var type = 'tip-tb-black';
            $.ajax({
                url: '/manage/platform/delpost',
                data: JSON.stringify(modelData)
            }).done(function(res) {
                switch (res.code) {
                    case 1:
                    	listPlatform();
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
                        message = '删除商家失败!'
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

            if (self.opIds().length != self.platformidList().length) {
                return 0;
            }   

            if (self.opIds().toString() == self.platformidList().toString()) {
                return 1;
            }   
            return 0;
        }); 
        // 全选点击
        self.selectAll = function() {
            if (self.opAll() == 0) {
                self.opIds(self.platformidList().concat());
            } else {
                self.opIds([]);
            }
        };
        // 批量删除
        self.dels = function() {
        	var modelData = {
        		platformidList: self.opIds()
        	};

        	var message = '批量删除商家成功!';
            var type = 'tip-tb-black';
            $.ajax({
                url: '/manage/platform/delspost',
                data: JSON.stringify(modelData)
            }).done(function(res) {
                switch (res.code) {
                    case 1:
                    	listPlatform();
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
                        message = '批量删除商家失败!'
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

	var listPlatform = function() {
		var modelData = {
			pageNo: viewModel.pageNo(), 
			pageSize: viewModel.pageSize(), 
			order: viewModel.order()
		};

		if (viewModel.searchString() != '') {
            modelData.searchField = viewModel.searchField();
            modelData.searchValue = viewModel.searchString().split(' ');
        }

		$.ajax({
			url: '/manage/platform/listpost',
			data: JSON.stringify(modelData)
		}).done(function(res) {
			switch (res.code) {
				case 1:
					var platformList = new Array();
					var platformidList = new Array();
					var i = 0;
					$.each(res.platformList, function(index, data) {
						platformidList[i] = data.platformid;
						platformList[i] = data;
						i++;
					});
					platformidList.sort(function(a, b) {
                        return a - b;
                    }); 
					viewModel.platformList(platformList);
					viewModel.platformidList(platformidList);
					viewModel.total(res.total);
					// 修复搜索bug, 搜索时可能页数过大
                    if (viewModel.total() < viewModel.pageSize() * (viewModel.pageNo() - 1)) {
                        viewModel.pageNo(1);
                    }
					$.pagination(viewModel.pageNo(), viewModel.pageSize(), viewModel.total(), 5, $('.pagination'));
					break;
				case 911: 
					var redirectUrl = window.location.href;
					window.location.href = res.url + '?redirectUrl=' + encodeURIComponent(redirectUrl);
					break;
				case 2000:
					viewModel.platformList([]);
					viewModel.platformidList([]);
					viewModel.total(0);
					$.pagination(viewModel.pageNo(), viewModel.pageSize(), viewModel.total(), 5, $('.pagination'));
					break;
				default:
			}   
		});	
	};

	var viewModel = new listPlatformViewModel();
	ko.applyBindings(viewModel);

	var init = function() {
		listPlatform();
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

        listPlatform();
    }); 

    $('#search').on('blur', function() {
        if (viewModel.searchString() == '') {
            $('thead th i').show();
            viewModel.pageNo(1);
            viewModel.order({'platformid': -1})
            listPlatform();
        }
    });

    head.load(
        '/static/manage/bootstrap/notify/bootstrap-notify.min.js?v=1'
    );
});
