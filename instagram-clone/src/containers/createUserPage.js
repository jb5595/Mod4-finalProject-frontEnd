import '../WelcomeLoginCreateUser.css';
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
      error:null,
      user: {
        user_name: null,
        first_name:null ,
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
    .then(data => {
      debugger
      if (data.error){
        this.setState({errors:data.error})
      }
      else{
      this.props.setCurrentUser(data.user)
    }

    })

  }
  render(){
    return(
      <div className = "welcome-page-container">
        <div className = "create-user-form-container">
        <h3>Create Account </h3>
          {this.state.errors ? <p className = "alert alert-danger">Please Enter a Unique Username</p> : null}
            <CreateUserForm
            handleSubmit = {this.handleSubmit}
            image_preview = {this.state.image_preview}
            handleFileUpload = {this.handleFileUpload}
            handleInputChange = {this.handleInputChange}
            />
        </div>
       </div>

    )
  }

}
export default CreateUserPage
