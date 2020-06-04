/* eslint-disable react/prop-types */
import React, { useImperativeHandle, forwardRef, useState, useRef, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import makeStyles from '@material-ui/core/styles/makeStyles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import FormGroup from '@material-ui/core/FormGroup'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import { Badge } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%'
  }
}))

// eslint-disable-next-line react/display-name
const GridTheme = forwardRef((props, ref) => {
  const { t } = useTranslation()
  const classes = useStyles()

  // eslint-disable-next-line react/prop-types
  const scheduleValue = props.period
  const showStory = props.showStory
  const defaultPeriod = scheduleValue ? scheduleValue === 'WEEKLY' ? '7day' : '1month' : '1month'

  const [typeHelperMessage, setTypeHelperMessage] = useState(null)
  const [sizeHelperMessage, setSizeHelperMessage] = useState(null)
  const [periodHelperMessage, setPeriodHelperMessage] = useState(null)
  const [disabledPeriod, setDisabledPeriod] = useState(false)
  const [sizeDisabled, setSizeDisabled] = useState(false)

  useEffect(() => {
    if (scheduleValue) {
      setDisabledPeriod(true)
    }
  })

  const type = useRef('albums')
  const size = useRef('4')
  const period = useRef(defaultPeriod)
  const names = useRef(true)
  const playcount = useRef(false)
  const story = useRef(false)

  useImperativeHandle(ref, () => ({
    validate,
    getValues
  }))

  const clearValues = () => {
    setTypeHelperMessage(null)
    setSizeHelperMessage(null)
    setPeriodHelperMessage(null)
  }

  const validate = () => {
    clearValues()
    let success = true
    const { top, size, period } = getValues()
    if (!top) {
      setTypeHelperMessage('Please select a type')
      success = false
    }
    if (!size) {
      setSizeHelperMessage('Please select a size')
      success = false
    }
    if (!period) {
      setPeriodHelperMessage('Please select a period')
      success = false
    }
    return success
  }

  const handleStory = event => {
    console.log(event.target.checked)
    if (event.target.checked) setSizeDisabled(true)
    else setSizeDisabled(false)
  }

  const getValues = () => {
    return {
      top: type.current.value,
      size: Number(size.current.value),
      period: period.current.value,
      names: names.current.checked,
      playcount: playcount.current.checked,
      story: story.current.checked
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={8} sm={4}>
        <TextField
          select
          label={t('translations:generator.type')}
          error={!!typeHelperMessage}
          helperText={typeHelperMessage}
          className={classes.form}
          variant="outlined"
          inputRef={type}
          defaultValue="albums"
        >
          <MenuItem value="artists">{t('translations:generator.types.artists')}</MenuItem>
          <MenuItem value="albums">{t('translations:generator.types.albums')}</MenuItem>
          <MenuItem value="tracks">{t('translations:generator.types.tracks')}</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={4} sm={4}>
        <TextField
          select
          label={t('translations:themes.grid.size')}
          error={!!sizeHelperMessage}
          helperText={sizeHelperMessage}
          className={classes.form}
          variant="outlined"
          inputRef={size}
          defaultValue="4"
          disabled={sizeDisabled}
        >
          <MenuItem value="3">3x3</MenuItem>
          <MenuItem value="4">4x4</MenuItem>
          <MenuItem value="5">5x5</MenuItem>
          <MenuItem value="6">6x6</MenuItem>
          <MenuItem value="7">7x7</MenuItem>
          <MenuItem value="8">8x8</MenuItem>
          <MenuItem value="9">9x9</MenuItem>
          <MenuItem value="10">10x10</MenuItem>
          <MenuItem value="11">11x11</MenuItem>
          <MenuItem value="12">12x12</MenuItem>
          <MenuItem value="13">13x13</MenuItem>
          <MenuItem value="14">14x14</MenuItem>
          <MenuItem value="15">15x15</MenuItem>
          <MenuItem value="16">16x16 ({t('translations:themes.grid.takeLonger')})</MenuItem>
          <MenuItem value="17">17x17 ({t('translations:themes.grid.takeLonger')})</MenuItem>
          <MenuItem value="18">18x18 ({t('translations:themes.grid.takeLonger')})</MenuItem>
          <MenuItem value="19">19x19 ({t('translations:themes.grid.takeLonger')})</MenuItem>
          <MenuItem value="20">20x20 ({t('translations:themes.grid.takeLonger')})</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          select
          label={t('translations:generator.period')}
          error={!!periodHelperMessage}
          helperText={periodHelperMessage}
          className={classes.form}
          variant="outlined"
          defaultValue={defaultPeriod}
          disabled={disabledPeriod}
          inputRef={period}
        >
          <MenuItem value="7day">{t('translations:generator.periods.7day')}</MenuItem>
          <MenuItem value="1month">{t('translations:generator.periods.1month')}</MenuItem>
          <MenuItem value="3month">{t('translations:generator.periods.3month')}</MenuItem>
          <MenuItem value="6month">{t('translations:generator.periods.6month')}</MenuItem>
          <MenuItem value="12month">{t('translations:generator.periods.12month')}</MenuItem>
          <MenuItem value="overall">{t('translations:generator.periods.overall')}</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">{t('translations:generator.options')}</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Switch inputRef={names} color="primary" defaultChecked={true} />}
              label={t('translations:themes.grid.showNames')}
            />
            <FormControlLabel
              control={<Switch inputRef={playcount} color="primary" />}
              label={t('translations:themes.grid.showPlaycount')}
            />
            {showStory ? (
              <FormControlLabel
                control={<Switch onChange={handleStory} inputRef={story} color="primary" defaultChecked={false} />}
                label={
                  <Badge color="secondary" badgeContent={t('translations:generator.new')}>
                    {t('translations:generator.story')}
                    &nbsp;&nbsp;&nbsp;
                  </Badge>
                }
              />
            ) : ''}
          </FormGroup>
        </FormControl>
      </Grid>
    </Grid>
  )
})

export default GridTheme
