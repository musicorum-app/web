import axios from 'axios'

import { API_URL } from '../../env.js'

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
