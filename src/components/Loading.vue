<template>
  <div class="loading">
    <i class="fa fa-spinner" aria-hidden="true"></i>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  @keyframes cycle {
    0% {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes cycle {
    0% {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);      
    }
  }
  .loading {
    height: 1rem;
    line-height: 1rem;
    text-align: center;   
  }
  .loading i {
    -webkit-animation: cycle .5s ease-in-out 0s infinite;
    animation: cycle .5s ease-in-out 0s infinite; 
  }
</style>