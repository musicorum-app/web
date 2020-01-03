import React, { useImperativeHandle, forwardRef, useState, Fragment, useEffect, useRef } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'

import MusicorumAPI from '../api/main.js'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import indigo from '@material-ui/core/colors/indigo'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import StepLabel from '@material-ui/core/StepLabel'
import Step from '@material-ui/core/Step'
import Stepper from '@material-ui/core/Stepper'
import grey from '@material-ui/core/colors/grey'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import Timezones from '../api/timezones.js'
import GridTheme from '../components/themesForms/GridTheme.jsx'
import TopsTheme from '../components/themesForms/TopsTheme.jsx'
import { Divider } from '@material-ui/core'

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
}))
// eslint-disable-next-line react/display-name
const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
))

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
  const [previewLoading, setPreviewLoading] = useState(false)

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
        console.log(res.data)
        setLoading(false)
        setSchedules(res.data)
      }).catch(e => {
        console.error(e)
      })
    }
  }

  const getTime = minutes => {
    const hour = Math.floor(minutes / 60)
    const minute = minutes - (60 * hour)
    return {
      hour,
      minute
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  const handleCreateNew = () => {
    if (!schedules) return
    if (schedules.length >= 4) {
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
  }

  const generatePreview = () => {
    setNavButtonsDisabled(true)
    setPreviewLoading(true)

    setTimeout(() => setPreviewLoading(false), 7E3)
  }

  let inputElement = (<span>Please select a theme</span>)
  switch (theme) {
    case 'grid':
      inputElement = (<GridTheme ref={themeRef} />)
      break
    case 'tops':
      inputElement = (<TopsTheme ref={themeRef} />)
      break
  }

  let timeString
  timeString += timeValue.getHours

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
            <Typography variant="h5" color="primary">
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
                  Every <b>{scheduleValue === 'WEEKLY' ? 'week' : 'month'}</b>
                  {scheduleValue === 'WEEKLY' ? (<span> on <b>{weekDay}</b> </span>) : ' '}
                  at <b>{timeString} ({scheduleTimezone}) </b>
                  a tweet like the preview below will be posted on your profile.
                  <Card className={classes.card}>
                    <CardHeader
                      avatar={
                        <Avatar src={profile.twitter.profilePicture} />
                      }
                      title={profile.twitter.name}
                      subheader={'@' + profile.twitter.user}
                    />
                    <CardContent>
                      {tweetText}
                    </CardContent>
                  </Card>
                </Fragment>
              )
            ) : <Fragment></Fragment>}
        <br /><br /><br />
      </Fragment>)]
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
            color="secondary"
            disabled={!profile}
            onClick={handleCreateNew}
            startIcon={<Icon>add</Icon>}
          >
            Create new
          </Button>
        </Grid>
      </Grid>
      {
        loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <CircularProgress />
          </div>
        ) : (profile ? (
          <Grid container spacing={3}>
            {
              schedules ? (
                schedules.map(schedule => {
                  const { hour, minute } = getTime(schedule.time)
                  return <Grid item key={schedule.id} xs={12}>
                    <Card>
                      <CardContent>
                        <Chip
                          size="small"
                          label={schedule.schedule}
                          className={classes[schedule.schedule.toLowerCase()]} />
                        <Typography variant="h5" component="h5">
                          {schedule.name}
                        </Typography>
                        <p></p>
                        <Typography variant="h6" component="h6">
                          {hour}:{minute < 10 ? '0' + minute : minute}
                          <span className={classes.timezone}>  ({schedule.timezone})</span>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                })
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
                    disabled={activeStep === (steps.length - 1) || navButtonsDisabled}
                    onClick={nextStep}
                    variant="contained"
                    color="primary"
                    endIcon={<Icon>navigate_next</Icon>}
                  >
                    NEXT
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1} md={2} xl={3} />
          </Grid>
        </Fragment>
      </Dialog>

    </Fragment>
  )
}

export default forwardRef(SchedulesPage)
