import axios from 'axios'
import { GENERATOR_URL } from './vars.js'

global.Buffer = global.Buffer || require('buffer').Buffer

export default class MusicorumGenerator {
  static generate (data) {
    data.source = 'web'
    return new Promise((resolve, reject) => {
      axios({
        url: `${GENERATOR_URL}/generate`,
        method: 'POST',
        data: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }).then(res => {
        console.log(res)
        resolve(res.data)
      }).catch(e => {
        console.log(e.response)
        if (e.response) reject(e.response.data)
        else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            error: {
              code: 'W#400#001',
              message: 'Error while requesting the image. Please contact support for help.',
              error: 'REQUEST_ERROR'
            }
          })
        }
      })
    })
  }
}
