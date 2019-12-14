import React, { useState } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'

import GridTheme from '../components/themesForms/GridTheme.jsx'
import TopsTheme from '../components/themesForms/TopsTheme.jsx'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%'
  },
  center: {
    textAlign: 'right'
  },
  paper: {
    padding: theme.spacing(3, 2)
  }
}))

export default function Generator () {
  const classes = useStyles()
  const [theme, setTheme] = useState('')

  const handleThemeChange = event => {
    setTheme(event.target.value)
  }

  let inputElement
  switch (theme) {
    case 'grid':
      inputElement = (<GridTheme/>)
      break
    case 'tops':
      inputElement = (<TopsTheme/>)
      break
  }

  return (
    <div>
      <h1>Image generator</h1>
      <form style={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} lg={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  select
                  id="outlined-select-currency"
                  label="Theme"
                  value={theme}
                  onChange={handleThemeChange}
                  // helperText="Please select the theme"
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
                  // helperText="Please type in your Last.fm username"
                  className={classes.form}
                />
              </Grid>
            </Grid>
            <br/>
            { inputElement }
            <br/>
            <Grid item className={classes.center}>
              <Button size="large" variant="contained" color="secondary">
                Generate
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} lg={6}>
            <Paper className={classes.paper}>
              aaa
            </Paper>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
