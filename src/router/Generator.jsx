import React, { useRef, useState } from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'

export default function Generator () {
  const [theme, setTheme] = useState('')

  const inputLabel = useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  const handleThemeChange = event => {
    setTheme(event.target.value)
  }

  return (
    <div>
      <h1>Image generator</h1>
      <FormControl variant="outlined">
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Theme <b style={{ color: 'red' }}>*</b>
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={theme}
          onChange={handleThemeChange}
          labelWidth={labelWidth}
        >
          <MenuItem value="grid">Grid</MenuItem>
          <MenuItem value="tops">Tops</MenuItem>
        </Select>
        <FormHelperText>Select a theme for your image</FormHelperText>
      </FormControl>
    </div>
  )
}
