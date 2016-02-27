<template>
<div id="footer">
    <div class="widget clearfix">
        <div class="widget-item friend-link">
            <h3>友情链接</h3>
            <ul>
                <li><a href="https://github.com/homkai" target="_blank">Homkai</a></li>
                <li><a href="https://github.com/2944927590" target="_blank">强哥</a></li>
                <li><a href="http://blog.csdn.net/sameen916" target="_blank">Sameen's csdn</a></li>
                <li><a href="http://cn.vuejs.org/guide/" target="_blank">Vuejs</a></li>
            </ul>
        </div>
        <div class="widget-item qr-code">
            <h3>扫码访问</h3>
        </div>
    </div>
    <p class="copy" role="contentinfo">Copyright © 2016 <a href="javascript:;" target="_blank">Sameen</a>. </p>
</div>
</template>


<script>
export default {
  name: 'BlogFooter'
}
</script>

<style>

#footer {
    margin-left: 270px;
    padding-left: 30px;
    background-color: #fcfcfc;
}
.widget {
    padding: 10px 0;
    overflow: hidden;
}
.widget-item {
    float: left;
    width: 280px;
    margin-right: 24px;
}
.widget-item h3 {
    line-height: 30px;
    font-weight: bold;
    color: #555;
    cursor: pointer;
}
.widget-item ul li {
    line-height: 24px;
    color: #888;
    overflow: hidden;
    white-space: nowrap;
    word-break: break-all;
    text-overflow: ellipsis;
}
#footer .copy {
    height: 30px;
    line-height: 30px;
    color: #888;
    overflow: hidden;
}
</style>