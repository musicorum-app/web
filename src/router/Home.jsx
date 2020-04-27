import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  logo: {
    height: 1
  },
  main: {
    textAlign: 'center'
  }
}))

export default function HomePage() {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      {/* <img src={MusicorumLogo} alt="Musicorum Logo" className={classes.logo} /> */}
      <h1>A fancy way to share your last.fm status</h1>
      <Link to="/generate" className="routerLink">
        <Button variant="contained" color="primary" disableElevation>Generate now</Button>
      </Link>
    </div>
  )
}
