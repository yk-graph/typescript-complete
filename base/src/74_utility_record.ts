/* Record<K, V>
   - キーの型と値の型を指定したオブジェクト型を作る utility 型
   - K にキーの型、V に値の型が入る
*/

type UserRole = 'admin' | 'editor' | 'viewer'

// UserRole をキー、権限の説明を値とするオブジェクト型
const roleDescription: Record<UserRole, string> = {
  admin: '全ての操作が可能',
  editor: '編集のみ可能',
  viewer: '閲覧のみ可能',
  // ❌ 'admin' | 'editor' | 'viewer' 以外のキーは追加できない
}

console.log(roleDescription['admin']) // '全ての操作が可能'
console.log(roleDescription['editor']) // '編集のみ可能'

/* Map との比較
   - Record はオブジェクトリテラルで書けるシンプルさが利点
   - Map は get / set / has などのメソッドが使え、動的な追加・削除に向いている
*/

// Record の場合（静的・シンプル）
const recordMap: Record<string, number> = {
  apple: 100,
  banana: 200,
}
recordMap['orange'] = 300 // 追加はできる
console.log(recordMap['apple']) // 100

// Map の場合（動的・メソッドが豊富）
const priceMap = new Map<string, number>()
priceMap.set('apple', 100)
priceMap.set('banana', 200)
priceMap.set('orange', 300) // 動的な追加
priceMap.delete('banana') // 削除
console.log(priceMap.has('banana')) // false
console.log(priceMap.get('apple')) // 100

/* どちらを使うべきか
   - キーが固定で決まっている → Record
   - 動的に追加・削除が発生する → Map
*/
