import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import F2Chart from '../../f2/f2-chart'

export default class Index extends Component {

  componentWillMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  colChart = (chart) => {
    const data = [{
      year: '1951 年',
      sales: 38
    }, {
      year: '1952 年',
      sales: 52
    }, {
      year: '1956 年',
      sales: 61
    }, {
      year: '1957 年',
      sales: 145
    }, {
      year: '1958 年',
      sales: 48
    }, {
      year: '1959 年',
      sales: 38
    }, {
      year: '1960 年',
      sales: 38
    }, {
      year: '1962 年',
      sales: 38
    }];
    chart.source(data, {
      sales: {
        tickCount: 5
      }
    });
    chart.tooltip(false);
    chart.interval().position('year*sales');
    chart.render();
    // 绘制柱状图文本
    const offset = -5;
    const canvas = chart.get('canvas');
    const group = canvas.addGroup();
    const shapes = {};
    data.forEach(function (obj) {
      const point = chart.getPosition(obj);
      const text = group.addShape('text', {
        attrs: {
          x: point.x,
          y: point.y + offset,
          text: obj.sales,
          textAlign: 'center',
          textBaseline: 'bottom',
          fill: '#808080'
        }
      });

      shapes[obj.year] = text; // 缓存该 shape, 便于后续查找
    });

    chart.interaction('interval-select', {
      selectAxisStyle: {
        fill: '#000',
        fontWeight: 'bold'
      },
      mode: 'range',
      defaultSelected: {
        year: '1962 年',
        sales: 38
      },
      onEnd: function onEnd(ev) {
        console.info(ev.data) //获取点击data
      },
    });
    return chart
  }

  pieChart = (chart) => {

    var data = [{
      name: '芳华',
      percent: 0.4,
      a: '1'
    }, {
      name: '妖猫传',
      percent: 0.2,
      a: '1'
    }, {
      name: '机器之血',
      percent: 0.18,
      a: '1'
    }, {
      name: '心理罪',
      percent: 0.15,
      a: '1'
    }, {
      name: '寻梦环游记',
      percent: 0.05,
      a: '1'
    }, {
      name: '其他',
      percent: 0.12,
      a: '1'
    }];
    chart.source(data, {
      percent: {
        formatter: function formatter(val) {
          return val * 100 + '%';
        }
      }
    });
    chart.legend({
      position: 'right',
      marker: 'square'
    });
    chart.tooltip(false);
    chart.coord('polar', {
      transposed: true,
      radius: 0.85,
      innerRadius: 0.618
    });
    chart.axis(false);
    chart.interval().position('a*percent').color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0']).adjust('stack').style({
      lineWidth: 1,
      stroke: '#fff',
      lineJoin: 'round',
      lineCap: 'round'
    });
  
    chart.render();
  
    chart.interaction('pie-select', {
      animate: {
        duration: 300,
        easing: 'backOut'
      },
      defaultSelected: {
        name: '机器之血',
        percent: 0.18,
        a: '1'
      },
      onEnd: function onEnd(ev) {
         console.info(ev.data) //获取点击data
      }
    });
  }

  radarChart = (chart) => {

    const data = [{
      item: 'Design',
      user: '用户 A',
      score: 70
    }, {
      item: 'Design',
      user: '用户 B',
      score: 30
    }, {
      item: 'Development',
      user: '用户 A',
      score: 60
    }, {
      item: 'Development',
      user: '用户 B',
      score: 70
    }, {
      item: 'Marketing',
      user: '用户 A',
      score: 50
    }, {
      item: 'Marketing',
      user: '用户 B',
      score: 60
    }, {
      item: 'Users',
      user: '用户 A',
      score: 40
    }, {
      item: 'Users',
      user: '用户 B',
      score: 50
    }, {
      item: 'Test',
      user: '用户 A',
      score: 60
    }, {
      item: 'Test',
      user: '用户 B',
      score: 70
    }, {
      item: 'Language',
      user: '用户 A',
      score: 70
    }, {
      item: 'Language',
      user: '用户 B',
      score: 50
    }, {
      item: 'Technology',
      user: '用户 A',
      score: 70
    }, {
      item: 'Technology',
      user: '用户 B',
      score: 40
    }, {
      item: 'Support',
      user: '用户 A',
      score: 60
    }, {
      item: 'Support',
      user: '用户 B',
      score: 40
    }];


    chart.coord('polar');
    chart.source(data, {
      score: {
        min: 0,
        max: 120,
        nice: false,
        tickCount: 4
      }
    });
    chart.tooltip({
      custom: true, // 自定义 tooltip 内容框
      onChange: function onChange(obj) {
        const legend = chart.get('legendController').legends.top[0];
        const tooltipItems = obj.items;
        const legendItems = legend.items;
        const map = {};
        legendItems.forEach(function (item) {
          map[item.name] = _.clone(item);
        });
        tooltipItems.forEach(function (item) {
          const name = item.name;
          const value = item.value;
          if (map[name]) {
            map[name].value = value;
          }
        });
        legend.setItems(_.values(map));
      },
      onHide: function onHide() {
        const legend = chart.get('legendController').legends.top[0];
        legend.setItems(chart.getLegendItems().country);
      }
    });
    chart.axis('score', {
      label: function label(text, index, total) {
        if (index === total - 1) {
          return null;
        }
        return {
          top: true
        };
      },
      grid: {
        lineDash: null,
        type: 'arc' // 弧线网格
      }
    });
    chart.axis('item', {
      grid: {
        lineDash: null
      }
    });
    chart.line().position('item*score').color('user');
    chart.point().position('item*score').color('user')
      .style({
        stroke: '#fff',
        lineWidth: 1
      });
    chart.render();

  }

  render() {
    return (
      <View className='index'>
        <Text>f2 on taro</Text>
        <F2Chart chartId='col-chart' init={this.colChart} className='f2-chart' />
        <F2Chart init={this.pieChart} className='f2-chart' />
        <F2Chart init={this.radarChart} />
      </View>
    )
  }
}
