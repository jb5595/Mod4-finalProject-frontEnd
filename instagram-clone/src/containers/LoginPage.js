import '../WelcomeLoginCreateUser.css';
import {Link} from 'react-router-dom'

import React from "react"

const LoginUrl = "http://localhost:3000/api/v1/sessions"

class LoginPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      user_name:null,
      password:null
    }
  }
  render(){
    return(
      <div className = "login-container">
        <h3>Login</h3>
        <form onSubmit = {this.handleSubmit}>
          <div className = "create-user-form-top-margin">
            <div className = "form-group">
              <label className = "form-label" htmlFor = "user_name">Username</label>
              <input onChange = {this.handleInputChange} className = "form-control" type = "text" name = "user_name" placeholder = "Username"/>
            </div>
            <div className = "form-group">
              <label className = "form-label" htmlFor = "user_name">Password</label>
              <input onChange = {this.handleInputChange} className = "form-control" type = "password" name = "password" placeholder = "Password"/>
            </div>
          </div>
          <button className = "btn btn-primary login-button">Login</button>
        </form>
       </div>
    )
  }
  handleInputChange = (e) =>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  handleSubmit = (e) =>{
    console.log(this.state)
    e.preventDefault()
    fetch(LoginUrl,{
      method:"POST",
      headers:{
        "Content-type":"application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(this.state)
    })
  }
}
export default LoginPage
