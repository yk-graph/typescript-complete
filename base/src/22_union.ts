// union型とは: 複数の型を組み合わせて、値がどれかの型であることを表す型
type StringOrNumber = string | number

let value: StringOrNumber

value = 'Hello'
console.log(value) // Hello

value = 42
console.log(value) // 42

// union型を使うと、関数の引数や戻り値の型を柔軟に定義できる
function printValue(value: StringOrNumber): void {
  console.log(value)
}

printValue('Hello') // Hello
printValue(42) // 42

// union型を使うと、複数の型を組み合わせて、より複雑な型を定義できる
type UnionUser = {
  name: string
  age: number
}

type Admin = {
  name: string
  role: string
}

type Person = UnionUser | Admin

const person1: Person = {
  name: 'Alice',
  age: 30,
}

const person2: Person = {
  name: 'Bob',
  role: 'admin',
}

console.log(person1) // { name: 'Alice', age: 30 }
console.log(person2) // { name: 'Bob', role: 'admin' }
