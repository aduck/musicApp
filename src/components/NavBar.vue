<template>
  <div class="navbar">
    <router-link to='/hotlist'>排行</router-link>
    <router-link to='/songdisc'>歌单</router-link>
    <router-link to='/home'>账号</router-link>
  </div>
</template>

<script>
  
</script>

<style scoped>
  .navbar {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 1.4rem;
    bottom: 0;
    left: 0;
  }
  .navbar a {
    float:left;
    width: 33.3333%;
    height: 1.4rem;
    line-height: 1.4rem;
    text-align: center;
    background: #333;
    color: #f8f8f8;
    text-decoration: none;
  }
  .navbar a.router-link-exact-active {
    background: #f8f8f8;
    color: #333;
  }
</style>