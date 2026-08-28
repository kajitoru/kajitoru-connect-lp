【件名】KAJITORU CONNECT LP - AWS EC2 デプロイ依頼

村嶋さんへ

お疲れ様です、白井です。

Zoom背景のQRコードから流入するランディングページ「KAJITORU CONNECT」の AWS デプロイをお願いしたいのですが、対応いただけますでしょうか。

---

## 📋 依頼内容

**プロジェクト:** KAJITORU CONNECT LP - AWS EC2 デプロイ
**対象:** ランディングページ（Next.js）
**デプロイ先:** AWS EC2 t2.micro（無料枠）
**所要時間:** 約 45～60分
**月額コスト:** ¥0～500（AWS 無料枠利用）

---

## 🚀 環境・前提条件

以下の環境が整っていることを確認した上でデプロイしてください：

- [ ] AWS アカウントにログイン可能
- [ ] IAM ユーザーが EC2・Route 53 アクセス権あり
- [ ] SSH クライアント（Mac は標準、Windows は PuTTY など）
- [ ] Git コマンドラインツール

---

## 📖 デプロイ手順

詳細な手順書を作成しました。以下に従ってデプロイをお願いします：

**📄 AWS_DEPLOY_FOR_MURAJIMA.md**
（GitHub リポジトリに含まれています）

---

## 🔗 リポジトリ情報

**GitHub リポジトリ:**
```
https://github.com/your-org/kajitoru-connect-lp
```

**クローン方法:**
```bash
git clone https://github.com/your-org/kajitoru-connect-lp.git
cd kajitoru-connect-lp
```

**ファイル構成:**
```
kajitoru-connect-lp/
├── app/                          # Next.js ページ
├── components/                   # React コンポーネント
├── lib/                          # ユーティリティ（URL・分析・送信処理）
├── styles/                       # CSS
├── package.json                  # NPM パッケージ定義
├── tailwind.config.js            # Tailwind 設定
├── next.config.js                # Next.js 設定
├── AWS_DEPLOY_FOR_MURAJIMA.md    # ← デプロイ手順書（これを参照）
└── その他設定ファイル
```

---

## 📌 デプロイ手順（簡略版）

詳細は `AWS_DEPLOY_FOR_MURAJIMA.md` を参照していただきたいのですが、概要は以下の通りです：

### **Phase 1: AWS 準備（10分）**
- EC2 t2.micro インスタンス起動
- セキュリティグループ設定（SSH / HTTP / HTTPS）
- キーペア取得

### **Phase 2: サーバー初期設定（10分）**
- Node.js 18 インストール（nvm 経由）
- Nginx インストール・起動
- PM2 インストール

### **Phase 3: アプリケーションデプロイ（10分）**
- GitHub からリポジトリクローン
- npm install & npm run build
- 動作確認

### **Phase 4: Nginx リバースプロキシ設定（10分）**
- Nginx 設定ファイル編集
- :3000 → :80 へのプロキシ設定
- 再起動確認

### **Phase 5: PM2 自動起動設定（5分）**
- PM2 で アプリケーション起動
- 自動起動登録

### **Phase 6: DNS 設定（5分）**
- Route 53 でレコード作成
- connect.kajitoru.jp → EC2 パブリック IP 割り当て

### **テスト・確認（5分）**
- ブラウザで https://connect.kajitoru.jp にアクセス
- フォーム送信・URLパラメータ計測テスト

---

## ✅ 完了確認項目

デプロイ完了後、以下を確認して報告をお願いします：

- [ ] https://connect.kajitoru.jp でアクセス可能
- [ ] Hero セクション（ファーストビュー）が表示される
- [ ] フォームが入力・送信できる
- [ ] フォーム送信後、ブラウザ console にログが出力される
  ```
  📊 Lead Data Submitted: {
    name: "テスト太郎",
    email: "test@example.com",
    ...
  }
  ```
- [ ] URLパラメータが計測される（?from=shinji でテスト）
- [ ] モバイル表示でも正常か
- [ ] PM2 status が online 状態

---

## 💡 ポイント

### 重要な注意事項：

1. **キーペア（.pem）は絶対に紛失しないこと**
   - 失くしたら EC2 にアクセス不可
   - GitHub に push してはいけません

2. **セキュリティグループの設定**
   - SSH (22) は信頼できる IP のみに制限推奨
   - HTTP/HTTPS (80/443) は全許可でOK

3. **AWS 無料枠の確認**
   - 初年度はほぼ無料
   - 2年目以降も t2.micro なら月 ¥1,500～2,000

4. **トラブル時のログ確認コマンド**
   ```bash
   # PM2 ログ
   pm2 logs kajitoru-connect
   
   # Nginx エラーログ
   sudo tail -f /var/log/nginx/error.log
   ```

---

## 📞 トラブル時の対応

手順書に「トラブルシューティング」セクションがあります。

以下のような問題が発生した場合、まずそこを参照してください：

- 「接続がタイムアウトした」
- 「npm install でエラー」
- 「PM2 で起動しない」
- 「ディスク容量不足」
- 「Nginx が起動しない」

**解決しない場合は、以下を送ってください：**

1. エラーメッセージ（スクリーンショット or テキスト）
2. ログ出力結果
3. デプロイのどこまで完了したか
4. 使用しているターミナルの OS（Mac / Linux / Windows）

それに基づいて対応させていただきます。

---

## 🎯 デプロイ後の次ステップ

デプロイ完了後、以下を実施予定です：

1. **QRコード生成**
   ```
   https://connect.kajitoru.jp?from=shinji&utm_source=zoom&utm_medium=qr&utm_campaign=online_meeting_2026
   ```

2. **Zoom背景に埋め込み**

3. **オンライン会議で運用開始**

4. **流入計測・レポート作成**

---

## 📅 スケジュール

**本日:** 本メール送信（13:00）
**明日～明後日:** デプロイ実施（45～60分）
**完了報告:** Slack または メール
**本番運用開始:** 翌週月曜日（予定）

---

## 📎 参考資料

GitHub リポジトリ内に以下の資料があります：

- **AWS_DEPLOY_FOR_MURAJIMA.md** ← メインの手順書（必須）
- SETUP_GUIDE.md ← ファイル配置方法
- README.md ← プロジェクト説明
- FILE_CHECKLIST.txt ← チェックリスト
- IMPLEMENTATION_SUMMARY.md ← 実装完了サマリー

---

## 📧 連絡方法

ご不明な点やトラブルがある場合は、Slack でお気軽にお知らせください。

**Slack:** @白井 宛に mention でも、DM でも OK です。

---

## ✨ 最後に

このランディングページは、Zoom背景のQRコード経由で流入するフリーランス・複業人材とのタッチポイントになります。完成したら、かなり面白い施策になると思っています。

手数ですが、デプロイのほう、よろしくお願いいたします。

何かご質問があれば、いつでもお知らせください。

---

**村嶋さんへの依頼内容をまとめると：**

1. ✅ GitHub からリポジトリをクローン
2. ✅ AWS_DEPLOY_FOR_MURAJIMA.md に従ってデプロイ
3. ✅ https://connect.kajitoru.jp で動作確認
4. ✅ 完了報告

**所要時間:** 45～60分  
**月額コスト:** ¥0～500  
**難易度:** 中級

よろしくお願いいたします。

---

**白井 覚三**  
**代表取締役 & グループ CEO**  
**株式会社カジトル**
