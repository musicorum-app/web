/* eslint-disable react/prop-types */
import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Typography, FormControl, FormLabel, FormGroup, FormControlLabel, Switch, Badge } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import CustomPeriod from '../CustomPeriod.jsx'

const useStyles = makeStyles(() => ({
  form: {
    width: '100%'
  }
}))

// eslint-disable-next-line react/display-name
const TopsTheme = forwardRef((props, ref) => {
  const { t } = useTranslation()
  const classes = useStyles()

  // const [typeHelperMessage, setTypeHelperMessage] = useState(null)
  // const [sizeHelperMessage, setSizeHelperMessage] = useState(null)
  // const [periodHelperMessage, setPeriodHelperMessage] = useState(null)
  const [disabledPeriod, setDisabledPeriod] = useState(false)
  const [customPeriod, setCustomPeriod] = useState(null)
  const [showCustomPeriod, setShowCustomPeriod] = useState(false)

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
  // const module2Text = useRef('TOP ARTIST')

  useImperativeHandle(ref, () => ({
    validate,
    getValues
  }))

  const handleSelectPeriod = event => {
    if (event.target.value === 'custom') setShowCustomPeriod(true)
    else setShowCustomPeriod(false)
  }

  // const scrobblesText = useRef('SCROBBLES THIS MONTH')
  const module1Type = useRef('albums')
  // const module1Text = useRef('TOP ALBUM')
  const module2Type = useRef('artists')
  const getPeriod = () => {
    const formatDate = date => ~~(date.getTime() / 1000)
    return showCustomPeriod ? {
      from: formatDate(customPeriod.from),
      to: formatDate(customPeriod.to)
    } : period.current.value
  }

  const onCustomPeriodChange = event => {
    setCustomPeriod(event)
  }

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
    const periodText = t(`translations:generator.periodsShort.${period.current.value}`)
    return {
      period: getPeriod(),
      story: story.current.checked,
      modules: [
        {
          type: module1Type.current.value,
          message: t(`translations:generator.types.${module1Type.current.value}`).toUpperCase()
          // message: module1Text.current.value
        },
        {
          type: module2Type.current.value,
          message: t(`translations:generator.types.${module2Type.current.value}`).toUpperCase()
          // message: module2Text.current.value
        }
      ],
      messages: {
        // title: title.current.value,
        title: t('translations:themes.tops.title', { period: periodText }),
        scrobbles: t(`translations:themes.tops.scrobbles.${period.current.value}`)
      }
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          required
          select
          label={t('translations:generator.period')}
          // helperText="Please select the period"
          className={classes.form}
          defaultValue={defaultPeriod}
          variant="outlined"
          disabled={disabledPeriod}
          inputRef={period}
          onChange={handleSelectPeriod}
        >
          <MenuItem value="7day">{t('translations:generator.periods.7day')}</MenuItem>
          <MenuItem value="1month">{t('translations:generator.periods.1month')}</MenuItem>
          <MenuItem value="3month">{t('translations:generator.periods.3month')}</MenuItem>
          <MenuItem value="6month">{t('translations:generator.periods.6month')}</MenuItem>
          <MenuItem value="12month">{t('translations:generator.periods.12month')}</MenuItem>
          <MenuItem value="overall">{t('translations:generator.periods.overall')}</MenuItem>
          <MenuItem value="custom">{t('translations:generator.periods.custom')}</MenuItem>
        </TextField>
      </Grid>
      <CustomPeriod
        show={showCustomPeriod}
        onChange={onCustomPeriodChange}
      />
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
                {t('translations:themes.tops.module1')}
              </Typography>
            </Grid>
            <br />
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={6}>
                  <TextField
                    required
                    select
                    label={t('translations:generator.type')}
                    className={classes.form}
                    variant="outlined"
                    defaultValue="albums"
                    inputRef={module1Type}
                  >
                    <MenuItem value="artists">{t('translations:generator.types.artists')}</MenuItem>
                    <MenuItem value="albums">{t('translations:generator.types.albums')}</MenuItem>
                    <MenuItem value="tracks">{t('translations:generator.types.tracks')}</MenuItem>
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
              {t('translations:themes.tops.module2')}
            </Typography>
            <br />
            <Grid container spacing={3}>
              <Grid item xs={12} xl={6}>
                <TextField
                  required
                  select
                  label={t('translations:generator.type')}
                  className={classes.form}
                  variant="outlined"
                  defaultValue="artists"
                  inputRef={module2Type}
                >
                  <MenuItem value="artists">{t('translations:generator.types.artists')}</MenuItem>
                  <MenuItem value="albums">{t('translations:generator.types.albums')}</MenuItem>
                  <MenuItem value="tracks">{t('translations:generator.types.tracks')}</MenuItem>
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
                {t('translations:generator.options')}
              </FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Switch inputRef={story} color="primary" defaultChecked={false} />}
                  label={t('translations:generator.story')}
                />
              </FormGroup>
            </FormControl>
          </Grid>
        ) : ''}
      </Grid>
    </Grid>
  )
})

export default TopsTheme
