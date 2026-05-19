import type { FoodItem } from './food-item.js'
import type { FoodRepository } from './food-repository.js'

// 責務: DOM要素の生成と画面への描画（ビュー層）
// スコアの計算・更新は一切知らない。クリックされたことだけを外に伝える
export class FoodRenderer {
  // ===== private + readonly (41_private_private_readonly.ts) =====
  // private: このクラスの外から DOM 要素を直接さわれないようにする（カプセル化）
  // readonly: コンストラクタで受け取った後、要素の参照が差し替えられないようにする
  private readonly repository: FoodRepository
  private readonly goodFoodElement: HTMLUListElement
  private readonly badFoodElement: HTMLUListElement

  // ===== 関数型 (70_generics.ts / TypeScriptの関数型) =====
  // (food: FoodItem) => void はコールバック関数の型
  // 「FoodItem を受け取って何かをする関数」であれば何でも受け入れられる
  // クリック時に何をするかは外（index.ts）から渡してもらう
  // FoodRenderer は「クリックされた food を渡す」だけで、その後の処理は関知しない
  private readonly onFoodClick: (food: FoodItem) => void

  // ===== 依存性の注入（DI） =====
  // FoodRepository・DOM要素・コールバックすべてを外から受け取る
  // → ScoreStore の存在を知らなくてよくなり、FoodRenderer の責務が「表示だけ」に絞られる
  constructor(repository: FoodRepository, goodFoodElement: HTMLUListElement, badFoodElement: HTMLUListElement, onFoodClick: (food: FoodItem) => void) {
    this.repository = repository
    this.goodFoodElement = goodFoodElement
    this.badFoodElement = badFoodElement
    this.onFoodClick = onFoodClick
  }

  render(): void {
    // ===== getter (43_getter_setter.ts) =====
    // repository.goodFoods は getter なので () なしで呼べる
    this.repository.goodFoods.forEach((food) => {
      this.goodFoodElement.appendChild(this.createListElement(food))
    })
    this.repository.badFoods.forEach((food) => {
      this.badFoodElement.appendChild(this.createListElement(food))
    })
  }

  // ===== private メソッド (41_private_private_readonly.ts) =====
  // createListElement は render() の実装の詳細なので private にしている
  // → 外から呼び出せないようにして、「render() だけ使えばOK」という設計にする
  // 戻り値の型を HTMLLIElement と明示することで、appendChild に渡せる型が保証される
  private createListElement(food: FoodItem): HTMLLIElement {
    const li = document.createElement('li')
    li.classList.add('flex', 'items-center', 'gap-2', 'py-1', 'px-2', 'bg-white', 'rounded-sm', 'shadow-md', 'cursor-pointer', 'hover:bg-gray-100')
    // クリックされたら onFoodClick コールバックを呼ぶだけ
    // スコアを更新するかどうかは FoodRenderer は知らなくてよい
    li.addEventListener('click', () => this.onFoodClick(food))

    const nameSpan = document.createElement('span')
    nameSpan.classList.add('text-base')
    nameSpan.textContent = food.name

    const scoreSpan = document.createElement('span')
    scoreSpan.classList.add('text-sm', 'font-bold')
    // ===== literal型の絞り込み (23_literal.ts) =====
    // food.type は 'Good' | 'Bad' のどちらかに限定されているため、
    // 三項演算子で安全に '+' / '-' を判定できる
    scoreSpan.textContent = `${food.type === 'Good' ? '+' : '-'}${food.score}`

    li.appendChild(nameSpan)
    li.appendChild(scoreSpan)

    return li
  }
}
