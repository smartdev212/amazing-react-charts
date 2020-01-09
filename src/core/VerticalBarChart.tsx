import * as React from 'react'
import ReactEcharts from 'echarts-for-react'
import {
    IDefaultChartProps,
    TDataTooltip,
    TEntryData,
    TOptionsProps,
    TSaveAsImage,
    TTitleProps,
    TTooltipProps,
    TZoomProps
} from './types'
import {
    formatTime,
    formatTooltip,
    getDataView,
    getSaveAsImage,
    timeConvert,
    toDate,
    truncateLabel
} from './auxiliarFunctions'

const VerticalBarChart = (props: IDefaultChartProps) => {
    const {
        data,
        color,
        xType,
        yComplement,
        yType,
        tooltip: tooltipProps,
        tooltipComplement,
        barWidth,
        dateFormat,
        grid: gridProps,
        width,
        showBarLabel,
        title: titleProps,
        toolboxTooltip
    } = props

    const yData = data.map((item: TEntryData) => item.result)
    const xData = xType === 'time'
        ? data.map((item: TEntryData) => toDate(item.label, dateFormat))
        : data.map((item: TEntryData) => item.label)

    const formatLabel = (chartValues: TDataTooltip) => {
        const { data } = chartValues

        return (yComplement
            ? data + yComplement
            : yType === 'time'
                ? timeConvert(Number(data))
                : data
        )
    }

    const title: TTitleProps = {
        id: 'chart-' + titleProps,
        left: '5.9%',
        show: titleProps !== undefined,
        text: titleProps,
        textAlign: 'left',
        textStyle: {
            fontFamily: 'roboto',
            fontSize: 16,
            fontWeight: 400
        }
    }

    const toolbox = toolboxTooltip && (
        {
            showTitle: false,
            right: '8.7%',
            feature: {
                saveAsImage: toolboxTooltip.saveAsImage && (
                    getSaveAsImage(toolboxTooltip.saveAsImage) as TSaveAsImage
                ),
                dataView: toolboxTooltip.dataView && (
                    getDataView(toolboxTooltip.dataView)
                )
            },
            tooltip: {
                show: true,
                backgroundColor: 'grey',
                textStyle: {
                    fontSize: 12
                }
            }
        }
    )

    const formatSingleTooltip = (chartValues: TDataTooltip[]) => {
        const { label, result } = tooltipProps
        const { axisValueLabel, data } = chartValues[0]
        const complement = tooltipComplement ? tooltipComplement : ''
        const values = yType === 'time'
            ? timeConvert(data as number) + 'h'
            : data + (yComplement || '')

        const labelPrint = xType === 'time'
            ? formatTooltip(axisValueLabel)
            : axisValueLabel

        return [
            `${label}: ${labelPrint} <br>` +
            `${result}: ${values} <br>` +
            complement
        ]
    }

    const tooltip: TTooltipProps = {
        formatter: formatSingleTooltip,
        trigger: 'axis',
        textStyle: { fontSize: 11.5 }
    }

    const scrollable: TZoomProps[] = data.length > 14
        ? [
            {
                type: 'inside',
                endValue: xData.length > 14 ? xData[13] : xData[xData.length - 1]
            }, {
                show: true,
                type: 'slider',
                endValue: xData.length > 14 ? xData[13] : xData[xData.length - 1]
            }
        ]
        : []

    const options: TOptionsProps = {
        grid: gridProps,
        color: [color],
        series: [{
            barWidth: barWidth || 'auto',
            type: 'bar',
            data: yData,
            label: {
                formatter: formatLabel,
                show: showBarLabel,
                position: 'top',
                fontSize: 11.5,
                color: 'black',
                distance: 1.1
            }
        }],
        xAxis: {
            type: 'category',
            boundaryGap: true,
            showGrid: true,
            data: xData,
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dotted',
                    opacity: 0.8
                },
                alignWithLabel: true
            },
            axisLabel: {
                formatter:
                    (item: string) => xType === 'time'
                        ? formatTime(item, 'dd MMM')
                        : truncateLabel(item),
                interval: 'auto',
                textStyle: {
                    fontSize: 11.5
                }
            },
            axisTick: {
                show: true,
                alignWithLabel: true
            }
        },
        yAxis: {
            max: yComplement === '%' && 100,
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dotted',
                    opacity: 0.8
                }
            },
            axisLabel: {
                formatter:
                    (item: number) => yType === 'time'
                        ? timeConvert(item) + 'h'
                        : item + (yComplement || ''),
                textStyle: {
                    fontSize: 11.5
                }
            }
        },
        dataZoom: scrollable,
        title,
        toolbox
    }

    return (
        <ReactEcharts
            notMerge
            style={ { width: '99%' } }
            opts={ { width: width } }
            option={
                tooltipProps
                    ? { ...options, tooltip }
                    : options
            }
        />
    )
}

export default VerticalBarChart
