import React, { useRef, useState } from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import { GridList } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'

import GridTheme from '../components/themesForms/GridTheme.jsx'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%'
  },
  center: {
    textAlign: 'right'
  }
}))

export default function Generator () {
  const classes = useStyles()
  const [theme, setTheme] = useState('')

  const handleThemeChange = event => {
    setTheme(event.target.value)
  }

  return (
    <div>
      <h1>Image generator</h1>
      <form style={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              select
              id="outlined-select-currency"
              label="Theme"
              value={theme}
              onChange={handleThemeChange}
              helperText="Please select the theme"
              className={classes.form}
              variant="outlined"
            >
              <MenuItem value="grid">Grid</MenuItem>
              <MenuItem value="tops">Tops</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="outlined-basic"
              label="Last.fm username"
              variant="outlined"
              helperText="Please type in your Last.fm username"
              className={classes.form}
            />
          </Grid>
        </Grid>
        <br />
        <GridTheme />
        <br />
        <div>
          <Grid item className={classes.center}>
            <Button size="large" variant="contained" color="secondary">
              Generate
            </Button>
          </Grid>
        </div>
      </form>
    </div>
  )
}
