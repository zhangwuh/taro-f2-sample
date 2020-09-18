import React, { Component } from 'react'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import _isEqual from 'lodash/isEqual.js'
import * as F2 from './f2-all.min'
import './f2-chart.scss'

function randomId(len) {
    var len = len || 10;
    var str = '';
    var i = 0;

    for (i = 0; i < len; i++) {
        switch (Math.floor(Math.random() * 3 + 1)) {
            case 1: // digit
                str += (Math.floor(Math.random() * 9)).toString();
                break;

            case 2: // small letter
                str += String.fromCharCode(Math.floor(Math.random() * 26) + 97); //'a'.charCodeAt(0));
                break;

            case 3: // big letter
                str += String.fromCharCode(Math.floor(Math.random() * 26) + 65); //'A'.charCodeAt(0));
                break;

            default:
                break;
        }
    }
    return str;
}

export default class F2Chart extends Component {

    static propTypes = {
        init: PropTypes.func,
        chartId: PropTypes.string,
        className: PropTypes.string,
    }

    static defaultProps = {
        className: 'default-chart',
    };

    constructor(props) {
        super(props)
        this.chartId = props.chartId
        if (!this.chartId) {
            this.chartId = randomId()
        }
    }

    componentDidMount() {
        if (process.env.TARO_ENV == 'h5') {
            this.h5Init();
        }
    }

    shouldComponentUpdate(nextProps) {
        return !_isEqual(this.props, nextProps)
    }

    h5Init = () => {
        this.chart = new F2.Chart({
            id: this.chartId,
            pixelRatio: window.devicePixelRatio,
        });
        this.canvas = this.chart.get('canvas')
        this.props.init(this.chart)
        return this.chart;
    }

weInit = (config) => {
    this.chart = new F2.Chart(config);
    this.props.init(this.chart);
    return this.chart
}

render() {
    const { className } = this.props
    return (
        {
            'h5': <canvas className={className} id={this.chartId} />,
            'weapp': <View class={className} ><f2 conf={{ init: this.weInit }} /></View>
        }[process.env.TARO_ENV]
    )
}
}
