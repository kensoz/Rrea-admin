import { describe } from 'vitest'
import { loginTest } from './login.unit'
import { formTest } from './form.unit'
import { nemberTest } from './nember.unit'
import { systemTest } from './system.unit'
import { layoutTest } from './layout.unit'
import { homepageTest } from './homepage.unit'
import { dialogPorpsTest } from './dialogPorps.unit'

// ----- 単体テスト -----
// axiosテストについて → vitest issues#284: https://github.com/vitest-dev/vitest/issues/284

// ----- テスト -----
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

// 管理者ダイアログ
describe('管理者ダイアログ', (): void => {
  dialogPorpsTest()
})
