<template>
    <div class="main-content">
        <ul class="article-list clearfix">
            <li class="loading" v-if="$loadingRouteData">Loading ...</li>
            <li v-else v-for="item in items" class="article-item">
                <div class="article-title">
                    <h3><a v-link="{ name: 'detail', params: {articleId: item.id}}">{{item.title}}</a></h3>
                    <p class="article-extra">
                        <a v-link="{ name: 'detail', params: {articleId: item.id}}" class="post-date">{{item.create_time}}</a>
                        <a href="javascript:;" class="post-comment" title="评论（11）">评论11</a>
                        <a v-link="{ name: 'detail', params: {articleId: item.id}}" class="post-view" title="阅读（676）">阅读{{item.hits}}</a>
                    </p>
                </div>
                <div class="article-preview">
                    <a v-link="{ name: 'detail', params: {articleId: item.id}}" class="article-txt">{{item.content}}</a>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import server from '../server/index'
export default {
  name: 'ArticleList',
  data () {
    return {
      items: ''
    }
  },
  route: {
      data ({to: {params: {categoryId}}}) {
          let dt = []
          return server.getDetail().then(list => {
//                      console.log(list);
              let datas = list.data.data
              datas.forEach(v=> {
                (v.category_id === categoryId)?dt.push(v):'';
              });
              this.items = dt
          });
      }
  }
}
</script>

<style>
    .loading {
        font-size: 30px;
        color: #5e5e5e;
        text-align: center;
        margin-top: 100px;
    }
    .article-list {
        padding-bottom: 20px;
    }
    .article-list li:hover {
        border-color: #999;
    }
    .article-item {
        float: left;
        width: 280px;
        margin: 40px 18px 0 0;
        background-color: #f7f7f7;
        border: 3px solid #fff;
    }
    .article-preview {
        height: 150px;
    }
    .article-preview a {
        display: block;
    }
    .article-txt {
        overflow: hidden;
        padding: 20px 20px 0;
        height: 128px;
        border: 1px solid #ddd;
        background-color: #fcfcfc;
        line-height: 24px;
        text-indent: 2em;
    }
    .article-item:hover h3 a {
        font-weight: bold;
        color: #333;
    }
    .article-title h3 {
        padding: 0 15px;
        line-height: 40px;
        margin-top: 6px;
    }
    .article-title h3 a:hover {
        font-weight: bold;
        text-decoration: none;
    }
    .article-title h3 a {
        display: block;
        overflow: hidden;
        width: 250px;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
        color: #666;
    }
    .article-extra {
        height: 20px;
        margin: 2px 0;
        padding: 0 10px;
        overflow: hidden;
        font-size: 14px;
    }
    .article-extra .post-date {
        float: left;
    }
    .article-extra .post-view, .article-title .post-comment {
        float: right;
    }
</style>


