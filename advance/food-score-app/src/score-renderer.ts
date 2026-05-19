// import type: 型情報だけをインポートする構文
// 実行時には消えるため、バンドルサイズに影響しない
import type { ScoreStore } from './score-store.js'

export class ScoreRenderer {
  // ===== private + readonly (41_private_private_readonly.ts) =====
  // private: このクラスの外から DOM 要素や Store を直接さわれないようにする（カプセル化）
  // readonly: コンストラクタで受け取った後、参照が差し替えられないようにする
  private readonly scoreElement: HTMLDivElement
  private readonly scoreStore: ScoreStore

  // ===== 依存性の注入（DI） =====
  // ScoreStore を自分で取りに行かず（getInstance() を呼ばず）、外から受け取る
  // → このクラスは「渡されたStoreのスコアを表示する」だけになり、責務が明確になる
  constructor(scoreElement: HTMLDivElement, scoreStore: ScoreStore) {
    this.scoreElement = scoreElement
    this.scoreStore = scoreStore
  }

  render(): void {
    // ===== getter (43_getter_setter.ts) =====
    // scoreStore.totalScore は getter なので () なしでプロパティとして呼べる
    // render() が呼ばれるたびに getter が再計算され、常に最新のスコアが表示される
    this.scoreElement.textContent = this.scoreStore.totalScore.toString()
  }
}
