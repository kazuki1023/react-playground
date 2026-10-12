import type { ReactNode } from 'react'

type Props = {
  title: string
  intent: string
  children: ReactNode
}

export function Panel({ title, intent, children }: Props) {
  return (
    <section className="panel">
      <header className="panel__head">
        <h2 className="panel__title">{title}</h2>
        <p className="panel__intent">{intent}</p>
      </header>
      <div className="panel__body">{children}</div>
    </section>
  )
}
