import '../WelcomeLoginCreateUser.css';
import {Link} from 'react-router-dom'
import CreateUserForm from '../components/createUserForm'
import { Route, Redirect } from 'react-router'

import React from "react"

const PostUserURL = "http://localhost:3000/api/v1/users/"

class CreateUserPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      created_user: null,
      image_preview:null,
      user: {
        user_name: null,
        first_name: null,
        last_name: null,
        bio:null,
        profile_picture: null
      }
    }
  }

  handleInputChange = (e) => {
    this.setState({
      user:{
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    })
  }
  handleFileUpload = (e) =>{
    this.setState({
      image_preview: URL.createObjectURL(e.target.files[0]),
      user:{
        ...this.state.user,
        [e.target.name]: e.target.files[0]
      }
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    let body = new FormData()
    body.append('user_name', this.state.user.user_name)
    body.append('first_name', this.state.user.first_name)
    body.append('last_name', this.state.user.last_name)
    body.append('bio', this.state.user.bio)
    body.append('password', this.state.user.password)
    body.append("profile_picture", this.state.user.profile_picture, this.state.user.profile_picture.name)
    fetch(PostUserURL,{
      method: "POST",
      headers:{
        Accept: "application/json"
      },
      body: body
    })
    .then(resp=> resp.json())
    .then(user => {
      this.props.setCurrentUser(user)
    })

  }
  render(){
    if (this.state.created_user){
      debugger
      return <Redirect to={`/users/${this.state.created_user.user.id}`}/>
    }
    return(
      <div className = "create-user-container">
        <h3>Create Account </h3>
        <form onSubmit = {this.handleSubmit}>
          <div>
            <img
            className = "profile-picture-upload"
            src = {this.state.image_preview ? this.state.image_preview :"https://via.placeholder.com/150"}/>
            <input
            name = "profile_picture"
            style = {{display:"none"}}
            ref = {fileInput => this.fileInput = fileInput}
            type = "file"
            onChange = {this.handleFileUpload}/>
          </div>
          <button className = "profile-upload-button btn btn-primary"
                  onClick={(e)=>{
                    e.preventDefault()
                    this.fileInput.click()}}>
                  {this.state.image_preview ?"Change Photo" : "Upload Profile Photo" }
          </button>
          <div className = "create-user-form-top-margin">
            <div className = "form-group">
              <label className = "form-label" htmlFor = "user_name">Username</label>
              <input onChange = {this.handleInputChange} className = "form-control" type = "text" name = "user_name" placeholder = "Username"/>
            </div>
            <div className = "form-group">
              <label className = "form-label" htmlFor = "user_name">Password</label>
              <input onChange = {this.handleInputChange} className = "form-control" type = "password" name = "password" placeholder = "Password"/>
            </div>
            <div className = "form-group">
              <label className = "form-label" htmlFor = "first_name">First Name</label>
              <input onChange = {this.handleInputChange} className = "form-control" type = "text" name = "first_name" placeholder = "First Name"/>
            </div>
            <div className = "form-group">
              <label className = "form-label" htmlFor = "last_name">Last Name</label>
              <input onChange = {this.handleInputChange} className = "form-control" type = "text" name = "last_name" placeholder = "Last Name"/>
            </div>
            <div className = "form-group">
              <label className = "form-label" htmlFor = "last_name">Bio</label>
              <input onChange = {this.handleInputChange} className = "form-control" type = "textArea" name = "bio" placeholder = "Bio"/>
            </div>
          </div>
          <button className = "btn btn-primary"> Create User </button>
          <Link to = "/"><button className = "btn btn-primary"> Go Back </button></Link>
        </form>
       </div>
    )
  }

}
export default CreateUserPage
