import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import ProfilePage from "./containers/ProfilePage"
import NavBar from "./components/navbar"
import PostFormContainer from "./containers/postFormContainer"
import PostShowPage from "./containers/postShowPage"
import WelcomePage from "./components/welcomePage"
import LoginPage from "./containers/LoginPage"
import CreateUserPage from "./containers/createUserPage"
import ExploreFeed from "./containers/exploreFeed"

const BaseUserURL = "http://localhost:3000/api/v1/users/"

class App extends Component {
  constructor(){
    super()
    this.state = {
      currentUser: null
    }
  }

  setCurrentUser = (data) =>{
    this.setState({currentUser:data})
  }

  logout = () =>{
    this.setState({currentUser:null})
  }
  render() {
    return (
      <Router>
        <div className="App">
          {this.state.currentUser ? <NavBar logout = {this.logout} currentUser = {this.state.currentUser}/> : null}
          <div className = "container">
            {this.renderRoutes()}
          </div>
        </div>
      </Router>
    );
  }
  renderRoutes(){
    if (this.state.currentUser){
      return(
        <React.Fragment>
        <Route path='/users/:id' render={(props)=> {
          let userId = props.match.params.id
          return <ProfilePage userId = {userId} currentUser = {this.state.currentUser} />
        }} />
        <Route path='/posts/:id' render={(props)=> {
             let postId = props.match.params.id
             return <PostShowPage currentUser = {this.state.currentUser} postId = {postId}/> }} />
        <Route path='/profile' render={(props)=><ProfilePage userId = {this.state.currentUser.id} currentUser = {this.state.currentUser}/>}/>
        <Route path = "/explore" render = {(props) => <ExploreFeed/>}/>
        <Route path = "/createPost" render={routerProps => <PostFormContainer currentUser = {this.state.currentUser}/>} />
        <Route path = "/login" render = {props=><Redirect to="/profile"/>}/>
        <Route path = "/createuser" render = {props=><Redirect to="/profile"/>}/>

        </React.Fragment>
      )
    }
    else{
      return(
          <React.Fragment>
            <Route exact path="/"  render={(routerProps) => <WelcomePage/>} />
            <Route path='/login' render={(props)=> <LoginPage setCurrentUser = {this.setCurrentUser}/>}/>
            <Route path='/createuser' render={(props)=> <CreateUserPage setCurrentUser = {this.setCurrentUser}/>}/>
            <Route path = "/users" render = {props=><Redirect to="/"/>}/>
            <Route path = "/posts" render = {props=><Redirect to="/"/>}/>
            <Route path = "/profile" render = {props=><Redirect to="/"/>}/>
            <Route path = "/createpost" render = {props=><Redirect to="/"/>}/>
          </React.Fragment>

    )
    }
  }
}

export default App;
