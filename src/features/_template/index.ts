import type { FeatureMeta } from '../types.ts'
import { TemplateDemo } from './TemplateDemo.tsx'

// TODO(複製したら): slug / title / summary / docsUrl を対象の API に合わせて書き換える。
export const feature: FeatureMeta = {
  slug: '_template',
  title: 'テンプレート',
  summary: 'このページで何を確かめるのかを 1 行で書く。一覧とページ冒頭に出る。',
  docsUrl: 'https://react.dev/reference/react',
  Demo: TemplateDemo,
}
