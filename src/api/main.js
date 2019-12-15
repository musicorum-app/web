import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4500'

export default class MusicorumAPI {
  static getAuthStatus (token, full) {
    return axios.get(`${API_URL}/auth/me${full ? '?full=true' : ''}`, {
      headers: {
        Authorization: token
      }
    })
  }

  static getTwitterAuthURL () {
    return axios.get(`${API_URL}/auth/twitter`)
  }

  static twitterAuthCallback (oauthToken, oauthVerifier, tokenId) {
    return axios.post(`${API_URL}/auth/twitter/callback`, {
      oauthToken,
      oauthVerifier,
      tokenId
    })
  }
}
