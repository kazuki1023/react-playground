import { Link, useLocation } from 'react-router'

export function NotFoundPage() {
  const location = useLocation()

  return (
    <div className="home">
      <h1 className="home__title">ページがありません</h1>
      <p className="home__lead">
        <code>{location.pathname}</code> に対応する機能はまだ登録されていません。
      </p>
      <p>
        <Link to="/" className="text-link">
          機能一覧に戻る
        </Link>
      </p>
    </div>
  )
}
