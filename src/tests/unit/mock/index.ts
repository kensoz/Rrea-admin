// ----- mock data -----

export const users = {
  code: 10011,
  message: 'data取得成功',
  result: {
    count: [
      {
        count: 7,
        area: '全員',
        value: 0,
      },
      {
        count: 1,
        area: '本社',
        value: 1,
      },
      {
        count: 1,
        area: '支社',
        value: 2,
      },
      {
        count: 0,
        area: '食堂',
        value: 3,
      },
      {
        count: 2,
        area: '外勤',
        value: 4,
      },
      {
        count: 3,
        area: '未知',
        value: 5,
      },
    ],
    user: [
      {
        id: '00005',
        name: 'Tom',
        nameSpell: 'Tom',
        nameCode: '11',
        job: 'BE開発',
        jobCode: '4',
        race: 'オーク',
        raceCode: '4',
        skill: 'Node.js',
        photo: '-',
        area: '本社',
        areaCode: '1',
        YYYYMMDD: '2022-07-13',
        HHMMss: '19:07:06',
      },
    ],
  },
}

export const auth = {
  code: 10000,
  message: '管理者情報取得成功',
  result: [
    {
      id: 'guest',
      permission: 2,
      time: '2022-07-13 16:28:54',
      token: '',
    },
  ],
}

export const form = {
  code: 10011,
  message: '取得成功',
  result: [
    {
      value: 'value',
      text: 'text',
    },
  ],
}

export const nember = {
  code: 10011,
  message: '取得成功',
  result: [
    {
      id: '00001',
      name: 'Jack',
      nameSpell: 'Jack',
      nameCode: '11',
      job: 'インフラ',
      jobCode: '2',
      race: '人類',
      raceCode: '1',
      skill: 'aws運用',
      photo: '1',
    },
    {
      id: '00002',
      name: '田中',
      nameSpell: 'タナカ',
      nameCode: '4',
      job: 'FE開発',
      jobCode: '3',
      race: '人類',
      raceCode: '1',
      skill: 'Svelte.js',
      photo: '1',
    },
  ],
}

export const login = {
  code: 10001,
  message: 'ログイン成功しました',
  result: {
    id: 'guest',
    passWord: '*****',
    permission: 2,
    time: '2022-07-14 11:32:55',
    token: '',
  },
}
