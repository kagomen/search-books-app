## React

- React Fast Refresh機能

  > React開発中にコンポーネントのコードを修正した際、状態を保持したまま素早く反映する機能です。これにより、開発者はコンポーネントの更新を即座に確認できるため、開発スピードが向上し、フィードバックループが短縮されます。

  以下のような警告文が出る

  ```
  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.eslint(react-refresh/only-export-components)
  ```

  ファイルを切り分けたら警告文が消える

- useRef

  - 特徴
    - DOMを直接操作できる
    - refの値を変更しても再レンダリングされない
      -> 変更が画面には反映されない
  - ユースケース
    - **変更を画面に表示する必要のないとき**
    - useStateではできないDOM操作が必要なとき

- stateの基礎知識

  - stateはコンポーネントごとに保持される
  - stateの更新用関数が使用された時に、その更新用関数を含む関数コンポーネントが再レンダリングされる
  - stateの更新は即時ではなく、イベント発生時に起こる（多分）
    -Reactはコンポーネントが配置された場所でコンポーネントが"それ"だと認識している
    - 同じ場所にコンポーネントが配置されている場合、stateを引き継いでしまう
      - 例えば、ture or falseでコンポーネントの表示を切り替える場合など
    - 解決策は、keyの設定をすること
    - ただしこの場合、コンポーネントの表示を切り替えた際に、stateの値がリセットされてしまう
    - コンポーネントが消失してもstateの値を保持したい場合、親コンポーネントでstateの管理を行い、子コンポーネントにはpropsでstateと更新用関数を渡す
      - useContextみたいなもの

- useReducer

  ```javascript
  export function App(){
    const [state, dispatch] = useReducer((prevState, action) => {
      switch(action.type) {
        case 'add':
          return prevState + 1
        case 'minus':
          return prevState - 1
        default:
          console.log('Unexpected action')
      }
    }, <stateの初期値>)
  }

  <button onClick={() => dispatch({type: minus})}>minus</button>
  ```

  - useReducerの利点
    - stateの定義時に更新用関数の内容も定義できるので、そのstateがどんなことをしているのかがわかりやすい

- useContext

  ```js
  import { createContext, useState } from 'react'

  export const AppContext = createContext()

  export default function App() {
    const [val, setVal] = useState(0)
    return (
      <AppContext.Provider value={[val, setVal]}>
        <ChildComponent />
      </AppContext.Provider>
    )
  }
  ```

  ```js
  import { useContext } from 'react'
  import { AppContext } from './App.jsx'

  export default function ChildComponent() {
    const [val, setVal] = useContext(AppContext)
    return <button onClick={() => setVal((prev) => prev + 1)}>{val}</button>
  }
  ```

  - 注意点
    - useContextの値が更新されると、useContextを使用しているコンポーネントは全て再レンダリングされる
      - Contextを細かく分割することで無駄な再レンダリングを防ぐことは可能

- useEffect

  - 純粋関数以外の関数はuseEffect内に記述する
    - ReactはSSRを利用する際Node.jsで実行するが、Node.jsはwindowオブジェクトやDOM操作などは感知できないから（？）
  - コンポーネント消滅時にクリーンアップ関数（return文以降のソースコード）を実行する
    - useEffectの依存配列（第二引数）に値が設定されている場合、その値が変更されるたびにクリーンアップ関数が実行される

- パフォーマンス改善

  - ダイナミックインポート

    - 必要な時にモジュールを読み込む

    ```js
    // importを関数として使う
    import('./example.jsx')
    ```

    ```
    // Reactでの使用例
    import {lazy} from 'react'

    export function App(){
      const LazyComp = lazy(() => import('./example.jsx'))
      return(
        <>
          <LazyComp />
        </>
      )
    }
    ```

    - ↔︎スタティックインポート: 初回にモジュールを読み込む

  - React.memo

    - propsが更新される時以外にコンポーネントを再レンダリングさせない

    ```js
    import {memo} from 'react'

    export const Example = memo(props) => {
      ~~~
    }
    ```

  - useCallback

    - 依存配列に設定した値が更新される時以外、関数を再生成させない（空配列の場合は初回レンダリング時の一回のみ）

    ```js
    import {useCallback} from 'react'

    const example = useCallback(() => {
      ~~~
    }, [])
    ```

  - useMemo

    - 依存配列に設定した値が更新される時以外、指定した値を更新させない

    ```js
    import { useMemo } from 'react'

    const example = useMemo(() => {
      return <div>返り値をメモ化する</div>
    }, [])
    ```

## React Hook Form

- UIライブラリやカスタムコンポーネントを使う時は`Controller`、それ以外のシンプルな実装は`register`を使う

- https://zenn.dev/yuitosato/articles/292f13816993ef
- https://scrapbox.io/mrsekut-p/react-hook-form%E3%81%A7register%E3%81%A8Controller%E3%81%AE%E3%81%A9%E3%81%A1%E3%82%89%E3%82%92%E4%BD%BF%E3%81%86%E3%81%8B

## Axios

- なぜ Axios を使うか？
  - 多くの場合、ヘッダーを設定する必要がない
  - リクエストボディを JSON 文字列へ変換する必要がない

## Tailwind CSS

- tailwind.config.jsのextendの役割

  - extend外に記述した設定は、設定したもののみ認められる
  - 以下の場合は、Tailwind内で使用できる色が`blue-25`のみになる

    ```js
    theme: {
      colors: {
        blue: {
          25: '#17275c',
            },
      },
      extend: {
        // 他の設定
      },
    },
    ```

  - 以下の場合は、デフォルトの色に加え、`blue-25`が使えるようになる
    ```js
    theme: {
      extend: {
        colors: {
          blue: {
            25: '#17275c',
          },
        }
      },
    },
    ```

