# nuxtcore

> nuxt core for nuxt project

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

***

## 專案目的

此為 NUXT SSR 的核心專案，方便未來開發 NUXT 專案時直接 fork 此專案，避免重新設定。

## 基礎設定

這邊將介紹一下此專案目前的設定。

* node 版本：`v10.16.3` 或 以上。

* 這是一個 SSR 的專案，並非 SPA，若需要轉換為 SPA，可到 `nuxt.config.js` 裡將 mode 改為 `mode: 'spa'`，再用 `npm run dev --spa` 即可，剩下 build 與 deploy 方法可參考此篇[文章](https://www.hellosanta.com.tw/blog/web-page-is-built-by-using-nuxt-single-page-application-is-easy)。

* 開發的主要 UI 框架目前是尚未安裝的，例如：Bootstrap、vuetify。可根據個人開發習慣安裝，這邊介紹 Bootstrap 與 vuetify 的安裝方法(當然不一定只有此兩種套件，你也可以安裝自己喜歡的，或是不安裝。)

  * Bootstrap
  因為 bootstrap vue 有提供 NUXT module 供人使用，因此輸入 `npm install bootstrap-vue` 做安裝。
  接著到 `nuxt.config.js` 的 modules 中加入 `['bootstrap-vue/nuxt']` 即可。
  其他更進階設定，可參考[官方文件](https://bootstrap-vue.js.org/docs/)。

  * vuetify
  vuetify 同樣有提供 NUXT module 供使用，我們可以輸入 `npm install --save-dev @nuxtjs/vuetify` 做安裝。
  接著到 `nuxt.config.js` 的 buildModules 中加入 `'@nuxtjs/vuetify'` 即可。
  這邊稍微提一下 vuetify 的一些設定，vuetify 提供了 NUXT 在 `nuxt.config.js` 中對其做一些選項設定。
  我們可以在 `nuxt.config.js` 加入以下設定：

  ```js
  module.exports = {
    vuetify: {
        treeShake: true,
        defaultAssets: false,
        customVariables: ['~/assets/scss/_variables.scss'], // 在這裡可以引用我們自行定義的 scss 檔，專門用來覆蓋 vuetify 一些預設的變數。
        optionsPath: './vuetify.option.js' // 我們可以在根目錄創建 vuetify.option.js 這隻檔案，並在裡面設定 icons 和 theme 等。
    }
  }
  ```

  最後提醒，**會建議在 layouts 的 vue 檔 template 底下用 `<v-app></v-app>` 作包覆，這樣才能確保整個專案吃到 vuetify 的設定。**
  附上[官方 github](https://github.com/nuxt-community/vuetify-module)

* 此專案有安裝 EsLint 做 code 規範，主要 style 偏向 standard。

* 此專案未安裝 PWA，若要使用，可以參考此[官方文件](https://pwa.nuxtjs.org/)做建立。

* 已經有安裝 NUXT 的 axios module，以下是簡單的使用範例：

```js
// asyncData
async asyncData({ $axios }) {
  const ip = await $axios.$get('API URL')
  return { ip }
}

// methods/created/mounted 等
methods: {
  async fetchSomething() {
    const ip = await this.$axios.$get('API URL')
    this.ip = ip
  }
}
```

* 目前此核心專案，已經裝了 sass 的預處理器，並且在 assets 下加了 reset、global、variables 的 scss 檔案，其中 variables 檔案主要加入一些 breakpoint 和 color 設定，往後建立新專案可以根據專案需求做更改，NUXT 部分裝了 style-resources 將 variables 的 scss 檔案引入全域。
倘若日後專案不想使用 scss 或是因為安裝的框架已經包含預處理器，可以輸入 `npm uninstall --save-dev node-sass sass-loader` 將 scss 預處理器刪除。
## 補充
若後續此核心專案有再更新，例如找到好用、通用的套件等，都會做更新，並同步更新 README 做解釋。
