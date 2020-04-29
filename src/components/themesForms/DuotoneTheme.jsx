/* eslint-disable react/prop-types */
import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import makeStyles from '@material-ui/core/styles/makeStyles'
import ColorPreview from '../ColorPreview.jsx'
import { Badge, FormControl, FormLabel, FormGroup, Switch, FormControlLabel } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  form: {
    width: '100%'
  }
}))

const titles = {
  artists: 'MOST LISTENED ARTISTS',
  albums: 'MOST LISTENED ALBUMS',
  tracks: 'MOST LISTENED TRACKS'
}

const periods = {
  '7day': 'last 7 days',
  '1month': 'last 30 days',
  '3month': 'last 3 months',
  '6month': 'last 6 months',
  '12month': 'last year',
  overall: 'overall'
}

// eslint-disable-next-line react/display-name, react/prop-types
const TopsTheme = forwardRef(({ period: periodValue, showStory }, ref) => {
  const classes = useStyles()

  // const [typeHelperMessage, setTypeHelperMessage] = useState(null)
  // const [sizeHelperMessage, setSizeHelperMessage] = useState(null)
  // const [periodHelperMessage, setPeriodHelperMessage] = useState(null)
  const [disabledPeriod, setDisabledPeriod] = useState(false)

  // eslint-disable-next-line react/prop-types
  const scheduleValue = periodValue
  const defaultPeriod = scheduleValue ? scheduleValue === 'WEEKLY' ? '7day' : '1month' : '1month'

  useEffect(() => {
    if (scheduleValue) {
      setDisabledPeriod(true)
    }
  })

  const period = useRef(defaultPeriod)
  const top = useRef('albums')
  const pallete = useRef('purplish')
  const story = useRef(false)

  useImperativeHandle(ref, () => ({
    validate,
    getValues
  }))

  // const clearValues = () => {
  //   setTypeHelperMessage(null)
  //   setSizeHelperMessage(null)
  //   setPeriodHelperMessage(null)
  // }

  const validate = () => {
    // clearValues()
    // let success = true
    // const { top, size, period } = getValues()
    // if (!top) {
    //   setTypeHelperMessage('Please select a type')
    //   success = false
    // }
    // if (!size) {
    //   setTypeHelperMessage('Please select a size')
    //   success = false
    // }
    // if (!period) {
    //   setTypeHelperMessage('Please select a period')
    //   success = false
    // }
    // return success
    return true
  }

  const getValues = () => {
    return {
      period: period.current.value,
      top: top.current.value,
      pallete: pallete.current.value,
      story: story.current.checked,
      messages: {
        title: titles[top.current.value],
        subtitle: periods[period.current.value],
        scrobbles: ['scrobbles', periods[period.current.value]]
      }
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <TextField
          required
          select
          id="outlined-select-currency"
          label="Period"
          // helperText="Please select the period"
          className={classes.form}
          defaultValue={defaultPeriod}
          variant="outlined"
          inputRef={period}
          disabled={disabledPeriod}
        >
          <MenuItem value="7day">7 days</MenuItem>
          <MenuItem value="1month">1 month</MenuItem>
          <MenuItem value="3month">3 month</MenuItem>
          <MenuItem value="6month">6 month</MenuItem>
          <MenuItem value="12month">1 year</MenuItem>
          <MenuItem value="overall">Overall</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          select
          label="Type"
          className={classes.form}
          variant="outlined"
          inputRef={top}
          defaultValue="albums"
        >
          <MenuItem value="artists">Top artists</MenuItem>
          <MenuItem value="albums">Top albums</MenuItem>
          <MenuItem value="tracks">Top tracks</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          select
          label="Pallete"
          className={classes.form}
          variant="outlined"
          inputRef={pallete}
          defaultValue="purplish"
        >
          <MenuItem value="purplish"> <ColorPreview colors={['#16006F', '#F7396F']} /> Purplish</MenuItem>
          <MenuItem value="natural"><ColorPreview colors={['#1A2A56', '#00D574']} /> Natural</MenuItem>
          <MenuItem value="divergent"><ColorPreview colors={['#a21685', '#63acbb']} /> Divergent</MenuItem>
          <MenuItem value="sun"><ColorPreview colors={['#EA1264', '#D7FD31']} /> Bright Sun</MenuItem>
        </TextField>
      </Grid>
      {showStory ? (
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Options
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Switch inputRef={story} color="primary" defaultChecked={false} />}
                label={
                  <Badge color="secondary" badgeContent="NEW">
                    Story format (for posting on places like instagram story)
                    &nbsp;&nbsp;&nbsp;
                  </Badge>
                }
              />
            </FormGroup>
          </FormControl>
        </Grid>
      ) : ''}
    </Grid>
  )
})

export default TopsTheme
