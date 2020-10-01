import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'

// eslint-disable-next-line react/prop-types
export default function PatreonIcon ({ style }) {
  style = style || {}
  return <SvgIcon style={style}>
    <path
      d="M22 8.37031C22 12.723 18.4594 16.268 14.1023 16.268C9.73242 16.268 6.17891 12.7273 6.17891 8.37031C6.17891 4.00469 9.73242 0.451172 14.1023 0.451172C18.4594 0.451172 22 4.00469 22 8.37031ZM0 21.5488H3.86719V0.451172H0V21.5488Z"/>
  </SvgIcon>
}
