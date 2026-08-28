# 🚀 KAJITORU CONNECT LP - AWS EC2 デプロイ手順書

**対象:** 村嶋さん  
**難易度:** ⭐⭐（中級）  
**所要時間:** 約 45分～1時間  
**費用:** ¥0（無料枠利用）

---

## 📋 前提条件（デプロイ前に確認）

以下の環境が整っているか確認してください：

- [ ] AWS アカウントあり（ログイン可能）
- [ ] AWS 無料枠を使用可能（12ヶ月以内）
- [ ] IAM ユーザーで EC2・Route 53 アクセス権がある
- [ ] SSH キーペア作成済み（または新規作成する）
- [ ] ターミナル操作に慣れている（Linux/Mac）
- [ ] Git クライアントがインストール済み（またはGitHub）

---

## ⏱️ 所要時間の目安

| フェーズ | 内容 | 所要時間 |
|---|---|---|
| **Phase 1** | AWS 準備（EC2 起動、キー設定） | 10分 |
| **Phase 2** | サーバー初期設定（Node.js インストール） | 10分 |
| **Phase 3** | アプリケーションデプロイ | 10分 |
| **Phase 4** | Nginx 設定（リバースプロキシ） | 10分 |
| **Phase 5** | PM2 設定（永続化） | 5分 |
| **Phase 6** | DNS 設定（Route 53） | 5分 |
| **テスト・確認** | ブラウザでアクセス確認 | 5分 |
| **トラブル対応** | 問題があった場合 | +15分 |
| **合計** | | 45～60分 |

---

## 🎯 最終成果物

デプロイ完了後：

```
✅ https://connect.kajitoru.jp で本番アプリが動作
✅ https (SSL/TLS) で安全
✅ 月額 ¥0～500 で運用
✅ フォーム送信時に console に ログ出力
```

---

# 📖 詳細手順

## **Phase 1: AWS EC2 インスタンス起動（10分）**

### Step 1-1: AWS マネジメントコンソールにログイン

```
https://console.aws.amazon.com
→ IAM ユーザーでログイン
```

### Step 1-2: EC2 ダッシュボードを開く

```
サービス検索 → EC2
左メニュー → インスタンス
「インスタンスを起動」ボタン
```

### Step 1-3: インスタンス起動設定

**AMI 選択:**
```
Amazon Linux 2023 （Amazon Linux 2 でもOK）
x86_64
無料枠対象マーク ✓ が付いているか確認
```

**インスタンスタイプ:**
```
t2.micro ← 必ずこれを選択
無料枠対象
vCPU: 1
メモリ: 1GB
```

**ネットワーク設定:**
```
VPC: デフォルト
サブネット: デフォルト
自動割り当てパブリック IP: 有効
```

**セキュリティグループ:**
```
新しいセキュリティグループを作成

インバウンドルール:
┌─────────────────────────────────┐
│ タイプ    │ プロトコル │ ポート │ ソース │
├─────────────────────────────────┤
│ SSH       │ TCP       │ 22    │ 0.0.0.0/0 │
│ HTTP      │ TCP       │ 80    │ 0.0.0.0/0 │
│ HTTPS     │ TCP       │ 443   │ 0.0.0.0/0 │
└─────────────────────────────────┘

セキュリティグループ名: kajitoru-connect-sg
```

**ストレージ:**
```
EBS ボリュームサイズ: 8GB（無料枠）
ボリュームタイプ: gp2
削除時に削除: チェック
```

**キーペア:**

```
新しいキーペアを作成する
キーペア名: kajitoru-connect-key
キーペアタイプ: RSA
秘密キーファイル形式: .pem（Mac/Linux の場合）
                     .ppk（Windows + PuTTY の場合）

「キーペアを作成」
→ kajitoru-connect-key.pem がダウンロードされる
→ 安全な場所に保存してください（✨ 重要 ✨）
```

**インスタンス詳細:**
```
詳細オプションは既定値でOK
```

### Step 1-4: 起動

```
「インスタンスを起動」ボタンをクリック
```

