# tsconfig.json 設定まとめ

## 現在有効になっている設定(主要部分)

| 設定 | 値 | 役割 |
| --- | --- | --- |
| `target` | `es2016` | 出力JSのバージョン |
| `module` | `commonjs` | モジュール形式(Node.js標準) |
| `rootDir` | `./src` | ソースのルート |
| `outDir` | `./dist` | 出力先 |
| `resolveJsonModule` | `true` | .json を import 可能に |
| `esModuleInterop` | `true` | CJS を ESM 風に import 可能に |
| `forceConsistentCasingInFileNames` | `true` | ファイル名の大小文字を厳密化 |
| `strict` | `true` | 厳格な型チェックを一括ON |
| `noImplicitAny` | `true` | 暗黙の any を禁止 |
| `useUnknownInCatchVariables` | `true` | `catch(e)` の e を unknown に |
| `skipLibCheck` | `true` | .d.ts の型チェックをスキップ(高速化) |
| `noEmitOnError` | `true` | エラー時はファイルを出力しない |
| `include` | `["src/**/*"]` | コンパイル対象 |
| `exclude` | `["node_modules", "dist"]` | 除外対象 |

---

## カテゴリ別の概要

### Projects(プロジェクト関連)

複数プロジェクトの連携や増分ビルド用の設定群。`incremental` で差分コンパイル、`composite` でプロジェクト参照を使えるようにする。今回は未使用。

### Language and Environment(言語と実行環境)

- `target`: 出力JSのバージョン(`es2016` 採用)
- `lib`: 利用する型定義(DOM 等)を上書き指定
- `jsx`: React等のJSX変換方法
- `experimentalDecorators` / `emitDecoratorMetadata`: NestJSなどで必要

### Modules(モジュール)

- `module`: 出力モジュール形式(`commonjs` 採用)
- `moduleResolution`: モジュール解決方式(`node10`, `bundler` など)
- `baseUrl` / `paths`: import のエイリアス設定(`@/*` など)
- `resolveJsonModule`: .json の import 許可(有効)
- `types`: 自動で含める型パッケージ(`["node", "jest"]` など)

### JavaScript Support(JS対応)

- `allowJs`: .js もコンパイル対象に
- `checkJs`: .js も型チェック対象に

### Emit(出力)

- `outDir`: 出力先ディレクトリ(有効)
- `noEmitOnError`: エラー時は出力しない(有効)
- `declaration`: .d.ts 生成(ライブラリ作成時に必須)
- `sourceMap`: デバッグ用ソースマップ生成
- `noEmit`: 型チェックのみ実行(Babel等と併用時)
- `removeComments`: 出力からコメント削除

### Interop Constraints(相互運用性)

- `esModuleInterop`: CJS を ESM 風に import 可能に(有効・実質必須)
- `forceConsistentCasingInFileNames`: 大小文字の厳密化(有効)
- `isolatedModules`: 各ファイル単独でトランスパイル可能に(Babel/swc 併用時)
- `verbatimModuleSyntax`: type-only import の明示を強制

### Type Checking(型チェック)

`strict: true` を有効にすると、以下が一括でON:

- `noImplicitAny`: 暗黙の any を禁止
- `strictNullChecks`: null / undefined を別物として扱う
- `strictFunctionTypes`: 関数引数の型を厳密チェック
- `strictBindCallApply`: bind/call/apply の引数チェック
- `strictPropertyInitialization`: クラスプロパティの初期化漏れを検出
- `noImplicitThis`: this の暗黙 any を禁止
- `alwaysStrict`: 'use strict' を常に付与

追加で有効化を検討すると良い設定:

- `noUnusedLocals` / `noUnusedParameters`: 未使用変数・引数を検出
- `noImplicitReturns`: 戻り値の漏れを検出
- `noFallthroughCasesInSwitch`: switch の break 漏れを検出
- `noUncheckedIndexedAccess`: 配列アクセスに undefined を付与(より安全)
- `exactOptionalPropertyTypes`: `?` に undefined を含めない

### Completeness(完全性)

- `skipLibCheck`: .d.ts の型チェックをスキップ(有効・速度向上)

---

## 補足:今の設定の特徴

- **Node.js + TypeScript の標準的な構成**
- 厳格モード(`strict`)が有効で型安全性は高い
- `useUnknownInCatchVariables` も有効で catch の取り回しも安全寄り
- ライブラリ公開向けではない(`declaration` 等が無効)ので、アプリ開発向けの設定
- 追加で `noUnusedLocals` / `noFallthroughCasesInSwitch` などを足すと、より実務向きになる
