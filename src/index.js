import React from 'react'
import ReactDOM from 'react-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import pink from '@material-ui/core/colors/pink'

import App from './components/App.jsx'

import 'main.scss'
import CssBaseline from '@material-ui/core/CssBaseline'
import { red } from '@material-ui/core/colors'

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
