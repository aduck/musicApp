<template>
  <div class="details" v-if="song">  
    <title-bar :name="song.name"></title-bar>
    <div class="info">
      <div class="album" v-if="song.album">
        <img :src="song.albumCover" :alt="song.album">
        <div class="text">
          <div class="name">{{song.name}}</div>
          <div class="alias" v-if="song.alias">{{song.alias}}</div>
          <div class="artist">演唱：{{song.artist}}</div>
          <a class="download" :download="song.name+'.mp3'" :href="url">下载</a>
        </div>
      </div>        
    </div>
    <div class="comments">
      <div class="title">评论列表</div>
      <loading v-if="loading"></loading>
      <div class="comment" v-for="item in comments">
        <div class="userInfo">
          <div class="ava">
            <img v-lazy="item.user.avatarUrl" :alt="item.user.nickname">
          </div>
          <div class="nickname">{{item.user.nickname}}</div>
        </div>
        <div class="text">
          <div class="status">
            <span class="liked"><i class="fa fa-heart-o"></i> {{item.likedCount}}</span>
            <div class="time">{{item.time | dateFormat}}</div>
          </div>
          <div class="content">
            {{item.content}}
          </div>
        </div>
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
        song:'fetchSongInfo',
        url:'fetchUrl',
        comments:'fetchComments'
      })
    },
    methods:{
      ...mapActions(['getSongDetail','getUrl','getComments'])
    },
    components:{
      'title-bar':TitleBar,
      'loading':Loading
    },
    created(){
      const id=this.$route.params.id
      this.getSongDetail({id})
      this.getUrl({id})
      this.getComments({id})
    },
    watch:{
      '$route'(to,from){
        const id=this.$route.params.id
        this.getSongDetail({id})
        this.getUrl({id})
        this.getComments({id})
      }
    },
    filters: {
      dateFormat(val) {
        if (!val) return
        let now = new Date(val)
        let year = now.getFullYear()
        let month = now.getMonth() + 1 >= 10 ? (now.getMonth() + 1) : ('0' + (now.getMonth() + 1))
        let day = now.getDate() >= 10 ? now.getDate() : ('0' + now.getDate())
        return `${year}.${month}.${day}`
      }
    }
  }
</script>

<style scoped>
  .details {
    padding: 1.4rem 0 1.5rem;
  }
  .album {
    position: relative;
  }
  .album img{
    width: 100%;
    height: auto;
    display: block;
  }
  .info .text {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: .5rem;
    box-sizing: border-box;
    background: rgba(0,0,0,.5);
    color: #fff;
  }
  .info .name,.info .alias,.info .artist {
    line-height: 2;
  }
  .info .name {
    font-size: 0.5rem;
  }
  .info .download {
    position: absolute;
    top: 35%;
    right: 5%;
    padding: .3rem;
    border-radius: 5px;
    background: #fff;
    color: #333;
    text-decoration: none;
  }
  .comments {
    padding: .5em;
  }
  .comments .title {
    font-size: .4rem;
    color: #333;
    line-height: 2;
    border-bottom: 1px solid #999;
    margin-bottom: .5rem;
  }
  .comment {
    padding: .2rem 0;
    border-bottom: 1px solid #ccc;
    clear: both;
    overflow: hidden;
  }
  .comment .userInfo {
    float: left;
    width: 1.6rem;
  }
  .comment .nickname {
    font-size: .35rem;
    color: #999;
    word-wrap: break-word;
  }
  .comment .ava img {
    width: 100%;
  }
  .comment .text {
    margin-left: 1.8rem;
  }
  .comment .status {
    color: #999;
    overflow: hidden;
    margin-bottom: .1rem;
  }
  .comment .time {
    float: right;
    font-size: 0.4rem;
  }
</style>