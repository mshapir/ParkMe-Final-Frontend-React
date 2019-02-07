import React, { Component } from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import MenuAppBar from './MenuAppBar.js'
import Login from './Login.js'
import SocialLogin from './SocialLogin.js'
import SignUp from './SignUp.js'
import Home from './Home.js'
import NewListingForm from './NewListingForm.js'
import Loading from './Loading'

class App extends Component {
  state={
    listings: [],
    user: [],
    isLoggedIn: false
  }

  componentDidMount(){
      this.getCurrentUser()
      this.fetchAllListings()
  }


  updateUser = (user) => {
    this.setState({
      user: user,
      isLoggedIn: true
    }, () =>  {
      // debugger
      this.props.history.push('/home')
    })
  }


  getCurrentUser = () => {
    let token = localStorage.getItem("token")
    return fetch('http://localhost:3001/api/v1/users/current_user',{
      method: 'GET',
      headers: {
        Authorization: `${token}`
      }
    })
    .then(r => r.json())
    .then(data => {
        console.log(data)
        this.setState({
          user: data
        })
    })
  }

  handleLogout = (e) => {
    localStorage.clear()
      this.setState({
        user: [],
        isLoggedIn: false
      })
  }

  fetchAllListings = () => {
    let token = localStorage.getItem("token")
    return fetch('http://localhost:3001/api/v1/listings/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }
    })
    .then(r => r.json())
    .then(data => {
      console.log(data);
      this.setState({
        listings: data
      })
    })
  }

  render() {
    console.log(this.state.listings);
    return (
      <div>
        <MenuAppBar user={this.state.user} logout={this.handleLogout} isLoggedIn={this.state.isLoggedIn}/>
        <Switch>

        <Route
        path='/newlisting'
        render={() => (<NewListingForm />)}
        />

        <Route
        path='/signup'
        render={() => (<SignUp updateUser={this.updateUser} getCurrentUser={this.getCurrentUser}/>)}
        />
        <Route
        path='/login'
        render={() => (
          <div>
          <Login updateUser={this.updateUser} getCurrentUser={this.getCurrentUser} />
          <SocialLogin updateUser={this.updateUser}/>
          </div> )}
        />
        <Route
        path='/home'
        render={() => (
          <div>
          <Home listings={this.state.listings} user={this.state.user} isLoggedIn={this.state.isLoggedIn}/>
          </div> )}
        />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
