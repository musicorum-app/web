import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%'
  }
}))

// eslint-disable-next-line react/display-name
const TopsTheme = forwardRef((props, ref) => {
  const classes = useStyles()

  const period = useRef('1month')
  const title = useRef('my month on music')
  const scrobblesText = useRef('SCROBBLES THIS MONTH')
  const module1Type = useRef('albums')
  const module1Text = useRef('TOP ALBUM')
  const module2Type = useRef('artists')
  const module2Text = useRef('TOP ARTIST')

  // const [typeHelperMessage, setTypeHelperMessage] = useState(null)
  // const [sizeHelperMessage, setSizeHelperMessage] = useState(null)
  // const [periodHelperMessage, setPeriodHelperMessage] = useState(null)

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
      modules: [
        {
          type: module1Type.current.value,
          message: module1Text.current.value
        },
        {
          type: module2Type.current.value,
          message: module2Text.current.value
        }
      ],
      messages: {
        title: title.current.value,
        scrobbles: scrobblesText.current.value
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
          defaultValue="1month"
          variant="outlined"
          inputRef={period}
        >
          <MenuItem value="7day">7 days</MenuItem>
          <MenuItem value="1month">1 month</MenuItem>
          <MenuItem value="3month">3 month</MenuItem>
          <MenuItem value="6month">6 month</MenuItem>
          <MenuItem value="1year">1 year</MenuItem>
          <MenuItem value="overall">Overall</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          required
          inputProps={{
            maxLength: 25
          }}
          id="outlined-basic"
          label="Title"
          variant="outlined"
          defaultValue="my month on music"
          // helperText="Please type in your Last.fm username"
          className={classes.form}
          inputRef={title}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          required
          inputProps={{
            maxLength: 25
          }}
          id="outlined-basic"
          label="Scrobbles subtext"
          variant="outlined"
          defaultValue="SCROBBLES THIS MONTH"
          // helperText="Please type in your Last.fm username"
          className={classes.form}
          inputRef={scrobblesText}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={5}>
          <Grid item xs={12} lg={6}>
            <Grid item xs={12}>
              <Typography variant="h6" color="primary">
                Module #1
              </Typography>
            </Grid>
            <br/>
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
                    <MenuItem value="artists">Top artists</MenuItem>
                    <MenuItem value="albums">Top albums</MenuItem>
                    <MenuItem value="tracks">Top tracks</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} xl={6}>
                  <TextField
                    required
                    inputProps={{
                      maxLength: 20
                    }}
                    id="outlined-basic"
                    label="Text"
                    variant="outlined"
                    defaultValue="TOP ALBUM"
                    // helperText="Please type in your Last.fm username"
                    className={classes.form}
                    inputRef={module1Text}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography variant="h6" color="primary">
              Module #2
            </Typography>
            <br/>
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
                  <MenuItem value="artists">Top artists</MenuItem>
                  <MenuItem value="albums">Top albums</MenuItem>
                  <MenuItem value="tracks">Top tracks</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} xl={6}>
                <TextField
                  required
                  inputProps={{
                    maxLength: 20
                  }}
                  id="outlined-basic"
                  label="Text"
                  variant="outlined"
                  defaultValue="TOP ARTIST"
                  // helperText="Please type in your Last.fm username"
                  className={classes.form}
                  inputRef={module2Type}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
})

export default TopsTheme
