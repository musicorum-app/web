import React, { useImperativeHandle, forwardRef, useState, useRef } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import makeStyles from '@material-ui/core/styles/makeStyles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import FormGroup from '@material-ui/core/FormGroup'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%'
  }
}))

// eslint-disable-next-line react/display-name
const GridTheme = forwardRef((props, ref) => {
  const classes = useStyles()

  const type = useRef('albums')
  const size = useRef('4')
  const period = useRef('1month')
  const names = useRef(true)
  const playcount = useRef(false)

  const [typeHelperMessage, setTypeHelperMessage] = useState(null)
  const [sizeHelperMessage, setSizeHelperMessage] = useState(null)
  const [periodHelperMessage, setPeriodHelperMessage] = useState(null)

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
      setTypeHelperMessage('Please select a size')
      success = false
    }
    if (!period) {
      setTypeHelperMessage('Please select a period')
      success = false
    }
    return success
  }

  const getValues = () => {
    return {
      top: type.current.value,
      size: Number(size.current.value),
      period: period.current.value,
      names: names.current.checked,
      playcount: playcount.current.checked
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={8} sm={4}>
        <TextField
          select
          label="Type"
          error={!!typeHelperMessage}
          helperText={typeHelperMessage}
          className={classes.form}
          variant="outlined"
          inputRef={type}
          defaultValue=""
        >
          <MenuItem value="artists">Top artists</MenuItem>
          <MenuItem value="albums">Top albums</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={4} sm={4}>
        <TextField
          select
          label="Grid Size"
          error={!!sizeHelperMessage}
          helperText={sizeHelperMessage}
          className={classes.form}
          variant="outlined"
          inputRef={size}
          defaultValue="4"
        >
          <MenuItem value="3">3x3</MenuItem>
          <MenuItem value="4">4x4</MenuItem>
          <MenuItem value="5">5x5</MenuItem>
          <MenuItem value="6">6x6</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          select
          label="Period"
          error={!!periodHelperMessage}
          helperText={periodHelperMessage}
          className={classes.form}
          variant="outlined"
          defaultValue="1month"
          inputRef={period}
        >
          <MenuItem value="7day">7 days</MenuItem>
          <MenuItem value="1month">1 month</MenuItem>
          <MenuItem value="3month">3 months</MenuItem>
          <MenuItem value="6month">6 months</MenuItem>
          <MenuItem value="12month">1 year</MenuItem>
          <MenuItem value="overall">Overall</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Options</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Switch inputRef={names} color="primary" defaultChecked={true} />}
              label="Show names"
            />
            <FormControlLabel
              control={<Switch inputRef={playcount} color="primary" />}
              label="Show playcount"
            />
          </FormGroup>
        </FormControl>
      </Grid>
    </Grid>
  )
})

export default GridTheme
