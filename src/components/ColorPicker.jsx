/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useState, forwardRef } from 'react'
import { TwitterPicker } from 'react-color'
import { Button, MuiThemeProvider, createMuiTheme } from '@material-ui/core'

const ColorPicker = forwardRef(({ color, onChange, name, colors }, ref) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: color
      }
    }
  })

  return <div>
    <MuiThemeProvider theme={theme}>
      <Button
        color='primary'
        variant="contained"
        onClick={handleClick}
        className={{ background: color }}
        fullWidth
      >
        {name}
      </Button>
    </MuiThemeProvider>
    {open ? <div style={popover}>
      <div style={cover} onClick={handleClose} />
      <TwitterPicker
        color={color}
        onChange={onChange}
        colors={colors}
      />
    </div> : null}
  </div>
})

const popover = {
  position: 'absolute',
  zIndex: '2'
}
const cover = {
  position: 'fixed',
  top: '0px',
  right: '0px',
  bottom: '0px',
  left: '0px'
}

export default ColorPicker
