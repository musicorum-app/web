import axios from 'axios'

const API_URL = 'http://23.100.31.163:4500'

export default class MusicorumAPI {
  static getAuthStatus (token) {
    return axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: token
      }
    })
  }

  static getTwitterAuthURL () {
    return axios.get(`${API_URL}/auth/twitter`)
  }
}
