/* Set とは
   - 重複を許さないコレクション
   - Array に似ているが、同じ値を追加しても無視される点が異なる
   - add / has / delete / size などのメソッドで操作する
*/

// Array で値を管理する場合（重複が発生しうる）
const tagsArray = ['TypeScript', 'JavaScript', 'TypeScript'] // 重複が入ってしまう
console.log(tagsArray) // ['TypeScript', 'JavaScript', 'TypeScript']

// Set で値を管理する場合（重複が自動で排除される）
const tagsSet = new Set<string>()
tagsSet.add('TypeScript')
tagsSet.add('JavaScript')
tagsSet.add('TypeScript') // 重複するので無視される

console.log(tagsSet) // Set { 'TypeScript', 'JavaScript' }
console.log(tagsSet.size) // 2 → 要素数

console.log(tagsSet.has('TypeScript')) // true  → 値の存在確認
console.log(tagsSet.has('Python')) // false

tagsSet.delete('JavaScript') // 値を削除
console.log(tagsSet.has('JavaScript')) // false

// Array から重複を取り除きたいときに Set がよく使われる
const numbersArray = [1, 2, 2, 3, 3, 3]
const uniqueNumbers = new Set<number>(numbersArray) // Array を渡すと重複が排除される
console.log(uniqueNumbers) // Set { 1, 2, 3 }

// Set を Array に戻す場合は Array.from() を使う
const backToArray = Array.from(uniqueNumbers)
console.log(backToArray) // [1, 2, 3]
