<template>
  <div class="hotplaylist" v-if="hotplaylist">
    <title-bar name="热门歌单推荐"></title-bar>
    <div class="container">
      <loading v-if="loading"></loading>
      <div class="items clearfix">
        <div class="item" v-for="item in hotplaylist">
          <router-link :to="`/songlist/${item.id}`">
            <div class="thumb"><img v-lazy="item.coverUrl" :alt="item.title"></div>
            <div class="text">
              <div class="title">{{item.title}}</div>
              <div class="author"><i class="fa fa-user-o" aria-hidden="true"></i> {{item.username}}</div>
              <div class="count"><i class="fa fa-eye" aria-hidden="true"></i> {{item.count}}</div>
            </div>
          </router-link>          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TitleBar from './TitleBar'
  import Loading from './Loading'
  import {mapState,mapActions} from 'vuex'

  export default {
    computed:{
      ...mapState(['loading','hotplaylist'])
    },
    methods:{
      ...mapActions(['getHotPlayList'])
    },
    components:{
      'title-bar': TitleBar,
      'loading': Loading
    },
    created(){
      this.getHotPlayList()
    }
  }
</script>

<style scoped>
  .container {
    padding: 1.4rem 0 1.5rem;
  }
  .items {
    padding: 0 .5rem;
  }
  .item {
    overflow: hidden;
    clear: both;
    padding: .4rem 0;
    border-bottom: 1px solid #ccc;
  }
  .item a {
    text-decoration: none;
    color: inherit;
  }
  .item .thumb {
    float: left;
    width: 2.5rem;
  }
  .item .thumb img {
    width: 100%;
    height: auto;
  }
  .item .text {
    margin-left: 3rem;
    line-height: 1.3;
  }
  .item .title {
    height: 1.4rem;
    line-height: .7rem;
  }
  .item .author,.item .count {
    color: #999;
  }
</style>