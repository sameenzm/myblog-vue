<template>
 <div>
    <div class="comments">
        <h3 class="comment-title">2条评论</h3>
        <ol class="comment-list">
            <li class="comment-item">
                <div class="comment-author vcard">
                    <img src="../assets/user.png" alt="评论头像">
                    <span class="floor">#1</span>
                    <cite class="fn"><a href="javascript:;" target="_blank">狼魂</a></cite>
                    <span class="date">2012-10-21 15:43:09</span>
                </div>
                <div class="comment-content">Vue不错耶</div>
                <div class="comment-reply"><a comment-parent="65" comment-refer="狼魂" href="#respone">回复</a></div>
            </li>
        </ol>
    </div>
    <div id="respond" class="reply">
        <h3 class="reply-title">发表评论</h3>
        <div class="reply-form">
            <div class="reply-item">
                <label for="author">名称</label><span class="required">*</span>
                <input id="author" class="txt" type="text" value="">
            </div>
            <div class="reply-item">
                <label for="email">电子邮件</label>
                <input id="email" class="txt" type="text" value="">
            </div>
            <div class="reply-item">
                <label for="url">个人网站</label>
                <input id="url" class="txt" type="text" value="">
            </div>
            <div class="reply-item">
                <div id="referBox" class="reply-refer"></div>
                <input type="hidden" value="0" id="parent">
                <input type="hidden" value="" id="refer">
            </div>
            <div class="reply-item">
                <label for="comment">评论</label><span class="required">*</span>
                <textarea id="comment" class="txta" cols="10"></textarea>
            </div>
            <div class="reply-item reply-submit">
                <input name="submit" type="button" id="submit" class="btn btn-b" value="发表评论">
            </div>
        </div>
    </div>
 </div>
</template>


<script>
export default {
  name: 'Comment'
}
</script>

<style>

.comment {
    margin-right: 30px;
    padding: 15px 0;
    border-bottom: 1px dotted #ccc;
}
.comment h3 {
    font-size: 14px;
    font-weight: bold;
}
.comments ol {
    padding: 0;
    margin-right: 30px;
}
ol, ul {
    list-style: none;
}
.comment-item {
    overflow: hidden;
    line-height: 24px;
}
.comment-item {
    margin-top: 10px;
    padding-top: 5px;
    border-top: 1px dotted #ddd;
}
.comment-author img {
    float: left;
    width: 48px;
    height: 48px;
    margin: 5px 10px 0 0;
    padding: 1px;
    border: 1px solid #ccc;
    background: url(../assets/user.png) no-repeat center;
    border-radius: 2px;
}
.comment-author span.floor {
    float: right;
    padding: 0 5px;
    background: #f9f9f9;
    border-radius: 4px;
}
.comment-author cite {
    margin-right: 5px;
    font-style: normal;
}
.comment-author span.date {
    color: #888;
}
.comment-content {
    margin-left: 60px;
}
.comment-reply {
    height: 20px;
    margin-left: 60px;
}
.comment-reply a {
    float: right;
    padding-left: 18px;
    background: url(../assets/icons.png) no-repeat 0 -128px;
    line-height: 16px;
    color: #666;
}
.reply {
    margin-right: 30px;
    padding: 20px 0;
}
.reply h3 {
    font-size: 14px;
    font-weight: bold;
}
.reply-item {
    margin-top: 10px;
}
.reply-item .required {
    color: #f00;
}
.reply-item input.txt, .reply-item textarea.txta {
    display: block;
    width: 40%;
    max-width: 270px;
    height: 18px;
    margin-top: 5px;
    padding: 5px;
    border: 1px solid #ccc;
    background-color: #f7f7f7;
    border-radius: 2px;
}
.btn-b:hover {
    border-color: #aaa;
    background-color: #f8f8f8;
    text-decoration: none;
    color: #333;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.btn-b {
    padding: 5px 18px;
    border: 1px solid #ccc;
    background-color: #f5f5f5;
    font-weight: bold;
    color: #666;
    cursor: pointer;
    border-radius: 15px;
}
.reply-item input.txt, .reply-item textarea.txta {
    display: block;
    width: 40%;
    max-width: 270px;
    height: 18px;
    margin-top: 5px;
    padding: 5px;
    border: 1px solid #ccc;
    background-color: #f7f7f7;
    border-radius: 2px;
}
textarea.txta {
    width: 90%;
    max-width: 560px;
    height: 100px;
}
</style>