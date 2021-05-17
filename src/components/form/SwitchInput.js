import React from 'react'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { darkerRed } from '../../config/colors'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: darkerRed,
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
})

export default function SwitchInput({ label, onChange, checked, disabled }) {
  return (
    <ThemeProvider theme={theme}>
      <FormControlLabel
        control={
          <Switch
            color="primary"
            disabled={disabled}
            checked={checked}
            onChange={onChange}
            name={label}
          />
        }
        label={label}
      />
    </ThemeProvider>
  )
}
