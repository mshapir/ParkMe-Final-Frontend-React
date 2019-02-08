import React, { Component } from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import MenuAppBar from './MenuAppBar.js'
import Login from './Login.js'
import SocialLogin from './SocialLogin.js'
import SignUp from './SignUp.js'
import Home from './Home.js'
import NewListingForm from './NewListingForm.js'
import Loading from './Loading'
import MyReservations from './MyReservations';

class App extends Component {
  state={
    listings: [],
    user: [],
    isLoggedIn: false,
    reservations: []
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
      this.fetchAllListings()
      this.getReservations()
      this.props.history.push('/home')
    })
  }



  getCurrentUser = () => {
    let token = localStorage.getItem("token")
    return fetch('http://localhost:3001/api/v1/users/current_user',{
      method: 'POST',
      headers: {
        Authorization: `${token}`
      }
    })
    .then(r => r.json())
    .then(data => {
        console.log(data)
        this.setState({
          user: data
        }, this.getReservations)
    })
  }

  handleLogout = (e) => {
    localStorage.clear()
      this.setState({
        user: [],
        isLoggedIn: false
      }, () => this.props.history.push('/home'))
  }

  getReservations = () => {
    let token = localStorage.getItem("token")
    fetch(`http://localhost:3001/api/v1/users/${this.state.user.id}/reservations`, {
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
        reservations: data
      })
    })
  }

  fetchAllListings = () => {
    let token = localStorage.getItem("token")
    console.log(token);
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
    console.log(this.state.reservations, 'app');
    return (
      <div>
        <MenuAppBar user={this.state.user} logout={this.handleLogout} isLoggedIn={this.state.isLoggedIn}/>
        <Switch>

        <Route
        path='/reservations'
        render={() => (<MyReservations reservations={this.state.reservations}/>)}
        />

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
