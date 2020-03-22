/* eslint-disable react/prop-types */
import React, { forwardRef, Fragment } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(() => ({
  dot: {
    width: '30px',
    height: '30px'
  }
}))

// eslint-disable-next-line react/display-name
const ColorPreview = forwardRef((props) => {
  const classes = useStyles()
  // const type = props.type
  const colors = props.colors

  return <Fragment className="colorDotGroup">
    <span className="colorDotGroup">
      <span className="colorDot up" style={{ backgroundColor: colors[0] }}>&nbsp;</span>
      <span className="colorDot down" style={{ backgroundColor: colors[1] }}>&nbsp;</span>
    </span>
  </Fragment>
})

export default ColorPreview
