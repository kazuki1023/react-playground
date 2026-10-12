# feature テンプレート

新しい React API のページを足すときの雛形。`src/features/` の中に置いてあるので、
`tsc -b` と `oxlint` が常にこのテンプレートにも掛かる。`FeatureMeta` の形を変えたら
テンプレートもビルドで壊れるので、雛形が静かに腐らない。

`registry.ts` には登録していないため、画面には出ないしバンドルにも入らない。

## 使い方

1. ディレクトリを複製して、API 名に合わせた名前にする。

   ```sh
   cp -r src/features/_template src/features/useTransition
   ```

2. 複製先で `Template` を API 名（PascalCase）に、`_template` を slug に置き換える。
   ファイル名と中身の両方が対象。

   - `TemplateDemo.tsx` → `UseTransitionDemo.tsx`
   - `index.ts` の `slug` / `title` / `summary` / `docsUrl`

3. `src/features/registry.ts` に 1 行足す。**ここを忘れるとページは生えない。**

   ```ts
   import { feature as useTransitionFeature } from './useTransition/index.ts'

   export const features: FeatureMeta[] = [useEffectFeature, useTransitionFeature]
   ```

4. この README を消して、`notes.md` に判断を書き始める。

## 置き場所の約束

- デモ 1 つ = `demos/` の 1 ファイル。1 ファイルに複数の実験を詰めない。
- 各デモの説明は `HowTo`（確かめ方 / 見えるはずのこと）で書く。地の文を 1 段落置くより、
  読み手が手を動かせる。
- ページ冒頭に `lede` を置いて「この API の仕事は何か」を 2〜3 文で書く。
  これが無いと、個々のデモが何の話か分からなくなる。
- **画面に出ている値と文章が食い違っていないか必ず確かめる。**
  「動き続けています」と書くなら、動き続けていることが画面で見えていること。
- ログは `logStore.add()` で書く。ストアが React の外にあるので、effect から書いても
  デモ自身は再レンダーされない。
- StrictMode の切り替えと再マウントは `DemoHarness` が持っている。各デモで作らない。
- 着色したボタンは 1 パネルに 1 つまで。副次操作は `button--outline` にする。