- レイアウト

  ```
  <div class="min-h-dvh">

  <header class="sticky top-0 z-20 h-[80px] bg-slate-300 bg-transparent backdrop-blur-sm">Header</header>

  <div class="min-h-screen bg-[url('https://picsum.photos/id/1/2000')] bg-cover bg-fixed bg-no-repeat">
    <p class="h-[2000px] text-2xl leading-loose text-white">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat maiores, voluptatibus architecto deserunt labore optio quisquam eos cumque rerum ex veniam quae! Numquam, eaque a! Iure voluptatem veritatis ipsum nobis. </p>
  </div>

  <footer class="sticky top-full h-[80px] bg-zinc-600">Footer</footer>

  </div>
  ```

  - https://play.tailwindcss.com/Mg08LowuKK

## HTML

- button タグ
  - デフォルトで`type=submit`が設定されている
  - その他: `type="button"` `type="reset"`
  - `type="button"`を指定しても、エンターキーで送信されたもの（フォームから送信されたもの）はsubmitとして実行されるので、`e.preventDefault()`は必要

## CSS

- flexプロパティ

  - `flex: <flex-grow> <flex-shrink> <flex-basis>`
    - `flex-grow`
      - 子要素の伸び率
      - 初期値: 0
    - `flex-shrink`
      - 子要素の縮み率
      - 初期値: 1
    - `flex-basis`
      - 子要素の幅を指定
      - 初期値: auto
      - autoは子要素自身の幅

- flexボックスの子要素が親要素をはみ出る時の対応策

  - 子要素に`min-width: 0`を追加

- position: absoluteの中央寄せ

  ```css
  /* 上下中央寄せ */

  .class {
    position: absolute;
    top: 0;
    bottom: 0;
  }

  /* 左右中央寄せ */

  .class {
    position: absolute;
    left: 0;
    right: 0;
  }
  ```

- `inset`

  - top, right, bottom, left に対応する一括指定
  - `inset: 0`はモーダルの背景に最適

- bodyに背景色をつけて、バウンススクロール時に対策をしたい

  ```css
  body {
    background: #ddd;
  }

  .main-wrapper {
    min-height: 100vh;
  }
  ```

  - 上下で色を変えたい時はこちらを参考:
    https://qiita.com/bgn_nakazato/items/9399937fdf4059f9f9d7

- フッターを下に固定

  ```css
  .main-wrapper {
    position: relative;
    padding-bottom: 32px;
    /* フッターの上部に余白が欲しい場合はフッターの高さに加えて余白分も数値もプラスする */
  }

  .footer {
    position: absolute;
    bottom: 0;
    height: 32px;
  }
  ```

  - 参考: https://webukatu.com/wordpress/blog/11208/#Flexboxfooter

## npm

- `-E` `--save-exact`オプション
  - ライブラリのバージョンを更新しない

## ESLint

- エラーメッセージ: `~ is missing in props validation`
  - 以下のように設定し、props の型定義チェックを OFF にする
  ```json
  rules: {
    "react/prop-types": "off"
  }
  ```

## Prettier

- 導入方法

  ```
  npm install -D -E prettier
  ```

- `.prettierrc` デフォルト設定（一部）

  - インデント: 2 スペース
  - セミコロン: 自動挿入
  - シングルクォート: 非使用
  - ダブルクォート: 使用
  - カンマ: 行末
  - 括弧の位置: 同じ行
  - 行の長さ: 80 文字

- .prettierignore
  - コードフォーマットをしないファイルを指定する
  - デフォルトでは以下のファイルが設定されている
    - \*\*/.git
    - \*\*/.svn
    - \*\*/.hg
    - \*\*/node_modules

## shadcn/ui

- 環境構築（TS使わない場合、やや面倒）

jsconfig.json or tsconfig.json

```json
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
    // ...
  }
}
```

vite.config.js

```js
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
```

```
npx shadcn-ui@latest init
```

```
npx shadcn-ui@latest add button

```

## JavaScript

- Setオブジェクト

  - 配列の重複値削除

  ```js
  const set = new Set()

  set.add('hoge1')
  set.add('hoge2')
  set.add('hoge2')
  set.add('hoge3')

  console.log(set) //Set(3) { 'hoge1', 'hoge2', 'hoge3' } と出力
  ```

  - https://zenn.dev/oreo2990/articles/5ccc8323874560

  - Setを使用する理由

    - Setを使用しない場合（Array）

    ```js
    const seenIsbns = []
    const filteredBooks = data.Items.filter((item) => {
      const isbn = item.Item.isbn
      if (isbn && !seenIsbns.includes(isbn)) {
        seenIsbns.push(isbn)
        return true
      }
      return false
    })
    ```

    - Setの場合

    ```js
    const seenIsbns = new Set()
    const filteredBooks = data.Items.filter((item) => {
      const isbn = item.Item.isbn
      if (isbn && !seenIsbns.has(isbn)) {
        seenIsbns.add(isbn)
        return true
      }
      return false
    })
    ```

  - > Array の includes は線形探索を行うため、要素数が多いと検索に時間がかかります。一方、Set の has はハッシュテーブルを利用しており、平均的に定数時間で要素を確認できるため、パフォーマンスが良くなります。これが Array と Set のパフォーマンスの違いに影響しています。

- 探索アルゴリズム
  - 線形探索
    - 先頭から順に探索を行う
    - 目的のデータが見つかる or 配列のデータを全て確認 で探索を終了する
  - 二分探索
    - **昇順 or 降順 で並んでいる配列やリストに対して**探索を行う
    - 探索対象を1/2ずつ削り落としていくため、効率の良い探索を行える
  - ハッシュ法
    - ハッシュ関数を用いてデータの格納位置を特定する
