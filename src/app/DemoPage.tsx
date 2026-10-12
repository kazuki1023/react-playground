import type { FeatureMeta } from '../features/types.ts'
import { DemoHarness } from '../shared/observability/DemoHarness.tsx'

type Props = {
  feature: FeatureMeta
}

export function DemoPage({ feature }: Props) {
  const { title, summary, docsUrl, Demo } = feature

  return (
    <article className="demo-page">
      <header className="demo-page__head">
        <h1 className="demo-page__title">
          <code>{title}</code>
        </h1>
        <p className="demo-page__summary">{summary}</p>
        <a className="text-link" href={docsUrl} target="_blank" rel="noreferrer">
          react.dev のドキュメント ↗
        </a>
      </header>

      <DemoHarness>
        <Demo />
      </DemoHarness>
    </article>
  )
}
