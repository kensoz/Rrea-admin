import { describe } from 'vitest'
import { loginTest } from './items/login.unit'
import { formTest } from './items/form.unit'
import { nemberTest } from './items/nember.unit'
import { systemTest } from './items/system.unit'
import { layoutTest } from './items/layout.unit'
import { homepageTest } from './items/homepage.unit'
import { dialogPorpsTest } from './items/dialogPorps.unit'

// ----- 単体テスト -----
// フォームテスト
describe('フォームテスト', (): void => {
  formTest()
})

// メンバーテスト
describe('メンバーテスト', (): void => {
  nemberTest()
})

// システムテスト
describe('システムテスト', (): void => {
  systemTest()
})

// レイアウトテスト
describe('レイアウトテスト', (): void => {
  layoutTest()
})

// ログインテスト
describe('ログインテスト', (): void => {
  loginTest()
})

// ホームページテスト
describe('ホームページテスト', (): void => {
  homepageTest()
})

// ダイアログテスト
describe('ダイアログテスト', (): void => {
  dialogPorpsTest()
})
