// enum型とは: 列挙型とも呼ばれる、定数の集合を定義するための型 数値や文字列などの定数をグループ化するために使用する
enum CoffeeSize {
  SHORT = 'SHORT',
  TALL = 'TALL',
  GRANDE = 'GRANDE',
  VENTI = 'VENTI',
}

const coffee = {
  size: CoffeeSize.TALL,
  price: 300,
}

console.log(coffee.size) // TALL

// enum は default で数値を持つ
enum Color {
  RED, // 0
  GREEN, // 1
  BLUE, // 2
  YELLOW = 100, // 100
  BLACK, // 101
}

// 正直あんまり使わない。なぜなら、TypeScript では union 型と literal 型を組み合わせることで、より柔軟に定数の集合を表現できるから
// また、enum は JavaScript にコンパイルされると、オブジェクトとして定義されるため、実行時のオーバーヘッドがある。union 型と literal 型を組み合わせることで、コンパイル時に型チェックが行われるため、より安全にコードを書くことができる
type CoffeeSize2 = 'SHORT' | 'TALL' | 'GRANDE' | 'VENTI'

const coffee2 = {
  size: 'TALL' as CoffeeSize2,
  price: 300,
}

console.log(coffee2.size) // TALL
