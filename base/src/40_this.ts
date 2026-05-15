/* this とは
   - 「自分自身のインスタンス」を指す特殊なキーワード
   - ただし「誰が呼び出したか」によって中身が変わる（これが this の一番のハマりポイント）
*/

class Person {
  name: string
  age: number

  constructor(initName: string, initAge: number) {
    this.name = initName
    this.age = initAge
  }

  greeting(): void {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`,
    )
  }
}

const alice = new Person('Alice', 30)
alice.greeting() // ✅ this = alice → Hello, my name is Alice and I am 30 years old.

// greeting を別のオブジェクトに移すと this が変わってしまう
const anotherAlice = {
  greeting: alice.greeting, // greeting だけを取り出して別オブジェクトに渡す
}
anotherAlice.greeting() // ❌ this = anotherAlice になるため name と age が undefined

/* 対策A: アロー関数
   - アロー関数は「定義された場所の this」を固定する
   - greeting をどこに渡しても this = 元のインスタンス のまま
*/

class Person2 {
  name: string
  age: number

  constructor(initName: string, initAge: number) {
    this.name = initName
    this.age = initAge
  }

  // 通常のメソッドではなく、アロー関数をプロパティとして定義する
  greeting = (): void => {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`,
    )
  }
}

const bob = new Person2('Bob', 25)
const anotherBob = {
  greeting: bob.greeting,
}
anotherBob.greeting() // ✅ this = bob のまま → Hello, my name is Bob and I am 25 years old.

/* 対策B: 第一引数に this の型を指定
   - TypeScript の機能で、this の型を明示することで型安全性を確保する
   - 第一引数の this はコンパイル後に消えるため、実際の引数には影響しない
   - Person3 の shape（name と age）を持つオブジェクトであれば this として認められる
*/

class Person3 {
  name: string
  age: number

  constructor(initName: string, initAge: number) {
    this.name = initName
    this.age = initAge
  }

  greeting(this: Person3): void {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`,
    )
  }
}

const charlie = new Person3('Charlie', 40)

// name と age を持つオブジェクトに greeting を渡せば this の条件を満たすので動く
const anotherCharlie = {
  name: charlie.name,
  age: charlie.age,
  greeting: charlie.greeting,
}
anotherCharlie.greeting() // ✅ Hello, my name is Charlie and I am 40 years old.

// name と age がなければ型エラーになる
const invalidPerson = {
  greeting: charlie.greeting,
}
invalidPerson.greeting() // ❌ name と age がないので Person3 の条件を満たさずエラー

/* どちらを使うべきか
   - React などのコンポーネントやコールバックで this を使う → アロー関数（対策A）が一般的
   - this の型を明示してチームへの意図伝達や安全性を高めたい → 第一引数指定（対策B）
*/
