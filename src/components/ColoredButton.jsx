import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

import Utils from '../utils'

const createColorButton = color => withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(color),
    backgroundColor: color,
    '&:hover': {
      backgroundColor: Utils.shadeColor(color, -20)
    }
  }
}))(Button)

export default function ColoredButton (props) {
  // eslint-disable-next-line react/prop-types
  const ColorButton = createColorButton(props.color)
  const clone = { ...props }
  delete clone.color

  return <ColorButton {...clone} >
    {/* eslint-disable-next-line react/prop-types */}
    {props.children}
  </ColorButton>
}
