import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusCircle, faTimes, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from '../popup/App.vue'
import router from '../router'
import store from '../store'

library.add(faPlusCircle, faTimes, faPen, faTrash)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
