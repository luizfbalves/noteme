import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'

dayjs.extend(localizedFormat).locale('pt-br')

var timeot: any

export const dateRFC = dayjs().format('ddd, DD MMM YYYY HH:mm:ss ZZ')

export const dateLL = (date: string) => dayjs(new Date(date)).format('LL')

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const timeout = (ms: number, callback: () => void) => {
  if (timeot) {
    clearTimeout(timeot)
  }
  timeot = setTimeout(callback, ms)
}
