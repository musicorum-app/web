import React from 'react'
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'

import App from './components/App.jsx'

import 'main.scss'
import CssBaseline from '@material-ui/core/CssBaseline'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: red
  }
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)
