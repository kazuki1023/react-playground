import { AbortableFetchDemo } from './demos/AbortableFetchDemo.tsx'
import { IntervalCounterDemo } from './demos/IntervalCounterDemo.tsx'
import { PointerPositionDemo } from './demos/PointerPositionDemo.tsx'

export function UseEffectDemo() {
  return (
    <div className="demo-stack">
      <section className="lede">
        <h2 className="lede__title">useEffect の仕事</h2>
        <p>
          React の外にあるもの（DOM・タイマー・ネットワーク）を、コンポーネントが画面に居る間だけ
          繋いでおき、居なくなったら完全に切り離すことです。だから「繋ぐ」（setup）と
          「切る」（cleanup）は必ず対で動きます。
        </p>
        <p>
          <strong>このページの見方:</strong> 右の実行ログで setup と cleanup が対になっているかを
          見てください。対になっていれば、そのコンポーネントが消えたあとに影響が残りません。
          これが「useEffect に置いてよい処理」の条件です。逆に、消せない処理
          （送信済みのログなど）は useEffect に書くべきではありません。
        </p>
      </section>

      <PointerPositionDemo />
      <IntervalCounterDemo />
      <AbortableFetchDemo />
    </div>
  )
}
