import React, { useState, useRef, Fragment } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'

import GridTheme from '../components/themesForms/GridTheme.jsx'
import TopsTheme from '../components/themesForms/TopsTheme.jsx'
import { CircularProgress } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%'
  },
  center: {
    textAlign: 'right'
  },
  paper: {
    padding: theme.spacing(3, 2),
    textAlign: 'center'
  }
}))

export default function Generator () {
  const classes = useStyles()
  const [theme, setTheme] = useState('')

  const themeRef = useRef()

  const [themeHelperMessage, setThemeHelperMessage] = useState(null)
  const [lastfmUserHelperMessage, setLastfmUserHelperMessage] = useState(null)

  const [loading, setLoading] = useState(false)

  const handleThemeChange = event => {
    setTheme(event.target.value)
    setThemeHelperMessage(null)
  }

  const handleLastfmUserChange = event => {
    setLastfmUserHelperMessage(null)
  }

  const resetErrors = () => {
    setThemeHelperMessage(null)
    setLastfmUserHelperMessage(null)
  }

  const validate = ({ theme, lastfmUser }) => {
    resetErrors()
    let success = true
    if (!theme) {
      setThemeHelperMessage('Please select a theme')
      success = false
    }
    if (!lastfmUser) {
      setLastfmUserHelperMessage('Please provide a Last.fm username')
      success = false
    } else if (lastfmUser.length < 2) {
      setLastfmUserHelperMessage('Please provide a longer Last.fm username')
      success = false
    } else if (lastfmUser.length > 15) {
      setLastfmUserHelperMessage('Please provide a shorter Last.fm username')
      success = false
    }
    if (themeRef.current) {
      if (!themeRef.current.validate()) success = false
    } else {
      success = false
    }
    return success
  }

  const handleSubmit = event => {
    event.preventDefault()
    const { lastfmUser } = event.target
    if (validate({ theme, lastfmUser: lastfmUser.value })) {
      const themeData = themeRef.current.getValues()

      const data = {
        theme,
        options: {
          user: lastfmUser.value,
          ...themeData
        }
      }
      generate(data)
    }
  }

  const generate = data => {
    setLoading(true)
    console.log(data)
  }

  let inputElement
  switch (theme) {
    case 'grid':
      inputElement = (<GridTheme ref={themeRef}/>)
      break
    case 'tops':
      inputElement = (<TopsTheme ref={themeRef}/>)
      break
  }

  return (
    <div>
      <h1>Image generator</h1>
      <form style={{ flexGrow: 1 }} onSubmit={handleSubmit} >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} lg={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  error={!!themeHelperMessage}
                  id="outlined-select-currency"
                  label="Theme"
                  value={theme}
                  onChange={handleThemeChange}
                  helperText={themeHelperMessage}
                  className={classes.form}
                  variant="outlined"
                >
                  <MenuItem value="grid">Grid</MenuItem>
                  <MenuItem value="tops">Tops</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputProps={{
                    maxLength: 15
                  }}
                  error={!!lastfmUserHelperMessage}
                  id="outlined-basic"
                  label="Last.fm username"
                  variant="outlined"
                  helperText={lastfmUserHelperMessage}
                  className={classes.form}
                  onChange={handleLastfmUserChange}
                  name="lastfmUser"
                  // value={lastfmUser}
                />
              </Grid>
            </Grid>
            <br/>
            { inputElement }
            <br/>
            <Grid item className={classes.center}>
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="secondary"
                disabled={loading}
              >
                Generate
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} lg={6}>
            <Paper className={classes.paper}>
              { loading ? (<Fragment>
                <CircularProgress size={50} />
                <br /><br />
                <Typography variant="h4">
                  Loading...
                </Typography>
                <br />
                <Typography color="textSecondary">
                  This can take a while...
                </Typography>
              </Fragment>) : (<Fragment>
                Please fill the information and click on Generate
              </Fragment>)}
            </Paper>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
