import React from "react"
import EditUserForm from "../components/editUserForm"
import { Route, Redirect } from 'react-router'
const PatchUserURL = "http://localhost:3000/api/v1/users/"

class EditUserPage extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      created_user: null,
      image_preview:null,
      user: {
        user_name: this.props.currentUser.user_name,
        first_name: this.props.currentUser.first_name,
        last_name: this.props.currentUser.last_name,
        bio:this.props.currentUser.bio,
        profile_picture: this.props.currentUser.profile_picture
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
    let url = PatchUserURL + this.props.currentUser.id
    let body = new FormData()
    body.append('user_name', this.state.user.user_name)
    body.append('first_name', this.state.user.first_name)
    body.append('last_name', this.state.user.last_name)
    body.append('bio', this.state.user.bio)
    body.append("profile_picture", this.state.user.profile_picture, this.state.user.profile_picture.name)
    fetch(url,{
      method: "PATCH",
      headers:{
        Accept: "application/json"
      },
      body: body
    })
    .then(resp=> resp.json())
    .then(data => {
      this.props.setCurrentUser(data.user)

    })

  }
  render(){
    if (this.state.edited_user){
      debugger
      return <Redirect to={`/users/${this.state.created_user.user.id}`}/>
    }
    return(
      <div className = "create-user-container">
        <h3>Create Account </h3>
          <EditUserForm
          handleSubmit = {this.handleSubmit}
          image_preview = {this.state.image_preview}
          handleFileUpload = {this.handleFileUpload}
          handleInputChange = {this.handleInputChange}
          user = {this.state.user}
          />
       </div>
    )
  }
}

export default EditUserPage
