/* Pick<T, K>
   - T から特定のプロパティだけを抽出する utility 型
   - 大きい型から必要な部分だけを切り出したいときに使う
*/

interface User {
  id: number
  name: string
  email: string
}

// User から name と email だけを抽出した型を作る
type UserPreview = Pick<User, 'name' | 'email'>

const preview: UserPreview = {
  name: 'Alice',
  email: 'alice@example.com',
  // id は存在しないので渡せない
}

// ✅ 必要なプロパティだけに絞った型として扱える
function showPreview(user: UserPreview): void {
  console.log(user.name, user.email)
}
