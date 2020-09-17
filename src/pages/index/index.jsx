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

    let lastTextShape; // 上一个被选中的 text
    // 配置柱状图点击交互
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
        const data1 = ev.data,
          selected = ev.selected;

        lastTextShape && lastTextShape.attr({
          fill: '#808080',
          fontWeight: 'normal'
        });
        if (selected) {
          const textShape = shapes[data1.year];
          textShape.attr({
            fill: '#000',
            fontWeight: 'bold'
          });
          lastTextShape = textShape;
        }
        canvas.draw();
      }
    });
    return chart
  }

  pieChart = (chart) => {
    const data = [{
      const: 'const',
      type: '交通出行',
      money: 51.39
    }, {
      const: 'const',
      type: '饮食',
      money: 356.68
    }, {
      const: 'const',
      type: '生活日用',
      money: 20.00
    }, {
      const: 'const',
      type: '住房缴费',
      money: 116.53
    }];
    chart.source(data);
    chart.coord('polar', {
      transposed: true,
      radius: 0.9,
      innerRadius: 0.5
    });
    chart.axis(false);
    chart.legend(false);
    chart.tooltip(false);
    chart.interval()
      .position('const*money')
      .adjust('stack')
      .color('type', [ '#1890FF', '#13C2C2', '#2FC25B', '#FACC14' ]);
    chart.pieLabel({
      sidePadding: 30,
      activeShape: true,
      label1: function label1(data1) {
        return {
          text: '￥' + data1.money,
          fill: '#343434',
          fontWeight: 'bold'
        };
      },
      label2: function label2(data1) {
        return {
          text: data1.type,
          fill: '#999'
        };
      },
      onClick: this.clk,
    });
    chart.render();
    
  }

  clk = (e) => {
    console.info(`click colunm chart:${e[0].year} ${e[0].sales}`)
  }

  render() {
    return (
      <View className='index'>
        <Text>f2 on taro</Text>
        <F2Chart  chartId='col-chart' onClick={this.clk}  init={this.colChart} className='f2-chart' />
        <F2Chart  init={this.pieChart} />
      </View>
    )
  }
}
