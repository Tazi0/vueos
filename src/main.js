import { createApp } from 'vue'
import App from './App.vue'

import { VueCookieNext } from 'vue-cookie-next'

var app = createApp(App)
app.use(VueCookieNext)
app.mount('#app')