// Tuple型とは: 配列の要素の型と順序を固定した型
const tuple: [string, number, boolean] = ['Alice', 30, false]

// Tuple型の要素にアクセスする方法
const tupleName = tuple[0] // string型
const tupleAge = tuple[1] // number型
const tupleIsStudent = tuple[2] // boolean型

// Tuple型の要素を変更することも可能
tuple[0] = 'Bob' // OK
tuple[1] = 25 // OK
tuple[2] = true // OK

// Tuple型の要素数を超えるアクセスはエラーになる
// const invalidAccess = tuple[3] // エラー: タプルの要素数を超えています
