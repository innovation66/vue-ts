import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { globalRegister } from './global'
import lzsRequest from './service'
import 'element-plus/theme-chalk/el-loading.css'
import 'normalize.css'
import './assets/css/index.less'
import { setupStore } from './store'
import * as ElIcons from '@element-plus/icons-vue'
const app = createApp(App)
for (const name in ElIcons) {
  app.component(name, (ElIcons as any)[name])
}
app.use(globalRegister)
app.use(store)
setupStore()
app.use(router)

app.mount('#app')

//store.dispatch('loginModule/reloadLogin')

/**interface DataType {
  data: any
  returnCode: string
  success: boolean
}

lzsRequest
  .request<DataType>({
    url: '/home/multidata',
    showLoading: false
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.returnCode)
    console.log(res.success)
  })*/
