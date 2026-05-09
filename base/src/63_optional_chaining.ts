// Optional Chaining: ?. この演算子は、オブジェクトのプロパティにアクセスする際に、そのプロパティが存在しない場合にエラーを回避するために使用される
// 例えば、`obj?.prop` は、`obj` が `null` または `undefined` の場合に `undefined` を返し、そうでない場合は `obj.prop` を返す

type User = {
  name: string
  address: {
    city: string
  }
  contact?: {
    email: string
  }
}

const user: User = {
  name: 'Alice',
  address: {
    city: 'Tokyo',
  },
}

// user.address.city は存在するが、user.contact.email は存在しない
console.log(user.address.city) // ✅ Tokyo
console.log(user.contact.email) // ❌ エラー: Cannot read property 'email' of undefined

// オプショナルチェーンを使うとエラーを回避できる
console.log(user.contact?.email) // ✅ undefined (エラーにならない)

/* 解説
  使いどころ:
    - ネストしたオブジェクトのプロパティにアクセスする時
    - APIレスポンスなど、プロパティが存在しない可能性があるデータを扱う時

  注意:
    - オプショナルチェーンは「存在しない可能性がある」プロパティに対してのみ使用する
    - 存在が確実なプロパティには通常のドットアクセスを使う方がコードがシンプルになる
    - オプショナルチェーンはあくまでエラー回避のためのもので、存在しないことが正常なケースである場合に適している
*/
