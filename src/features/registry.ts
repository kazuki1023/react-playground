import type { FeatureMeta } from './types.ts'
import { feature as useEffectFeature } from './useEffect/index.ts'

// 追加手順は ./_template/README.md にある。
// Why not import.meta.glob: 自動収集にすると戻り値の型が緩み、各 feature が FeatureMeta を
// 満たしているかの保証がビルド時に消える。1 行の追記で型と出所の明示性を買う。
export const features: FeatureMeta[] = [useEffectFeature]
