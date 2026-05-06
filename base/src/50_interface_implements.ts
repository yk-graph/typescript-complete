/* 解説
  ■ implements とは
  クラスが「インターフェース(=契約)」を満たすことを宣言するキーワード。
  契約を満たさないと コンパイルエラー になる。

  ■ どんな時に使うか
  - 複数クラスに共通の構造を強制したい(実装漏れの防止)
  - 同じ型として扱いたい(ポリモーフィズム)
  - ※ 単に型を再利用したいだけなら不要(普通の型注釈でOK)

  ■ ルール
  - 定義された要素を1つでも欠くとエラーcd 
  - 引数・戻り値・プロパティの型が違うとエラー
  - 追加のプロパティ / メソッドはOK
  - オプショナル(?)は省略可
  - 複数 implements や `extends` との併用OK
  - 型チェックのみで、処理は引き継がれない(処理共有は `extends`)

  ■ ひとこと
  「ガワ(構造)を揃えたい → implements」
  「中身(処理)も引き継ぎたい → extends」
*/

interface Animal {
  name: string
  cry: (volume: number) => void
}

// ✅ 正しい実装
class Dog implements Animal {
  constructor(public name: string) {}
  cry(volume: number) {
    console.log(`音量${volume}: ワン!`)
  }
}

class Cat implements Animal {
  constructor(public name: string) {}
  cry(volume: number) {
    console.log(`音量${volume}: ニャー!`)
  }
}

// Animal を実装したクラスなら同じ型として扱える(ポリモーフィズム)
function makeCry(animal: Animal) {
  animal.cry(10)
}
makeCry(new Dog('ポチ'))
makeCry(new Cat('タマ'))

// ❌ エラーになるパターン
// class Ng1 implements Animal { cry(volume: number) {} }        // name が無い
// class Ng2 implements Animal { name = "ポチ" }            // cry が無い
// class Ng3 implements Animal { name = "ポチ"; cry(volume: string) {} }  // 引数の型違い
// class Ng4 implements Animal { name = 123; cry(volume: number) {} }     // プロパティの型違い
