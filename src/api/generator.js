import axios from 'axios'

const GENERATOR_URL = process.env.REACT_APP_GENERATOR_URL || 'http://localhost:5000'

global.Buffer = global.Buffer || require('buffer').Buffer

export default class MusicorumGenerator {
  static generate (data) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${GENERATOR_URL}/generate`,
        method: 'POST',
        data: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        responseType: 'arraybuffer'
      }).then(res => {
        console.log(res)
        const fileParts = [Buffer.from(res.data, 'binary')]
        // eslint-disable-next-line no-undef
        const blob = new Blob(fileParts, { type: 'image/png' })
        resolve(URL.createObjectURL(blob))
      }).catch(e => {
        reject(JSON.parse(Buffer.from(e.response.data, 'binary').toString()))
      })
    })
  }
}
