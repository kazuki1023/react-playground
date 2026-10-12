import { useEffect, useState } from 'react'
import { logStore } from '../../../shared/observability/logStore.ts'
import { HowTo } from '../../../shared/ui/HowTo.tsx'
import { Panel } from '../../../shared/ui/Panel.tsx'

const SOURCE = 'interval'

// Why not count と paused を別の useState に: 別々にすると paused が依存配列に入り、
// 一時停止のたびにタイマーを捨てて張り直すことになる。state を 1 つにまとめると、
// 最新値を受け渡すための useRef も依存配列も要らなくなる。
type State = {
  ticks: number
  count: number
  paused: boolean
}

export function IntervalCounterDemo() {
  const [state, setState] = useState<State>({ ticks: 0, count: 0, paused: false })

  useEffect(() => {
    logStore.add(SOURCE, 'setup', 'setInterval を張った（1 秒ごと）')
    const timer = setInterval(() => {
      setState((previous) => ({
        ...previous,
        ticks: previous.ticks + 1,
        count: previous.paused ? previous.count : previous.count + 1,
      }))
    }, 1000)

    return () => {
      clearInterval(timer)
      logStore.add(SOURCE, 'cleanup', 'clearInterval でタイマーを捨てた')
    }
  }, [])

  return (
    <Panel
      title="タイマー"
      intent="依存配列は「いつ繋ぎ直すか」の指定で、「いつ処理を走らせるか」の指定ではない。"
    >
      <dl className="readout">
        <div>
          <dt>setInterval の発火回数</dt>
          <dd className="readout__strong">{state.ticks}</dd>
        </div>
        <div>
          <dt>カウント</dt>
          <dd className="readout__strong">{state.count}</dd>
        </div>
        <div>
          <dt>カウントの加算</dt>
          <dd>{state.paused ? '停止中' : '進行中'}</dd>
        </div>
      </dl>

      <div className="actions">
        <button
          type="button"
          className="button button--primary"
          onClick={() => setState((current) => ({ ...current, paused: !current.paused }))}
        >
          {state.paused ? 'カウントを再開する' : 'カウントを止める'}
        </button>
        <button
          type="button"
          className="button button--outline"
          onClick={() => setState((current) => ({ ...current, count: 0 }))}
        >
          カウントを 0 に戻す
        </button>
      </div>

      <HowTo
        steps={[
          '2 つの数が 1 秒ごとに揃って増えるのを見る。',
          '「カウントを止める」を押して、10 秒ほど待つ。',
          '2 つの数を見比べて、右の実行ログも見る。',
          '「再マウント」を押して、もう一度ログを見る。',
        ]}
        expected={
          <>
            <p>
              カウントを止めても <strong>setInterval の発火回数は増え続けます</strong>。
              タイマーは張られたままで、止まったのは「カウントを増やすかどうか」という
              React 内部の判断だけです。だから実行ログに cleanup は出ません。
            </p>
            <p>
              cleanup と setup が出るのは「再マウント」を押したときだけです。繋ぎ直しが起きるのは
              コンポーネントが作り直されたときであって、state が変わったときではありません。
              StrictMode が有効なら、再マウント 1 回につき setup → cleanup → setup の 3 行が出ます。
            </p>
            <p>
              もし <code>paused</code> を依存配列に入れると、止めるたびに cleanup と setup が出ます。
              動きはしますが、それは依存配列をロジックの制御に使っている状態です。
            </p>
          </>
        }
      />
    </Panel>
  )
}
