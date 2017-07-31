import Vue from 'vue'
import Router from 'vue-router'
import HotList from '@/components/HotList'
import SongDisc from '@/components/SongDisc'
import SongList from '@/components/SongList'
import SongDetail from '@/components/SongDetail'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Player from '@/components/Player'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    redirect: '/hotlist'
  }, {
    path: '/hotlist',
    component: resolve => resolve(HotList)
  }, {
    path: '/songdisc',
    component: resolve => resolve(SongDisc)
  }, {
    path: '/songlist/:id',
    component: resolve => resolve(SongList)
  }, {
    path: '/home',
    component: resolve => resolve(Home),
    meta: {
      requireAuth: true
    }
  }, {
    path: '/login',
    component: resolve => resolve(Login)
  }, {
    path: '/song/:id',
    component: resolve => resolve(SongDetail)
  },{
    path:'/player',
    component:resolve => resolve(Player)
  }]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !localStorage.getItem('userInfo')) {
    return next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  }
  next()
})

export default router