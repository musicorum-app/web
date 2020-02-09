// eslint-disable react/prop-types

import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useState } from 'react'
import Button from '@material-ui/core/Button'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Grid from '@material-ui/core/Grid'
import MusicorumAPI from '../api/main'
import CircularProgress from '@material-ui/core/CircularProgress'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

import Execution from '../components/Execution.jsx'

const HistoryPage = (props, ref) => {
  // eslint-disable-next-line react/prop-types
  const { id } = props.match.params

  useImperativeHandle(ref, () => ({
    onLoad
  }))

  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [scheduleName, setScheduleName] = useState('')
  const [error, setError] = useState('')
  const [executions, setExecutions] = useState(null)

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const profile = localStorage.getItem('profile')
    onLoad(JSON.parse(profile))
  }, [])

  const onLoad = data => {
    setLoading(true)
    setProfile(data)
    if (!data) {
      setLoading(false)
    } else {
      MusicorumAPI.getSchedules().then(res => {
        console.log(res.data)
        const schedule = res.data.find(s => s.id === id)
        if (schedule) {
          setScheduleName(schedule.name)
          MusicorumAPI.getExecutions(id).then(({ data }) => {
            console.log(data)
            setLoading(false)
            setExecutions(data.runs.reverse())
          })
        } else {
          setError('Schedule does not exist')
        }
      }).catch(e => {
        setError('Unknown error')
        console.error(e)
      })
    }
  }

  return (
    <Fragment>
      <Link className="routerLink" to='/schedules'>
        <Button startIcon={<ArrowBackIcon/>} color="secondary">BACK</Button>
      </Link>
      <p></p>
      {
        loading
          ? (
            <div style={{
              // eslint-disable-next-line indent
              display: 'flex',
              justifyContent: 'center'
            }}>
              <CircularProgress/>
            </div>
          )
          : (profile
            ? error ? (
              <Fragment>
                <Icon style={{ fontSize: 50 }} color="error">close</Icon>
                <p></p>
                <Typography variant="h4">
                  {error}
                </Typography>
              </Fragment>
            )
              : (<Fragment>
                <h1>Executions history for {scheduleName}</h1>
                <Grid container spacing={3}>
                  {
                    executions ? (
                      executions.map(execution => (
                        <Grid item xs={12} key={execution.id}>
                          <Execution data={execution}/>
                        </Grid>))
                    ) : <CircularProgress/>}
                </Grid>
              </Fragment>)
            : (<div style={{
              display: 'flex',
              justifyContent: 'center'
            }}>
            Please, log in to access this page.
            </div>))
      }

    </Fragment>
  )
}
export default forwardRef(HistoryPage)
