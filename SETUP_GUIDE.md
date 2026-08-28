# 🔧 KAJITORU CONNECT LP - セットアップガイド

**このガイドに従ってファイルを配置してください。**

---

## 📂 ステップ 1: ディレクトリ構造を作成

```bash
# 新しいディレクトリを作成
mkdir kajitoru-connect-lp
cd kajitoru-connect-lp

# 必要なフォルダ構造を作成
mkdir -p app components lib styles
```

---

## 📋 ステップ 2: ファイルを配置

### `/app` ディレクトリ

このディレクトリに以下のファイルを配置：

```
app/
├── layout.tsx       ← layout.tsx をここにコピー
└── page.tsx         ← page.tsx をここにコピー
```

### `/components` ディレクトリ

このディレクトリに以下のファイルを配置（ファイル名から `components_` を削除）：

```
components/
├── Hero.tsx                  ← components_Hero.tsx
├── CareerPath.tsx            ← components_CareerPath.tsx
├── ExploreKajitoru.tsx       ← components_ExploreKajitoru.tsx
├── About.tsx                 ← components_About.tsx
├── StayConnected.tsx         ← components_StayConnected.tsx
├── ConnectForm.tsx           ← components_ConnectForm.tsx
└── Footer.tsx                ← components_Footer.tsx
```

### `/lib` ディレクトリ

このディレクトリに以下のファイルを配置（ファイル名から `lib_` を削除）：

```
lib/
├── links.ts                  ← lib_links.ts
├── analytics.ts              ← lib_analytics.ts
└── submitLead.ts             ← lib_submitLead.ts
```

### `/styles` ディレクトリ

```
styles/
└── globals.css               ← globals.css をここにコピー
```

### ルートディレクトリ

以下のファイルはルートディレクトリに配置：

```
kajitoru-connect-lp/
├── .gitignore                ← .gitignore
├── next.config.js            ← next.config.js
├── tailwind.config.js        ← tailwind.config.js
├── tsconfig.json             ← tsconfig.json
├── postcss.config.js         ← postcss.config.js
├── package.json              ← package.json
├── README.md                 ← README.md
├── IMPLEMENTATION_SUMMARY.md ← IMPLEMENTATION_SUMMARY.md
└── SETUP_GUIDE.md            ← このファイル
```

---

## 💾 ステップ 3: ファイル配置スクリプト（自動化）

**Linux / Mac 用:**

```bash
#!/bin/bash

# プロジェクトディレクトリを作成
mkdir -p kajitoru-connect-lp/{app,components,lib,styles}
cd kajitoru-connect-lp

# app ディレクトリ
cp ../layout.tsx app/
cp ../page.tsx app/

# components ディレクトリ
cp ../components_Hero.tsx components/Hero.tsx
cp ../components_CareerPath.tsx components/CareerPath.tsx
cp ../components_ExploreKajitoru.tsx components/ExploreKajitoru.tsx
cp ../components_About.tsx components/About.tsx
cp ../components_StayConnected.tsx components/StayConnected.tsx
cp ../components_ConnectForm.tsx components/ConnectForm.tsx
cp ../components_Footer.tsx components/Footer.tsx

# lib ディレクトリ
cp ../lib_links.ts lib/links.ts
cp ../lib_analytics.ts lib/analytics.ts
cp ../lib_submitLead.ts lib/submitLead.ts

# styles ディレクトリ
cp ../globals.css styles/

# ルート
cp ../.gitignore .
cp ../next.config.js .
cp ../tailwind.config.js .
cp ../tsconfig.json .
cp ../postcss.config.js .
cp ../package.json .
cp ../README.md .
cp ../IMPLEMENTATION_SUMMARY.md .

echo "✅ ファイル配置完了"
```

**Windows 用 (PowerShell):**

```powershell
# プロジェクトディレクトリを作成
mkdir kajitoru-connect-lp -Force
cd kajitoru-connect-lp
mkdir app, components, lib, styles -Force

# app ディレクトリ
Copy-Item ../layout.tsx -Destination app/
Copy-Item ../page.tsx -Destination app/

# components ディレクトリ
Copy-Item ../components_Hero.tsx -Destination components/Hero.tsx
Copy-Item ../components_CareerPath.tsx -Destination components/CareerPath.tsx
Copy-Item ../components_ExploreKajitoru.tsx -Destination components/ExploreKajitoru.tsx
Copy-Item ../components_About.tsx -Destination components/About.tsx
Copy-Item ../components_StayConnected.tsx -Destination components/StayConnected.tsx
Copy-Item ../components_ConnectForm.tsx -Destination components/ConnectForm.tsx
Copy-Item ../components_Footer.tsx -Destination components/Footer.tsx

# lib ディレクトリ
Copy-Item ../lib_links.ts -Destination lib/links.ts
Copy-Item ../lib_analytics.ts -Destination lib/analytics.ts
Copy-Item ../lib_submitLead.ts -Destination lib/submitLead.ts

# styles ディレクトリ
Copy-Item ../globals.css -Destination styles/

# ルート
Copy-Item ../.gitignore -Destination .
Copy-Item ../next.config.js -Destination .
Copy-Item ../tailwind.config.js -Destination .
Copy-Item ../tsconfig.json -Destination .
Copy-Item ../postcss.config.js -Destination .
Copy-Item ../package.json -Destination .
Copy-Item ../README.md -Destination .
Copy-Item ../IMPLEMENTATION_SUMMARY.md -Destination .

Write-Host "✅ ファイル配置完了"
```

