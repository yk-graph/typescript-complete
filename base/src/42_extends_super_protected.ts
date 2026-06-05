/* 継承（extends）
   - 既存のクラスをベースに新しいクラスを定義する仕組み
   - 親クラスのプロパティやメソッドをそのまま引き継げる
   - 共通の処理を親クラスにまとめることで、コードの重複を避けられる
*/

class Person {
  constructor(
    public name: string,
    protected age: number, // 継承先クラスの内部からはアクセスできる（外からは不可）
    private salary: number, // 継承先クラスからもアクセスできない（完全に非公開）
  ) {}

  greeting(): void {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`)
  }
}

/* private vs protected アクセス修飾子まとめ
   ┌─────────────┬──────────────┬──────────────┬──────────────┐
   │             │ クラス内部      │ 継承先クラス   │ クラスの外     │
   ├─────────────┼──────────────┼──────────────┼──────────────┤
   │ public      │      ✅      │      ✅      │      ✅      │
   │ protected   │      ✅      │      ✅      │      ❌      │
   │ private     │      ✅      │      ❌      │      ❌      │
   └─────────────┴──────────────┴──────────────┴──────────────┘
*/

// 【super が不要なケース】子クラスで新しいプロパティを追加しない場合
// → constructor を書かなくてよいので super も不要（親の constructor が自動で使われる）
class Teacher extends Person {
  showInfo(): void {
    console.log(this.age) // ✅ protected なので継承先からアクセスできる
    // console.log(this.salary) // ❌ private なので継承先からもアクセスできない
  }
}

const teacher = new Teacher('Charlie', 40, 300000) // 引数は親の constructor と同じ
// teacher.age    // ❌ protected なのでクラスの外からはアクセスできない
// teacher.salary // ❌ private なのでクラスの外からはアクセスできない
teacher.showInfo() // ✅ 40

/* super が必要なケース：子クラスで独自プロパティを追加したい場合
   判断フロー:
     子クラスで新しいプロパティを追加したい？
       No → constructor を書かない → super も不要
       Yes → constructor を書く   → super が必須

   ルール: constructor を書いたら、必ず最初に super() で親を初期化する
   理由 : 親の name / age / salary の初期化処理を呼ばないと
          this.name 等が未定義のまま使われてバグになるため
*/

// 【super が必要なケース】 subject という独自プロパティを追加したいので constructor を書く
class Teacher2 extends Person {
  constructor(
    name: string,
    age: number,
    salary: number,
    public subject: string, // 子クラス独自のプロパティ（これを追加したいから constructor が必要）
  ) {
    super(name, age, salary) // 親クラス（Person）の constructor を呼び出して name/age/salary を初期化
  }
}

const teacher2 = new Teacher2('Charlie', 40, 300000, 'Math')
teacher2.greeting() // ✅ 親クラスのメソッドをそのまま使える
console.log(teacher2.subject) // ✅ 'Math'

/* オーバーライド（override）
   - 親クラスのメソッドを継承先で上書きする仕組み
   - override キーワードをつけることで「意図的に上書きしている」ことを明示できる
   - 安全性のメリット：
       親クラスのメソッド名が変わった・削除された場合
       → override なし: 気づかず別メソッドとして残ってしまう（バグの温床）
       → override あり: TypeScript がコンパイルエラーで教えてくれる
*/

class Student extends Person {
  constructor(
    name: string,
    age: number,
    salary: number,
    public grade: number,
  ) {
    super(name, age, salary)
  }

  override greeting(): void {
    console.log(`こんにちは、${this.name}です。${this.grade}年生です。`)
  }
}

const student = new Student('Alice', 15, 0, 2)
student.greeting() // ✅ こんにちは、Aliceです。2年生です。（上書きされた内容が実行される）
