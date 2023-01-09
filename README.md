# attendance-system-vue  
<code><img width="10%" src="https://www.vectorlogo.zone/logos/vuejs/vuejs-ar21.svg"></code> 
<code><img width="10%" src="https://www.vectorlogo.zone/logos/getbootstrap/getbootstrap-ar21.svg"></code> 
<code><img width="10%" src="https://www.vectorlogo.zone/logos/google_maps/google_maps-ar21.svg"></code> 

attendance-system 是一個考勤記錄系統。使用者(user)可以用 GPS 打卡、QRcode 打卡；管理者(admin)可以管理使用者及出勤紀錄。本專案採用前後分離方式進行開發，這個 repo 是前端部分，使用 NodeJS + [Vue3](https://vuejs.org/) 並以 Composition API 方式撰寫。  
* 【[後端 repo 連結](https://github.com/ritachien/attendance-system-express)】 attendance-system-express  

詳細的專案介紹請至 [Wiki](https://github.com/ritachien/attendance-system-vue/wiki) 查看!

## Demo  
* [Demo 連結](https://attendance-system-vue.vercel.app/)  
* 可用種子帳號進行登入，管理者 1 名、使用者 10 名(user1~user10)。  
* 測試時，`user1` 帳號請勿修改帳號/密碼，其他 user 請在測試後改回預設帳號/密碼。  
  ```js
  // admin
  {
    account: admin,
    password: tiadmin,
  }

  // users
  {
    account: `user${i}`,  // example: user10
    password: titaner,
  }
  ```
* 因此專案是鈦坦科技與 Alpha Camp 合作挑戰項目，GPS 打卡點僅預設以下 2 地點，若您想在自己目前位置打卡成功，請將後端專案下載至本地端，增加您附近的位置後再啟動進行測試。  
  ```js
  {
    // 新加坡商鈦坦科技(南港)
    lat: 25.057640384418786,
    lng: 121.61235508426716,
  },
  {
    // ALPHA Camp(台北)
    lat: 25.05599234479154,
    lng: 121.5443365400908,
  },
  ```


## Features  
### auth  
* 登入/登出功能。  
* 使用者登入密碼連續錯誤 5 次上鎖，上鎖後需由 Admin 傑所後才能重新使用。  
* 使用者在帳號上鎖前輸入正確密碼，類計錯誤次數歸零(Admin 目前不累計次數)。  
* 不同頁面也進行權限設置，不同路由只有指定身分才能進入。  

### admin
* Admin 有單獨的後台管理頁面。  
* Admin 可新增一名使用者(初始化密碼預設 titaner)。  
* Admin 可以重設使用者密碼(恢復成預設的 titaner)。  
* Admin 可以解鎖被鎖定的使用者帳戶。  
### users
* 使用者可變更個人帳號、密碼、email(姓名為員工真實姓名，不可更動)。  
* 使用者可以取得 GPS 定位，並在指定地點範圍內點擊頁面按鈕打卡。  
* 使用者可用 QRcode 進行打卡。  
* 使用者打卡後自動判定出勤狀態(未滿 8 小時或只打卡一次視為出勤異常)。  
* 使用者可以看到自己當天的打卡記錄。  

### others  
* 換日時間為上午五點(台北時間)，自動判定打卡記錄日期。  
* 除了計算當天的紀錄日期外，其他時間處理都由後端進行。  
* 出缺勤僅計算工作日(根據台灣行事曆)。  

### 開發中  
* Admin 可以查看缺勤使用者的帳號。  
* Admin 可以清除缺勤狀態，改為出勤。  
* 有通知功能給 Admin 有人帳號上鎖。  
* 有通知功能給 Admin 今天未打卡的人有誰。  


## Getting Started  
若您想在本地端執行，請依下列說明步驟操作。  

### Prerequisites  
* 安裝 NodeJS (建議版本 @18.2)  
* 安裝 yarn  
  ```
  npm install -g yarn
  ```
* 取得 [`Google Map API_KEY`](https://developers.google.com/maps/documentation/javascript/get-api-key)。  

### Installing  
* 下載專案  
  ```bash
  git clone https://github.com/ritachien/attendance-system-vue.git
  ```
* 安裝套件  
  ```bash
  yarn install
  ```
* 本專案有使用 `husky` 確保 commit 前先進行 ESLint 檢查，請依[官方說明](https://github.com/typicode/husky#usage)進行安裝。  
  - 在 `package.json` > `script` 裡新增項目。  
    ```json
    {
      "prepare": "husky install"
    }
    ```
  - 執行一次後即可刪除 `script`。  
    ```bash
    yarn prepare
    ```
* 建立 `.env` 檔案，並將 `Google Map API_KEY` 填入(請見 `.env.example`)。

### Start  
* 使用以下指令開始 dev 模式。  
  ```bash
  yarn dev
  ```
* 或者，可以執行以下指令進入預覽模式。  
  ```bash
  yarn build
  yarn preview
  ```

## Built With  
* NodeJS @18
* [Vue3](https://vuejs.org/) - frond-end framework  
* [Bootstrap](https://getbootstrap.com/)  @5.2.3 - UI framework  
* [Naive UI](https://www.naiveui.com/en-US/os-theme) - A Vue 3 Component Library  
* Google Map API - 定位及地圖功能  
* Vercel - Deployment  

## Author  
[Rita Chien](https://github.com/ritachien)  
