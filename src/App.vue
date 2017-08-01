<template>
  <div id="app">
    <router-view></router-view>
    <nav-bar></nav-bar>
    <tip v-if="tip"></tip>
  </div>
</template>

<script>
  import NavBar from './components/NavBar'
  import Tip from './components/Tip'
  import {mapState} from 'vuex'

  export default {
    name: 'app',
    computed:{
      ...mapState(['tip'])
    },
    components:{
      'nav-bar':NavBar,
      'tip':Tip
    },
    watch:{
      '$route' (to,from) {
        document.documentElement.scrollTop = document.body.scrollTop = '0'
      }
    }
  }
</script>

<style>
  html,body {
    height: 100%;
  }
  #app {
    height: 100%;
  }
  [data-dpr='1'] #app {
    font-size: 16px;
  }
  [data-dpr='2'] #app {
    font-size: 32px;
  }
  [data-dpr='3'] #app {
    font-size: 48px;
  }
</style>
