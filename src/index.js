import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/browser'
import './lang/i18n.js'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import pink from '@material-ui/core/colors/pink'

import App from './components/App.jsx'

import 'main.scss'
import CssBaseline from '@material-ui/core/CssBaseline'
import { red } from '@material-ui/core/colors'

// Sentry.init({ dsn: 'https://f1ffd8deb85a40b2af1d898b9db3cd91@o379578.ingest.sentry.io/5214333' })

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: red[900]
    },
    secondary: {
      main: pink[400]
    }
  }
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)