**確認:**
```
インスタンスが起動中...
ステータス: 「実行中」になるまで待つ（1～2分）
パブリック IPv4 アドレスをメモ（例: 54.123.45.67）
```

✅ **Phase 1 完了**

---

## **Phase 2: サーバー初期設定（10分）**

### Step 2-1: EC2 インスタンスに SSH 接続

**Mac / Linux:**

```bash
# キーペアのパーミッション設定
chmod 400 ~/kajitoru-connect-key.pem

# SSH 接続
ssh -i ~/kajitoru-connect-key.pem ec2-user@54.123.45.67

# プロンプトが出たら "yes" と入力
# Welcome to Amazon Linux 2 が表示されれば成功
```

**Windows (PowerShell):**

```powershell
# PuTTYgen で .pem を .ppk に変換（済みの場合はスキップ）
# PuTTY で接続
# ホスト: ec2-user@54.123.45.67
# SSH キー: kajitoru-connect-key.ppk
```

### Step 2-2: システムアップデート

```bash
sudo yum update -y
sudo yum install -y git curl
```

### Step 2-3: Node.js インストール

```bash
# nvm（Node.js バージョン管理）をインストール
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# シェルを再読み込み
source ~/.bashrc

# Node.js 18 をインストール
nvm install 18
nvm use 18

# バージョン確認
node -v   # v18.x.x が表示される
npm -v    # 9.x.x が表示される
```

### Step 2-4: Nginx インストール

```bash
sudo amazon-linux-extras install nginx1 -y
sudo systemctl start nginx
sudo systemctl enable nginx

# 確認
sudo systemctl status nginx
# Active (running) と表示される
```

### Step 2-5: PM2 グローバルインストール

```bash
sudo npm install -g pm2
pm2 startup
sudo env PATH=$PATH:/home/ec2-user/.nvm/versions/node/v18.x.x/bin /home/ec2-user/.nvm/versions/node/v18.x.x/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user
```

✅ **Phase 2 完了**

---

## **Phase 3: アプリケーションデプロイ（10分）**

### Step 3-1: ホームディレクトリで作業

```bash
cd ~
```

### Step 3-2: プロジェクトのクローン（GitHub の場合）

```bash
# GitHub から clone（または ZIP ダウンロード）
git clone https://github.com/your-repo/kajitoru-connect-lp.git
cd kajitoru-connect-lp
```

**OR ファイルを直接アップロード:**

```bash
# ローカルから scp でアップロード
scp -i ~/kajitoru-connect-key.pem -r ./kajitoru-connect-lp ec2-user@54.123.45.67:~/

# サーバーで確認
cd ~/kajitoru-connect-lp
```

### Step 3-3: 依存インストール & ビルド

```bash
npm install
npm run build

# 確認
ls -la .next
# ディレクトリが作成されていれば成功
```

### Step 3-4: アプリケーション動作確認（ローカルテスト）

```bash
npm start

# ターミナルに以下が表示される:
# ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

**別のターミナルウィンドウで curl テスト:**

```bash
curl http://localhost:3000

# HTML が返ってくれば成功
```

**Ctrl+C で停止**

✅ **Phase 3 完了**

---

## **Phase 4: Nginx リバースプロキシ設定（10分）**

### Step 4-1: Nginx 設定ファイル編集

```bash
sudo vi /etc/nginx/conf.d/kajitoru.conf
```

**以下の内容を入力:**

```nginx
upstream next_app {
    server localhost:3000;
    keepalive 64;
}

server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name _;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    location / {
        proxy_pass http://next_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    error_page 404 /404.html;
        location = /40x.html {
    }

    error_page 500 502 503 504 /50x.html;
        location = /50x.html {
    }
}
```

**保存:**
```
:wq
```

### Step 4-2: Nginx 設定テスト & 再起動

```bash
sudo nginx -t
# nginx: configuration file /etc/nginx/nginx.conf test is successful

sudo systemctl restart nginx
sudo systemctl status nginx
# Active (running) と表示される
```

### Step 4-3: ブラウザからアクセステスト

```
EC2 パブリック IPv4 アドレス（例: 54.123.45.67）をブラウザに入力
http://54.123.45.67

