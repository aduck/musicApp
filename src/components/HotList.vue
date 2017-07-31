<template>
  <div>
    <title-bar name="热歌排行榜"></title-bar>
    <div class="hotlist">
      <loading v-if="loading"></loading>
      <ul v-if="lists">
        <li v-for="(item,index) in lists">
          <router-link :to="`/song/${item.id}`">
            <span class="id">{{index+1}}</span>
            <span class="name">{{item.name}}</span>
            <span class="artist">{{item.artists[0].name}}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  import api from '@/api/api'
  import Loading from './Loading'
  import TitleBar from './TitleBar'

  export default {
    computed:{
      ...mapState({
        lists:state=>state.hotlist,
        loading:state=>state.loading
      })
    },
    methods:{
      ...mapActions(['getHotList']),
    },
    created(){
      this.getHotList()
    },
    components:{
      'loading':Loading,
      'title-bar':TitleBar
    }
  }
</script>

<style scoped>
  .hotlist {
    padding: 1.4rem 0 1.5rem;
  }
  .hotlist ul {
    padding-right: 1em;
  }
  .hotlist li {
    list-style: none;
    height: 1rem;
    line-height: 1rem;
    white-space: nowrap;
    overflow: hidden;
  }
  .hotlist a {
    text-decoration: none;
    color: inherit;
  }
  .hotlist a span {
    display: inline-block;
    vertical-align: middle;
  }
  .hotlist a .id {
    width: 8%;
    color: #ccc;
  }
  .hotlist a .name {
    width: 65%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #333;
  }
  .hotlist a .artist {
    color: #999;
  }
</style>