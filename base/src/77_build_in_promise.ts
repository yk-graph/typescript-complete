/* Promise
   - 非同期処理の「結果の型」を Generics で表現するビルトインのジェネリック型
   - Promise<T> の T に、resolve される値の型が入る
   - async 関数の戻り値は自動的に Promise<T> になる
   - .then() のコールバックの引数は T として推論される
*/

// Generics + Promise の基本
async function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value)
    }, ms)
  })
}

delay(1000, 'Hello').then((result) => {
  console.log(result.toUpperCase()) // ✅ result は string として推論される
})
delay(2000, new Date()).then((result) => {
  console.log(result.getDate()) // ✅ result は Date として推論される
})

// resolve / reject で成功・失敗を表現する
async function fetchData(success: boolean): Promise<number> {
  return new Promise((resolve, reject) => {
    if (success) {
      resolve(42) // ✅ resolve の引数は number でなければならない
    } else {
      reject(new Error('Failed')) // 失敗時は reject にエラーを渡す
    }
  })
}

fetchData(true)
  .then((result) => console.log(result.toFixed(2))) // ✅ result は number
  .catch((error) => console.error(error.message)) // 失敗時はここに入る
