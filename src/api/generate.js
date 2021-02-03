export default class GenerateAPI {
  static async doRequest(path, options) {
    return fetch(process.env.GATSBY_GENERATOR_URL + path, {
      headers: {
        Authorization: `Key ${process.env.GATSBY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      ...options
    }).then(r => r.json())
  }
  
  static async generate(theme, user, options) {
    return GenerateAPI.doRequest('generate', {
      method: 'POST',
      body: JSON.stringify({
        user,
        theme,
        story: false,
        language: 'en',
        hide_username: false,
        options
      })
    })
  }
}