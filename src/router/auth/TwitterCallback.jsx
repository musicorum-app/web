/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import qs from 'query-string'
import { CircularProgress } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'

import MusicorumAPI from '../../api/main.js'

export default function TwitterCallback () {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('Logging to your twitter account...')

  useEffect(() => {
    const { oauth_token: oToken, oauth_verifier: oVerifier } = qs.parse(location.search)
    const tokenId = localStorage.getItem('twitterAuthTokenId')
    if (oToken && oVerifier && tokenId) {
      MusicorumAPI.twitterAuthCallback(oToken, oVerifier, tokenId).then(cb => {
        console.log(cb)
        const { token, firstLogin } = cb.data
        localStorage.setItem('token', token)
        localStorage.setItem('firstLogin', firstLogin)
        localStorage.removeItem('twitterAuthTokenId')
        if (opener) {
          opener.location.reload()
          window.close()
        } else location.href = '/'
      }).catch(e => {
        console.error(e)
        setMessage('An error ocorrured. Please try again.')
        setLoading(false)
        setError(true)
      })
    } else {
      setMessage('An error ocorrured. Please try again.')
      setLoading(false)
      setError(true)
    }
  })

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{ message }</h1>
      <br />
      { loading && <CircularProgress /> }
      { error && <Icon color="error" style={{ fontSize: 55 }}>close</Icon> }
    </div>
  )
}