---

## 📥 ステップ 4: 依存ファイルをインストール

```bash
cd kajitoru-connect-lp
npm install
```

**出力されるモジュール:**
- next@^14.0.0
- react@^18.2.0
- react-dom@^18.2.0
- tailwindcss@^3.3.0
- typescript@^5.1.0
- その他

---

## ✅ ステップ 5: ローカルで確認

```bash
# 開発サーバー起動
npm run dev

# ブラウザで確認
# http://localhost:3000
```

**確認ポイント:**

- [ ] ページが読み込まれるか
- [ ] Hero セクションが表示されるか
- [ ] フォームが入力できるか
- [ ] URLパラメータ（`?from=test`）が計測されるか
- [ ] モバイル表示で崩れていないか

---

## 🎯 ステップ 6: 外部 URL を設定

`lib/links.ts` を開いて、本番 URL に更新してください：

```typescript
export const EXTERNAL_LINKS = {
  COMPANY: 'https://kajitoru.com',                    // ← 確認・更新
  TALENTBOOK: 'https://www.talent-book.jp/kajitoru',  // ← 確認・更新
  LINKEDIN: 'https://www.linkedin.com/in/tanakajitoru?...',  // ← 確認・更新
  PROJECTS: 'https://kajitoru.com/projects',          // ← 確認・更新
  GUILD: 'https://kajitoru.com/guild',                // ← 確認・更新
  GLOBAL: 'https://kajitoru.com/world',               // ← 確認・更新
}
```

---

## 🚀 ステップ 7: ビルド & デプロイ

### ローカルビルドテスト

```bash
npm run build
npm start

# http://localhost:3000 で本番版を確認
```

### Vercel へのデプロイ

```bash
# Vercel CLI をインストール
npm install -g vercel

# デプロイ
vercel

# プロンプトに従う
# - Project name: kajitoru-connect-lp
# - Framework: Next.js
# - Build command: npm run build
# - Output directory: .next
```

**デプロイ完了後:**

```
🎉 Vercel Deployment successful!
Live URL: https://kajitoru-connect-lp.vercel.app
```

---

## 🔐 ステップ 8: 環境変数設定（オプション）

CRM統合を予定している場合、`.env.local` ファイルを作成：

```bash
# .env.local ファイルをプロジェクトルートに作成
cat > .env.local << EOF
# HubSpot (オプション)
NEXT_PUBLIC_HUBSPOT_API_KEY=your_hubspot_key_here

# Google Forms (オプション)
NEXT_PUBLIC_GOOGLE_FORMS_URL=https://docs.google.com/forms/...

# その他のAPI
NEXT_PUBLIC_API_ENDPOINT=https://your-api.com
EOF
```

**注意:** `.env.local` は `.gitignore` に含まれているため、Git にコミットされません。

---

## ✨ ファイル配置確認

最終的なディレクトリ構造：

```
kajitoru-connect-lp/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Hero.tsx
│   ├── CareerPath.tsx
│   ├── ExploreKajitoru.tsx
│   ├── About.tsx
│   ├── StayConnected.tsx
│   ├── ConnectForm.tsx
│   └── Footer.tsx
├── lib/
│   ├── links.ts
│   ├── analytics.ts
│   └── submitLead.ts
├── styles/
│   └── globals.css
├── node_modules/ (npm install 後)
├── .next/ (npm run build 後)
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── postcss.config.js
├── package.json
├── package-lock.json
├── README.md
├── IMPLEMENTATION_SUMMARY.md
└── SETUP_GUIDE.md
```

---

## 🧪 テストコマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm start

# TypeScript 型チェック
npm run type-check

# ファイルをリント（オプション設定後）
npm run lint
```

---

## 📞 よくある質問

### Q: ファイルが見つからないエラーが出る

**確認事項:**
1. ファイル配置が正しいか（`app/layout.tsx` など）
2. ファイル名が正しいか（ケース区別される）
3. import パスが正しいか（`@/lib/links` など）

### Q: `npm install` が失敗する

```bash
# キャッシュをクリア
npm cache clean --force

# 再度インストール
npm install
```

### Q: `http://localhost:3000` にアクセスできない

```bash
# 開発サーバーが起動しているか確認
# ターミナルに "ready - started server on 0.0.0.0:3000" が出ている か確認

# ポート 3000 が使用中の場合
npm run dev -- -p 3001
# http://localhost:3001 でアクセス
```

### Q: Vercel へのデプロイに失敗した

1. Vercel アカウントにログインしているか確認
2. プロジェクト名が正しいか確認
3. `npm run build` がローカルで成功しているか確認

---

## ✅ セットアップ完了チェックリスト

- [ ] ディレクトリ構造を作成
- [ ] ファイルを配置
- [ ] `npm install` で依存をインストール
- [ ] `npm run dev` で開発サーバーを起動
- [ ] http://localhost:3000 でページが表示される
- [ ] フォーム送信テスト（console で ログ確認）
- [ ] URLパラメータテスト（`?from=test`）
- [ ] `npm run build` でビルド成功
- [ ] 外部 URL を更新（本番値）
- [ ] `vercel` でデプロイ（本番環境へ）

---

**これで KAJITORU CONNECT LP のセットアップが完了しました！** 🎉

デプロイ後、QRコード経由でアクセスして、フォーム登録の流入計測を開始できます。

---

**ご質問があれば、いつでもお知らせください。**
