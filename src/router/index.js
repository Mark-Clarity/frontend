import Vue from 'vue'
import Router from 'vue-router'
import searchpage from '@/components/searchpage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SearchPage',
      component: searchpage
    }
  ]
})
