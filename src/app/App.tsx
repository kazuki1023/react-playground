import { BrowserRouter, Route, Routes } from 'react-router'
import { features } from '../features/registry.ts'
import './app.css'
import { AppLayout } from './AppLayout.tsx'
import { DemoPage } from './DemoPage.tsx'
import { HomePage } from './HomePage.tsx'
import { NotFoundPage } from './NotFoundPage.tsx'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          {features.map((feature) => (
            <Route
              key={feature.slug}
              path={feature.slug}
              element={<DemoPage feature={feature} />}
            />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
