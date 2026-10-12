import { version } from 'react'
import { Link, NavLink, Outlet } from 'react-router'
import reactLogo from '../assets/react.svg'
import { features } from '../features/registry.ts'

export function AppLayout() {
  return (
    <div className="layout">
      <header className="layout__header">
        <Link to="/" className="brand">
          <img src={reactLogo} className="brand__logo" alt="" width="24" height="24" />
          React Playground
        </Link>
        <span className="layout__version">react {version}</span>
      </header>

      <div className="layout__body">
        <nav className="nav" aria-label="機能一覧">
          <p className="nav__heading">機能</p>
          <ul className="nav__list">
            {features.map((feature) => (
              <li key={feature.slug}>
                <NavLink
                  to={`/${feature.slug}`}
                  className={({ isActive }) => (isActive ? 'nav__link nav__link--active' : 'nav__link')}
                >
                  {feature.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <main className="layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
