import { useEffect, useState } from 'react'
import { logStore } from '../../../shared/observability/logStore.ts'
import { HowTo } from '../../../shared/ui/HowTo.tsx'
import { Panel } from '../../../shared/ui/Panel.tsx'

const SOURCE = 'pointer'

type Moves = {
  count: number
  x: number
  y: number
}

export function PointerPositionDemo() {
  const [tracking, setTracking] = useState(false)
  const [moves, setMoves] = useState<Moves | null>(null)

  useEffect(() => {
    if (!tracking) {
      return
    }

    const handlePointerMove = (event: PointerEvent) => {
      setMoves((previous) => ({
        count: (previous?.count ?? 0) + 1,
        x: event.clientX,
        y: event.clientY,
      }))
    }

    logStore.add(SOURCE, 'setup', 'window の pointermove を購読した')
    window.addEventListener('pointermove', handlePointerMove)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      logStore.add(SOURCE, 'cleanup', 'window の pointermove を解除した')
    }
  }, [tracking])

  return (
    <Panel
      title="DOM イベントの購読"
      intent="繋ぐ（setup）と切る（cleanup）が対で動き、やめたあとに影響が残らないこと。"
    >
      <dl className="readout">
        <div>
          <dt>購読の状態</dt>
          <dd>{tracking ? '購読中' : '停止中'}</dd>
        </div>
        <div>
          <dt>受け取った pointermove</dt>
          <dd className="readout__strong">{moves?.count ?? 0}</dd>
        </div>
        <div>
          <dt>最後のポインタ位置</dt>
          <dd>{moves === null ? '未取得' : `x: ${moves.x} / y: ${moves.y}`}</dd>
        </div>
      </dl>

      <div className="actions">
        <button
          type="button"
          className="button button--primary"
          onClick={() => setTracking((current) => !current)}
        >
          {tracking ? '購読を停止する' : '購読を開始する'}
        </button>
      </div>

      <HowTo
        steps={[
          '「購読を開始する」を押して、マウスを少し動かす。',
          '「購読を停止する」を押して、もう一度マウスを動かす。',
          '右の実行ログで setup と cleanup の並びを見る。',
          'ページを読み込み直して、いちばん下に並ぶログと見比べる。',
        ]}
        expected={
          <>
            <p>
              停止したあとは、マウスを動かしても <strong>受け取った数が増えません</strong>。
              これが cleanup で <code>removeEventListener</code> が実行された証拠です。
              useEffect に置いてよいのは、このように影響を完全に消せる処理だけです。
            </p>
            <p>
              購読の開始と停止では、StrictMode が有効でも setup と cleanup は
              <strong>1 回ずつしか出ません</strong>。StrictMode の二重実行が起きるのは
              マウントのときだけで、依存配列（ここでは購読の ON / OFF）が変わって
              張り直されるときには起きないからです。
            </p>
            <p>
              二重実行を見たいときは、ページを読み込み直したときのタイマーとデータ取得のログを
              見てください。setup のあとに cleanup が挟まり、もう一度 setup が出ています。
              React が開発時に「捨てて作り直しても壊れないか」をわざと試しています。
            </p>
          </>
        }
      />
    </Panel>
  )
}
