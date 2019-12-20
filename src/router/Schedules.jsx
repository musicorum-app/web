import React, { useImperativeHandle, forwardRef, useState, Fragment, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'

import MusicorumAPI from '../api/main.js'
import Card from '@material-ui/core/Card'
import Chip from '@material-ui/core/Chip'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import indigo from '@material-ui/core/colors/indigo'

const useStyles = makeStyles(theme => ({
  loading: {
    padding: theme.spacing(3, 2),
    textAlign: 'center'
  },
  weekly: {
    color: '#000',
    fontWeight: 'bold',
    backgroundColor: indigo.A100,
    marginBottom: '9px'
  }
}))

// eslint-disable-next-line react/display-name
const SchedulesPage = forwardRef((props, ref) => {
  const classes = useStyles()

  useImperativeHandle(ref, () => ({
    onLoad
  }))

  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [schedules, setSchedules] = useState(null)

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const profile = localStorage.getItem('profile')
    onLoad(JSON.parse(profile))
  }, [])

  const onLoad = data => {
    setProfile(data)
    if (!data) {
      setLoading(false)
    } else {
      MusicorumAPI.getSchedules().then(res => {
        setLoading(false)
        setSchedules(res.data)
      }).catch(e => {
        console.error(e)
      })
    }
  }

  return (
    <Fragment>
      <h1>Schedules</h1>
      {
        loading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress/>
          </div>
        ) : (
          profile ? (
            <Grid container spacing={3}>
              {schedules ? (
                schedules.map(schedule => {
                  return <Grid key={schedule.id} xs={12}>
                    <Card>
                      <CardContent>
                        <Typography variant="h5" component="h5">
                          {schedule.name}
                        </Typography>
                        <p></p>
                        <Chip
                          size="small"
                          label={schedule.schedule}
                          className={classes[schedule.schedule.toLowerCase()]} />
                      </CardContent>
                    </Card>
                  </Grid>
                })
              ) : <CircularProgress />}
            </Grid>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              Please, log in to access this page.
            </div>
          )
        )
      }
    </Fragment>
  )
})

export default SchedulesPage
