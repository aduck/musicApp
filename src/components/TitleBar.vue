<template>
  <div class="title">
    {{name}}
  </div>
</template>

<script>
  export default {
    props:['name']
  }
</script>

<style scoped>
  .title {
    position: fixed;
    z-index: 999;
    width: 100%;
    top: 0;
    left: 0;
    height: 1.4rem;
    line-height: 1.4rem;
    text-align: center;
    background: rgba(0,0,0,.8);
    color: #f2f2f2;
  }

</style>