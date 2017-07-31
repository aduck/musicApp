<template>
  <div class="login">
    <img class="bg" :src="loginpic" alt="背景图">
    <title-bar name="用户登录"></title-bar>
    <div class="form">
      <form action="" @submit.prevent="login">
        <p class="ipt">
          <input type="text" v-model="cellphone" placeholder="手机号">
        </p>
        <p class="ipt">
          <input type="password" v-model="password" placeholder="密码">
        </p>
        <p>
          <button class="btn">登 录</button>
        </p>
      </form>
    </div>
    <div class="tool"><i :class="refrash" @click="changeBg" title="更改背景" class="fa fa-repeat" aria-hidden="true"></i></div>
  </div>
</template>

<script>
  import api from '@/api/api'
  import TitleBar from './TitleBar'
  import * as types from '@/store/mutation-types'
  import {mapState,mapMutations} from 'vuex'

  export default {
    data(){
      return {
        cellphone: '',
        password: '',
        refrash: '',
        queen: false
      }
    },
    computed:{
      ...mapState(['loginpic'])
    },
    methods:{
      ...mapMutations({
        setbg:types.SET_LOGIN_BG,
        tip:types.SEND_TIP
      }),
      login(){
        if(!this.cellphone || !this.password){
          this.tip({tip:"手机号或密码不能为空"})
          return
        }
        api.login(this.cellphone,this.password)
          .then(res=>{
            this.tip({tip:"登录成功"})
            localStorage.setItem('userInfo',res)
            let toUrl=this.$route.query.redirect || '/'
            this.$router.push(toUrl)
          })
          .catch(err=>{
            this.tip({tip:`登录失败，${err}`})
          })
      },
      changeBg(e){
        if(this.queen) clearTimeout(this.queen)
        this.refrash='ani'
        this.setbg()
        this.queen=setTimeout(()=>{
          this.refrash=''
        },500)
      }
    },
    components:{
      'title-bar':TitleBar
    },
    created(){
      this.setbg()
    }
  }
</script>

<style scoped>
  @keyframes ani {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes ani {
    0% {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);      
    }
  }
  .login {
    padding: 1.4rem 0 1.5rem;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }
  .login .bg {
    position: absolute;
    left: 0;
    top: 0;
    height: auto;
    width: 100%;
    filter: blur(8px);
    z-index: -1;
  }
  .form {
    padding: 3rem 1rem 0;
  }
  .form .ipt {
    margin-bottom: .3rem;
  }
  .form input {
    width: 100%;
    height: 1.2rem;
    padding: .2rem;
    box-sizing: border-box;
    border: 0 none;
    border-radius: 5px;
    background: rgba(0,0,0,.4);
    color: #eee;
  }
  ::-webkit-input-placeholder {
    color: #999;
  }
  .form .btn {
    width: 100%;
    height: 1.3rem;
    line-height: 1.3rem;
    background: rgba(169,38,38,.5);
    color: #fff;
    text-align: center;
    border-radius: 8px;
    border: 0 none;
  }
  .login .tool {
    text-align: center;
    padding-top: 1rem;
    color: #fff;
    font-size: .7rem;
    line-height: 1.4;
    opacity: .5;
  }
  .login .tool i.ani {
    -webkit-animation: ani .5s ease-in-out;
    animation: ani .5s ease-in-out;    
  }
</style>