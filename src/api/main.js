import axios from 'axios'

const API_URL = process.env.API_URL || 'http://api.musicorumapp.com'

export default class MusicorumAPI {
  static getAuthStatus (token, full) {
    return axios.get(`${API_URL}/auth/me${full ? '?full=true' : ''}`, {
      headers: {
        Authorization: token
      }
    })
  }

  static getToken () {
    // eslint-disable-next-line no-undef
    return localStorage.getItem('token')
  }

  static getTwitterAuthURL () {
    return axios.get(`${API_URL}/auth/twitter`)
  }

  static getLastfmAuthURL () {
    return axios.get(`${API_URL}/auth/lastfm`)
  }

  static twitterAuthCallback (oauthToken, oauthVerifier, tokenId) {
    return axios.post(`${API_URL}/auth/twitter/callback`, {
      oauthToken,
      oauthVerifier,
      tokenId
    })
  }

  static lastfmAuthCallback (token) {
    return axios.post(`${API_URL}/auth/lastfm/callback`, { token }, {
      headers: {
        Authorization: MusicorumAPI.getToken()
      }
    })
  }

  static getSchedules () {
    return axios.get(`${API_URL}/schedules`, {
      headers: {
        Authorization: MusicorumAPI.getToken()
      }
    })
  }
}
