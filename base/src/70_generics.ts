/* ルール
   - 型パラメータは <T> のように <> で囲んで定義する
   - T の部分は任意の名前でよいが、慣習的に T / U / V などが使われる
   - 関数・クラス・interface などに対して使用できる
   - 使う側が <string> や <number> のように型を渡すことで、その型に固定される
*/

// 関数の場合: 関数名の直後に <T> を定義し、引数と戻り値の型として使う
function copy<T>(value: T): T {
  return value
}
const strResult = copy<string>('Hello') // T = string に固定される
const numResult = copy<number>(123) // T = number に固定される
strResult.toUpperCase() // ✅ 補完が効く
numResult.toFixed(2) // ✅ 補完が効く

/* extends を用いた型の制約
   - <T extends ...> で T に渡せる型の範囲を絞る
   - 制約がないと意図しない型も渡せてしまう
*/

function createDatabase<T extends string | number>(id: number, data: T) {
  return { id, data }
}
const db1 = createDatabase(1, 'Hello') // ✅ string は範囲内
const db2 = createDatabase(2, 123) // ✅ number は範囲内
// const db3 = createDatabase(3, true) // ❌ boolean は範囲外なのでエラー

/* クラスでの活用
   - クラス名の直後に <T> を定義する
   - インスタンス作成時に型が1つに固定される
   - インスタンスごとに異なる型を扱えるため、クラスの再利用性が高まる
*/

class LightDatabase<T extends string | number | boolean> {
  private data: T[] = []
  add(item: T): void {
    this.data.push(item)
  }
  getAll(): T[] {
    return this.data
  }
}

const stringDB = new LightDatabase<string>()
stringDB.add('Hello') // ✅
// stringDB.add(123)             // ❌ string 専用インスタンスなので弾かれる
stringDB.getAll()[0].toUpperCase() // ✅ string[] と確定しているので補完が効く

const numberDB = new LightDatabase<number>()
numberDB.add(123) // ✅
numberDB.getAll()[0].toFixed(2) // ✅ number[] と確定しているので補完が効く

/* interface / type への適用
   - interface 名の直後に <T> を定義する
   - データの「形」だけ定義して、中身の型は使う側に委ねられる
   - extends で制約をつけることもできる
*/

interface Database<T extends string | number> {
  id: number
  data: T
}

const strData: Database<string> = { id: 1, data: 'Hello' } // ✅
const numData: Database<number> = { id: 2, data: 123 } // ✅
// const boolData: Database<boolean> = { id: 3, data: true } // ❌ boolean は範囲外なのでエラー
