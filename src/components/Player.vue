<template>
  <div>
    <div class="player">
      <div class="player-title">{{title}}</div>
      <div class="player-progress">
        <span :style="{width:progress}"></span>
      </div>
      <div class="player-controls">
        <div class="player-control player-control-prev">上一首</div>
        <div class="player-control player-control-btn">开始</div>
        <div class="player-control player-control-next">下一首</div>
      </div>
    </div>
    <audio ref="audio">
      <source :src="url" type="audio/mpeg">
    </audio>
  </div>  
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  export default {
    data() {
      return {
        title: '没有标题',
        url: '',
        progress:'25%'
      }
    },
    computed:{
      ...mapState({
        
      })
    },
    methods:{

    }
  }
</script>

<style>
  audio {
    display: none;
  }
  .player {
    width: 640px;
    margin: 0 auto;
    border: 1px solid #ccc;
    padding: 15px;
  }
  .player-title {
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-bottom: 30px;
  }
  .player-progress {
    width: 90%;
    height: 5px;
    margin: auto;
    border: 1px solid #ccc;
    background: #e8e8e8;
    border-radius: 2px;
    overflow: hidden;
  }
  .player-progress span {
    display: block;
    width: 10%;
    height: 100%;
    background: #666;
  }
  .player-controls {
    margin-top: 50px;
    text-align: center;
  }
  .player-control {
    display: inline-block;
    width: 50px;
    height: 50px;
    line-height: 50px;
    border: 1px solid #ccc;
    text-align: center;
    margin: 0 5px;
  }
</style>