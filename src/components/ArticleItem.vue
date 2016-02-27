<template v-for="item in items">
    <li class="article-item" v-for="item in items">
        <div class="article-title">
            <h3><a href="javascript:;">Vue教程</a></h3>
            <p class="article-extra">
                <a href="javascript:;" class="post-date">2016-02-16</a>
                <a href="javascript:;" class="post-comment" title="评论（11）">评论11</a>
                <a href="javascript:;" class="post-view" title="阅读（676）">阅读676</a>
            </p>
        </div>
        <div class="article-preview">
            <a href="javascript:;" class="article-txt">我们以 Vue 数据绑定的快速导览开始。尝试 Vue.js 最简单的方法是使用 JSFiddle Hello World 例子。</a>
        </div>
    </li>
</template>
<style>
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
<script>
export default {
  name: 'ArticleItem'
}
</script>