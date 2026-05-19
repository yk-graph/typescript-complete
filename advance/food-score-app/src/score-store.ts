// import type: 型情報だけをインポートする構文
// 実行時には消えるため、バンドルサイズに影響しない
import type { FoodItem } from './food-item.js'

// ===== Singleton パターン (46_singleton.ts) =====
// アプリ全体でスコアの状態を1つに集約するために Singleton を使っている
// 複数のインスタンスが存在するとスコアがバラバラになってしまうため
export class ScoreStore {
  // ===== static (44_static.ts) =====
  // インスタンスを new せずにクラス自体が持つプロパティとして定義する
  // → ScoreStore.instance のように、クラス名から直接アクセスできる
  private static instance: ScoreStore

  // ===== private (41_private_private_readonly.ts) =====
  // 選択中の食品リストは外から直接書き換えさせない
  // toggleItem() メソッド経由でのみ変更を許可する（カプセル化）
  private selectedItems: FoodItem[] = []

  // ===== private constructor (46_singleton.ts) =====
  // 外から new ScoreStore() できないようにして、インスタンスが1つになることを強制する
  private constructor() {}

  // ===== static メソッド (44_static.ts) =====
  // new せずに ScoreStore.getInstance() と呼び出せる
  // 初回だけインスタンスを作成し、2回目以降は同じインスタンスを返す
  static getInstance(): ScoreStore {
    if (!ScoreStore.instance) {
      ScoreStore.instance = new ScoreStore()
    }
    return ScoreStore.instance
  }

  // add / remove を別々に持つと「追加済みかチェックしてから add」という処理が
  // 呼び出し側に漏れてしまう。toggle に統一することで責務をここに閉じ込める
  toggleItem(item: FoodItem): void {
    // ===== Array の some / filter (75_build_in_array.ts) =====
    // some: 条件を満たす要素が1つでもあれば true を返す（存在チェック）
    const isSelected = this.selectedItems.some((i) => i.id === item.id)
    if (isSelected) {
      // filter: 条件を満たさない要素だけ残す（= 該当 id を取り除く）
      this.selectedItems = this.selectedItems.filter((i) => i.id !== item.id)
    } else {
      this.selectedItems.push(item)
    }
  }

  // ===== getter (43_getter_setter.ts) =====
  // get をつけることで、呼び出し側は scoreStore.totalScore とプロパティのように書ける
  // 呼ばれるたびに最新の selectedItems から計算し直すため、常に正確な値が返る
  get totalScore(): number {
    // ===== literal型の絞り込み (23_literal.ts) =====
    // item.type は 'Good' | 'Bad' のどちらかに限定されているため、
    // 三項演算子で Good なら加算、Bad なら減算と安全に振り分けられる
    return this.selectedItems.reduce((total, item) => {
      return item.type === 'Good' ? total + item.score : total - item.score
    }, 0)
  }
}
