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
import Feed from "./containers/Feed"
import EditUserPage from "./containers/editUserPage"

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

  addBookMark = (bookmark) =>{
    this.setState({
      currentUser:{
        ...this.state.currentUser,
        bookmarked_items: [...this.state.currentUser.bookmarked_items, bookmark]
      }
    })
  }

  removeBookMark = (bookmark) =>{
    let newBookMarkedItems = this.state.currentUser.bookmarked_items.filter(bookmarked_item => bookmarked_item.id != bookmark.id)
    this.setState({
      currentUser:{
        ...this.state.currentUser,
        bookmarked_items: newBookMarkedItems
      }
    })
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
             return <PostShowPage removeBookMark = {this.removeBookMark} addBookMark = {this.addBookMark} currentUser = {this.state.currentUser} postId = {postId}/> }} />
        <Route path='/profile' render={(props)=><ProfilePage userId = {this.state.currentUser.id} currentUser = {this.state.currentUser}/>}/>
        <Route path = "/explore" render = {(props) => <ExploreFeed/>}/>
        <Route path = "/createPost" render={routerProps => <PostFormContainer currentUser = {this.state.currentUser}/>} />
        <Route path = "/feed" render = {props=><Feed removeBookMark = {this.removeBookMark} addBookMark = {this.addBookMark} currentUser = {this.state.currentUser}/>}/>
        <Route path = "/login" render = {props=><Redirect to="/profile"/>}/>
        <Route path = "/createuser" render = {props=><Redirect to="/profile"/>}/>
        <Route path='/editprofile/:id' render={(props)=> {
             let userId = props.match.params.id
             return <EditUserPage setCurrentUser={this.setCurrentUser} currentUser = {this.state.currentUser}/> }} />


        </React.Fragment>
      )
    }
    else{
      return(
          <div className = "login-container">
            <Route exact path="/"  render={(routerProps) => <WelcomePage/>} />
            <Route path='/login' render={(props)=> <LoginPage setCurrentUser = {this.setCurrentUser}/>}/>
            <Route path='/createuser' render={(props)=> <CreateUserPage setCurrentUser = {this.setCurrentUser}/>}/>
            <Route path = "/users" render = {props=><Redirect to="/"/>}/>
            <Route path = "/posts" render = {props=><Redirect to="/"/>}/>
            <Route path = "/profile" render = {props=><Redirect to="/"/>}/>
            <Route path = "/createpost" render = {props=><Redirect to="/"/>}/>
            <Route path = "/explore" render = {props=><Redirect to="/"/>}/>
            <Route path = "/feed" render = {props=><Redirect to="/"/>}/>
            <Route path='/editprofile/:id' render={(props)=> <Redirect to="/"/>}/>
          </div>
    )
    }
  }
}

export default App;
