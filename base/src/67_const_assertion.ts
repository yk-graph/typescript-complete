/* as const: 値をリテラル型 + readonly で固定する

  ① 変更してはいけない定数オブジェクト・配列
  ② 定数からユニオン型を自動生成したい時
  ③ satisfies と組み合わせて型安全な定数を作る時
  
  共通の動機: 「ハードコードした値を型として活用したい」
*/

// ===== ① 定数オブジェクト・設定値 =====
// 変更されてはいけない設定を固定する
const API_ENDPOINTS = {
  user: '/api/user',
  post: '/api/post',
} as const

// API_ENDPOINTS.user の型 → "/api/user"(string ではなくリテラル型)
// API_ENDPOINTS.user = "/other" // ❌ 変更不可

// ===== ② ユニオン型の自動生成 =====
// 定数からユニオン型を作ることで、定数と型を一元管理できる
const ROLES = ['admin', 'editor', 'viewer'] as const
type Role = (typeof ROLES)[number] // "admin" | "editor" | "viewer"

function authorize(role: Role) {
  // role は "admin" | "editor" | "viewer" のみ受け付ける
}
authorize('admin') // ✅
// authorize("guest") // ❌

// ===== ③ satisfies との組み合わせ =====
// 型チェック + リテラル型保持の定番パターン
const ROUTES = {
  home: '/',
  user: '/user',
} as const satisfies Record<string, string>

type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
// → "/" | "/user"
