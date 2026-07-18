# ホームページ制作会社LPサイト (エディトリアル・マガジン案)

本プロジェクトは、塩尻市・松本市エリアの個人店や小規模事業者に向けたホームページ制作会社のランディングページ（LP）サイトです。AstroとTailwind CSS、GSAPを採用し、手書きのエディトリアルマガジン風デザインと、Core Web Vitalsを損なわない表示速度、高いアクセシビリティを両立しています。

---

## 🚀 技術スタックと採用バージョン

- **Astro**: `^5.2.2` (Content Layer API 対応)
- **Tailwind CSS**: `^4.3.2` (@tailwindcss/vite 統合)
- **GSAP (with ScrollTrigger)**: `^3.12.5` (スクロール連動演出)
- **Lenis**: `^1.1.20` (慣性スムーススクロール)
- **Node.js**: `v18.x` / `v20.x` 以上推奨

---

## 🛠️ セットアップとコマンド一覧

プロジェクトディレクトリのルートで、以下のコマンドを実行します。

| コマンド | アクション |
| :--- | :--- |
| `npm install` | 必要な依存パッケージのインストール |
| `npm run dev` | ローカル開発サーバーを `http://localhost:4321` で起動 |
| `npm run build` | 本番用の静的ファイルを `./dist/` に出力（最適化画像も同時ビルド） |
| `npm run preview` | ビルドした静的サイトをローカル環境でプレビュー起動 |

---

## 📁 ディレクトリ構成

```text
/
├── public/                    # 静的アセット（画像、favicon等）
│   └── assets/                # 生成画像（マガジンヒーロー画像、スケッチ図等）
├── src/
│   ├── assets/                # 画像アセット（必要に応じて格納）
│   ├── components/            # LPの各セクションコンポーネント
│   │   ├── Header.astro       # ヘッダー（モバイルメニュー＆CTA含む）
│   │   ├── Hero.astro         # ファーストビュー（LCP考慮）
│   │   ├── Summary.astro      # 特徴要約（アシンメトリーTOC風）
│   │   ├── Problems.astro     # お悩み（手書き付箋風）
│   │   ├── System.astro       # 仕組み（無料サンプル図解）
│   │   ├── Reasons.astro      # 選ばれる理由（アシンメトリー段違い）
│   │   ├── Benefits.astro     # メリット（以前と導入後の対比スクラップ）
│   │   ├── Flow.astro         # 制作の流れ（お客様の作業を強調）
│   │   ├── Pricing.astro      # 料金（初期0円、月額、含まれるもの）
│   │   ├── FAQ.astro          # よくある質問（details/summaryアコーディオン）
│   │   ├── Contact.astro      # お問い合わせ（フォーム、LINE友達追加）
│   │   └── Footer.astro       # フッター（事業者情報含む）
│   ├── content/               # コンテンツデータ（Markdown）
│   │   ├── reasons/           # 選ばれる理由
│   │   ├── benefits/          # 行動が変わるメリット
│   │   ├── flow/              # 制作の流れ
│   │   ├── faq/               # よくある質問
│   │   └── pricing-includes/  # 月額料金に含まれるもの
│   ├── data/
│   │   └── site-data.json     # SEO、連絡先、事業者情報、料金の一元管理設定
│   ├── layouts/
│   │   └── Layout.astro       # 共通レイアウト（SEO、JSON-LD、Lenis、A11y対応）
│   ├── pages/
│   │   ├── index.astro        # メインLP
│   │   └── privacy-policy.astro# プライバシーポリシー（プレースホルダー）
│   └── styles/
│       └── global.css         # グローバルCSS（Tailwindテーマ、手書き装飾等）
├── src/content.config.ts      # Content Collections スキーマ定義 (Astro v5+)
├── astro.config.mjs           # Astroの設定（Tailwind, Sitemap, siteURL）
└── package.json               # 依存関係定義
```

---

## 📝 編集・管理・更新方法

ノンエンジニアでもコンテンツの更新や本番情報への差し替えができるよう、データが明確に分離されています。

