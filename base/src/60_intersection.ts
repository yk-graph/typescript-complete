// intersectionとは: 複数の型を組み合わせて「A かつ B」の型を作ることができる
type Engineer = {
  name: string
  role: string
}

type Blogger = {
  name: string
  follower: number
}

// EngineerとBloggerの両方のプロパティを持つNewTypeを定義
type NewType = Engineer & Blogger
const quill: NewType = {
  name: 'Quill',
  role: 'front-end engineer',
  follower: 1000,
}

// ========== intersectionで同様のことをする場合 =============
interface Engineer1 {
  name: string
  role: string
}

interface Blogger1 {
  name: string
  follower: number
}

interface NewType1 extends Engineer1, Blogger1 {}
const quill1: NewType1 = {
  name: 'Quill',
  role: 'front-end engineer',
  follower: 1000,
}
