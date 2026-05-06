// unknown型とは: 型安全なany型
// unknown と any の違い
let a: any = 10
let b: unknown = 10

// any 型は、どんな値でも代入できる
a = 'Hello'
a = true
a = { name: 'Alice' }

// unknown 型は、どんな値でも代入できるが、使用する前に型チェックが必要
b = 'Hello'
b = true
b = { name: 'Alice' }

// unknown 型を使用する前に型チェックが必要
if (typeof b === 'string') {
  console.log(b.toUpperCase()) // bはstring型として扱われる
} else if (typeof b === 'boolean') {
  console.log(b ? 'True' : 'False') // bはboolean型として扱われる
} else if (typeof b === 'object' && b !== null && 'name' in b) {
  console.log(b.name) // bは{name: string}型として扱われる
}

// unknown 型は、型安全なコードを書くために使用される
function checkError(error: unknown) {
  if (error instanceof Error) {
    console.error(error.message) // errorはError型として扱われる
  } else {
    console.error('Unknown error') // errorはunknown型として扱われる
  }
}

checkError(new Error('Something went wrong')) // Errorオブジェクトを渡す -> エラーメッセージが表示される
checkError('An error occurred') // 文字列を渡す -> 'Unknown error'が表示される
checkError(111111) // 数値を渡す -> 'Unknown error'が表示される
