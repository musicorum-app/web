import React, { useState, useRef, Fragment, useEffect } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import copy from 'copy-to-clipboard'

import { CircularProgress } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

import MusicorumGenerator from '../api/generator.js'
import Icon from '@material-ui/core/Icon'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Snackbar from '@material-ui/core/Snackbar'
import Slide from '@material-ui/core/Slide'
import Link from '@material-ui/core/Link'
import Alert from '@material-ui/lab/Alert'

import GridTheme from '../components/themesForms/GridTheme.jsx'
import TopsTheme from '../components/themesForms/TopsTheme.jsx'
import DuotoneTheme from '../components/themesForms/DuotoneTheme.jsx'
import DarklyTheme from '../components/themesForms/DarklyTheme.jsx'
import { useTranslation, Trans } from 'react-i18next'
import MusicorumAPI from '../api/main'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import IconButton from '@material-ui/core/IconButton'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import DialogActions from '@material-ui/core/DialogActions'
import PrideTheme from '../components/themesForms/PrideTheme.jsx'
import PatreonIcon from '../components/PatreonIcon.jsx'

const SlideTransition = props => {
  return <Slide {...props} direction="down"/>
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
  },
  spinner: {
    marginLeft: 16
  },
  copyBox: {
    backgroundColor: 'rgba(236, 64, 122, 0.090)',
    borderRadius: 7,
    padding: '3px 20px'
  },
  flag: {
    height: '1em',
    marginRight: 4
  },
  alert: {
    backgroundColor: '#3a0c0e',
    color: 'white',
    marginBottom: 25,
    padding: '29px 16px'
  }
}))

