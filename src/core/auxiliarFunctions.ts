import { formatToBRL } from 'brazilian-values'
import { format, parse } from 'date-fns'
import { takeLast } from 'ramda'
import { ptBR } from 'date-fns/locale'
import { TDataTooltip, TDomainValues } from './types'

export const takeComplement = (data: string | number, complement: string) =>
    complement === 'money'
        ? ': ' + formatToBRL(data) + '<br>'
        : ': ' + data + complement + '<br>'

export const moneyPercent = (
    value: number,
    valueTotal: number,
    sumDataValues?: boolean
) => {
    const percent = value !== 0 ? (value * (100 / valueTotal)).toFixed(2) : 0

    return sumDataValues
        ? formatToBRL(value) + ' (' + percent + '%) <br>'
        : formatToBRL(value) + '<br>'
}

export const mountMessage = (
    value: TDataTooltip,
    complement: string,
    axisType: string,
    stackedValues: number,
    sumDataValues: boolean
) =>
    complement === 'money' && value.seriesType !== 'line'
        ? value.marker + value.seriesName + ': ' + (
            moneyPercent(value.data as number, stackedValues, sumDataValues)
        )
        : axisType === 'percent'
            ? value.marker + value.seriesName + ': ' + value.data + '% <br>'
            : value.marker + value.seriesName + (
                takeComplement(value.data, complement)
            )

export const toDate = (text: string, format?: string) =>
    parse(text, format ? format : 'yyyy-MM-dd', new Date())

export const formatTime = (text: string, dateFormat: string) =>
    format(new Date(text), dateFormat, { locale: ptBR })

export const formatTooltip = (text: string, dateFormat?: string) =>
    format(
        new Date(text),
        dateFormat ? 'MMMM yyyy' : 'dd/MM/yyyy',
        { locale: ptBR }
    )

export const timeConvert = (value: number) => {
    const seconds = Math.round((value % 1) * 3600)
    const minutes = Math.trunc(seconds / 60)
    const formatedMinutes = takeLast(2, '0' + minutes)

    return minutes > 0
        ? Math.floor(value) + ':' + formatedMinutes
        : Math.floor(value) + ':00'
}

export const truncateText = (text: string, listSize?: number) => {
    const wordSize = listSize && listSize > 10 ? 8 : 12

    return text.length > wordSize ? text.slice(0, wordSize - 3) + '...' : text
}

export const truncateLabel = (text: string) =>
    text.length > 8 ? text.slice(0, 5) + '...' : text

export const getDomain = (item: TDomainValues) => {
    switch (true) {
        case (item.max >= 2500):
            return (item.max + (item.max * 20) / 100)
        case (item.max >= 2000):
            return (item.max + (400 - (item.max % 400)))
        case (item.max >= 1500):
            return (item.max + (300 - (item.max % 300)))
        case (item.max >= 1000):
            return (item.max + (200 - (item.max % 200)))
        case (item.max >= 400):
            return (item.max + (100 - (item.max % 100)))
        case (item.max >= 95):
            return (item.max + (60 - (item.max % 60)))
        case (item.max >= 50):
            return (item.max + (50 - (item.max % 50)))
        case (item.max >= 50):
            return (item.max + (40 - (item.max % 40)))
        case (item.max >= 40):
            return (item.max + (30 - (item.max % 30)))
        case (item.max >= 30):
            return (item.max + (20 - (item.max % 20)))
        case (item.max >= 20):
            return (item.max + (10 - (item.max % 10)))
        case (item.max >= 2):
            return (item.max + (5 - (item.max % 5)))
        default:
            return (item.max + (3 - (item.max % 3)))
    }
}

export const fixedDomain = (item: TDomainValues) =>
    item.max >= 90 ? 100 : getDomain(item)