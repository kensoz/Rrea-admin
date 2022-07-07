// ####################
//
// types
//
// ####################

// ----- common -----
export interface ICommonRespon<T = string> {
  code: number
  message: string
  result: T
}

// ----- store (admin) -----
export interface IAuth {
  id: string
  passWord?: string
  permission: number
  time: string
  token?: string
}

// login
export interface IAuthParam {
  id: string
  passWord: string
}

// ----- api -----
// form
export interface IFormSchema {
  value: string
  text: string
}

// formdata
export interface IFormData {
  job: IFormSchema[]
  name: IFormSchema[]
  race: IFormSchema[]
}

// staff
export interface IUserSchema {
  id: string
  name: string
  nameSpell: string
  nameCode: string
  job: string
  jobCode: string
  race: string
  raceCode: string
  skill: string
  photo: string
}

// data
export interface IDataCounts {
  count: number
  area: string
  value: number
}

export interface IDataSchema {
  id: string
  name: string
  nameSpell: string
  nameCode: string
  job: string
  jobCode: string
  race: string
  raceCode: string
  skill: string
  photo: string
  area: string
  areaCode: string
  YYYYMMDD: string
  HHMMss: string
}

export interface IDataBodyRespon {
  count: IDataCounts[]
  user: IDataSchema[]
}

// ----- chart -----
export interface IPieChartData {
  area: string
  data: number
  bgColor: string
  hoverbgColor: string
}

interface IPieDataSets {
  borderWidth: number
  borderColor: string
  data: number[]
  backgroundColor: string[]
  hoverBackgroundColor: string[]
}

export interface IPieChartDataSets {
  datasets: IPieDataSets[]
}

interface IBarDataSets {
  label: string
  backgroundColor: string
  data: number[]
}

export interface IBarChartDataSets {
  labels: string[]
  datasets: IBarDataSets[]
}

interface ILineDataSets {
  label: string
  borderColor: string
  data: number[]
  tension: number
  borderWidth: number
}

export interface ILineChartDataSets {
  labels: string[]
  datasets: ILineDataSets[]
}

// ----- data -----
export interface IData {
  id: number
  text: string
  msg?: string
  icon: string
  color?: string
  link: string
}
