# yt-kb-pages

YT-KB · YouTube 知識庫 — 把值得一看再看的 YouTube 教學，整理成好讀的網頁筆記。

線上版：https://neoreload2025.github.io/yt-kb-pages/

## 收錄頁面

| 影片 | 分類 | 筆記 |
|---|---|---|
| 15 分鐘學完 CLAUDE.md：從入門到精通 | AI 工作流 | [videos/claude-md.html](./videos/claude-md.html) |
| Obsidian 裝了卻不會用？我這樣用它做完一支影片｜實戰分享 | 知識管理 | [videos/LCIPEQb1V0Q.html](./videos/LCIPEQb1V0Q.html) |
| 便宜的開源模型 + 免費 harness，能取代付費 coding 工具嗎？ | AI 工作流 | [videos/glm-flash-vs-paid.html](./videos/glm-flash-vs-paid.html) |

- 內容來源：YouTube 教學影片（帶 CC 字幕）→ 摘要 → 網頁
- 每個影片一頁，由外聘模型（M3）製作 + N550 審查
- 本 repo 只放「成品網頁」，pipeline 工具與決策紀錄在另一個 repo（yt-knowledge-pipeline）

## 新增一篇筆記的 SOP

1. 複製 `TEMPLATE.html` 到 `videos/<video-id>.html`（或語意名稱如 `claude-md.html`）
2. 改四個地方：
   - `<title>`：影片標題 | YT-KB
   - `<meta name="description">`：一句話摘要
   - og 區塊的 `og:title` / `og:description` / `og:url`
   - `<main>` 內文
3. 到 `index.html` 的卡片區加一張卡片（標題、簡介、連結、tag）
4. push 後 GitHub Pages 自動部署

## 技術

- 純靜態 HTML/CSS/JS，無框架、無建置步驟
- Light/Dark 主題（localStorage 記憶 + anti-FOUC）
- 共用樣式：`shared.css`；共用行為：`shared.js`
