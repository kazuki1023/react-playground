const KEY = 'react-playground:strict-mode'

export function isStrictModeEnabled() {
  return sessionStorage.getItem(KEY) !== 'off'
}

// Why not React の state でトグルする: StrictMode の二重実行は、StrictMode がルートにある
// 状態で初回マウントしたときしか効かない（実測）。コンポーネントの中でトグルすると、
// ページを開いた直後だけ二重実行されず、表示と動作が食い違う。設定を sessionStorage に
// 逃がして、ルートごと作り直す。
export function setStrictModeEnabled(enabled: boolean) {
  sessionStorage.setItem(KEY, enabled ? 'on' : 'off')
  location.reload()
}
