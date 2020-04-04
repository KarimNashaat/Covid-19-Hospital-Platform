import React, { useEffect, useState } from 'react'
import './App.css'
import Layout from './Containers/Layout/layout'
import Auth from './Components/Auth/Auth'
import Home from './Components/Home/Home'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import HospitalPage from './Containers/HospitalPage/HospitalPage'
import Reservations from './Components/Reservations/Reservations'
import { connect } from 'react-redux'
import * as actions from './store/actions'
import Requests from './Components/Requests/Requests'
import Profile from './Containers/Profile/Profile'
import RealtimeSocket from './Components/RealtimeSocket'

function App(props) {
  useEffect(() => {
    props.trySignIn()
    props.fetchHospitals()
  }, [])

  let routes = null
  if (props.authanticated) {
    if (props.admin) {
      routes = <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/hospitalpage' exact component={HospitalPage} />
        <Route path='/messages' exact component={RealtimeSocket} />
        <Route path='/requests' exact component={Requests} />
        <Redirect to="/" />
      </Switch>
    }
    else {
      routes = <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/hospitalpage' exact component={HospitalPage} />
        <Route path='/reservations' exact component={Reservations} />
        <Route path='/messages' exact component={RealtimeSocket} />
        <Route path="/profile" exact component={Profile}/>
        <Redirect to="/" />
      </Switch>
    }
  }
  else {
    routes = <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/hospitalpage' exact component={HospitalPage} />
    <Redirect to="/" />
  </Switch>
  }

  return (
    <div className="App">
      <Auth />
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    signInForm: state.auth.signInForm,
    showModal: state.auth.showModal,
    admin: state.auth.admin,
    authanticated: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchHospitals: () => dispatch(actions.fetchHospitals()),
    trySignIn: () => dispatch(actions.onTrySignIn())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))
