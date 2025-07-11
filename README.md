# Kids Pocket Points

**子どものお手伝いをポイントで管理！**  
子どものお手伝いをポイントで管理！
楽しく継続できる「ポイント制おこづかい管理アプリ」です。
子供が現金を持ち歩かなくても、その場でポイントを換金して、ほしいものが買える。
リアルタイムで増減が管理できるので便利です。
必要分を換金して、先に渡しても○。

自己学習の過程で、実際に自分で使うアプリを考えて制作しました。

##  デモサイト

 https://natsu-12.github.io/kids-pocket-points/
※GitHub Pages で公開中

---

## ✨ 主な機能

 ポイントの加算・使用（10pt 単位）
 履歴の記録・表示（理由や日付付き）
 目標の設定と、達成までの残りポイント表示
 月末に自動保存、月初に累計ポイントのアラート
-  データはローカルストレージに保存（リロードしても安心）

---

## 🛠 使用技術

- React (Hooks)
- Vite
- CSS3（レスポンシブ対応）
- localStorage（データ永続化）

---

## 💻 ローカルでの起動方法

```bash
git clone https://natsu-12.github.io/kids-pocket-points/
cd kids-pocket-points
npm install
npm run dev