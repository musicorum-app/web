/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import qs from 'query-string'
import { CircularProgress } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'

import MusicorumAPI from '../../api/main.js'

export default function LastfmCallback () {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('Connecting to your Last.fm account...')

  useEffect(() => {
    const { token } = qs.parse(location.search)
    if (token) {
      MusicorumAPI.lastfmAuthCallback(token).then(cb => {
        console.log(cb)
        if (opener) {
          opener.location.reload()
          window.close()
        } else location.href = '/'
      }).catch(e => {
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
