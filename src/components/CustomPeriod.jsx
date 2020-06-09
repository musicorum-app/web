import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%'
  }
}))

const CustomPeriod = ({ show, onChange }) => {
  if (!show) return <></>
  const { t } = useTranslation()
  const classes = useStyles()
  const [fromDate, setFrom] = useState(new Date())
  const [to, setTo] = useState(new Date())

  useEffect(() => {
    update()
  }, [])

  const update = () => onChange({
    from: fromDate,
    to
  })

  const handleChangeFrom = event => {
    setFrom(event)
    update()
  }

  const handleChangeTo = event => {
    setTo(event)
    update()
  }
  return <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Grid item xs={12} sm={6}>
      <DateTimePicker
        autoOk
        label={t('translations:generator.from')}
        disableFuture
        minDate={new Date(2000, 0, 0)}
        // error={!!scheduleTimeHelperMessage}
        // helperText={scheduleTimeHelperMessage}
        inputVariant="outlined"
        className={classes.form}
        value={fromDate}
        onChange={handleChangeFrom}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <DateTimePicker
        autoOk
        label={t('translations:generator.to')}
        disableFuture
        minDate={new Date(2000, 0, 0)}
        showTodayButton
        // error={!!scheduleTimeHelperMessage}
        // helperText={scheduleTimeHelperMessage}
        inputVariant="outlined"
        className={classes.form}
        value={to}
        onChange={handleChangeTo}
      />
    </Grid>
  </MuiPickersUtilsProvider>
}

export default CustomPeriod
