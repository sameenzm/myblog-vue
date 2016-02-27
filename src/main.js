import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import IndexPage from './components/IndexPage.vue'
import ArticleList from './components/ArticleList.vue'
import ArticleDetail from './components/ArticleDetail.vue'

Vue.use(Router)
var router = new Router()
router.map({
  '/index': {
    component: IndexPage
  },
  '/category/:categoryId': {
    name: 'category',
    component: ArticleList
  },
  '/detail/:articleId': {
    name: 'detail',
    component: ArticleDetail
  }
})
router.redirect({
  '*': '/index'
})
router.start(App, 'app')
