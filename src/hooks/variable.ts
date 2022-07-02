// ####################
//
// variables hooks
//
// ####################
import type { IFormSchema, IUserSchema, IPieChartData } from '../types'

export default function useVariables() {
  // formデフォルト
  const formPrototype: IFormSchema = {
    text: '',
    value: '',
  }

  // nemberデフォルト
  const nembersPrototype: IUserSchema = {
    id: '',
    name: '',
    nameSpell: '',
    nameCode: '',
    job: '',
    jobCode: '',
    race: '',
    raceCode: '',
    skill: '',
    photo: '',
  }

  // chartデフォルト
  const piePrototype: IPieChartData[] = [
    { area: '本社', data: 0, bgColor: '#bbdefb', hoverbgColor: '#64b5f6' },
    { area: '支社', data: 0, bgColor: '#c8e6c9', hoverbgColor: '#81c784' },
    { area: '食堂', data: 0, bgColor: '#fff9c4', hoverbgColor: '#fff176' },
    { area: '外勤', data: 0, bgColor: '#f8bbd0', hoverbgColor: '#f06292' },
    { area: '未知', data: 0, bgColor: '#f5f5f5', hoverbgColor: '#e0e0e0' },
  ]

  // 日本語化
  // https://www.primefaces.org/primevue/locale
  const locale = {
    dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
    dayNamesShort: ['日曜', '月曜', '火曜', '水曜', '木曜', '金曜', '土曜'],
    dayNamesMin: ['日', '月', '火', '水', '木', '金', '土'],
    monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    today: '今日',
    weekHeader: '週間',
    accept: '決定',
    reject: '取消',
  }

  return { formPrototype, nembersPrototype, piePrototype, locale }
}
