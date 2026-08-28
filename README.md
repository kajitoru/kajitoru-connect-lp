# KAJITORU CONNECT LP

🚀 **Zoom背景のQRコードから流入するフリーランス・複業人材向けランディングページ**

---

## 📋 概要

KAJITORU CONNECT LP は、オンライン会議のZoom背景に掲載されたQRコードを通じて、フリーランス・複業人材・転職候補者がカジトルと軽く「つながれる」ことを目的とした1ページランディングページです。

**ブランド思想:** 「応募ページ」ではなく「探索と接続の場」

---

## ✨ 主な特徴

- ✅ **スマホ最優先** → レスポンシブ対応で全デバイス対応
- ✅ **軽い登録体験** → 名前 + メール + 興味のみ（履歴書不要）
- ✅ **URLパラメータ計測** → Zoom背景のQR、メール、SNS経由の流入を完全計測
- ✅ **CRM差し替え可能** → HubSpot / 自社CRM / Google Forms への統合対応
- ✅ **SEO設定完備** → OGP、メタデータ等、全SNS共有対応

---

## 🎨 ブランドカラー

| 色 | コード |
|---|---|
| Red | `#FF6B6B` |
| Orange | `#FFA500` |
| Purple | `#9D4EDD` |
| Blue | `#3A86FF` |
| Teal | `#00C9A7` |

---

## 📁 ファイル構成

```
kajitoru-connect-lp/
├── app/
│   ├── layout.tsx              # SEO・OGP メタデータ
│   └── page.tsx                # メインページ
├── components/
│   ├── Hero.tsx                # ファーストビュー
│   ├── CareerPath.tsx          # 5つの働き方選択
│   ├── ExploreKajitoru.tsx     # 4カード探索セクション
│   ├── About.tsx               # ABOUT KAJITORU
│   ├── StayConnected.tsx       # フォーム導入
│   ├── ConnectForm.tsx         # フォーム実装
│   └── Footer.tsx              # フッター
├── lib/
│   ├── links.ts                # 外部URL定数
│   ├── analytics.ts            # パラメータ取得・計測
│   └── submitLead.ts           # フォーム送信処理
├── styles/
│   └── globals.css             # グローバルスタイル
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── postcss.config.js
├── package.json
└── README.md
```

---

## 🚀 起動方法

### 前提条件
- Node.js 18.0 以上
- npm 9.0 以上

### セットアップ

```bash
# 1. 依存ファイルをインストール
npm install

# 2. 開発サーバーを起動
npm run dev

# 3. ブラウザで以下にアクセス
# http://localhost:3000
```

### ビルド・本番実行

```bash
# ビルド
npm run build

# 本番サーバー起動
npm start
```

---

## 🔗 外部URL設定

すべての外部リンクは `/lib/links.ts` で管理しています。

```typescript
export const EXTERNAL_LINKS = {
  COMPANY: 'https://kajitoru.com',
  TALENTBOOK: 'https://www.talent-book.jp/kajitoru',
  LINKEDIN: 'https://www.linkedin.com/in/tanakajitoru?...',
  PROJECTS: 'https://kajitoru.com/projects',
  GUILD: 'https://kajitoru.com/guild',
  GLOBAL: 'https://kajitoru.com/world',
}
```

**変更方法:**
1. `/lib/links.ts` を開く
2. 対応する URL を置き換える
3. すべてのコンポーネントで自動的に反映される

---

## 📊 URLパラメータ計測

QRコードには以下の形式でパラメータを付与してください。

### パラメータ一覧

| パラメータ | 説明 | 例 |
|---|---|---|
| `from` | 紹介者名 | `?from=shinji` |
| `ref` | 紹介者（ref でも from でも可） | `?ref=tanaka` |
| `utm_source` | UTM - 流入元 | `?utm_source=zoom_background` |
| `utm_medium` | UTM - メディウム | `?utm_medium=qr_code` |
| `utm_campaign` | UTM - キャンペーン | `?utm_campaign=online_meeting_2026` |
| `utm_content` | UTM - コンテンツ | `?utm_content=sales_deck` |

### QRコード用URL例

```
https://connect.kajitoru.jp?from=shinji&utm_source=zoom_background&utm_medium=qr_code&utm_campaign=online_meeting_2026
```

### 複合例

