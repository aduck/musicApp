<template>
  <div class="home" v-if="info">
    <title-bar :name="info.nickname"></title-bar>
    <div class="container">
      <div class="profile" :style="{backgroundImage:'url('+info.backgroundUrl+')'}">
        <div @click="clearInfo" class="logout">退出</div>
        <div class="ava">
          <img :src="info.avatarUrl" alt="">
        </div>
      </div>
      <div class="playlist">
        <div class="title">我创建的歌单</div>
        <loading v-if="loading"></loading>
        <div class="items clearfix">
          <div class="item" v-for="item in playlist">
            <router-link :to='`/songlist/${item.id}`'>
              <div class="thumb">
                <img :src="item.coverImgUrl" :alt="item.name">
              </div>
              <div class="name">{{item.name}}</div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="person">
        <div class="title">基本信息</div>
        <div class="infos">
          <p>性别: <i v-if="info.gender==1" class="fa fa-mars"></i><i v-else class="fa fa-venus"></i></p>
          <p>昵称: {{info.nickname}}</p>
          <p>签名: {{info.signature}}</p>
          <p>描述: {{info.description}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TitleBar from './TitleBar'
  import * as types from '@/store/mutation-types'
  import Loading from './Loading'
  import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'

  export default {
    computed:{
      ...mapState(['loading']),
      ...mapGetters({
        info: "fetchInfo",
        playlist: "fetchUserList"
      })
    },
    methods:{
      ...mapMutations({
        getInfo: types.GET_USER_INFO,
        tip: types.SEND_TIP
      }),
      ...mapActions(['getUserPlayList']),
      clearInfo(){
        if(confirm('确定要走了？')){
          localStorage.removeItem('userInfo')
          this.tip({tip:'拜拜'})
          this.$router.push('/login')
        }        
      }
    },
    components:{
      'title-bar':TitleBar,
      'loading':Loading
    },
    created(){
      this.getInfo()
      this.getUserPlayList({id:this.info.id})
    }
  }
</script>

<style scoped>
  .clearfix:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  .container {
    padding: 1.4rem 0 1.5rem;
  }
  .profile {
    height: 5rem;
    background: url() no-repeat center;
    background-size: 100% auto;
    position: relative;
  }
  .profile .ava {
    position: absolute;
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 50%;
    overflow: hidden;
    bottom: 1rem;
    left: 50%;
    margin-left: -1.3rem;
  }
  .profile img {
    width: 100%;
    height: auto;
  }
  .profile .logout {
    position: absolute;
    right: .5rem;
    top:.5rem;
    color: #fff;
    border:1px solid #ccc;
    padding: 0 .4rem;
    height: .8rem;
    line-height: .8rem;
    border-radius: .4rem;
    background: rgba(255,255,255,.1);
  }
  .playlist,.person {
    padding: .3rem;
  }
  .playlist .title,.person .title {
    height: 1.2rem;
    line-height: 1.2rem;
    border-bottom: 1px solid #ccc;
  }
  .playlist .items {
    padding-top: .4rem;
  }
  .playlist .item {
    float: left;
    width: 4.52rem;
    margin-bottom: .3rem;
  }
  .playlist .item:nth-child(even) {
    float: right;
  }
  .playlist .thumb img {
    width: 100%;
    height: auto;
  }
  .playlist a{
    text-decoration: none;
    text-align: center;
  }
  .playlist .name {
    color: #666;
    line-height: 1.4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .person p {
    color: #666;
  }
</style>