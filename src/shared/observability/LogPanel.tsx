import { useSyncExternalStore } from 'react'
import { logStore } from './logStore.ts'

export function LogPanel() {
  const entries = useSyncExternalStore(logStore.subscribe, logStore.getEntries)

  return (
    <section className="log-panel" aria-label="実行ログ">
      <div className="log-panel__head">
        <h2 className="log-panel__title">実行ログ</h2>
        <span className="log-panel__count">{entries.length} 件</span>
        <button
          type="button"
          className="button button--quiet"
          onClick={() => logStore.clear()}
          disabled={entries.length === 0}
        >
          クリア
        </button>
      </div>

      {entries.length === 0 ? (
        <p className="log-panel__empty">
          まだログはありません。デモを操作すると、setup と cleanup が新しい順に並びます。
        </p>
      ) : (
        <ol className="log-panel__list">
          {entries.map((entry) => (
            <li key={entry.id} className="log-entry">
              <div className="log-entry__meta">
                <time className="log-entry__time">{entry.time}</time>
                <span className={`log-entry__kind log-entry__kind--${entry.kind}`}>
                  {entry.kind}
                </span>
                <span className="log-entry__source">{entry.source}</span>
              </div>
              <p className="log-entry__message">{entry.message}</p>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
