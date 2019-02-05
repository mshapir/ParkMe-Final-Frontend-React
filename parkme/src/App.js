import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import MenuAppBar from './MenuAppBar.js'
import Login from './Login.js'
import SocialLogin from './SocialLogin.js'
import SignUp from './SignUp.js'
import Home from './Home.js'
import NewListingForm from './NewListingForm.js'
import ListingGrid from './ListingGrid'

class App extends Component {
  state={
    listings: [],
    user: null,
    isLoggedIn: false
  }

  componentDidMount(){
    this.fetchAllListings()
  }

  updateUser = (user) => {
    this.setState({
      user,
      isLoggedIn: true
    })
  }

  fetchAllListings = () => {
    let token = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTE4MjY0NDIsImlzcyI6Imlzc3Vlcl9uYW1lIiwiYXVkIjoiY2xpZW50IiwidXNlcl9pZCI6MX0.UbJoxikOQ2FOgxKa808v8GBjNPGMYA1L1fpJA6FykS4'
    fetch('http://localhost:3001/api/v1/listings/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }
    })
    .then(r => r.json())
    .then(data => {
      this.setState({
        listings: data
      })
    })
  }

  render() {
    console.log(this.state.listings);
    return (
      <div>
        <MenuAppBar user={this.state.user} isLoggedIn={this.state.isLoggedIn} />
        <Switch>

        <Route
        path='/newlisting'
        render={() => (<NewListingForm />)}
        />

        <Route
        path='/signup'
        render={() => (<SignUp updateUser={this.updateUser}/>)}
        />
        <Route
        path='/login'
        render={() => (
          <div>
          <Login updateUser={this.updateUser}/>
          <SocialLogin updateUser={this.updateUser}/>
          </div> )}
        />
        <Route
        path='/home'
        render={() => (
          <div>
          <Home listings={this.state.listings}/>
          </div> )}
        />
        </Switch>
      </div>
    );
  }
}

export default App;

// {this.state.isLoggedIn ? <div><Login updateUser={this.updateUser}/><SocialLogin updateUser={this.updateUser}/></div> : <div> <SignUp updateUser={this.updateUser}/> </div>}
