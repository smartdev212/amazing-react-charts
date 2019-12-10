---
name: Readme
route: /
layout: 'fullpage'
---

<h1 align="center">NAME</h1>

<div align="center">

[React](http://facebook.github.io/react/) UI toolkit for the web.

[![npm package](https://img.shields.io/npm/v/flipper-ui/latest.svg)](https://www.npmjs.com/package/flipper-ui)
[![npm downloads](https://img.shields.io/npm/dm/flipper-ui.svg)](https://www.npmjs.com/package/flipper-ui)
[![Dependencies](https://img.shields.io/david/nginformatica/flipper-ui.svg?style=flat-square)](https://david-dm.org/nginformatica/flipper-ui)

</div>

A simple library to handling and create awesome canvas charts. 
This package is based on echarts and echarts-for-react wrapper.

## Installation

Name is avaliable as an npm package.

```
    // with npm 
    npm install --save name 


    //with yarn 
    yarn add
```

## Usage

Here is a quick example to get you started, **it's all you need**:

```ts
import VerticalBarChart from 'name'

<VerticalBarChart
    color='green'
    xType='time'
    barWidth={ 100 }
    yComplement='%'
    tooltip={{ 
        label: 'Axis x tooltip label', 
        result: 'Axis y tooltip label' 
    }}
    data={[
        { label: 'value 1', result: 50 },
        { label: 'value 2', result: 21 },
        { label: 'value 3', result: 84 },
        { label: 'value 4', result: 79 }, 
    ]} 
/>

```
## Demo

To run the demo:

```sh
git clone git@github.com:name

yarn && yarn start
```

## Components

- [x] AreaChart
- [x] HorizontalBarChart
- [x] StackedBarChart
- [x] VerticalBarChart

## Next Components

- [ ] PieChart
- [ ] ClusteredBarChart
- [ ] RadarChart

## Documentation

Check out our [documentation website](https://nginformatica.github.io/flipper-ui/).
  
## Contributing

Bug reports, feature requests and other contributions are more than welcome! <br/>
Whenever possible, please make a pull request with the implementation instead of just requesting it.

> If the feature is big, open an issue first for discussion.

The descriptions of the props used on this package are found in: https://echarts.apache.org/en/option.html

## License

This project is licensed under the terms of the
[MIT license](/LICENSE).