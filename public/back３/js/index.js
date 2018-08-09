$(function(){
  var echarts_1 = echarts.init(document.querySelector(".echarts_1"));
  var option1 = {
    title: {
      text: '2018年注册人数'
    },
    tooltip: {
      //trigger: "axis"
    },
    legend: {
      data:['人数']
    },

    xAxis: {
      data: ["1月","2月","3月","4月","5月","6月"]
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [1500, 2000, 1800, 1200, 1400, 2500]
    }]
  };
  echarts_1.setOption(option1);
  var echarts_2 = echarts.init(document.querySelector(".echarts_2"));

  // 指定图表的配置项和数据
  var option2 = {
    // 大标题
    title : {
      text: '热门品牌销售',
      // 副标题问题
      subtext: '2017年6月',
      // 让整个标题居中
      x:'center'
    },
    // 提示框组件
    tooltip : {
      trigger: 'item',
      // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // 图例
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪','新百伦','李宁','阿迪王']
    },
    series : [
      {
        name: '品牌',
        type: 'pie',
        // 配置直径
        radius : '55%',
        // 配置圆心的位置
        center: ['50%', '60%'],
        data:[
          {value:335, name:'耐克'},
          {value:310, name:'阿迪'},
          {value:234, name:'新百伦'},
          {value:135, name:'李宁'},
          {value:1548, name:'阿迪王'}
        ],
        // 添加阴影效果
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts_2.setOption(option2);
})