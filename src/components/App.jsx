/* eslint-disable no-undef */
import React, { useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import DrawerComponent from './Drawer.jsx'
import { useTheme } from '@material-ui/styles'
import Hidden from '@material-ui/core/Hidden'

import Home from '../router/Home.jsx'
import Generator from '../router/Generator.jsx'
import Account from '../router/Account.jsx'
import Schedules from '../router/Schedules.jsx'
import History from '../router/History.jsx'
import TwitterCallback from '../router/auth/TwitterCallback.jsx'
import LastfmCallback from '../router/auth/LastfmCallback.jsx'

import MusicorumLogo from '../assets/logotext.svg'

const drawerWidth = 250

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
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    color: '#fff'
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
  },
  logo: {
    height: 17
  }
}))

export default function App () {
  const schedulesRef = useRef()
  const accountRef = useRef()
  const historyRef = useRef()

  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const theme = useTheme()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleLoad = data => {
    if (schedulesRef.current) schedulesRef.current.onLoad(data)
    if (accountRef.current) accountRef.current.onLoad(data)
    if (historyRef.current) historyRef.current.onLoad(data)
  }

  const drawer = (<DrawerComponent onLogin={handleLoad} onLoad={handleLoad}/>)

  return (
    <div className={classes.root}>
      <BrowserRouter>
        {!location.pathname.startsWith('/auth/') ? (
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
                  <img className={classes.logo} src={MusicorumLogo} alt="Musicorum logo" draggable={false} />
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
        ) : null}
        <main className={classes.content}>
          <div className={classes.toolbar}/>
          <Switch>
            <Route path="/" exact={true} component={Home}/>
            <Route path="/generate" component={Generator}/>
            <Route path="/account" render={() => <Account ref={accountRef}/>}/>
            <Route path="/schedules/:id/history" render={(props) => <History ref={historyRef} {...props}/>}/>
            <Route path="/schedules" render={() => <Schedules ref={schedulesRef}/>}/>
            <Route path="/auth/twitter/callback" component={TwitterCallback}/>
            <Route path="/auth/lastfm/callback" component={LastfmCallback}/>
          </Switch>
        </main>
      </BrowserRouter>
    </div>)
}
