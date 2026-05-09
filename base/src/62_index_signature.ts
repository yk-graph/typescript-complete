interface Designer {
  name: string
  [index: string]: string // インデックスシグネチャ: 任意のプロパティ名と文字列型の値を許可
}

const designer: Designer = {
  name: 'Alice',
  tool: 'Figma', // インデックスシグネチャにより、name以外のプロパティも許可される
}

console.log(designer.name) // Alice
console.log(designer.tool) // Figma

/* 解説
  インデックスシグネチャ:
    - オブジェクトが任意のプロパティを持つことを許可するための構文
    - [index: string]: string は、任意の文字列キーと文字列値を許可することを意味する
    - これにより、name以外のプロパティも追加できるようになる

  注意:
    - インデックスシグネチャは、オブジェクトが特定のプロパティ以外にも任意のプロパティを持つことを許可するために使用される
    - ただし、インデックスシグネチャを使用すると、型安全性が低下する可能性があるため、必要な場合にのみ使用するべきである
*/
