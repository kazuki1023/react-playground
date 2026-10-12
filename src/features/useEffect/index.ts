import type { FeatureMeta } from '../types.ts'
import { UseEffectDemo } from './UseEffectDemo.tsx'

export const feature: FeatureMeta = {
  slug: 'useEffect',
  title: 'useEffect',
  summary:
    'クリーンアップで完全に元へ戻せる副作用だけを置く。登録と解除が対になっているかをログで確かめる。',
  docsUrl: 'https://react.dev/reference/react/useEffect',
  Demo: UseEffectDemo,
}
