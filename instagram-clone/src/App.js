import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import ProfilePage from "./containers/ProfilePage"
import NavBar from "./components/navbar"
import PostFormContainer from "./containers/postFormContainer"
import PostShowPage from "./containers/postShowPage"


const BaseUserURL = "http://localhost:3000/api/v1/users/"

class App extends Component {
  constructor(){
    super()
    this.state = {
      currentUser: null
    }
  }
  componentDidMount(){
    let url = BaseUserURL + "2"
    fetch(url)
    .then(response => response.json())
    .then(data => this.setState({currentUser:data}))
  }
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar/>
          <div className = "container">
            <Route exact path="/"  render={(routerProps) => this.state.currentUser? <ProfilePage userId = {this.state.currentUser.id}/> :null } />
            <Route path = "/createPost" render={routerProps => <PostFormContainer currentUser = {this.state.currentUser}/>} />
            <Route path='/posts/:id' render={(props)=> {
              let postId = props.match.params.id
              return <PostShowPage postId = {postId}/>

            }} />
            <Route path='/users/:id' render={(props)=> {
              let userId = props.match.params.id
              return <ProfilePage userId = {this.state.currentUser.id}/>

            }} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