KAJITORU CONNECT LP のページが表示される
```

✅ **Phase 4 完了**

---

## **Phase 5: PM2 で永続化（5分）**

### Step 5-1: PM2 でアプリ起動

```bash
cd ~/kajitoru-connect-lp
pm2 start npm --name "kajitoru-connect" -- start
```

### Step 5-2: PM2 ログ確認

```bash
pm2 logs kajitoru-connect

# ターミナルに以下が表示される:
# 0|kajitoru-co| ready - started server on 0.0.0.0:3000
```

**Ctrl+C で終了**

### Step 5-3: PM2 自動起動設定

```bash
pm2 startup
# コマンド出力を実行（sudo で始まる）

pm2 save
# 確認
pm2 status
```

### Step 5-4: サーバー再起動で確認

```bash
sudo reboot

# 再接続（1分待つ）
ssh -i ~/kajitoru-connect-key.pem ec2-user@54.123.45.67

# PM2 状態確認
pm2 status
# online と表示されれば、自動起動が成功
```

✅ **Phase 5 完了**

---

## **Phase 6: DNS 設定（Route 53）（5分）**

### Step 6-1: Route 53 コンソール開く

```
AWS マネジメントコンソール
→ Route 53
左メニュー → ホストゾーン
```

### Step 6-2: ホストゾーン確認

```
ドメイン: kajitoru.jp （既にあるはず）
をクリック
```

### Step 6-3: レコード作成

```
「レコードを作成」ボタン

レコード名: connect
タイプ: A（IPv4）
値: EC2 パブリック IPv4 アドレス（例: 54.123.45.67）
TTL: 300

「レコードを作成」
```

### Step 6-4: DNS 反映確認（3～5分待つ）

```bash
nslookup connect.kajitoru.jp

# 以下が表示される:
# Address: 54.123.45.67

# または
dig connect.kajitoru.jp
```

✅ **Phase 6 完了**

---

## **🎉 テスト & 確認（5分）**

### テスト 1: ブラウザアクセス

```
https://connect.kajitoru.jp
```

**確認項目:**
- [ ] ページが表示される
- [ ] Hero セクションが表示される
- [ ] フォームが入力できる
- [ ] スマホ表示でも正常か

### テスト 2: フォーム送信

```
ブラウザ F12 → Console を開く

フォームに入力:
  名前: テスト太郎
  メール: test@example.com
  興味: 複業
  
「KAJITORUとつながる」クリック

Console に以下が出力される:
  📊 Lead Data Submitted: {
    name: "テスト太郎",
    email: "test@example.com",
    ...
  }
```

### テスト 3: URLパラメータ計測

```
https://connect.kajitoru.jp?from=shinji&utm_source=zoom

F12 → Console を開く

Analytics Params が出力される:
  📊 Analytics Params: {
    from: "shinji",
    utm_source: "zoom"
  }
```

✅ **全テスト完了**

---

## 🔍 ログ確認・トラブルシューティング

### PM2 ログ確認

```bash
pm2 logs kajitoru-connect

# リアルタイムログ表示
# Ctrl+C で終了
```

### Nginx エラーログ

```bash
sudo tail -f /var/log/nginx/error.log

# リアルタイムエラーログ
```

### ディスク使用量確認

```bash
df -h

# 利用状況を確認
# 無料枠 8GB の使用状況
```

### メモリ使用量確認

```bash
free -h
pm2 monit
```

---

## 📋 デプロイ後のチェックリスト

デプロイ完了後、以下を確認してください：

### サーバー側
- [ ] EC2 インスタンスが running 状態
- [ ] Nginx が active (running)
- [ ] PM2 が online 状態
- [ ] プロセスメモリ < 500MB
- [ ] CPU 使用率 < 10%

### DNS / アクセス
- [ ] `connect.kajitoru.jp` で接続可能
- [ ] `http://connect.kajitoru.jp` で http://s に自動リダイレクト
- [ ] ブラウザで正常に表示される
- [ ] モバイル表示で正常か

