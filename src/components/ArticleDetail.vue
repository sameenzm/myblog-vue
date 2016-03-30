<template>
    <div class="loading" v-if="$loadingRouteData">Loading ...</div>
    <div v-else class="main-content" v-for="item in items">
        <div class="crumb">文章分类：{{item.category}}</div>
        <div class="post">
            <div class="post-title">
                <p>
                    <span class="post-date">{{item.create_time}}</span>
                    <span class="post-view">{{item.hits}} 阅读</span>
                    <span class="post-comment">3 评论</span>
                </p>
            </div>
            <h2>{{item.title}}</h2>
            <div class="post-main">
                <p>
                    {{item.content}}
                </p>
            </div>
        </div>
        <comment></comment>
    </div>
</template>


<script>
import Comment from './Comment'
import server from '../server/index'
export default {
  name: 'ArticleDetail',
  components: {
    Comment
  },
  data () {
      return {
          items: ''
      }
  },
  route: {
      data ({to: {params: {articleId}}}) {
          return server.getDetail().then(articles => {
             let article = articles.data.data
             let dt = []
             article.forEach(v => {
                (v.id === articleId) ? dt.push(v) : ''
             });
                this.items = dt
          });
      }
  }
}
</script>

<style>
#main {
    min-width: 500px;
    margin-left: 300px;
}
.post {
    margin-right: 30px;
    padding-bottom: 15px;
    border-bottom: 1px dotted #ccc;
}
p {
    padding: 20px 0 10px;
}
.post-title .post-date, .article-title .post-date {
    background-position: 5px 0;
}
.post-title .post-category, .article-title .post-category {
    background-position: 5px -16px;
}
.post-title .post-view, .article-title .post-view {
    background-position: 5px -48px;
}
.post-title .post-comment, .article-title .post-comment {
    background-position: 5px -64px;
}
.post-title p span, .article-title p span {
    display: inline-block;
    height: 16px;
    margin: 0 10px 5px 0;
    padding: 0 5px 0 23px;
    background: url(../assets/icons.png) no-repeat 5px 16px;
    line-height: 16px;
    border-radius: 2px;
}
.post-title h3 {
    font: 24px/40px "Microsoft YaHei";
}
.post-main {
    margin-top: 20px;
    line-height: 1.8;
    font-size: 14px;
    text-indent:2em
}
.crumb {
    border-bottom: 1px dotted #ccc;
    line-height: 40px;
    font-size: 14px;
    margin-right: 30px;
}
</style>