/* eslint-disable react/prop-types */
import React, { useImperativeHandle, forwardRef, useRef } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import Link from '@material-ui/core/Link'

import lesbian from '../../assets/flags/lesbian.svg'
import gay from '../../assets/flags/gay.svg'
import bisexual from '../../assets/flags/bisexual.svg'
import asexual from '../../assets/flags/asexual.svg'
import genderFluid from '../../assets/flags/genderFluid.svg'
import nonBinary from '../../assets/flags/nonBinary.svg'
import pansexual from '../../assets/flags/pansexual.svg'
import transgender from '../../assets/flags/transgender.svg'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%'
  },
  flag: {
    height: '1em',
    marginRight: 4
  }
}))

// eslint-disable-next-line react/display-name
const PrideTheme = forwardRef((props, ref) => {
  const { t } = useTranslation()
  const classes = useStyles()

  const flag = useRef('lgbt')

  useImperativeHandle(ref, () => ({
    validate,
    getValues
  }))

  const validate = () => true

  const getValues = () => {
    return {
      flag: flag.current.value
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          select
          label="Flag"
          className={classes.form}
          variant="outlined"
          inputRef={flag}
          defaultValue="lgbt"
        >
          <MenuItem value="lgbt">
            <img src="https://discordapp.com/assets/fd4b28db5d02e26f4ee43ab549ecffd4.svg" className={classes.flag} />
            LGBT+
          </MenuItem>
          <MenuItem value="lesbian">
            <img src={lesbian} className={classes.flag} />
            Lesbian
          </MenuItem>
          <MenuItem value="gay">
            <img src={gay} className={classes.flag} />
            Lesbian
          </MenuItem>
          <MenuItem value="bisexual">
            <img src={bisexual} className={classes.flag} />
            Bisexual
          </MenuItem>
          <MenuItem value="transgender">
            <img src={transgender} className={classes.flag} />
            Transgender
          </MenuItem>
          <MenuItem value="pansexual">
            <img src={pansexual} className={classes.flag} />
            Pansexual
          </MenuItem>
          <MenuItem value="nonBinary">
            <img src={nonBinary} className={classes.flag} />
            Non binary
          </MenuItem>
          <MenuItem value="asexual">
            <img src={asexual} className={classes.flag} />
            Asexual
          </MenuItem>
          <MenuItem value="genderFluid">
            <img src={genderFluid} className={classes.flag} />
            Gender Fluid
          </MenuItem>
        </TextField>
      </Grid>
      <Grid item>
        If your flag isn&apos;t listed, please <Link target="_blank" color="secondary" href="https://twitter.com/MusicorumApp">tweet at us</Link>
        <Typography variant="body1">
          Please note that pride generations may take up to 40 seconds, since we need to get a bunch of images and compare each of them
        </Typography>
      </Grid>
    </Grid>
  )
})

export default PrideTheme
