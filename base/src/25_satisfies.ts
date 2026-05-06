// satisfies演算子とは: 値が型の制約を満たすかチェックする演算子
// ※ true/false を返すのではなく、満たさなければ コンパイルエラー になる
//   特徴: 型注釈と違い、値の推論結果を保持したままチェックできる

// ===== 基本 =====
28 satisfies number // OK
'hello' satisfies string // OK
// "hello" satisfies number  // ❌ Error

// ===== 型注釈 (: 型) との違い =====
// satisfies の本領は「型注釈だと情報が消えるケース」で発揮される

// 【例1】 ユニオン型のうち、実際の型を保持したい
type Config = Record<'host' | 'port', string | number>

const config1: Config = { host: 'localhost', port: 8080 }
// config1.host.toUpperCase()  // ❌ string | number 扱いで呼べない

const config2 = { host: 'localhost', port: 8080 } satisfies Config
config2.host.toUpperCase() // ✅ string と推論される
config2.port.toFixed() // ✅ number と推論される

// 【例2】 キーのtypo・漏れを防ぐ
type ColorKey = 'red' | 'blue' | 'green'

const colors = {
  red: '#ff0000',
  blue: '#0000ff',
  green: '#00ff00',
  // yellow: "#ffff00",  // ❌ ColorKey に無いキーは弾ける
  // green を消すと          // ❌ green が足りない、と検出される
} satisfies Record<ColorKey, string>

// ※ この時点では colors.red の型は string(リテラルではない)
//   リテラル型まで保持したい場合は ↓ のように `as const` を併用する

// ===== as const + satisfies の組み合わせ =====
// 「リテラル型を保持しつつ、型制約もチェック」したい時の定番パターン

const routes = {
  home: '/',
  user: '/user',
  admin: '/admin',
} as const satisfies Record<string, string>

// 推論結果: { readonly home: "/"; readonly user: "/user"; readonly admin: "/admin" }
// routes.home の型 → "/"(リテラル型)

// --- 実装例: routes を使ってナビゲーション ---
function navigate(path: string) {
  console.log(`遷移先: ${path}`)
}

navigate(routes.home) // "遷移先: /"
navigate(routes.user) // "遷移先: /user"
// navigate(routes.shop)   // ❌ Error: 'shop' は存在しない

// リテラル型として保持されているので、派生型が作れる
type RoutePath = (typeof routes)[keyof typeof routes]
// → "/" | "/user" | "/admin"

function isAdminPath(path: RoutePath): boolean {
  return path === '/admin' // ✅ リテラル比較も型安全
}

// ===== 使い分けまとめ =====
// 型を満たすだけでよい                → 型注釈 ( : 型 )
// 型 + 推論結果(ユニオンの絞り込み等) → satisfies
// 型 + 推論結果 + リテラル型を保持    → as const satisfies

/* 解説
  役割の違い:
    - `as const`   → 値をリテラル型として固定する
    - `satisfies`  → 値が型の制約を満たすかチェックする
  両者を併用することで、
  「リテラル型を保ったまま、構造も型安全」な定数オブジェクトが作れる。
*/