### 1. 未確定情報・プレースホルダーの置き換え
[src/data/site-data.json](file:///c:/Users/TANAKA%20SOTA/Desktop/hs_01/src/data/site-data.json) 内に、未確定のプレースホルダーをすべてまとめてあります。本番ドメインや事業者情報が確定したら、このファイルの以下の該当部分を上書きしてください。

- `"site.url"`: 本番ドメイン (`https://[YOUR_DOMAIN_PLACEHOLDER]`)
- `"contact.lineUrl"`: 公式LINEアカウントの友達追加URL
- `"contact.lineAccountName"`: 表示されるLINEアカウント名
- `"contact.formSubmitUrl"`: フォーム送信先のエンドポイント
- `"company"`: 屋号、代表者名、住所、電話番号のプレースホルダー

### 2. SEO情報・ドメインの変更
- **メタデータ**: [src/data/site-data.json](file:///c:/Users/TANAKA%20SOTA/Desktop/hs_01/src/data/site-data.json) の `site.title` および `site.description` を書き換えると、LP全体のSEOメタタグが自動更新されます。
- **Sitemap用ドメインの変更**: [astro.config.mjs](file:///c:/Users/TANAKA%20SOTA/Desktop/hs_01/astro.config.mjs) の `site: 'https://example.com'` を、本番ドメイン（例: `site: 'https://shiojiri-hp.com'`）に書き換えてからビルドすると、sitemap-index.xml が正しいドメインで自動生成されます。

### 3. テキストコンテンツの更新
各セクションの文章（FAQ、強み、制作の流れなど）は、[src/content/](file:///c:/Users/TANAKA%20SOTA/Desktop/hs_01/src/content/) 配下の各フォルダに格納されている `.md`（マークダウン）ファイルを編集するだけで変更できます。
各ファイルの上部にある `sortOrder`（数字）を変更すると、画面に表示される順序を調整することができます。

---

## 🎨 アニメーションと演出の狙い

本サイトは「手書きのエディトリアルマガジン風デザイン（手書きぬくもり × 海外雑誌の大胆さ）」を表現するため、以下の演出を採用しています。

- **ファーストビュー**: 雑誌の表紙のように配置されたイメージがホバーやスクロールでわずかに歪み、手書きのマーカーやバッジがダイナミックに飛び出します。
- **スクロール連動 (GSAP ScrollTrigger)**:
  - ページスクロールに合わせ、付箋風のお悩みがノートの上に時間差で落ちてくる（ばらまかれる）アニメーション。
  - 「制作の流れ」のタイムラインに沿って、スクロール量と完全に同期して進行ラインが伸びていくビジュアル演出。
- **慣性スクロール (Lenis)**:
  - 紙の雑誌を指でめくるような滑らかで没入感のあるスクロールを提供。

### パフォーマンスとアクセシビリティへの配慮（最優先事項）
1. **LCP保護**: ファーストビューの主要テキストは、表示スピードを損なわないよう、一切のJavaScriptに依存せず、HTML/CSSのみで即時表示されます。
2. **GSAP / Lenis の遅延ロード**: `IntersectionObserver` により、ファーストビューより下のセクションが画面に近づいた時点で動的に `import()` してスクリプトを初期化します。これにより、初期ロード時のJS実行時間を最小化し、Core Web Vitalsを最適に保ちます。
3. **prefers-reduced-motion対応**: ユーザーの端末設定で「視覚効果を減らす」が有効な場合、すべてのGSAP、Lenis、バウンド、回転、フェードのアニメーションが自動的に停止し、情報欠落のない安全な静的表示にフォールバックされます。

---

## ☁️ Cloudflare Pages へのデプロイ手順

Cloudflare PagesはGitHubと連携した自動ビルド＆デプロイに最適です。

1. **GitHubリポジトリの作成**:
   - ローカルのプロジェクトをGitHubの非公開（Private）または公開（Public）リポジトリにプッシュします。
2. **Cloudflareダッシュボードにログイン**:
   - `Workers & Pages` > `Create application` > `Pages` タブを選択し、`Connect to Git` をクリックします。
3. **リポジトリの選択と設定**:
   - プッシュしたGitHubリポジトリを選択します。
   - `Build settings` で以下を選択・入力します：
     - **Framework preset**: `Astro`
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
4. **デプロイ**:
   - `Save and Deploy` をクリックすると自動ビルドが走り、数分でURLが発行されます。以降は、GitHubのmainブランチにプッシュするだけで自動ビルドデプロイが行われます。
