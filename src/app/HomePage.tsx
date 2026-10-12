import { Link } from 'react-router'
import { features } from '../features/registry.ts'

export function HomePage() {
  return (
    <div className="home">
      <h1 className="home__title">React Playground</h1>
      <p className="home__lead">
        React の API を 1 つずつ触って、挙動をログで確かめる場所です。
        各ページには StrictMode の切り替えと再マウントのボタンがあります。
      </p>

      <ul className="card-list">
        {features.map((feature) => (
          <li key={feature.slug}>
            <Link to={`/${feature.slug}`} className="card">
              <span className="card__title">{feature.title}</span>
              <span className="card__summary">{feature.summary}</span>
              <span className="card__cta">デモを開く →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
