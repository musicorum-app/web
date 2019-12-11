import axios from 'axios'

import { API_URL } from '../../env.json'

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
