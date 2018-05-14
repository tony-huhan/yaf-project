$('document').ready(function() {
	$.extend({
        getParams: function() {
            var aQuery = window.location.href.split("?");
            var aGet = new Array();
            if (aQuery.length > 1)  
            {   
                var aParam = aQuery[1].split("&");
                for (var i = 0, aParamLength = aParam.length; i < aParamLength; i++)
                {   
                    var aTemp = aParam[i].split("=");
                    aGet[aTemp[0]] = aTemp[1];
                }   
            }   
            return aGet;    
        }, 
		isEmpty: function(obj) {
			for (var name in obj) {
				return false;
			}
			return true;
		},
		/**
    	 * pageNo 页码
    	 * pageSize 每页几个
    	 * total 总的数目
    	 * pageShow 分页的框显示几个
    	 * obj 当前加入对象
    	 */
		pagination: function(pageNo, pageSize, total, pageShow, obj) {
			obj.children('li').remove();
			var pageSum = Math.ceil(total/pageSize);
			if (pageSum < 1 || pageShow < 1) {
				return false;
			}

			var start = pageNo - (Math.ceil(pageShow / 2) - 1);

			if (pageShow < pageSum) {
				if (start < 1) { 
					start = 1;
				} else if (start + pageShow > pageSum) {
					start = pageSum - pageShow + 1;
				}
			} else {
				start = 1;
			}

			var end = start + pageShow -1;

			if (end > pageSum) {
				end = pageSum;
			}

			var str = '<li class="first" data-bind="click: pageClick"><a href="javascript:">‹</a></li><li class="prev" data-bind="click: pageClick"><a href="javascript:;">«</a></li>';
			for (var i = start; i <= end; i++) {
				if (i == pageNo) {
					str += '<li class="active" data-bind="click: pageClick"><a href="javascript:;">'+ i +'</a></li>';
				} else {
					str += '<li data-bind="click: pageClick"><a href="javascript:;">'+ i +'</a></li>';
				}
			}
			str += '<li class="next" data-bind="click: pageClick"><a href="javascript:;">»</a></li><li class="last" data-bind="click: pageClick"><a href="javascript:;">›</a></li>';

			obj.append(str);
		}, 
		timeChange: function(source, inFormat, outFormat) {
			var checkTime = function(time) {
				if(time < 10) {
					time = "0" + time;
				};
				return time;	
			}; 
            switch(inFormat) {
                case 'Y-m-d H:i:s':
                var reg =  /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
                source = source.match(reg);
                source = new Date(source[1], source[3]-1, source[4], source[5], source[6], source[7]);
                break;
                case 'Y-m-d':
                var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
                source = source.match(reg);
                source = new Date(source[1], source[3]-1, source[4]);
                break;
                case 'timestamp':
                source = new Date(parseInt(source)*1000);
                break;
            };
            switch(outFormat) {
            	case 'Y-m-d H:i:s':
                return source.getFullYear() + '-'
                + checkTime(source.getMonth()+1)
                + '-'
                + checkTime(source.getDate())
                + ' '
                + checkTime(source.getHours())
                + ':'
                + checkTime(source.getMinutes())
                + ':'
                + checkTime(source.getSeconds());
                break;
                case 'Y-m-d':
                return source.getFullYear() + '-'
                + checkTime(source.getMonth()+1)
                + '-'
                + checkTime(source.getDate());
                break;
                case 'Y.m.d':
                return source.getFullYear() + '.'
                + checkTime(source.getMonth()+1)
                + '.'
                + checkTime(source.getDate());
                break;
                case 'timestamp':
                return parseInt(source.getTime()/1000);
                break;
                case 'newDate':
                return source;
                break;
            }; 
        }, 
        createChart: function(id, categories, seriesData, chartLegend) {
            if (arguments.length == 6) {
                seriesDataTwo = arguments[4];
                chartLegendTwo = arguments[5];
            } else {
                seriesDataTwo = '';
                chartLegendTwo = '';
            }

            c = Math.ceil(categories.length/7);
            if (seriesDataTwo=='') {
                var series = [{
                    name: chartLegend,
                    data: seriesData,
                    color: '#44B549',
                    lineWidth: 2,
                    marker: {
                        enabled: true,
                        radius: 5,
                        lineWidth: 3,
                        lineColor: '#fff'
                    }
                }];
            } else {
                var series = [{
                    name: chartLegend,
                    data: seriesData,
                    color: '#44B549',
                    lineWidth: 2,
                    marker: {
                        enabled: true,
                        radius: 5,
                        lineWidth: 3,
                        lineColor: '#fff'
                    }
                }, 
                {
                    name: chartLegendTwo,
                    data: seriesDataTwo,
                    color: '#4A90E2',
                    lineWidth: 2,
                    marker: {
                        enabled: true,
                        radius: 5,
                        lineWidth: 3,
                        lineColor: '#fff'
                    }
                }];
            }

            $('#'+id).highcharts({
                title: '',
                subtitle: '',
                credits:{
                    enabled:false
                },
                exporting:{
                    enabled:false
                },
                colors: ['#44B549'],
                dataFormat: 1,
                plotOptions: {
                    series: {
                        fillColor: "rgba(135, 179, 212, 0.05)"
                    },
                    legend: {
                        enabled : false
                    }
                },
                xAxis: {
                    categories: categories,
                    labels:{
                        formatter: function() {
                            return this.value;
                        },
                        style: {
                            color: '#8D8D8D'
                        },
                        step : c
                    },
                    title: {
                        style: {
                            color: '#7eafdd'
                        }
                    },
                    tickmarkPlacement: 'on',
                    lineColor: "#C6C6C6",
                    lineWidth: 2
                },
                yAxis: { // Secondary yAxis
                    title: '',
                    labels: {
                        formatter: function() {
                            return this.value > 0 ? this.value : "";
                        },
                        style: {
                            color: '#8D8D8D',
                            fontFamily:'Microsoft yahei'
                        }
                    },
                    gridLineColor:"#F2F3F4",
                    allowDecimals:false,
                    min: 0
                },
                tooltip: {                
                    borderColor: '#3C3C3C',
                    backgroundColor: '#525254',
                    style: {
                        color: '#FFFFFF'
                    },
                    crosshairs: {
                        color: '#4A90E2',
                        dashStyle: 'shortdot'
                    },
                    pointFormat:'<span> {series.name}: <b>{point.y}</b><br/>'
                },
                legend: {
                    borderWidth: 0,
                    itemStyle : {
                        color: '#000000',
                        fontFamily: 'Microsoft YaHei',
                        fontSize: '14px',
                        fontWeight: 'normal'
                    },
                    verticalAlign: 'bottom',
                    maxHeight: 57 
                },
                series: series
            });
            
            $('.highcharts-tooltip').children('text').find('tspan').remove();
        }, 
	});

	$.ajaxSetup({
        type: 'post', 
        dataType: 'json',
        contentType: 'application/json; charset=utf-8'
    });   

    // 左侧栏高亮显示
   	$('.sidebar ul li').removeClass('active');
   	$('.' + bodyId).addClass('active');
});
