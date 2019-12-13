/* eslint-disable no-undef */
import React  from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import grey from '@material-ui/core/colors/grey'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import DrawerComponent from './Drawer.jsx'
import { useTheme } from '@material-ui/styles'
import Hidden from '@material-ui/core/Hidden'

import Home from '../router/Home.jsx'
import Generator from '../router/Generator.jsx'
import TwitterCallback from '../router/auth/TwitterCallback.jsx'

const drawerWidth = 270

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    backgroundColor: grey['800'],
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

export default function App () {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const theme = useTheme()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (<DrawerComponent/>)

  return (
    <div className={classes.root}>
      <BrowserRouter>
        { !location.pathname.startsWith('/auth/') ? (
          <div>
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon/>
                </IconButton>
                <Typography variant="h6" noWrap>
                  MUSICORUM
                </Typography>
              </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Hidden smUp implementation="js">
                <Drawer
                  variant="temporary"
                  anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  classes={{
                    paper: classes.drawerPaper
                  }}
                  ModalProps={{
                    keepMounted: true // Better open performance on mobile.
                  }}
                >
                  {drawer}
                </Drawer>
              </Hidden>
              <Hidden xsDown implementation="js">
                <Drawer
                  classes={{
                    paper: classes.drawerPaper
                  }}
                  variant="permanent"
                  open
                >
                  {drawer}
                </Drawer>
              </Hidden>
            </nav>
          </div>
        ) : null }
        <main className={classes.content}>
          <div className={classes.toolbar}/>
          <Switch>
            <Route path="/" exact={true} component={Home}/>
            <Route path="/generate" component={Generator}/>
            <Route path="/auth/twitter/callback" component={TwitterCallback}/>
          </Switch>
        </main>
      </BrowserRouter>
    </div>)
}
