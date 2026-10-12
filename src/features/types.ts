import type { ComponentType } from 'react'

export type FeatureMeta = {
  slug: string
  title: string
  summary: string
  docsUrl: string
  Demo: ComponentType
}
