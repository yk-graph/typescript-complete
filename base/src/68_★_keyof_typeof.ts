// ===== typeof: 値から型を取り出す =====
const user = { id: 1, name: 'Alice', age: 30 }

type User = typeof user
// → { id: number; name: string; age: number }

// 使いどころ: 型を別途定義しなくても、値から型を作れる
function greet(u: typeof user) {
  console.log(u.name)
}

// ===== keyof: 型のキーをユニオン型で取り出す =====
type UserKeys = keyof User
// → "id" | "name" | "age"

// 使いどころ: 「このオブジェクトのキーだけ受け付ける」関数
function getProperty(obj: User, key: keyof User) {
  return obj[key]
}
getProperty(user, 'name') // ✅
// getProperty(user, "email") // ❌ キーが存在しない

// ===== keyof typeof: 値のキーをユニオン型で取り出す =====
// typeof で型を取り出し → keyof でキーを取り出す

const COLORS = {
  red: '#ff0000',
  blue: '#0000ff',
  green: '#00ff00',
} as const

type Color = typeof COLORS
// → { red: string; blue: string; green: string }

type ColorKeyOf = keyof Color
// → "red" | "blue" | "green"

type ColorKey = keyof typeof COLORS
// → "red" | "blue" | "green"

function getColor(key: ColorKey) {
  return COLORS[key]
}
getColor('red') // ✅ "#ff0000"
// getColor("yellow") // ❌

// ===== 実践: 定数からキーと値の型を同時に作る =====
const STATUS = {
  pending: '処理中',
  success: '成功',
  error: '失敗',
} as const

type Status = typeof STATUS
// → { pending: "処理中"; success: "成功"; error: "失敗" }

type StatusKeyOf = keyof Status
// → "pending" | "success" | "error"

type StatusKey = keyof typeof STATUS
// → "pending" | "success" | "error"

type StatusValue = (typeof STATUS)[keyof typeof STATUS]
// → "処理中" | "成功" | "失敗"

/* 結論
  typeof         → 値から型を生成。型の再定義を省ける
  keyof          → 型のキーをユニオン型に。「このキーだけ受け付ける」関数に使う
  keyof typeof   → 値のキーをユニオン型に。as const との組み合わせが定番
*/
