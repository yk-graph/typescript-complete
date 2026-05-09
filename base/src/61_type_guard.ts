// ========= typeof を使った型ガード =========
// typeof で判定できるのは、string, number, boolean, symbol, undefined, object, function などのプリミティブ型や、null などの特殊な値
function isString(value: unknown): boolean {
  return typeof value === 'string'
}

isString('hello') // true
isString(123) // false
isString({}) // false

// ========= instanceof を使った型ガード =========
// instanceof で判定できるのは、クラスやコンストラクタ関数などのオブジェクト型
class Person {
  constructor(public name: string) {}
}

function isPerson(value: unknown): boolean {
  return value instanceof Person
}

isPerson(new Person('Alice')) // true
isPerson({ name: 'Bob' }) // false
isPerson('Charlie') // false

// ========= in を使った型ガード =========
// in で判定できるのは、オブジェクトのプロパティの存在
type Engineer = {
  name: string
  role: string
}

type Blogger = {
  name: string
  follower: number
}

type NomadoWorker = Engineer | Blogger

function describeWorker(worker: NomadoWorker): string {
  if ('role' in worker) {
    return `Engineer: ${worker.name}, Role: ${worker.role}`
  } else if ('follower' in worker) {
    return `Blogger: ${worker.name}, Followers: ${worker.follower}`
  } else {
    return 'Unknown worker'
  }
}

describeWorker({ name: 'Quill', role: 'front-end engineer' }) // Engineer: Quill, Role: front-end engineer
describeWorker({ name: 'Quill', follower: 1000 }) // Blogger: Quill, Followers: 1000
