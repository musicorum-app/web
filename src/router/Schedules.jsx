import React, { useImperativeHandle, forwardRef, useState, Fragment, useEffect, useRef } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'

import MusicorumAPI from '../api/main.js'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Slide from '@material-ui/core/Slide'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import StepLabel from '@material-ui/core/StepLabel'
import Step from '@material-ui/core/Step'
import Stepper from '@material-ui/core/Stepper'
import grey from '@material-ui/core/colors/grey'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import Alert from '@material-ui/lab/Alert'
import Paper from '@material-ui/core/Paper'
import LinearProgress from '@material-ui/core/LinearProgress'
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import Timezones from '../api/timezones.js'
import GridTheme from '../components/themesForms/GridTheme.jsx'
import TopsTheme from '../components/themesForms/TopsTheme.jsx'
import MusicorumGenerator from '../api/generator.js'
import Schedule from '../components/Schedule.jsx'

const useStyles = makeStyles(theme => ({
  loading: {
    padding: theme.spacing(3, 2),
    textAlign: 'center'
  },
  weekly: {
    backgroundColor: red[500]
  },
  timezone: {
    color: theme.palette.text.secondary,
    fontSize: 13,
    fontWeight: 400,
    textDecoration: 'none'
  },
  btnGrid: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  close: {
    padding: theme.spacing(0.5)
  },
  appBar: {
    backgroundColor: grey['900'],
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  form: {
    width: '100%'
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
  right: {
    alignItems: 'right'
  },
  themeOptions: {
    backgroundColor: grey['800']
  },
  paper: {
    padding: theme.spacing(3, 2),
    textAlign: 'center'
  },
  previewImage: {
    borderRadius: 13,
    width: '100%'
  },
  previewBox: {
    textAlign: 'center',
    padding: theme.spacing(3, 2)
  },
  previewText: {
    fontSize: 19
  },
  tweetText: {
    fontSize: 23
  },
  card: {
    backgroundColor: grey['900'],
    maxWidth: '600px'
  },
  boxCard: {
    // textAlign: 'center'
  }
}))
// eslint-disable-next-line react/display-name
const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
))

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const previewResultDefault = {
  success: false,
  url: null,
  error: {
    code: 'W#???#000',
    message: 'Unknown Error.',
    error: 'UNKNOWN_ERROR'
  }
}