```
https://connect.kajitoru.jp?from=shinji&utm_source=email&utm_campaign=Q1_2026
```

---

## 💾 フォーム送信処理

現在は **console.log（開発用）** と **mock API** で実装されています。

### 現在の動作

1. フォーム送信 → console にログ出力
2. `/api/contact` へのフェッチ試行 → 無い場合は mock success で続行
3. ユーザーには「送信完了」が表示される

### CRM統合への切り替え

#### HubSpot 統合の有効化

`/lib/submitLead.ts` の `submitToHubSpot()` 関数を有効化してください：

```typescript
// submitToHubSpot() 関数のコメントを外す
// NEXT_PUBLIC_HUBSPOT_API_KEY を .env.local に設定
NEXT_PUBLIC_HUBSPOT_API_KEY=your_hubspot_api_key
```

#### Google Forms 統合

`submitToGoogleForms()` 関数を有効化してください：

```typescript
// Google Forms の form ID を取得
// form-action="https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse"
```

#### Webhook （Zapier等）

```typescript
const response = await fetch('https://your-webhook-url.com/lead', {
  method: 'POST',
  body: JSON.stringify(leadData),
})
```

詳細は `/lib/submitLead.ts` のコメント部分を参照。

---

## 📈 デプロイ

### Vercel へのデプロイ（推奨）

Vercel は Next.js の公式ホスティングプラットフォームです。

```bash
# 1. Vercel CLI をインストール
npm install -g vercel

# 2. プロジェクトをデプロイ
vercel

# 3. プロンプトに従う
# - Project name: kajitoru-connect-lp
# - Framework: Next.js
```

**Vercel ダッシュボード経由:**
1. https://vercel.com にログイン
2. 「Add New」 → 「Project」
3. このリポジトリを選択
4. 「Deploy」

### その他のプラットフォーム

- **Netlify:** `npm run build` → `/out` フォルダをデプロイ
- **AWS Amplify:** Vercel と同様
- **自社サーバー:** `npm run build` → `npm start`

---

## 🔐 環境変数

`.env.local` ファイル（Git無視）に以下を設定してください：

```
# HubSpot統合時
NEXT_PUBLIC_HUBSPOT_API_KEY=your_key

# Google Forms統合時
NEXT_PUBLIC_GOOGLE_FORMS_URL=https://docs.google.com/forms/...

# その他のAPI
NEXT_PUBLIC_API_ENDPOINT=https://your-api.com
```

---

## 🧪 テスト

### フォーム送信テスト

1. `http://localhost:3000` にアクセス
2. フォームに入力
3. 「KAJITORUとつながる」をクリック
4. ブラウザの開発ツール（F12）で console を確認
5. 送信データが表示されることを確認

### URLパラメータテスト

```
http://localhost:3000?from=shinji&utm_campaign=test
```

console に analytics パラメータが表示されることを確認

---

## 🎯 今後の改善ポイント

### 短期（1-2週間）
- [ ] CRM統合を実装（HubSpot / 自社CRM決定後）
- [ ] OGP 用の画像を生成
- [ ] Sendgrid / Mailchimp 連携で自動メール送信
- [ ] Google Analytics 4 統合

### 中期（1か月）
- [ ] Newsletter サインアップページを追加
- [ ] 複数言語対応（日本語 / 英語）
- [ ] ダークモード対応
- [ ] メール確認フロー実装

### 長期（3か月以上）
- [ ] Corporate HP との統合
- [ ] TalentBook との CMS 連携
- [ ] API による案件一覧の動的表示
- [ ] チャットボット / ライブチャット統合

---

## 📞 サポート

### よくある質問

**Q. QRコードはどこに掲載する？**  
A. Zoom のオンライン会議背景画像内に埋め込む。詳細は Zoom背景デザイン別紙参照。

**Q. フォーム送信が「成功」しているが実際には送られていない**  
A. `submitLead.ts` の `/api/contact` エンドポイントが無いため。CRM を決定後、実装してください。

**Q. モバイル表示で崩れている**  
A. デバイスの開発ツール（F12）で確認してください。不具合報告は GitHub Issues へ。

---

## 📄 ライセンス

© KAJITORU Inc. 2026. All rights reserved.

---

## 🔄 バージョン

- **v1.0.0** - 初期リリース（2026年8月）

---

**最終更新:** 2026年8月22日
