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
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import Timezones from '../api/timezones.js'

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
  }
}))
// eslint-disable-next-line react/display-name
const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
))

const SchedulesPage = (props, ref) => {
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

  const [scheduleNameHelperMessage, setScheduleNameHelperMessage] = useState(null)

  const [scheduleName, setScheduleName] = useState('')
  const [scheduleValue, setScheduleValue] = useState('')
  const [timeValue, setTimeValue] = useState(new Date())
  const [weekDay, setWeekDay] = useState('')
  const [scheduleTimezone, setScheduleTimezone] = useState(Timezones.find(({ offset }) => offset === new Date().getTimezoneOffset()).tz)

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
    setScheduleName(sch.target.value)
  }

  const handleChangeSchedule = sch => {
    setScheduleValue(sch.target.value)
  }

  const handleTimeChange = time => {
    setTimeValue(time)
  }

  const handleChangeWeekDay = sch => {
    setWeekDay(sch.target.value)
  }

  const handleChangeTimezone = sch => {
    setScheduleTimezone(sch.target.value)
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
                  id="outlined-basic"
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
                  error={!!scheduleNameHelperMessage}
                  id="outlined-select-currency"
                  label="Schedule type"
                  helperText={scheduleNameHelperMessage}
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
                  inputVariant="outlined"
                  className={classes.form}
                  value={timeValue}
                  onChange={handleTimeChange}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  select
                  error={!!scheduleNameHelperMessage}
                  id="outlined-select-currency"
                  label="Week day"
                  helperText={scheduleNameHelperMessage}
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
                  error={!!scheduleNameHelperMessage}
                  id="outlined-select-currency"
                  label="Timezone"
                  helperText={scheduleNameHelperMessage}
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
      <Chip key={1} />
    )],
    ['Finish', (
      <Chip key={1} />
    )]
  ]

  const currentStep = steps[activeStep]

  return (
    <Fragment>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={6} justify="flex-end">
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
        ) : (
            profile ? (
              <Grid container spacing={3}>
                {schedules ? (
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
            ) : (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  Please, log in to access this page.
            </div>
              )
          )
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
              <Button startIcon={<Icon>navigate_before</Icon>}>
                BACK
              </Button>
              <Button variant="contained" color="primary" endIcon={<Icon>navigate_next</Icon>}>
                NEXT
              </Button>
            </Grid>
            <Grid item xs={1} md={2} xl={3} />
          </Grid>
        </Fragment>
      </Dialog>

    </Fragment>
  )
}

export default forwardRef(SchedulesPage)