const SchedulesPage = (props, ref) => {
  const themeRef = useRef()
  const classes = useStyles()

  useImperativeHandle(ref, () => ({
    onLoad
  }))

  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [schedules, setSchedules] = useState(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState(null)
  const [dialogOpened, setDialogOpened] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [navButtonsDisabled, setNavButtonsDisabled] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteScheduleItem, setDeleteScheduleItem] = useState('')
  const [deleteScheduleLoading, setDeleteScheduleLoading] = useState(false)
  const [alertText, setAlertText] = useState(null)
  const [previewLoading, setPreviewLoading] = useState(false)
  const [previewResult, setPreviewResult] = useState(previewResultDefault)

  // Helper messages
  const [scheduleNameHelperMessage, setScheduleNameHelperMessage] = useState(null)
  const [scheduleValueHelperMessage, setScheduleValueHelperMessage] = useState(null)
  const [scheduleTimeHelperMessage, setScheduleTimeHelperMessage] = useState(null)
  const [scheduleWeekDayHelperMessage, setScheduleWeekDayHelperMessage] = useState(null)
  const [scheduleTimezoneHelperMessage, setScheduleTimezoneHelperMessage] = useState(null)

  const [tweetTextHelperMessage, setTweetHelperMessage] = useState(null)
  const [themeHelperMessage, setThemeHelperMessage] = useState(null)

  // Inputs
  const [scheduleName, setScheduleName] = useState('')
  const [scheduleValue, setScheduleValue] = useState('')
  const [timeValue, setTimeValue] = useState(new Date())
  const [weekDay, setWeekDay] = useState('')
  const [scheduleTimezone, setScheduleTimezone] = useState(Timezones.find(({ offset }) => offset === new Date().getTimezoneOffset()).tz)

  const [tweetText, setTweetText] = useState('')
  const [theme, setTheme] = useState('')

  const [themeOptions, setThemeOptions] = useState(null)

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const profile = localStorage.getItem('profile')
    onLoad(JSON.parse(profile))
  }, [])

  const onLoad = data => {
    setLoading(true)
    setProfile(data)
    setAlertText(null)
    if (!data) {
      setLoading(false)
    } else {
      MusicorumAPI.getSchedules().then(res => {
        console.log(res.data)
        setLoading(false)
        setSchedules(res.data)
      }).catch(e => {
        let err = { message: 'Unknown error', error: 'UNKNOWN_ERROR_FE' }
        if (e && e.response && e.response.data && e.response.data.error) err = e.response.data
        setAlertText('Error while loading schedules: ' + err.message + '. (' + err.error + ')')
        console.error(e)
      })
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  const handleCreateNew = () => {
    if (!schedules) return
    if (schedules.length >= 3) {
      setSnackbarMessage('You have reached out the schedules limit.')
      setSnackbarOpen(true)
    } else {
      setDialogOpened(true)
    }
  }

  const handleDialogClose = () => {
    setDialogOpened(false)
  }

  const handleChangeName = sch => {
    setScheduleNameHelperMessage(null)
    setScheduleName(sch.target.value)
  }

  const handleChangeSchedule = sch => {
    setScheduleValueHelperMessage(null)
    setScheduleValue(sch.target.value)
  }

  const handleTimeChange = time => {
    setTimeValue(time)
  }

  const handleChangeWeekDay = sch => {
    setScheduleWeekDayHelperMessage(null)
    setWeekDay(sch.target.value)
  }

  const handleChangeTimezone = sch => {
    setScheduleTimezone(sch.target.value)
  }

  const weekDayClick = () => {
    if (scheduleValue !== 'WEEKLY') {
      setSnackbarMessage('Week day Option avaliable only on Weekly schedule.')
      setSnackbarOpen(true)
    }
  }

  const handleThemeChange = t => {
    setTheme(t.target.value)
    setThemeHelperMessage(null)
  }

  const handleTweetTextChange = t => {
    setTweetText(t.target.value)
    setTweetHelperMessage(null)
  }

  const clearErrors = () => {
    setScheduleNameHelperMessage(null)
    setScheduleTimeHelperMessage(null)
    setScheduleWeekDayHelperMessage(null)
    setScheduleValueHelperMessage(null)
    setScheduleTimezoneHelperMessage(null)
    setTweetHelperMessage(null)
    setThemeHelperMessage(null)
  }

  const nextStep = () => {
    clearErrors()
    if (activeStep === 0) {
      let success = true
      if (scheduleName.length === 0 || scheduleName.length > 15) {
        success = false
        setScheduleNameHelperMessage('Please type a valid name.')
      }
      if (!scheduleValue) {
        success = false
        setScheduleValueHelperMessage('Please select a schedule type')
      }
      if (scheduleValue && scheduleValue === 'WEEKLY' && !weekDay) {
        success = false
        setScheduleWeekDayHelperMessage('Please select a valid week day')
      }
      if (!scheduleTimezone) {
        success = false
        setScheduleTimeHelperMessage('Please select a valid timezone')
      }
      if (success) setActiveStep(activeStep + 1)
    }
    if (activeStep === 1) {
      let success = true
      if (tweetText.length > 200) {
        success = false
        setTweetHelperMessage('Please type a text less than 200 characters.')
      }
      if (!theme) {
        success = false
        setThemeHelperMessage('Please select a theme')
      } else {
        if (themeRef.current) {
          if (!themeRef.current.validate()) success = false
        } else success = false
      }
      if (success) {
        setActiveStep(activeStep + 1)
        generatePreview()
      }
    }
    if (activeStep === 2) {
      finish()
    }
  }

  const generatePreview = () => {
    setNavButtonsDisabled(true)
    setPreviewLoading(true)

    const themeData = themeRef.current.getValues()
    setThemeOptions(themeData)

    const data = {
      theme,
      options: {
        user: profile.lastfm.user,
        ...themeData
      }
    }

    MusicorumGenerator.generate(data).then(({ url }) => {
      setPreviewResult({
        success: true,
        url
      })
    }).catch(({ error }) => {
      console.error(error)
      setSnackbarMessage('Some error ocorrured while generating your preview image. Please try again or contact support.')
      setSnackbarOpen(true)
      setPreviewResult({
        success: false,
        error
      })
    }).finally(() => {
      setNavButtonsDisabled(false)
      setPreviewLoading(false)
    })
  }

  const deleteSchedule = () => {
    const { id } = deleteScheduleItem
    setDeleteScheduleLoading(true)
    MusicorumAPI.deleteSchedule(id).then(res => {
      console.log(res)
      if (res.data.success) {
        handleDialogClose()
        // eslint-disable-next-line no-undef
        const profile = localStorage.getItem('profile')
        setDeleteDialogOpen(false)
        onLoad(JSON.parse(profile))
      } else {
        let err = 'Unknown error'
        if (res && res.data && res.data.error && res.data.error.error) err = res.data.error.message
        setSnackbarMessage('An error ocorrured while deleting the schedule: ' + err)
        setSnackbarOpen(true)
      }
    }).catch(e => {
      console.error(e)
      console.error(e.response.data)
      let err = 'Unknown error'
      if (e && e.response && e.response.data && e.response.data.error) err = e.response.data.error.message
      setSnackbarMessage('An error ocorrured while deleting the schedule: ' + err)
      setSnackbarOpen(true)
    }).finally(() => {
      setDeleteScheduleLoading(false)
    })
  }

  const deleteScheduleDialog = schedule => {
    setDeleteScheduleItem(schedule)
    setDeleteDialogOpen(true)
  }

  const finish = () => {
    const data = {
      name: scheduleName,
      schedule: scheduleValue,
      time: (timeValue.getHours() * 60) + timeValue.getMinutes(),
      timezone: scheduleTimezone,
      day: Number(weekDay || 0),
      text: !tweetText ? ' ' : tweetText,
      theme,
      themeOptions
    }

    setNavButtonsDisabled(true)

    MusicorumAPI.createSchedule(data).then(a => {
      console.log(a)
      if (a.data.success) {
        handleDialogClose()
        // eslint-disable-next-line no-undef
        const profile = localStorage.getItem('profile')
        onLoad(JSON.parse(profile))
        setActiveStep(0)
      } else {
        let err = 'Unknown error'
        if (a && a.data && a.data.error && a.data.error.error) err = a.data.error.message
        setSnackbarMessage('An error ocorrured while creating the schedule: ' + err)
        setSnackbarOpen(true)
      }
    }).catch(e => {
      console.error(e)
      console.error(e.response.data)
      let err = 'Unknown error'
      if (e && e.response && e.response.data && e.response.data.error) err = e.response.data.error.message
      setSnackbarMessage('An error ocorrured while creating the schedule: ' + err)
      setSnackbarOpen(true)
    }).finally(() => {
      setNavButtonsDisabled(false)
    })
  }

  let inputElement = (<span>Please select a theme</span>)
  switch (theme) {
    case 'grid':
      inputElement = (<GridTheme period={scheduleValue} ref={themeRef} />)
      break
    case 'tops':
      inputElement = (<TopsTheme period={scheduleValue} ref={themeRef} />)
      break
  }

  const convertTime = t => {
    const hour = t.getHours() % 12 || 12
    const ampm = t.getHours() < 12 ? 'AM' : 'PM'
    return `${hour}:${t.getMinutes() < 10 ? t.getMinutes() + '0' : t.getMinutes()} ${ampm}`
  }

  const steps = [
    ['Schedule options', (
      <Fragment key={0}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <form style={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8}>
                <TextField
                  inputProps={{
                    minLength: 1,
                    maxLength: 15
                  }}
                  error={!!scheduleNameHelperMessage}
                  label="Schedule name"
                  variant="outlined"
                  helperText={scheduleNameHelperMessage}
                  value={scheduleName}
                  onChange={handleChangeName}
                  className={classes.form}
                  name="scheduleName"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  select
                  error={!!scheduleValueHelperMessage}
                  label="Schedule type"
                  helperText={scheduleValueHelperMessage}
                  className={classes.form}
                  variant="outlined"
                  onChange={handleChangeSchedule}
                  value={scheduleValue}
                >
                  <MenuItem value="WEEKLY">Weekly</MenuItem>
                  <MenuItem value="MONTHLY">Monthly</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TimePicker
                  autoOk
                  label="Schedule time"
                  error={!!scheduleTimeHelperMessage}
                  helperText={scheduleTimeHelperMessage}
                  inputVariant="outlined"
                  className={classes.form}
                  value={timeValue}
                  onChange={handleTimeChange}
                />
              </Grid>
              <Grid item xs={12} sm={8} onClick={weekDayClick}>
                <TextField
                  select
                  error={!!scheduleWeekDayHelperMessage}
                  helperText={scheduleWeekDayHelperMessage}
                  label="Week day"
                  disabled={scheduleValue !== 'WEEKLY'}
                  className={classes.form}
                  value={weekDay}
                  onChange={handleChangeWeekDay}
                  variant="outlined"
                >
                  <MenuItem value="0">Sunday</MenuItem>
                  <MenuItem value="1">Monday</MenuItem>
                  <MenuItem value="2">Tuesday</MenuItem>
                  <MenuItem value="3">Wednesday</MenuItem>
                  <MenuItem value="4">Thursday</MenuItem>
                  <MenuItem value="5">Friday</MenuItem>
                  <MenuItem value="6">Saturday</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Timezone"
                  error={!!scheduleTimezoneHelperMessage}
                  helperText={scheduleTimezoneHelperMessage}
                  className={classes.form}
                  variant="outlined"
                  value={scheduleTimezone}
                  onChange={handleChangeTimezone}
                >
                  {Timezones.map(({ text, tz }) => <MenuItem key={tz} value={tz}>{text}</MenuItem>)}
                </TextField>
              </Grid>
            </Grid>
          </form>
        </MuiPickersUtilsProvider>
      </Fragment>
    )],
    ['Tweet options', (
      <Fragment key={1}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <form style={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  inputProps={{
                    maxLength: 200
                  }}
                  multiline
                  rows="3"
                  error={!!tweetTextHelperMessage}
                  label="Tweet text"
                  variant="outlined"
                  helperText={tweetTextHelperMessage}
                  value={tweetText}
                  onChange={handleTweetTextChange}
                  className={classes.form}
                />
              </Grid>
              <Grid item xs={12}>
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
            </Grid>
            <br />
            <Divider />
            <br />
            <Typography variant="h5" color="secondary">
              Theme Options
            </Typography>
            <br />
            {inputElement}
            <br />
          </form>
        </MuiPickersUtilsProvider>
      </Fragment>
    )],
    ['Finish', (
      <Fragment key={2}>
        {previewLoading
          ? (
            <Fragment>
              <Paper className={classes.paper}>
                <CircularProgress size={50} />
                <br /><br />
                <Typography variant="h4">
                  Loading...
                </Typography>
                <br />
                <Typography color="textSecondary">
                  This can take a while...
                </Typography>
              </Paper>
            </Fragment>
          ) : profile
            ? (
              (
                <Fragment>
                  <span className={classes.previewText}>
                    Every <b>{scheduleValue === 'WEEKLY' ? 'week' : 'month'}</b>
                    {scheduleValue === 'WEEKLY' ? (<span> on <b>{weekDays[weekDay]}</b> </span>) : ' '}
                    at <b>{convertTime(timeValue)} ({scheduleTimezone}) </b>
                    a tweet like the preview below* will be posted on your profile. If is that what you want, please click <b>Finish</b>.
                  </span>
                  <br /><br />
                  <b>*</b> Preview picture based on current last.fm data
                  <br /><br />
                  <Box className={classes.boxCard}>
                    <Card variant="outlined" className={classes.card}>
                      <CardHeader
                        avatar={
                          <Avatar src={profile.twitter.profilePicture} />
                        }
                        title={profile.twitter.name}
                        subheader={'@' + profile.twitter.user}
                      />
                      <CardContent className={classes.tweetText}>
                        {tweetText}
                        <Box className={classes.previewBox}>
                          {previewResult.success
                            ? (
                              <Fragment>
                                <img src={previewResult.url} className={classes.previewImage} />
                              </Fragment>
                            ) : (
                              <Fragment>
                                <Icon style={{ fontSize: 50 }} color="error">close</Icon>
                                <br />
                                <Typography variant="h4">
                                  {previewResult.error.message}
                                </Typography>
                                <br />
                                <Typography color="textSecondary">
                                  {previewResult.error.code}
                                </Typography>
                              </Fragment>
                            )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Fragment >
              )
            ) : <Fragment></Fragment>}
        <br /> <br /> <br />
      </Fragment >)]
  ]

  const currentStep = steps[activeStep]

  return (
    <Fragment>
      <Grid container direction="row" alignItems="center">
        <Grid item>
          <h1>Schedules</h1>
        </Grid>
        <Grid item xs={6} className={classes.btnGrid}>
          <Button
            variant="contained"
            color="primary"
            disabled={!profile}
            onClick={handleCreateNew}
            startIcon={<Icon>add</Icon>}
          >
            Create new
          </Button>
        </Grid>
      </Grid>
      {
        loading
          ? alertText ? (
            <Alert variant="outlined" severity="error">
              {alertText}
            </Alert>
          ) : (
            <div style={{
              // eslint-disable-next-line indent
                display: 'flex',
              justifyContent: 'center'
            }}>
              <CircularProgress />
            </div>
          )
          : (profile ? (
            <Grid container spacing={3}>
              {
                schedules ? (
                  schedules.map(schedule => (
                    <Grid item xs={12} key={schedule.id}>
                      <Schedule index={schedules.indexOf(schedule)} onDelete={deleteScheduleDialog} data={schedule} />
                    </Grid>))
                ) : <CircularProgress />}
            </Grid>
          ) : (<div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            Please, log in to access this page.
          </div>))
      }

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">{snackbarMessage}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleSnackbarClose}
          >
            <Icon>close</Icon>
          </IconButton>
        ]}
      />

      <Dialog
        open={dialogOpened}
        TransitionComponent={Transition}
        fullScreen
        keepMounted
        onClose={handleDialogClose}
      >
        <AppBar color="secondary" className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleDialogClose} aria-label="close">
              <Icon>close</Icon>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Create new Schedule
            </Typography>
            <Button autoFocus color="inherit" onClick={handleDialogClose}>
              cancel
            </Button>
          </Toolbar>
        </AppBar>
        {navButtonsDisabled ? (
          <LinearProgress />
        ) : (<Fragment></Fragment>)}
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(([label]) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Fragment>
          <Grid container>
            <Grid item xs={1} md={2} xl={3} />
            <Grid item xs={10} md={8} xl={6}>
              <Typography variant="h4" style={{ paddingBottom: '1em' }}>{currentStep[0]}</Typography>
              {currentStep[1]}
              <Grid container direction="row" justify="flex-end" spacing={3}>
                <Grid item>
                  <Button
                    disabled={activeStep === 0 || navButtonsDisabled}
                    onClick={() => setActiveStep(activeStep - 1)}
                    startIcon={<Icon>navigate_before</Icon>}
                  >
                    BACK
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    disabled={navButtonsDisabled}
                    onClick={nextStep}
                    variant="contained"
                    color="primary"
                    endIcon={<Icon>navigate_next</Icon>}
                  >
                    {activeStep === (steps.length - 1) ? 'FINISH' : 'NEXT'}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1} md={2} xl={3} />
          </Grid>
        </Fragment>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        TransitionComponent={Transition}
        disableBackdropClick={deleteScheduleLoading}
        disableEscapeKeyDown={deleteScheduleLoading}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        {deleteScheduleLoading && <LinearProgress color="secondary"/>}
        <DialogTitle id="delete-dialog-title">Delete &apos;{deleteScheduleItem.name}&apos;</DialogTitle>
        <DialogContent style={{ textAlign: 'center' }}>
          <DialogContentText id="auth-dialog-description">
            Deleting this schedule can&apos;t be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={deleteScheduleLoading} onClick={() => setDeleteDialogOpen(false)} color="secondary">
            CANCEL
          </Button>
          <Button disabled={deleteScheduleLoading} onClick={deleteSchedule} color="secondary">
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default forwardRef(SchedulesPage)