export default function Generator () {
  const { t } = useTranslation()
  const classes = useStyles()
  const [theme, setTheme] = useState('')
  const [lastfmUser, setLastfmUser] = useState('')

  const themeRef = useRef()

  const [themeHelperMessage, setThemeHelperMessage] = useState(null)
  const [lastfmUserHelperMessage, setLastfmUserHelperMessage] = useState(null)

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState({ done: false })
  const [snackAlert, setSnackAlert] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [snackBar, setSnackBar] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [showPatreon, setShowPatreon] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const _profile = localStorage.getItem('profile')
    if (!_profile) return
    const profile = JSON.parse(_profile)
    if (profile && profile.lastfm) setLastfmUser(profile.lastfm.user)
  }, [])

  const handleThemeChange = event => {
    setTheme(event.target.value)
    setThemeHelperMessage(null)
  }

  const handleLastfmUserChange = event => {
    setLastfmUser(event.target.value)
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
      setThemeHelperMessage(t('translations:generator.validator.selectTheme'))
      success = false
    }
    if (!lastfmUser) {
      setLastfmUserHelperMessage(t('translations:generator.validator.selectUsername'))
      success = false
    } else if (lastfmUser.length < 2) {
      setLastfmUserHelperMessage(t('translations:generator.validator.selectLongerUsername'))
      success = false
    } else if (lastfmUser.length > 15) {
      setLastfmUserHelperMessage(t('translations:generator.validator.selectShorterUsername'))
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
    if (validate({
      theme,
      lastfmUser
    })) {
      const themeData = themeRef.current.getValues()

      const data = {
        theme,
        options: {
          user: lastfmUser,
          ...themeData
        }
      }
      generate(data)
    }
  }

  const generate = data => {
    setShowPatreon(false)
    setLoading(true)
    setImageUrl(null)
    MusicorumGenerator.generate(data).then(({ base64, duration, signature }) => {
      if (!base64) throw new Error('something wrong ocorrured')
      setLoading(false)
      setResult({
        done: true,
        success: true,
        url: base64,
        duration,
        signature
      })

      setShowPatreon(true)
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

  const handleCopyLink = async () => {
    try {
      if (uploadLoading) return
      if (imageUrl) {
        copyLink()
      } else {
        setUploadLoading(true)
        const response = await MusicorumAPI.upload(result.url, result.signature)
        console.log(response)
        setImageUrl(response.data.url)
        setDialogOpen(true)
        setUploadLoading(false)
      }
    } catch (e) {
      console.error(e)
      setSnackBar('An error ocorrured: ' + e)
      setSnackAlert(true)
      setUploadLoading(false)
    }
  }

  const copyLink = () => {
    console.log(imageUrl)
    copy(imageUrl, {
      debug: true,
      format: 'text/plain',
      onCopy: () => {
        setSnackBar('Link copied to clipboard!')
        setSnackAlert(true)
      }
    })
  }

  const handleCloseSnack = () => {
    setSnackAlert(false)
  }

  let inputElement
  switch (theme) {
    case 'grid':
      inputElement = (<GridTheme ref={themeRef} showStory={true}/>)
      break
    case 'tops':
      inputElement = (<TopsTheme ref={themeRef} showStory={true}/>)
      break
    case 'duotone':
      inputElement = (<DuotoneTheme ref={themeRef} showStory={true}/>)
      break
    case 'darkly':
      inputElement = (<DarklyTheme ref={themeRef} showStory={true}/>)
      break
    case 'pride':
      inputElement = (<PrideTheme ref={themeRef} showStory={true}/>)
      break
  }

  return (
    <div>
      <h1>{t('translations:generator.title')}</h1>
      <form style={{ flexGrow: 1 }} onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} lg={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  error={!!themeHelperMessage}
                  id="outlined-select-currency"
                  label={t('translations:generator.theme')}
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
                  label={t('translations:generator.user')}
                  variant="outlined"
                  helperText={lastfmUserHelperMessage}
                  className={classes.form}
                  onChange={handleLastfmUserChange}
                  value={lastfmUser}
                  name="lastfmUser"
                  // value={lastfmUser}
                />
              </Grid>
            </Grid>
            <br/>
            {inputElement}
            <br/>
            <Grid item className={classes.center}>
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                disableElevation
                disabled={(loading || uploadLoading)}
              >
                {t('translations:generator.generate')}
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} lg={6}>
            <Paper className={classes.paper}>
              {
                showPatreon && <Alert
                  className={classes.alert}
                  icon={<PatreonIcon style={{ color: '#FF424D' }}/>}
                >
                  <Typography>
                    <Trans
                      i18nKey="translations:generator.donate"
                      components={[
                        <Link
                          key={0}
                          target="_blank"
                          style={{ color: '#FF424D' }}
                          component="a"
                          href="https://www.patreon.com/musicorumapp"
                        />
                      ]}
                    />
                  </Typography>
                </Alert>
              }
              {loading ? (
                <Fragment>
                  <CircularProgress size={50}/>
                  <br/><br/>
                  <Typography variant="h4">
                    {t('translations:generator.loading')}
                  </Typography>
                  <br/>
                  <Typography color="textSecondary">
                    {t('translations:generator.loadingSubtitle')}
                  </Typography>
                </Fragment>
              ) : result.done
                ? result.success ? (
                  <Fragment>
                    {/* <ButtonGroup size="small" color="primary" aria-label="small primary outlined button group"> */}
                    <ButtonGroup>
                      <Button
                        color="secondary"
                        variant="outlined"
                        onClick={handleDownloadImage}
                        startIcon={<Icon>cloud_download</Icon>}>
                        {t('translations:generator.download')}
                      </Button>
                      <Button
                        color="secondary" variant="outlined" onClick={handleCopyLink}
                        startIcon={<Icon>link</Icon>}>
                        {
                          uploadLoading
                            ? <div>
                              <CircularProgress size={14} color="secondary"/>
                              <span className={classes.spinner}>
                                {t('translations:generator.loading')}
                              </span>
                            </div>
                            : t('translations:generator.copyLink')
                        }
                      </Button>
                    </ButtonGroup>
                    {/* <Button onClick={handleOpenInANewWindow} startIcon={<Icon>open_in_new</Icon>}>Open in new window</Button> */}
                    {/* </ButtonGroup> */}
                    <br/> <br/>
                    <img src={result.url} crossOrigin="anonymous" style={{ width: '100%' }}/>
                    <id id="imagePreview">
                      {t('translations:generator.generated', { seconds: result.duration / 1000 })}
                    </id>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Icon style={{ fontSize: 50 }} color="error">close</Icon>
                    <br/>
                    {
                      result.error.message ? (<>
                        <Typography variant="h4">
                          {result.error.message}
                        </Typography>
                        <br/>
                        <Typography color="textSecondary">
                          {result.error.code}
                        </Typography>
                      </>) : (
                        <Typography variant="h4">
                          An error ocorrued :(
                          <br/>
                          {result.toString()}
                        </Typography>
                      )
                    }
                  </Fragment>
                )
                : (
                  <Fragment>
                    {t('translations:generator.fill')}
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
          {snackBar}
        </span>}
        action={[
          <Button key="undo" color="secondary" size="small" onClick={handleCloseSnack}>
            CLOSE
          </Button>
        ]}
      />
      <Dialog open={dialogOpen}>
        <DialogTitle>Share image link</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className={classes.copyBox}>
              <Link target="_blank" color="secondary" href={imageUrl}>{imageUrl}</Link>
              <IconButton onClick={copyLink} color="secondary" autoFocus>
                <FileCopyOutlinedIcon/>
              </IconButton>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
