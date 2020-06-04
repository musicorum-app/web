/* eslint-disable react/prop-types */
import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import makeStyles from '@material-ui/core/styles/makeStyles'
import ColorPreview from '../ColorPreview.jsx'
import { Badge, FormControl, FormLabel, FormGroup, Switch, FormControlLabel } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import CustomPeriod from '../CustomPeriod.jsx'

const useStyles = makeStyles(() => ({
  form: {
    width: '100%'
  }
}))

// eslint-disable-next-line react/display-name, react/prop-types
const TopsTheme = forwardRef(({ period: periodValue, showStory }, ref) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const titles = {
    artists: t('translations:themes.duotone.titles.artists'),
    albums: t('translations:themes.duotone.titles.albums'),
    tracks: t('translations:themes.duotone.titles.tracks')
  }

  const periods = {
    '7day': t('translations:themes.duotone.periods.7day'),
    '1month': t('translations:themes.duotone.periods.1month'),
    '3month': t('translations:themes.duotone.periods.3month'),
    '6month': t('translations:themes.duotone.periods.6month'),
    '12month': t('translations:themes.duotone.periods.12month'),
    overall: t('translations:themes.duotone.periods.overall')
  }

  // const [typeHelperMessage, setTypeHelperMessage] = useState(null)
  // const [sizeHelperMessage, setSizeHelperMessage] = useState(null)
  // const [periodHelperMessage, setPeriodHelperMessage] = useState(null)
  const [disabledPeriod, setDisabledPeriod] = useState(false)
  const [customPeriod, setCustomPeriod] = useState(null)
  const [showCustomPeriod, setShowCustomPeriod] = useState(false)

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

  const handleSelectPeriod = event => {
    if (event.target.value === 'custom') setShowCustomPeriod(true)
    else setShowCustomPeriod(false)
    console.log(event.target.value)
  }

  const getValues = () => {
    return {
      period: getPeriod(),
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
          label={t('translations:generator.period')}
          // helperText="Please select the period"
          className={classes.form}
          defaultValue={defaultPeriod}
          variant="outlined"
          inputRef={period}
          disabled={disabledPeriod}
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
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          select
          label={t('translations:generator.type')}
          className={classes.form}
          variant="outlined"
          inputRef={top}
          defaultValue="albums"
        >
          <MenuItem value="artists">{t('translations:generator.types.artists')}</MenuItem>
          <MenuItem value="albums">{t('translations:generator.types.albums')}</MenuItem>
          <MenuItem value="tracks">{t('translations:generator.types.tracks')}</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          select
          label={t('translations:themes.duotone.palette')}
          className={classes.form}
          variant="outlined"
          inputRef={pallete}
          defaultValue="purplish"
        >
          <MenuItem value="purplish"> <ColorPreview colors={['#16006F', '#F7396F']} /> Purplish</MenuItem>
          <MenuItem value="natural"><ColorPreview colors={['#1A2A56', '#00D574']} /> Natural</MenuItem>
          <MenuItem value="divergent"><ColorPreview colors={['#a21685', '#63acbb']} /> Divergent</MenuItem>
          <MenuItem value="sun"><ColorPreview colors={['#EA1264', '#D7FD31']} /> Bright Sun</MenuItem>
          <MenuItem value="yellish"><ColorPreview colors={['#141209', '#ffea00']} /> Yellish</MenuItem>
          <MenuItem value="horror"><ColorPreview colors={['#000000', '#dc2c2c']} /> Horror</MenuItem>
          <MenuItem value="sea"><ColorPreview colors={['#0239d8', '#68ebc1']} /> Sea</MenuItem>
        </TextField>
      </Grid>
      <CustomPeriod
        show={showCustomPeriod}
        onChange={onCustomPeriodChange}
      />
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
  )
})

export default TopsTheme
