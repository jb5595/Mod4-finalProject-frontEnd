import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import ProfilePage from "./containers/ProfilePage"
import NavBar from "./components/navbar"
import PostFormContainer from "./containers/postFormContainer"
import PostShowPage from "./containers/postShowPage"
import WelcomePage from "./components/welcomePage"
import LoginPage from "./containers/LoginPage"
import CreateUserPage from "./containers/createUserPage"

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
          {this.state.currentUser ? <NavBar currentUser = {this.state.currentUser}/> : null}
          <div className = "container">
            <Route exact path="/"  render={(routerProps) => this.state.currentUser ? <WelcomePage/> :<WelcomePage/> } />
            <Route path = "/createPost" render={routerProps => <PostFormContainer currentUser = {this.state.currentUser}/>} />
            <Route path='/posts/:id' render={(props)=> {
              let postId = props.match.params.id
              if (this.state.currentUser){
                return <PostShowPage currentUser = {this.state.currentUser} postId = {postId}/>
              }
              else{
                return null
              }

            }} />
            <Route path='/users/:id' render={(props)=> {
              let userId = props.match.params.id
              return <ProfilePage userId = {userId}/>
            }} />
            <Route path='/profile' render={(props)=>this.state.currentUser?<ProfilePage userId = {this.state.currentUser.id}/>:null}/>
            <Route path='/login' render={(props)=> <LoginPage/>}/>
            <Route path='/createuser' render={(props)=> <CreateUserPage/>}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
