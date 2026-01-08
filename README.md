# Pixel Legend Quiz Game (像素傳說問答遊戲)

這是一個基於 React + Vite 開發的復古像素風問答遊戲。遊戲題目來自 Google Sheets，並透過 Google Apps Script (GAS) 處理後端邏輯與成績紀錄。

![Game Screenshot](./public/screenshot.png) *(請自行將遊戲截圖放入 public 資料夾命名為 screenshot.png)*

## 🚀 專案安裝 (Installation)

1.  **下載專案**
    ```bash
    git clone <your-repo-url>
    cd pixel-game
    ```

2.  **安裝依賴**
    ```bash
    npm install
    ```

3.  **啟動開發伺服器**
    ```bash
    npm run dev
    ```

---

## 📊 Google Sheets 設定 (Database)

請建立一個新的 Google Sheet，並重新命名分頁（工作表）如下：

### 1. 工作表名稱：`題目`
請依照下方欄位順序建立標題列 (Row 1)：
| A | B | C | D | E | F | G |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ID** | **Question** | **OptionA** | **OptionB** | **OptionC** | **OptionD** | **Answer** |

### 2. 工作表名稱：`回答`
請依照下方欄位順序建立標題列 (Row 1)，程式會自動寫入資料：
| A | B | C | D | E | F | G |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ID** | **闖關次數** | **總分** | **最高分** | **第一次通關分數** | **花了幾次通關** | **最近遊玩時間** |

---

## ⚙️ Google Apps Script 設定 (Backend)

1.  在您的 Google Sheet 中，點選上方選單 **擴充功能 (Extensions)** > **Apps Script**。
2.  將 `backend/Code.gs` 的內容完整複製貼上到編輯器中（覆蓋原本的 `myFunction`）。
3.  **儲存專案** (Ctrl + S)。
4.  **部署為網路應用程式**：
    *   點擊右上角 **部署 (Deploy)** > **新增部署 (New deployment)**。
    *   **選取類型**：網頁應用程式 (Web app)。
    *   **執行身分 (Execute as)**：**我自己 (Me)**。
    *   **誰可以存取 (Who has access)**：**所有人 (Anyone)** *<-- 重要！否則前端無法呼叫*。
    *   點擊 **部署 (Deploy)**。
5.  **授權**：首次部署會要求授權，請依照指示允許存取權限。
6.  **複製網址**：部署成功後，會取得一串 `Web App URL` (以 `https://script.google.com/macros/s/...` 開頭)。

---

## 🌍 自動部署到 GitHub Pages

本專案已設定好 GitHub Actions，只要將程式碼推送到 GitHub，即可自動部署。

### 1. 建立 GitHub Repository
將本專案推送到您的 GitHub：
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <你的GitHub儲存庫網址>
git push -u origin main
```

### 2. 設定 GitHub Secrets (環境變數)
為了保護您的 Google Apps Script 網址不直接暴露在公開程式碼中，請至 GitHub 設定環境變數：

1.  進入 GitHub Repository 頁面。
2.  點擊 **Settings** > **Secrets and variables** > **Actions**。
3.  在 **Repository secrets** 區塊，點擊 **New repository secret**：
    *   **Name**: `VITE_GOOGLE_SCRIPT_URL`
    *   **Value**: 您的 Google Apps Script Web App 網址 (記得是 `/exec` 結尾)
4.  *(選用)* 如果您想調整遊戲參數，可以點擊 **Variables** 頁籤 > **New repository variable**：
    *   `VITE_PASS_THRESHOLD` (例如: 3)
    *   `VITE_QUESTION_COUNT` (例如: 5)

### 3. 設定 GitHub Pages 來源
1.  等待 Actions 執行完畢（第一次 push 後會自動執行）。
2.  回到 **Settings** > **Pages**。
3.  在 **Build and deployment** > **Branch** 選擇 `gh-pages` 分支。
4.  儲存後，上方會出現您的專案網址 (如 `https://username.github.io/repo-name/`)。

---

## 🔗 連接前端與後端 (本地開發模式)

1.  在專案根目錄建立 `.env` 檔案 (如果已有 `.env.example` 可複製改名)。
2.  填入剛剛取得的 Web App URL：

```ini
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/你的部署ID/exec
VITE_PASS_THRESHOLD=3
VITE_QUESTION_COUNT=5
```

*   `VITE_PASS_THRESHOLD`: 答對幾題算過關。
*   `VITE_QUESTION_COUNT`: 每次遊玩隨機抽幾題。

---

## 📝 測試題庫 (Copy & Paste)

您可以直接複製以下 10 筆「生成式 AI 基礎知識」題目到您的 Google Sheet **`題目`** 工作表中（從 A2 儲存格開始貼上）：

| ID | Question | OptionA | OptionB | OptionC | OptionD | Answer |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | ChatGPT 是由哪家公司開發的？ | Google | Microsoft | OpenAI | Meta | C |
| 2 | LLM 代表什麼縮寫？ | Small Language Model | Large Language Model | Long Learning Mode | Local Language Machine | B |
| 3 | 在生成式 AI 中，「幻覺 (Hallucination)」是指什麼？ | AI 生成看起來真實但錯誤的資訊 | AI 拒絕回答問題 | AI 生成圖片的速度太慢 | AI 變得有自我意識 | A |
| 4 | 以下哪個模型主要用於將文字生成圖片？ | GPT-4 | Midjourney | BERT | Claude | B |
| 5 | 「Prompt Engineering」的主要目的是什麼？ | 優化硬體效能 | 設計更好的提示詞引導 AI | 編寫 Python 程式碼 | 訓練神經網絡 | B |
| 6 | 下列何者是 Transformer 模型架構的核心機制？ | 卷積 (Convolution) | 注意力機制 (Self-Attention) | 遞歸 (Recurrence) | 池化 (Pooling) | B |
| 7 | 在 API 設定中，調整哪個參數可以控制 AI 回答的隨機創造性？ | Temperature | Max Tokens | Top P | Stop Sequence | A |
| 8 | 當我們說 AI 是「多模態 (Multimodal)」時，意思是什麼？ | 只能處理文字 | 只能處理圖片 | 能理解並生成多種媒體(圖/文/聲) | 需要多台電腦運算 | C |
| 9 | 為了讓 LLM 擁有特定領域知識，除了微調 (Fine-tuning) 外，常用的技術是？ | RAG (檢索增強生成) | RPG (角色扮演) | RNG (隨機數生成) | RAM (隨機存取記憶體) | A |
| 10 | 在 AI 訓練過程中，Token 通常指的是什麼？ | 此加密貨幣 | 用戶的登入憑證 | 文本處理的最小單位 | 訓練的時間單位 | C |
