<template>
    <div id="sidebar">
        <div class="logo"><h1 id="logo"><a href="javascript:;">Sameen</a></h1></div>
        <div class="nav">
            <ul class="main-nav">
                <li><a v-link="{ path: '/index' }" class="active">首页</a></li>
                <li v-for="item in items">
                  <a v-link="{ name: 'category', params: { categoryId: item.id }}">{{item.name}}</a>
                </li>
            </ul>
        </div>
    </div>
    <div id="main">
        <search-input></search-input>
        <router-view></router-view>
    </div>
</template>

<script>
import IndexPage from './IndexPage'
import SearchInput from './SearchInput'
import ArticleDetail from './ArticleDetail'
import ArticleList from './ArticleList'
import server from '../server/index'

export default {
  name: 'Sidebar',
  components: {
    IndexPage,
    SearchInput,
    ArticleDetail,
    ArticleList
  },
  data  () {
    return {
        items: ''
    };
  },
  ready () {
    server.getNav().then(navs => {
        this.items = navs.data.data
    })
  }
}
</script>

<style>
#sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 240px;
    height: 100%;
    padding-right: 30px;
    background: #f3f3f3 url(../assets/bg.png);
    text-align: right;
    z-index: 999;
    box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.1);
}
.logo {
    padding: 60px 0 30px;
    border-bottom: 1px solid #ccc;
}
.logo h1 a {
    color: #888;
}
.main-nav {
    padding: 30px 0;
    border-bottom: 1px dotted #ccc;
}
.main-nav li {
    line-height: 34px;
    font-size: 14px;
}
.main-nav li a {
    padding-right: 20px;
    color: #aaa;
    text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.9);
    /*background-image: url(../assets/li.png);*/
}
.main-nav li a:hover,
.main-nav li a.active {
    color: #666;
    /*background-image: url(../assets/li-hover.png);*/
}
#main {
    min-width: 500px;
    min-height: 412px;
    margin-left: 300px;
}
.main-nav li {
    cursor: pointer;
}
</style>