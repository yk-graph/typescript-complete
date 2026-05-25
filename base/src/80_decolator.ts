function Logging(target: Function) {
  console.log('Logging...')
  console.log('Logging called with target:', target)
}

function LoggingFactory(message: string) {
  console.log('LoggingFactory...')
  return function (target: Function) {
    console.log('LoggingFactory called with message:', message)
    console.log('LoggingFactory called with target:', target)
  }
}

@Logging // デコレーターが呼びがされるタイミング : class が定義されたタイミングで Logging デコレーターが呼び出される
@LoggingFactory('Hello, World!') // デコレーターが呼びがされるタイミング : class が定義されたタイミングで LoggingFactory が呼び出され、その戻り値の関数がデコレーターとして呼び出される
class User {
  name = 'Alice'

  constructor(name: string) {
    this.name = name
  }
}
