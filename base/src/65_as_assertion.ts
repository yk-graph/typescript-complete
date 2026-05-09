// 型アサーション as: 「この値はこの型だと TS に教える」演算子
// ※ 実行時の変換ではなく、型チェックを通すだけ。乱用は危険

// ===== 実践例① DOM要素を具体的な型として扱う =====
// getElementById の戻り値は HTMLElement | null
// 実際は input 要素だと分かっている場合に絞り込む
const input = document.getElementById('username') as HTMLInputElement
console.log(input.value) // ✅ HTMLInputElement なので .value が使える

// ===== 実践例② JSON.parse の戻り値に型をつける =====
// JSON.parse は any を返すので、扱う型をアサーションで指定
type User = { id: number; name: string }

const json = '{"id": 1, "name": "Alice"}'
const user = JSON.parse(json) as User
console.log(user.name.toUpperCase()) // ✅ User として扱える

// ===== 実践例③ APIレスポンスに型をつける =====
async function fetchUser(): Promise<User> {
  const res = await fetch('/api/user')
  const data = (await res.json()) as User // res.json() は Promise<any>
  return data
}
/* 解説
  使いどころ:
    - DOM要素を具体型に絞る (HTMLInputElement / HTMLCanvasElement など)
    - JSON.parse / fetch().json() の any に型をつける
    - TS の推論より自分の方が確実に型を知っている時

  注意:
    - as は「TSを黙らせる」だけで、実行時の安全性は保証されない
    - 可能なら型ガード(typeof / instanceof / in 演算子)で絞り込む方が安全
*/
