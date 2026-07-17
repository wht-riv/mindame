# みんだめ 実装手順

## 0. 準備
GitHub、Supabase、Googleのアカウントを用意します。ZIPを展開し、`mindame-supabase`フォルダーの中身をGitHubリポジトリ直下に置きます。

## 1. Supabaseプロジェクト
1. https://supabase.com で New project。
2. Project name は `mindame`。
3. Database passwordは安全に保管。
4. リージョンは利用者に近い場所。

## 2. データベース
1. Supabase Dashboard → SQL Editor → New query。
2. `supabase/schema.sql` をすべて貼り付けて Run。
3. Table Editorで profiles / habits / excuse_tickets / daily_records / public_posts / reactions があることを確認。

## 3. 認証設定
1. Authentication → Providers → Email。
2. Email providerを有効化。
3. 卒論の参加者ID方式では Confirm email をOFFにする。
4. Authentication → URL ConfigurationでSite URLにGitHub Pages URLを設定。

注意：アプリではユーザー名を内部的に `ユーザー名@mindame.local` へ変換します。メール送信やパスワード再設定は使えません。必要なら後で実メール方式へ変更してください。

## 4. API情報
Supabase → Project Settings → APIで次を確認：
- Project URL
- anon public key

service_role keyは絶対にGitHubやブラウザコードへ入れません。

## 5. ローカル確認
`.env.example`を`.env`にコピーし値を設定：

```
VITE_SUPABASE_URL=Project URL
VITE_SUPABASE_ANON_KEY=anon public key
```

コマンド：

```
npm install
npm run dev
```

## 6. GitHubへアップロード
`mindame-supabase`フォルダー自体ではなく、中身をリポジトリ直下へ置きます。

正しい構成：

```
.github/
src/
supabase/
google-apps-script/
index.html
package.json
package-lock.json
vite.config.js
```

## 7. GitHub Secrets
リポジトリ → Settings → Secrets and variables → Actions → New repository secret。

作成：
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

値はSupabaseのProject URLとanon public keyです。

## 8. GitHub Pages
1. Settings → Pages → SourceをGitHub Actions。
2. Actions → Deploy to GitHub Pagesを確認。
3. 緑になれば公開完了。

## 9. 動作テスト
1. 新規ユーザーを作成。
2. 理念説明を読む。
3. ジャンル、目標、最低ライン、2枚のチケットを登録。
4. 当日の予測を作る。
5. 「できた」を押す。
6. 別アカウントで匿名投稿が見えるか確認。
7. 翌日未記録のアカウントで振り返りが表示されるか確認。

## 10. Googleスプレッドシート
1. 新しいスプレッドシートを作成。
2. 拡張機能 → Apps Script。
3. `google-apps-script/Code.gs` を貼り付け。
4. Apps Scriptのプロジェクト設定 → スクリプト プロパティへ追加：
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. `importMindameData`を実行し権限を許可。
6. 「日次記録」シートが作られる。

重要：service_role keyは研究者だけが管理し、共有しないでください。スプレッドシート自体も閲覧権限を限定してください。

## 11. 自動更新（任意）
Apps Script → トリガー → トリガーを追加：
- 関数：`importMindameData`
- イベントのソース：時間主導型
- 間隔：1時間ごと、または1日1回

## 12. 倫理・運用
- 本名、学籍番号、住所を収集しない。
- 研究説明と同意画面を実験前に追加する。
- 匿名IDで分析する。
- 自由投稿に個人情報を書かない注意文を表示する。
- データ削除依頼の窓口を用意する。
- 実験前に指導教員・所属機関の倫理手続きを確認する。
