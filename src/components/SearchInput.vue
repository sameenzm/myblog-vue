<template>
    <div class="main-header clearfix">
        <div class="search">
            <form action="javascript:;">
                <input type="text">
                <button class="btn-sc">搜索</button>
            </form>
        </div>
        <!--<div class="clearfix"></div>-->
    </div>
</template>


<script>
export default {
  name: 'SearchInput'
}
</script>

<style>
.main-header {
    position: relative;
    margin-right: 30px;
    padding: 15px 0;
    border-bottom: 1px solid #ccc;
}
.search {
    float: right;
    overflow: hidden;
}
</style>