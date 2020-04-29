/* eslint-disable react/prop-types */
import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Typography, FormControl, FormLabel, FormGroup, FormControlLabel, Switch, Badge } from '@material-ui/core'
import ColorPicker from '../ColorPicker.jsx'

const useStyles = makeStyles(() => ({
  form: {
    width: '100%'
  }
}))

const titles = {
  '7day': 'WEEK ON MUSIC',
  '1month': 'MONTH ON MUSIC',
  '3month': 'LAST 3 MONTHS ON MUSIC',
  '6month': 'LAST 6 MONTHS ON MUSIC',
  '12month': 'YEAR ON MUSIC',
  overall: 'MUSIC OVER ALL THE TIME'
}

const colors = ['#FF335F', '#A144FF', '#5A00F2', '#449AFF', '#80f8f8', '#30F868', '#D7FD31', '#FAFF00', '#FFFFFF']

// eslint-disable-next-line react/display-name
const DarklyTheme = forwardRef((props, ref) => {
  const classes = useStyles()

  const [disabledPeriod, setDisabledPeriod] = useState(false)
  const [primaryColor, setPrimaryColor] = useState('#FF335F')
  const [secondaryColor, setSecondaryColor] = useState('#30F868')

  // eslint-disable-next-line react/prop-types
  const scheduleValue = props.period
  const showStory = props.showStory
  const defaultPeriod = scheduleValue ? scheduleValue === 'WEEKLY' ? '7day' : '1month' : '1month'

  useEffect(() => {
    if (scheduleValue) {
      setDisabledPeriod(true)
    }
  })

  const story = useRef(false)
  const period = useRef(defaultPeriod)
  // const title = useRef('my month on music')
  // const scrobblesText = useRef('SCROBBLES THIS MONTH')
  const module1Type = useRef('albums')
  // const module1Text = useRef('TOP ALBUM')
  const module2Type = useRef('artists')
  // const module2Text = useRef('TOP ARTIST')

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
      story: story.current.checked,
      color: primaryColor,
      accent: secondaryColor,
      modules: [
        {
          type: module1Type.current.value,
          message: `TOP ${module1Type.current.value.toUpperCase().slice(0, -1)}`
          // message: module1Text.current.value
        },
        {
          type: module2Type.current.value,
          message: `TOP ${module2Type.current.value.toUpperCase().slice(0, -1)}`
          // message: module2Text.current.value
        }
      ],
      messages: {
        // title: title.current.value,
        title: ['%USER%\'s', titles[period.current.value]],
        scrobbles: 'SCROBBLES'
      }
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
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
      <Grid item xs={12} sm={6}>
        <ColorPicker
          name="Primary Color"
          color={primaryColor}
          onChange={c => setPrimaryColor(c.hex)}
          colors={colors}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <ColorPicker
          name="Secondary Color"
          color={secondaryColor}
          onChange={c => setSecondaryColor(c.hex)}
          colors={colors}
        />
      </Grid>
      {/* <Grid item xs={12} lg={6}> */}
      {/*  <TextField */}
      {/*    required */}
      {/*    inputProps={{ */}
      {/*      maxLength: 25 */}
      {/*    }} */}
      {/*    id="outlined-basic" */}
      {/*    label="Title" */}
      {/*    variant="outlined" */}
      {/*    defaultValue="my month on music" */}
      {/*    // helperText="Please type in your Last.fm username" */}
      {/*    className={classes.form} */}
      {/*    inputRef={title} */}
      {/*  /> */}
      {/* </Grid> */}
      {/* <Grid item xs={12} lg={6}> */}
      {/* <TextField */}
      {/*   required */}
      {/*   inputProps={{ */}
      {/*     maxLength: 25 */}
      {/*   }} */}
      {/*   id="outlined-basic" */}
      {/*   label="Scrobbles subtext" */}
      {/*   variant="outlined" */}
      {/*   defaultValue="SCROBBLES THIS MONTH" */}
      {/*   // helperText="Please type in your Last.fm username" */}
      {/*   className={classes.form} */}
      {/*   inputRef={scrobblesText} */}
      {/* /> */}
      {/* </Grid> */}
      <Grid item xs={12}>
        <Grid container spacing={5}>
          <Grid item xs={12} lg={6}>
            <Grid item xs={12}>
              <Typography variant="h6" color="primary">
                Module #1
              </Typography>
            </Grid>
            <br />
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={6}>
                  <TextField
                    required
                    select
                    label="Type"
                    className={classes.form}
                    variant="outlined"
                    defaultValue="albums"
                    inputRef={module1Type}
                  >
                    <MenuItem value="artists">Top artist</MenuItem>
                    <MenuItem value="albums">Top album</MenuItem>
                    <MenuItem value="tracks">Top track</MenuItem>
                  </TextField>
                </Grid>
                {/* <Grid item xs={12} xl={6}> */}
                {/*  <TextField */}
                {/*    required */}
                {/*    inputProps={{ */}
                {/*      maxLength: 20 */}
                {/*    }} */}
                {/*    id="outlined-basic" */}
                {/*    label="Text" */}
                {/*    variant="outlined" */}
                {/*    defaultValue="TOP ALBUM" */}
                {/*    className={classes.form} */}
                {/*    inputRef={module1Text} */}
                {/*  /> */}
                {/* </Grid> */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography variant="h6" color="primary">
              Module #2
            </Typography>
            <br />
            <Grid container spacing={3}>
              <Grid item xs={12} xl={6}>
                <TextField
                  required
                  select
                  label="Type"
                  className={classes.form}
                  variant="outlined"
                  defaultValue="artists"
                  inputRef={module2Type}
                >
                  <MenuItem value="artists">Top artist</MenuItem>
                  <MenuItem value="albums">Top album</MenuItem>
                  <MenuItem value="tracks">Top track</MenuItem>
                </TextField>
              </Grid>
              {/* <Grid item xs={12} xl={6}> */}
              {/*  <TextField */}
              {/*    required */}
              {/*    inputProps={{ */}
              {/*      maxLength: 20 */}
              {/*    }} */}
              {/*    id="outlined-basic" */}
              {/*    label="Text" */}
              {/*    variant="outlined" */}
              {/*    defaultValue="TOP ARTIST" */}
              {/*    className={classes.form} */}
              {/*    inputRef={module2Text} */}
              {/*  /> */}
              {/* </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
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
    </Grid>
  )
})

export default DarklyTheme
