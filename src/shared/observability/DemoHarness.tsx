import { useState, type ReactNode } from 'react'
import { logStore } from './logStore.ts'
import { LogPanel } from './LogPanel.tsx'
import { isStrictModeEnabled, setStrictModeEnabled } from './strictModeSetting.ts'

type Props = {
  children: ReactNode
}

export function DemoHarness({ children }: Props) {
  const [generation, setGeneration] = useState(0)
  const strict = isStrictModeEnabled()

  const handleRemount = () => {
    logStore.add('harness', 'marker', 'デモを再マウントした')
    setGeneration((current) => current + 1)
  }

  return (
    <div className="harness">
      <div className="harness__main">
        {/* Why not key を children に直接: ラッパーに key を付けることで、
            デモ側のコードに再マウントの仕掛けを漏らさずに済む。 */}
        <div key={generation} className="harness__stage">
          {children}
        </div>
      </div>

      <aside className="harness__rail" aria-label="計測パネル">
        <section className="controls">
          <h2 className="controls__title">デモの条件</h2>

          <label className="switch">
            <input
              type="checkbox"
              checked={strict}
              onChange={(event) => setStrictModeEnabled(event.target.checked)}
            />
            <span className="switch__label">
              StrictMode
              <span className="switch__hint">
                開発時の二重実行を再現する。切り替えるとページを読み込み直すので、ログは消えます。
              </span>
            </span>
          </label>

          <button type="button" className="button button--outline" onClick={handleRemount}>
            再マウント
          </button>
          <p className="controls__hint">
            デモを捨てて作り直します。cleanup が走るところを見たいときに使います。
          </p>
        </section>

        <LogPanel />
      </aside>
    </div>
  )
}
