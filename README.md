# みんだめ

行動と休息のバランスを支援するスマートフォン向け習慣化Webアプリのプロトタイプです。

## ローカル起動

```bash
npm install
npm run dev
```

## GitHub Pagesで公開

1. このプロジェクトの中身をGitHubリポジトリへアップロードします。
2. リポジトリの `Settings` → `Pages` を開きます。
3. `Build and deployment` の `Source` を `GitHub Actions` にします。
4. `main` ブランチへpushすると自動でビルド・公開されます。

`vite.config.js` の `base: './'` により、任意のリポジトリ名で公開できます。

## 現在の範囲

- フロントエンド試作版
- タイマー不使用
- 実データベース・認証・複数ユーザー共有は未接続
