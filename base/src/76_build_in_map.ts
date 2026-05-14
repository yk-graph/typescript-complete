/* Map とは
   - キーと値をペアで管理するコレクション
   - Object に似ているが、キーに任意の型を使える点が異なる
   - get / set / has / delete / size などのメソッドで操作する
*/

// Object でキーと値を管理する場合
const userObject = {
  1: 'Alice',
  2: 'Bob',
}
console.log(userObject[1]) // 'Alice'

// Map でキーと値を管理する場合（Object とやっていることはほぼ同じ）
const userMap = new Map<number, string>()
userMap.set(1, 'Alice') // キー: 1, 値: 'Alice' を追加
userMap.set(2, 'Bob') // キー: 2, 値: 'Bob' を追加

console.log(userMap.get(1)) // 'Alice' → キーを指定して値を取得
console.log(userMap.get(2)) // 'Bob'
console.log(userMap.get(3)) // undefined → 存在しないキーは undefined

console.log(userMap.has(1)) // true  → キーの存在確認
console.log(userMap.has(3)) // false

console.log(userMap.size) // 2 → 要素数

userMap.delete(1) // キー: 1 のペアを削除
console.log(userMap.has(1)) // false

// Object と違い、キーに文字列以外の型も使える
const dateMap = new Map<Date, string>()
dateMap.set(new Date('2024-01-01'), '元旦')
dateMap.set(new Date('2024-12-25'), 'クリスマス')
