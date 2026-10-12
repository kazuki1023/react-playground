import type { ReactNode } from 'react'

type Props = {
  steps: string[]
  expected: ReactNode
}

export function HowTo({ steps, expected }: Props) {
  return (
    <div className="howto">
      <div>
        <h3 className="howto__label">確かめ方</h3>
        <ol className="howto__steps">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
      <div>
        <h3 className="howto__label">見えるはずのこと</h3>
        <div className="howto__expected">{expected}</div>
      </div>
    </div>
  )
}
