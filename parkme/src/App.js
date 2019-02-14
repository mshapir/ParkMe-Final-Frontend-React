import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import MenuAppBar from './MenuAppBar.js'
import Login from './Login.js'
import SocialLogin from './SocialLogin.js'
import SignUp from './SignUp.js'
import Home from './Home.js'
import NewListingForm from './NewListingForm.js'
import MyReservations from './MyReservations';
import 'react-dates/initialize';
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import DefaultTheme from 'react-dates/lib/theme/DefaultTheme';
import MyCreatedListings from './MyCreatedListings';

class App extends Component {
  state={
    listings: [],
    user: [],
    isLoggedIn: false,
    reservations: [],
    myListings: []
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
      this.fetchAllListings()
      this.getReservations()
      this.getMyListings()
      this.props.history.push('/home')
    })
  }

  updateReviews = () => {
    this.fetchAllListings()
    this.props.history.push('/home')
  }

  updateListings = (listing) => {
    let listings = [...this.state.listings, listing]
    this.setState({
      listings
    }, () => this.props.history.push('/home'))
  }

  updateReservations = (reservation) => {
    let reservations = [...this.state.reservations, reservation]
    this.setState({
      reservations
    }, () => this.props.history.push('/reservations'))
  }

  deleteReservation = (reservationObj) => {
    let reservations = [...this.state.reservations].filter(reservation => reservation !== reservationObj)
    this.setState({
      reservations
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
        this.setState({
          user: data
        }, () => {
          this.getReservations()
          this.getMyListings()
        })
    })
  }

  handleLogout = (e) => {
    localStorage.clear()
      this.setState({
        user: [],
        isLoggedIn: false
      }, () => this.props.history.push('/login'))
  }

  getMyListings = () => {
    let token = localStorage.getItem("token")
    fetch(`http://localhost:3001/api/v1/users/${this.state.user.id}/listings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }
    })
    .then(r => r.json())
    .then(data => {
      this.setState({
        myListings: data
      })
    })
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
      this.setState({
        reservations: data
      })
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
        path='/mylistings'
        render={() => (<MyCreatedListings myListings={this.state.myListings} />)}
        />

        <Route
        path='/reservations'
        render={() => (<MyReservations reservations={this.state.reservations} deleteReservation={this.deleteReservation} user={this.state.user} updateReviews={this.updateReviews}/>)}
        />

        <Route
        path='/newlisting'
        render={() => (<NewListingForm user={this.state.user} updateListings={this.updateListings}/>)}
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
          <Home listings={this.state.listings} user={this.state.user} isLoggedIn={this.state.isLoggedIn} updateReservations={this.updateReservations}/>
          </div> )}
        />
        </Switch>
      </div>
    );
  }
}

ThemedStyleSheet.registerTheme({
  reactDates: {
    ...DefaultTheme.reactDates,
    color: {
      ...DefaultTheme.reactDates.color,
      highlighted: {
        backgroundColor: '#82E0AA',
        backgroundColor_active: '#58D68D',
        backgroundColor_hover: '#58D68D',
        color: '#186A3B',
        color_active: '#186A3B',
        color_hover: '#186A3B',
      },
    },
  },
});

export default withRouter(App);
