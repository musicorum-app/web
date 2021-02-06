import React from "react"
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"
import ThemeProvider from "@material-ui/styles/ThemeProvider"
import { darkerRed } from "../../config/colors"
import { DateTimePicker } from '@material-ui/pickers'
import TextInput from "./TextInput"
import { styled } from "twin.macro"

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: darkerRed
    }
  },
  typography: {
    fontFamily: '"Poppins", sans-serif'
  }
})

const TextInputWidth = styled(TextInput)`
  width: 100%;
  
  input {
    width: 100%;
  }
`

const Label = styled.div`
  padding-top: 0px;
  transition: max-height .2s, padding-top .2s;
  font-size: 13px;
`

export default function DateInput({ label, onChange, value, ...opts }) {
  return <ThemeProvider theme={theme}>
    <div>
      {
        label && <Label>{label}</Label>
      }
      <DateTimePicker
        style={{
          width: '100%'
        }}
        TextFieldComponent={TextInputWidth}
        value={value}
        onChange={onChange}
        {...opts}
      />
    </div>
  </ThemeProvider>
}
