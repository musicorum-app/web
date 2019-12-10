/* eslint-disable no-undef */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import Icon from '@material-ui/core/Icon'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import red from '@material-ui/core/colors/red'
import { Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

import MusicorumAPI from '../api/main'

export default class Drawer extends Component {
  constructor (props) {
    super(props)
    // Define your state object here
    this.state = {
      loaded: false,
      account: null
    }
  }

  componentDidMount () {
    this.checkAuth()
  }

  checkAuth () {
    const token = localStorage.getItem('token')
    if (!token) {
      this.setState({
        loaded: true,
        account: null
      })
    } else {
      MusicorumAPI.getAuthStatus(token).then(res => {
        const account = res.data.twitter
        this.setState({
          loaded: true,
          account
        })
      }).catch(e => {
        if (e.response.status === 401) {
          this.setState({
            loaded: true,
            account: null
          })
          localStorage.removeItem('token')
        }
      })
    }
  }

  render () {
    return (
      <div>
        <Divider/>
        {this.state.loaded ? (
          <List>
            <ListItem button>
              <ListItemAvatar>
                {this.state.account ? (
                  <Avatar alt={this.state.account.user} src={this.state.account.profilePicture} />
                ) : (
                  <Avatar><Icon>account_circle</Icon></Avatar>
                )}
              </ListItemAvatar>
              <ListItemText
                primary={this.state.account ? this.state.account.name : 'Log in with Twitter'}
                secondary={this.state.account ? '@' + this.state.account.user : null}/>
            </ListItem>
            {this.state.account ? (
              <div>
                <ListItem button>
                  <ListItemIcon><Icon>settings</Icon></ListItemIcon>
                  <ListItemText primary='Settings'/>
                </ListItem>
                <ListItem button>
                  <ListItemIcon><Icon>today</Icon></ListItemIcon>
                  <ListItemText primary='Schedulers'/>
                </ListItem>
                <ListItem button>
                  <ListItemIcon><Icon color="error">input</Icon></ListItemIcon>
                  <ListItemText primary={
                    <Typography color="error">Log out</Typography>
                  }/>
                </ListItem>
              </div>
            ) : ''}
          </List>
        ) : (
          <List>
            <ListItem button>
              <ListItemIcon>
                <CircularProgress color="secondary" />
              </ListItemIcon>
              <ListItemText primary='Loading...'/>
            </ListItem>
          </List>
        )}
        <Divider/>
        <List>
          <ListItem button>
            <ListItemIcon><Icon>home</Icon></ListItemIcon>
            <ListItemText primary='Home'/>
          </ListItem>
          <ListItem button>
            <ListItemIcon><Icon>image</Icon></ListItemIcon>
            <ListItemText primary='Image Generator'/>
          </ListItem>
        </List>
      </div>)
  }
}
