<template>
  <div id="app">
    <sidebar></sidebar>
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar'
import BlogFooter from './components/BlogFooter'

export default {
  name: 'App',
  components: {
    Sidebar,
    BlogFooter
  }
}
</script>

<style>
html,
body,
div,
h1, h2, h3, h4, h5,
p,
img,
ol, ul, li {
    border: 0;
    padding: 0;
    margin: 0;
}
body, button, input, select, textarea {
    font: 12px/1.5 Tahoma,Arial,"SimSun";
}
a {
    text-decoration: none;
    color: #555;
}
.clearfix:after {
    content: "\200B";
    display: block;
    height: 0;
    clear: both;
}
</style>
