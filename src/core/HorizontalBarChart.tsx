import * as React from 'react'
import ReactEcharts from 'echarts-for-react'
import {
    IDefaultChartProps,
    TDataTooltip,
    TEntryData,
    TOptionsProps,
    TTooltipProps
} from './types'
import { truncateText } from './auxiliarFunctions'

interface IProps extends IDefaultChartProps {
    xComplement?: string
}

const HorizontalBarChart = (props: IProps) => {
    const { data, color, xComplement, tooltip: tooltipProps } = props
    const xData = data.map((item: TEntryData) => item.result)
    const yData = data.map((item: TEntryData) => item.label)
    const backgroundBar = data.map(() => 100)

    const formatTooltip = (chartValues: TDataTooltip) => {
        const { label, result } = tooltipProps
        const { name, data } = chartValues
        const value = xComplement ? data + xComplement : data

        return [
            `${label}: ${name} <br>` +
            `${result}: ${value} <br>`
        ]
    }

    const tooltip: TTooltipProps = {
        formatter: formatTooltip,
        textStyle: { fontSize: 11.5 }
    }

    const options: TOptionsProps = {
        series: [
            {
                barGap: '-100%',
                xAxisIndex: 0,
                type: 'bar',
                animation: false,
                barWidth: 12,
                silent: true,
                data: backgroundBar,
                itemStyle: {
                    normal: {
                        color: '#C1C1C1',
                        barBorderRadius: 10,
                        borderColor: props.color
                    }
                }
            },
            {
                xAxisIndex: 0,
                data: xData,
                type: 'bar',
                barWidth: 12,
                itemStyle: {
                    normal: {
                        color: color,
                        barBorderRadius: 10
                    }
                },
                label: {
                    formatter: xComplement ? `{c}${xComplement}` : '{c}',
                    position: 'insideRight',
                    fontSize: 11,
                    fontWeight: 400,
                    color: 'black',
                    show: true
                }
            }
        ],
        xAxis: {
            type: 'value',
            data: xData,
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            showGrid: false,
            splitLine: {
                show: false
            }
        },
        yAxis: {
            data: yData,
            type: 'category',
            axisLine: {
                show: false
            },
            axisLabel: {
                formatter: truncateText,
                interval: 0
            },
            axisTick: {
                show: false
            },
            showGrid: false,
            splitLine: {
                show: false
            }
        }
    }

    return (
        <ReactEcharts
            option={
                tooltipProps
                    ? { ...options, tooltip }
                    : options
            }
        />
    )
}

export default HorizontalBarChart
