import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app/App.tsx'
import { isStrictModeEnabled } from './shared/observability/strictModeSetting.ts'

// Why not 常に StrictMode で包む: 二重実行する / しないを比べたいので、
// 計測パネルのトグル（sessionStorage）で切り替えられるようにしている。
const tree = <App />

createRoot(document.getElementById('root')!).render(
  isStrictModeEnabled() ? <StrictMode>{tree}</StrictMode> : tree,
)