### 機能
- [ ] Hero セクション表示
- [ ] フォーム入力可能
- [ ] フォーム送信 → console ログ出力
- [ ] URLパラメータ計測（?from=test など）
- [ ] 外部リンク全て正常

### 運用
- [ ] AWS 無料枠内か確認
- [ ] セキュリティグループ設定が正しいか
- [ ] SSH キー安全に管理されているか
- [ ] バックアップ計画（あれば）

---

## 📞 よくある問題と解決方法

### ❌ 「接続がタイムアウトした」

```bash
# セキュリティグループを確認
aws ec2 describe-security-groups --group-names kajitoru-connect-sg

# ポート 80, 443 が開いているか確認
# インバウンドルール:
# HTTP (80) from 0.0.0.0/0
# HTTPS (443) from 0.0.0.0/0
```

### ❌ 「npm install でエラー」

```bash
# キャッシュをクリア
npm cache clean --force
npm install
```

### ❌ 「PM2 で起動しない」

```bash
# PM2 ログを確認
pm2 logs kajitoru-connect

# アプリ手動起動でテスト
cd ~/kajitoru-connect-lp
npm start

# エラーメッセージを確認
```

### ❌ 「ディスク容量不足」

```bash
# ディスク確認
df -h

# node_modules や .next をクリア
cd ~/kajitoru-connect-lp
rm -rf node_modules .next
npm install
npm run build
```

### ❌ 「Nginx が起動しない」

```bash
# Nginx 設定テスト
sudo nginx -t

# エラーメッセージを確認
# 構文エラーあれば修正
```

---

## 🔐 セキュリティチェック

デプロイ完了後：

```bash
# SSH キーの権限確認
ls -la ~/kajitoru-connect-key.pem
# -r--------  になっているか確認

# Nginx セキュリティヘッダ確認
curl -I https://connect.kajitoru.jp
# X-Frame-Options: DENY が返ってくるか

# SSL/TLS 確認（将来 HTTPS 時）
# A+ rating の取得を推奨
```

---

## 📊 運用メモ

### 月次チェック

```bash
# AWS 無料枠の利用状況確認
# AWS マネジメントコンソール → Billing

# サーバー リソース利用状況
free -h
df -h
pm2 monit
```

### トラフィック増加時

```
月間 10,000 PV を超える場合:
  EC2 を t2.small にアップグレード
  or
  Amplify への移行を検討
```

### データベース連携（将来）

```
CRM 統合時:
  1. RDS (MySQL / PostgreSQL) 構築
  2. /api/contact エンドポイント実装
  3. submitLead.ts を更新
```

---

## 🎓 参考資料

- AWS EC2 ドキュメント: https://docs.aws.amazon.com/ec2/
- Nginx リバースプロキシ: https://nginx.org/en/docs/
- PM2 ドキュメント: https://pm2.keymetrics.io/
- Next.js デプロイ: https://nextjs.org/docs/deployment

---

## ✅ 完了チェック

**全ステップ完了後:**

- [ ] `https://connect.kajitoru.jp` でアクセス可能
- [ ] フォーム送信 → console ログ出力
- [ ] URLパラメータ計測確認
- [ ] PM2 で自動起動確認
- [ ] Nginx リバースプロキシ動作確認
- [ ] AWS 無料枠内で運用中

---

## 📞 サポート・質問

何か問題が発生した場合：

1. **ログを確認**
   ```bash
   pm2 logs kajitoru-connect
   sudo tail -f /var/log/nginx/error.log
   ```

2. **AWS CloudWatch で監視**
   - CPU 使用率
   - ネットワーク
   - ディスク容量

3. **白井さんに報告**
   - エラーメッセージ
   - ステップ（どこまで完了したか）
   - ログ出力結果

---

## 🎉 デプロイ完了！

**次のステップ:**

1. QRコード生成
   ```
   https://connect.kajitoru.jp?from=shinji&utm_source=zoom&utm_medium=qr
   ```

2. Zoom背景に埋め込み

3. オンライン会議で利用開始

4. 流入計測開始

---

**ご質問があれば、いつでもお知らせください。**

Happy deployment! 🚀
