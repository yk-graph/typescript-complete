/* Partial<T>
   - T の全プロパティを省略可能（optional）にする utility 型
   - 更新処理など「一部のプロパティだけ渡したい」ときによく使う
*/

interface User {
  id: number
  name: string
  email: string
}

// User をそのまま使うと全プロパティが必須
const user: User = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
}

// Partial<User> にすると全プロパティが省略可能になる
function updateUser(id: number, updates: Partial<User>): void {
  console.log(id, updates)
}

updateUser(1, { name: 'Bob' }) // ✅ 一部だけ渡せる
updateUser(1, { name: 'Bob', email: 'b@b.com' }) // ✅ 複数も渡せる
updateUser(1, {}) // ✅ 空でも渡せる
