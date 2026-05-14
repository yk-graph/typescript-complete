/* Array<T>
   - 配列を表すビルトインのジェネリック型
   - Array<T> と T[] は同じ意味で、T[] が一般的に使われる
   - T に配列の要素の型が入る
*/

const strings: Array<string> = ['Hello', 'World']
const numbers: Array<number> = [1, 2, 3]

// 実務では T[] の短縮記法が一般的
const strings2: string[] = ['Hello', 'World']
strings2[0].toUpperCase() // ✅ string として推論される
