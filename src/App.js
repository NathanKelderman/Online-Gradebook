import React, { Component } from 'react';
import './App.css';
import HomePage from './components/HomePage'

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import firebase from 'firebase'
import database from './firebase.js'

const styles = {
  root: {
    flexGrow: 1,
  },
  button: {
    marginRight: 0,
  },
  title: {
    margin: 'auto',
    fontSize: 70
  },

}

class App extends Component {

  state = {
    authenticated: false,
    user: null
  }
  
  render() {
    const { classes } = this.props
    return (
      <div className="Online Gradebook">
        <div className="Header">
          <AppBar position="static" className={classes.root}>
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.title}>
                Gradebook
              </Typography>
              {this.state.authenticated 
                ? <Button onClick={() => this.logout()}>Logout</Button>
                : <Button onClick={() => this.validateForm()}>Login</Button>
              }
            </Toolbar>
          </AppBar>
        </div>
        <div classname="Body">
        {this.state.authenticated ? <HomePage database={database} user={this.state.user}/> : <p></p>}
        </div>
      </div>
    );
  }

  logout() {
    database.auth().signOut()
    .then(() => {
      var users = database.database().ref().child("users")
      users.orderByChild("uid").on("child_added", snapshot => {
        if( snapshot.val().uid === this.state.user.uid) {
          database.database().ref("/users/" + snapshot.key + "/loggedIn").set(false)
        }
      })
      this.setState({
        authenticated: false,
        user: null
      })
    })
  }

  validateForm() {
    var provider = new firebase.auth.GoogleAuthProvider()
    database.auth().signInWithPopup(provider)
    .then((result) => {
        var users = database.database().ref().child("users")
        users.orderByChild("uid").equalTo(result.user.uid).once("value",snapshot => {
          if (!snapshot.exists()){
            users.push().set({ 
              user: result.user.displayName,
              uid: result.user.uid, 
              loggedIn: true
            })
          } else {
              users.orderByChild("uid").on("child_added", snapshotUID => {
                  if( snapshotUID.val().uid === result.user.uid) {
                    database.database().ref("/users/" + snapshotUID.key + "/loggedIn").set(true)
                  }
              })
            }
        })
        this.setState({
            user: result.user,
            authenticated: true
        })
    })
  }

}

export default withStyles(styles) (App)
