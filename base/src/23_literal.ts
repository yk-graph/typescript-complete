// literal型とは: 文字列や数値などの特定の値を型として表現することができる型
type CoffeeSize = 'SHORT' | 'TALL' | 'GRANDE' | 'VENTI' // literal型とUnion型を組み合わせて、定数の集合を表現することができる

const coffee = {
  size: 'TALL' as CoffeeSize,
  price: 300,
}

console.log(coffee.size) // TALL

// literal型を使うと、複数の型を組み合わせて、より複雑な型を定義できる
type User = {
  name: string
  age: number
  role: 'admin' | 'user'
}

const user1: User = {
  name: 'Alice',
  age: 30,
  role: 'admin',
}

const user2: User = {
  name: 'Bob',
  age: 25,
  role: 'user',
}

console.log(user1) // { name: 'Alice', age: 30, role: 'admin' }
console.log(user2) // { name: 'Bob', age: 25, role: 'user' }
