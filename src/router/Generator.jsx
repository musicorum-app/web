import React, { useState, useRef, Fragment } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'

import { CircularProgress } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

import MusicorumGenerator from '../api/generator.js'
import Icon from '@material-ui/core/Icon'
// import ButtonGroup from '@material-ui/core/ButtonGroup'
import Snackbar from '@material-ui/core/Snackbar'
import Slide from '@material-ui/core/Slide'

import GridTheme from '../components/themesForms/GridTheme.jsx'
import TopsTheme from '../components/themesForms/TopsTheme.jsx'
import DuotoneTheme from '../components/themesForms/DuotoneTheme.jsx'
import DarklyTheme from '../components/themesForms/DarklyTheme.jsx'

const SlideTransition = props => {
  return <Slide {...props} direction="down" />
}

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
  },
  snackMessage: {
    display: 'flex',
    alignItems: 'center'
  },
  warningSnack: {
    // backgroundColor: amber[700]
  },
  snackIcon: {
    marginRight: theme.spacing(1),
    fontSize: 20,
    opacity: 0.85
  }
}))

export default function Generator () {
  const classes = useStyles()
  const [theme, setTheme] = useState('')

  const themeRef = useRef()

  const [themeHelperMessage, setThemeHelperMessage] = useState(null)
  const [lastfmUserHelperMessage, setLastfmUserHelperMessage] = useState(null)

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState({ done: false })
  const [snackAlert, setSnackAlert] = useState(false)

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
    if (validate({
      theme,
      lastfmUser: lastfmUser.value
    })) {
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
    MusicorumGenerator.generate(data).then(({ base64, duration }) => {
      console.log(duration)
      setLoading(false)
      setResult({
        done: true,
        success: true,
        url: base64,
        duration
      })
      // const imageFragment = document.getElementById('imagePreview')
      // imageFragment.innerHTML = ''
      // const imageElement = new Image()
      // imageElement.src = url
      // imageElement.crossOrigin
    }).catch(({ error }) => {
      console.error(error)
      setLoading(false)
      setResult({
        done: true,
        success: false,
        error
      })
    })
  }

  // const handleOpenInANewWindow = () => {
  //   const newWindow = window.open('about:blank', '_blank')
  //   newWindow.location.href = result.url
  //   setSnackAlert(true)
  // }

  const handleDownloadImage = () => {
    const a = document.createElement('a')
    a.href = result.url
    a.setAttribute('download', `musicorum_${new Date().getTime()}.jpg`)
    a.click()
  }

  const handleCloseSnack = () => {
    setSnackAlert(false)
  }

  let inputElement
  switch (theme) {
    case 'grid':
      inputElement = (<GridTheme ref={themeRef} showStory={true} />)
      break
    case 'tops':
      inputElement = (<TopsTheme ref={themeRef} showStory={true} />)
      break
    case 'duotone':
      inputElement = (<DuotoneTheme ref={themeRef} showStory={true} />)
      break
    case 'darkly':
      inputElement = (<DarklyTheme ref={themeRef} showStory={true} />)
      break
  }

  return (
    <div>
      <h1>Image generator</h1>
      <form style={{ flexGrow: 1 }} onSubmit={handleSubmit}>
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
                  <MenuItem value="duotone">Duotone</MenuItem>
                  <MenuItem value="darkly">Darkly</MenuItem>
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
            <br />
            {inputElement}
            <br />
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
              {loading ? (
                <Fragment>
                  <CircularProgress size={50} />
                  <br /><br />
                  <Typography variant="h4">
                    Loading...
                  </Typography>
                  <br />
                  <Typography color="textSecondary">
                    This can take a while...
                  </Typography>
                </Fragment>
              ) : result.done
                ? result.success ? (
                  <Fragment>
                    {/* <ButtonGroup size="small" color="primary" aria-label="small primary outlined button group"> */}
                    <Button color="secondary" variant="outlined" onClick={handleDownloadImage} startIcon={<Icon>cloud_download</Icon>}>Download
                      image</Button>
                    {/* <Button onClick={handleOpenInANewWindow} startIcon={<Icon>open_in_new</Icon>}>Open in new window</Button> */}
                    {/* </ButtonGroup> */}
                    <br /> <br />
                    <img src={result.url} crossOrigin="anonymous" style={{ width: '100%' }} />
                    <Fragment id="imagePreview">
                        Generated in {result.duration / 1000}s
                    </Fragment>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Icon style={{ fontSize: 50 }} color="error">close</Icon>
                    <br />
                    <Typography variant="h4">
                      {result.error.message}
                    </Typography>
                    <br />
                    <Typography color="textSecondary">
                      {result.error.code}
                    </Typography>
                  </Fragment>
                )
                : (
                  <Fragment>
                      Please fill the information and click on Generate
                  </Fragment>)}
            </Paper>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={snackAlert}
        className={classes.warningSnack}
        TransitionComponent={SlideTransition}
        ContentProps={{
          'aria-describedby': 'snack-message'
        }}
        message={<span id="snack-message" className={classes.snackMessage}>
          <Icon className={classes.snackIcon}>warning</Icon>
          Please notice that if you have AdBlock enabled, the new window won&apos;t show.
        </span>}
        action={[
          <Button key="undo" color="secondary" size="small" onClick={handleCloseSnack}>
            CLOSE
          </Button>
        ]}
      />
    </div>
  )
}
