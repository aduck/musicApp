<template>
  <div class="songlist" v-if="songlist">
    <title-bar :name="songlist.name"></title-bar>
    <div class="profile" :style="{backgroundImage:'url('+songlist.backgroundUrl+')'}">
      <div class="cover">
        <img :src="songlist.coverUrl" :alt="songlist.name">
      </div>
      <div class="text">
        <div class="title">{{songlist.name}}</div>
        <div class="author">创建者: {{songlist.author}}</div>
        <div class="count">共播放{{songlist.playCount}}次</div>
      </div>
    </div>
    <loading v-if="loading"></loading>
    <div class="songItems">
      <div class="item" v-for="(item,index) in songlist.songs">
        <router-link :to="`/song/${item.id}`">
          <span class="index">{{index+1}}</span>
          <span class="title">{{item.name}}</span>
          <span class="artist">{{item.ar[0].name}}</span>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
  import TitleBar from './TitleBar'
  import Loading from './Loading'
  import {mapState,mapGetters,mapActions} from 'vuex'

  export default {
    computed:{
      ...mapState(['loading']),
      ...mapGetters({
        songlist:'fetchSongList'
      })
    },
    methods:{
      ...mapActions(['getSongList'])
    },
    components:{
      'title-bar': TitleBar,
      'loading': Loading
    },
    created(){
      const id=this.$route.params.id
      this.getSongList({id})
    }
  }
</script>

<style scoped>
  .songlist {
    padding: 1.4rem 0 1.5rem;
  }
  .profile {
    background: url() no-repeat center;
    background-size: 100% auto;
    padding: 1rem; 
    box-sizing: border-box;
    clear: both;
    overflow: hidden;
    position: relative;
  }
  .profile:before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.2);
  }
  .profile .cover {
    float: left;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    overflow: hidden;
  }
  .profile .cover img {
    width: 100%;
    height: auto;
  }
  .profile .text {
    margin-left: 2.5rem;
    color: #fff;
    line-height: 1.4;
  }
  .profile .text .title {
    font-size: .5rem;
    white-space: nowrap;
  }
  .songItems {
    padding: .5rem;
  }
  .songItems .item {
    white-space: nowrap;
    overflow: hidden;
    border-bottom: 1px solid #ccc;
  }
  .songItems .item a {
    text-decoration: none;
    color: inherit;
  }
  .songItems .item span {
    display: inline-block;
    vertical-align: middle;
    height: 1rem;
    line-height: 1rem;
  }
  .songItems .index {
    width: .7rem;
    color: #ccc;
  }
  .songItems .title {
    width: 6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .songItems .artist {
    color: #999;
  }
</style>