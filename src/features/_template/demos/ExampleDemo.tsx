import { useState } from 'react'
import { logStore } from '../../../shared/observability/logStore.ts'
import { HowTo } from '../../../shared/ui/HowTo.tsx'
import { Panel } from '../../../shared/ui/Panel.tsx'

const SOURCE = 'template'

export function ExampleDemo() {
  const [pressed, setPressed] = useState(0)

  // Why not useEffect: 「ユーザー操作の結果」はそのハンドラの中で直接やる。
  // effect が要る題材のときは features/useEffect/demos/ の 3 つを手本にする。
  const handlePress = () => {
    setPressed((current) => current + 1)
    logStore.add(SOURCE, 'event', 'ボタンを押した')
  }

  return (
    <Panel title="デモのタイトル" intent="このデモが見せる API の性質を 1 文で書く。">
      <dl className="readout">
        <div>
          <dt>押した回数</dt>
          <dd className="readout__strong">{pressed}</dd>
        </div>
      </dl>

      <div className="actions">
        <button type="button" className="button button--primary" onClick={handlePress}>
          押す
        </button>
      </div>

      <HowTo
        steps={[
          '読み手が迷わない粒度で操作を書く。',
          '右の実行ログで何を見るのかまで書く。',
        ]}
        expected={
          <p>
            画面に出ている値と文章が食い違っていないか必ず確かめる。
            「動き続けています」と書くなら、動き続けていることが画面で見えていること。
          </p>
        }
      />
    </Panel>
  )
}
