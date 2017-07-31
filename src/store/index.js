import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import api from '@/api/api'
import {HOST} from '@/config'

Vue.use(Vuex)

// 需要维护的状态
const state = {
  /* 基础类 */
  loading: false,
  tip: '',

  /* 热门排行榜 */
  hotlist: [],

  /* 当前歌曲 */
  song: null,
  url: null,

  /* 登录背景图 */
  loginpics: [`${HOST}/images/01.jpg`, `${HOST}/images/02.jpg`, `${HOST}/images/03.jpg`, `${HOST}/images/04.jpg`, `${HOST}/images/05.jpg`],
  loginpic: '',

  /* 登录信息 */
  userinfo: null,

  /* 歌单数据 */
  playlist: null,

  /* 歌单里歌曲列表 */
  songlist: null,

  /* 评论 */
  comments: null,

  /* 热门歌单 */
  hotplaylist: null
}

// getters
const getters = {
  fetchInfo(state) {
    if(!state.userinfo) return
    const info = JSON.parse(state.userinfo).profile
    return {
      id: info.userId,
      backgroundUrl: info.backgroundUrl,
      nickname: info.nickname,
      avatarUrl: info.avatarUrl,
      signature: info.signature,
      gender: info.gender,
      description: info.description
    }
  },
  fetchUserList(state){
    if(!state.playlist) return
    const pl=state.playlist
    return pl.playlist
  },
  fetchSongList(state){
    if(!state.songlist) return
    let playlist=state.songlist.playlist
    let creator=playlist.creator
    let backgroundUrl=creator.backgroundUrl
    let author=creator.nickname
    let coverUrl=playlist.coverImgUrl
    let name=playlist.name
    let playCount=playlist.playCount
    let createTime=playlist.createTime
    let songs=playlist.tracks
    return {
      author,
      backgroundUrl,
      coverUrl,
      name,
      playCount,
      createTime,
      songs
    }
  },
  fetchSongInfo(state){
    if(!state.song) return
    let song=state.song.songs[0]
    let name=song.name
    let id=song.id
    let alia=song.alia.legnth ? song.alia.join(' ') : null
    let artist=song.ar[0].name
    let album=song.al.name
    let albumCover=song.al.picUrl
    return {
      id,
      name,
      alia,
      artist,
      album,
      albumCover
    }
  },
  fetchComments(state){
    if(!state.comments) return
    return state.comments.hotComments
  },
  fetchUrl(state){
    if(!state.url) return
    return state.url.data[0].url
  }
}

// 可以提交的mutations
const mutations = {
  [types.SEND_TIP](state, {tip}) {
    state.tip = tip
    setTimeout(() => {
      state.tip = ''
    }, 2000)
  },
  [types.LOADING_STATUS](state, {loading}) {
    state.loading = loading
  },
  [types.GET_HOT_LIST](state, {items}) {
    state.hotlist = items
  },
  [types.GET_SONG_DETAIL](state, {info}) {
    state.song = info
  },
  [types.SET_LOGIN_BG](state) {
    const pics = state.loginpics
    let r = Math.floor(Math.random() * pics.length)
    state.loginpic = pics[r]
  },
  [types.GET_USER_INFO](state) {
    let info = localStorage.getItem('userInfo')
    state.userinfo = info
  },
  [types.GET_USER_PLAY_LIST](state, {lists}) {
    state.playlist = lists
  },
  [types.GET_PLAY_LIST](state, {lists}) {
    state.songlist = lists
  },
  [types.GET_SONG_URL](state, {url}) {
    state.url = url
  },
  [types.GET_COMMENTS](state, {items}) {
    state.comments = items
  },
  [types.GET_HOT_PLAY_LIST](state, {items}) {
    state.hotplaylist = items
  }
}

// actions
const actions = {
  getHotList({commit}) {
    commit(types.LOADING_STATUS, {
      loading: true
    })
    api.getHotList()
      .then(res => {
        commit(types.LOADING_STATUS, {
          loading: false
        })
        commit(types.GET_HOT_LIST, {
          items: JSON.parse(res)
        })
      })
      .catch(err => {
        commit(types.SEND_TIP, {
          tip: "加载失败^^#!"
        })
      })
  },
  getUserPlayList({commit},{id}){
    commit(types.LOADING_STATUS, {
      loading: true
    })
    api.getUserPlayList(id)
      .then(res=>{
        commit(types.LOADING_STATUS, {
          loading: false
        })
        commit(types.GET_USER_PLAY_LIST, {
          lists: JSON.parse(res)
        })
      })
      .catch(err=>{
        commit(types.SEND_TIP, {
          tip: "获取失败^^#!"
        })
      })
  },
  getSongList({commit},{id}){
    commit(types.LOADING_STATUS, {
      loading: true
    })
    api.getPlayList(id)
      .then(res=>{
        commit(types.LOADING_STATUS, {
          loading: false
        })
        commit(types.GET_PLAY_LIST, {
          lists: JSON.parse(res)
        })
      })
      .catch(err=>{
        commit(types.SEND_TIP, {
          tip: "获取失败^^#!"
        })
      })
  },
  getSongDetail({commit},{id}){
    api.getSongDetail(id)
      .then(res=>{
        commit(types.GET_SONG_DETAIL, {
          info: JSON.parse(res)
        })
      })
      .catch(err=>{
        commit(types.SEND_TIP, {
          tip: "获取失败^^#!"
        })
      })
  },
  getUrl({commit},{id}){
    api.getUri(id)
      .then(res=>{
        commit(types.GET_SONG_URL, {
          url: JSON.parse(res)
        })
      })
  },
  getComments({commit},{id}){
    commit(types.LOADING_STATUS, {
      loading: true
    })
    api.getComments(id)
      .then(res=>{
        commit(types.LOADING_STATUS, {
          loading: false
        })
        commit(types.GET_COMMENTS, {
          items: JSON.parse(res)
        })
      })
      .catch(err=>{
        commit(types.SEND_TIP, {
          tip: "获取失败^^#!"
        })
      })
  },
  getHotPlayList({commit}){
    commit(types.LOADING_STATUS, {
      loading: true
    })
    api.getHotPlayList()
      .then(res=>{
        commit(types.LOADING_STATUS, {
          loading: false
        })
        commit(types.GET_HOT_PLAY_LIST, {
          items: JSON.parse(res)
        })
      })
      .catch(err=>{
        commit(types.SEND_TIP, {
          tip: "获取失败^^#!"
        })
      })
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})