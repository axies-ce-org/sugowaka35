# すごわか

「すごくわかる 著作権と授業 Web」の HTML ファイルは、このリポジトリの `static` ブランチで取得できます。

https://github.com/axies-ce-org/sugowaka35/tree/static

または、以下のリンクから ZIP ファイルを直接ダウンロードできます。

https://github.com/axies-ce-org/sugowaka35/archive/refs/heads/static.zip

この HTML ファイル群は、Astro という静的サイトジェネレータを使って作成しています。Astro の構文でソースファイルを作成しビルドすると、`static` にあるファイルが生成されます。同様の作業をお手元で行うには、以下のようにしてください。

## ローカル開発環境構築

1.  **Node.js のインストール**

    Astro を動かすには Node.js が必要ですので、作業環境で Node.js が未インストールの場合はまず以下のサイトからインストールしてください。  
    https://nodejs.org/ja

2.  **すごわかリポジトリのダウンロード**

    以下の Git コマンドでローカル環境にクローンします。

    ```
    git clone https://github.com/axies-ce-org/sugowaka35.git
    ```

3.  「すごわか」フォルダへ移動

    ```
    cd sugowaka35
    ```

4.  依存パッケージのインストール

    以下のコマンドで必要なパッケージをインストールします。Astro もここでインストールされます。

    ```
    npm install
    ```

## 利用できるコマンド

上記環境構築完了後、主に以下のコマンドが利用できます。すべてのコマンドは、プロジェクトのルートで、ターミナルから実行します。

| コマンド          | アクション                                                                                            |
| :---------------- | :---------------------------------------------------------------------------------------------------- |
| `npm run dev`     | ローカル開発サーバを `localhost:3000` で起動します。`ctrl` + `C` で停止します。                       |
| `npm run build`   | 本番サイトを `./static/` フォルダにビルドします。                                                     |
| `npm run preview` | `./static/` にビルドされたファイルを `localhost:3000` でプレビューします。`ctrl` + `C` で停止します。 |

## Astro についてもっと詳しく知りたい方はこちら

https://docs.astro.build
