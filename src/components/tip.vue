<template>
  <div class="tip">
    {{tip}}
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    computed:{
      ...mapState(['tip'])
    }
  }
</script>

<style>
  .tip {
    position: fixed;
    top: 30%;
    left: 50%;
    width: 35%;
    margin-left: -17.5%; 
    background: rgba(0,0,0,.6);
    border-radius: 5px;
    color: #ccc;
    text-align: center;
    padding: 4%;
    box-sizing: border-box;
  }
</style>