import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './css/app.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFire, faNewspaper, faBell, faCameraRetro, faMeteor, faBirthdayCake, faPlus, faChevronCircleDown, faSearch, faPaperPlane, faThumbsUp, faCommentAlt, faShare, faCrown, faTrash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFire, faNewspaper, faBell, faCameraRetro, faMeteor, faBirthdayCake, faPlus, faChevronCircleDown, faSearch, faPaperPlane, faThumbsUp, faCommentAlt, faShare, faCrown, faTrash)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

const moment = require('moment')
require('moment/locale/fr')

Vue.use(require('vue-moment'), {
  moment
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
