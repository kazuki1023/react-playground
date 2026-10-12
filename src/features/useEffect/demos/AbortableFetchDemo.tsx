import { useEffect, useState } from 'react'
import { demoUserIds, fetchDemoUser, type DemoUser } from '../../../shared/api/fakeUserApi.ts'
import { logStore } from '../../../shared/observability/logStore.ts'
import { HowTo } from '../../../shared/ui/HowTo.tsx'
import { Panel } from '../../../shared/ui/Panel.tsx'

const SOURCE = 'fetch'

type Outcome = { status: 'done'; user: DemoUser } | { status: 'error'; message: string }

export function AbortableFetchDemo() {
  const [userId, setUserId] = useState(demoUserIds[0])
  const [received, setReceived] = useState<{ forId: number; outcome: Outcome } | null>(null)

  // Why not status を useState に持つ: 要求中の id と結果の id を比べれば「読み込み中か」は
  // レンダー中に導出できる。effect の中で setStatus('loading') すると、取得と無関係な
  // 再レンダーが 1 回増える。
  const outcome = received?.forId === userId ? received.outcome : null

  useEffect(() => {
    const controller = new AbortController()
    logStore.add(SOURCE, 'setup', `id=${userId} の取得を開始した`)

    fetchDemoUser(userId, controller.signal)
      .then((user) => {
        setReceived({ forId: userId, outcome: { status: 'done', user } })
        logStore.add(SOURCE, 'event', `id=${user.id} を受け取った`)
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return
        }
        setReceived({
          forId: userId,
          outcome: { status: 'error', message: String(error) },
        })
        logStore.add(SOURCE, 'event', `id=${userId} の取得に失敗した`)
      })

    return () => {
      controller.abort()
      logStore.add(SOURCE, 'cleanup', `id=${userId} の取得を abort() した`)
    }
  }, [userId])

  return (
    <Panel
      title="データ取得"
      intent="cleanup は後片付けだけでなく、進行中の作業の取り消しも担うこと。"
    >
      <fieldset className="choice">
        <legend className="choice__legend">取得するユーザー</legend>
        {demoUserIds.map((id) => (
          <label key={id} className="choice__item">
            <input
              type="radio"
              name="demo-user-id"
              value={id}
              checked={userId === id}
              onChange={() => setUserId(id)}
            />
            <span>id = {id}</span>
          </label>
        ))}
      </fieldset>

      <dl className="readout">
        <div>
          <dt>状態</dt>
          <dd>
            {outcome === null && '読み込み中（1.2 秒かかります）'}
            {outcome?.status === 'done' && '取得完了'}
            {outcome?.status === 'error' && '取得に失敗'}
          </dd>
        </div>
        <div>
          <dt>結果</dt>
          <dd>
            {outcome === null && '未取得'}
            {outcome?.status === 'done' && `${outcome.user.name}（${outcome.user.role}）`}
            {outcome?.status === 'error' && outcome.message}
          </dd>
        </div>
      </dl>

      <HowTo
        steps={[
          'id を 2 に切り替えて、1.2 秒待って結果が出るのを見る。',
          'id を 3 に切り替え、読み込み中（1.2 秒以内）にすぐ id を 1 に切り替える。',
          '右の実行ログで、id=3 の cleanup がどこで出たかを見る。',
        ]}
        expected={
          <>
            <p>
              id を切り替えた瞬間に、古い取得の cleanup で <code>abort()</code> が呼ばれます。
              <strong>id=3 の結果はもう画面に出ません。</strong>
              cleanup が無ければ、遅れて返ってきた id=3 の結果が id=1 の結果を上書きします。
            </p>
            <p>
              つまり cleanup の役目は「登録を外す」だけではなく、
              「もう要らなくなった作業を打ち切る」ことでもあります。
            </p>
          </>
        }
      />

      <p className="note">
        データ取得は useEffect の本来の用途ではありません。いずれ <code>use</code> フックに
        移すまでの過渡的な書き方として置いています。
      </p>
    </Panel>
  )
}
