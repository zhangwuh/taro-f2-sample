# taro-f2-sample
taro集成f2图表的示例

支持h5 微信小程序

F2图表具体使用方法请参考: https://github.com/antvis/f2

> 直接克隆代码 可查阅示例

没有使用npm安装f2,直接引入dist文件:https://unpkg.com/@antv/f2@3.7.7/dist/f2-all.min.js

使用方式:

1.将src/f2拷贝到工程目录中
2.微信小程序需要在page的config文件中加入component引用:
```
  usingComponents: {
     "f2": "{path to f2}/f2-weapp/index",
   }
```   
3.在页面中使用F2Chart组件:
```
  <F2Chart chartId='col-chart' init={this.colChart} className='f2-chart' />

  chartId: canvas的id
  init: f2图表的初始化函数
  className: 应用到canvas上面的class
```

ps: 获取点击的图表数据请参见示例页面