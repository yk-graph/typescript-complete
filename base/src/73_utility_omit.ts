/* Omit<T, K>
   - T から特定のプロパティだけを除外する utility 型
   - id など自動生成されるプロパティを除いた型を作りたいときに使う
*/

interface User {
  id: number
  name: string
  email: string
}

// User から id を除外した型を作る（新規作成時は id が不要なケース）
type NewUser = Omit<User, 'id'>

const newUser: NewUser = {
  name: 'Alice',
  email: 'alice@example.com',
  // id: 1 // ❌ id は除外されているので渡せない
}

function createUser(user: NewUser): void {
  console.log(user)
}
