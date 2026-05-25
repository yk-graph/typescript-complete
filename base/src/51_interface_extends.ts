/* 解説
  ■ ポイント
  インターフェースは `extends` で他のインターフェースを継承できる。
  `Human` は `Nameable` と `Ageable` を継承しているので、
  実質「name + age + greet」の3つを持つ契約になる。

  ■ どんな時に使うか
  - 小さな役割ごとにインターフェースを分け、合成して大きな型を作りたい時
    例: Nameable / Ageable / Greetable などを部品として使い回す
  - 共通プロパティを切り出して、複数のインターフェースで共有したい時
  - 1つのインターフェースが肥大化するのを防ぎたい時

  ■ ルール
  - インターフェースは複数のインターフェースを extends できる(カンマ区切り)
  - implements 側は、継承元も含めた 全プロパティ・メソッド を実装する必要がある
    → `Person` は name(Nameable) / age(Ageable) / greet(Human) すべて必要
  - 同名プロパティで型が衝突するとエラー
  - クラス側は `class Person implements Nameable, Ageable, Human` と
    個別に書いてもよいが、`Human` だけで十分(継承関係で全部含まれる)

  ■ ひとこと
  「インターフェース同士は extends で組み立てる、クラスは implements で受け取る」
  役割を小さく分けて合成すると、再利用しやすく保守性も上がる。
*/

interface Nameable {
  name: string
}

interface Ageable {
  age: number
}

interface Human extends Nameable, Ageable {
  greet(message: string): void
}

class Person implements Human {
  constructor(
    public name: string,
    public age: number,
  ) {}

  greet(message: string): void {
    console.log(`${message}, my name is ${this.name} and I am ${this.age} years old.`)
  }
}

const person = new Person('Alice', 30)
person.greet('Hello')

// ❌ エラーになるパターン
// class Ng1 implements Human { age = 30; greet(m: string) {} }  // name が無い(Nameable 違反)
// class Ng2 implements Human { name = "A"; greet(m: string) {} } // age が無い(Ageable 違反)
// class Ng3 implements Human { name = "A"; age = 30 }            // greet が無い(Human 違反)

// ===== extends と　implements の併用 =====
interface Movable {
  move(): void
}

interface Attackable {
  attack(): void
}

interface Healable {
  heal(): void
}

// ===== 部品を extends で組み立てる =====
interface Warrior extends Movable, Attackable {} // 戦士
interface Healer extends Movable, Healable {} // 回復役
interface Hero extends Movable, Attackable, Healable {} // 勇者

// ===== クラスは implements で受け取る =====
class Knight implements Warrior {
  move() {
    console.log('騎士が移動')
  }
  attack() {
    console.log('剣で斬る!')
  }
}

class Priest implements Healer {
  move() {
    console.log('僧侶が移動')
  }
  heal() {
    console.log('回復魔法!')
  }
}

class Braver implements Hero {
  move() {
    console.log('勇者が移動')
  }
  attack() {
    console.log('聖剣で斬る!')
  }
  heal() {
    console.log('自己回復!')
  }
}
