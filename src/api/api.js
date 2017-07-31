import request from 'superagent'
import {HOST} from '@/config'

const getHotList = () => {
  return new Promise((resolve, reject) => {
    request
      .get(`${HOST}/api/hot`)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.text)
      })
  })
}

const getUri = id => {
  return new Promise((resolve, reject) => {
    request
      .get(`${HOST}/api/url/${id}`)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.text)
      })
  })
}

const getComments = id => {
  return new Promise((resolve, reject) => {
    request
      .get(`${HOST}/api/comment/${id}`)
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.text)
      })
  })
}

const login = (phone, psw) => {
  return new Promise((resolve, reject) => {
    request
      .post(`${HOST}/api/login`)
      .type('form')
      .send({
        cellphone: phone,
        password: psw
      })
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.text)
      })
  })
}

const getUserPlayList = uid => {
  return new Promise((resolve, reject) => {
    request
      .get(`${HOST}/api/user/playlist/${uid}`)
      .type('form')
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.text)
      })
  })
}

const getPlayList = id => {
  return new Promise((resolve, reject) => {
    request
      .get(`${HOST}/api/playlist/${id}`)
      .type('form')
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.text)
      })
  })
}

const getSongDetail = id => {
  return new Promise((resolve, reject) => {
    request
      .get(`${HOST}/api/song/${id}`)
      .type('form')
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.text)
      })
  })
}

const getHotPlayList = () => {
  return new Promise((resolve, reject) => {
    request
      .get(`${HOST}/api/songdisc`)
      .type('form')
      .end((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.text)
      })
  })
}

export default {
  getHotList,
  getUri,
  getComments,
  login,
  getUserPlayList,
  getPlayList,
  getSongDetail,
  getHotPlayList
}