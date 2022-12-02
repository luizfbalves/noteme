import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
// import 'dayjs/locale/pt-br'

dayjs.extend(localizedFormat).locale('en-us')

let timeot: any

export const dateRFC = dayjs().format()

export const dateLL = (date: string) => dayjs(date).format('LL')

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))