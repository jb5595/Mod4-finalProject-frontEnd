import {Link} from 'react-router-dom'

import React from "react"
const BaseUrl = "http://localhost:3000"

class EditUserForm extends React.Component{

  render(){
    return(
      <React.Fragment>
        <form onSubmit = {this.props.handleSubmit}>
          <div>
            <img
            className = "profile-picture-upload"
            src = {this.props.image_preview ? this.props.image_preview :BaseUrl+this.props.user.profile_picture.url}/>
            <input
            name = "profile_picture"
            style = {{display:"none"}}
            ref = {fileInput => this.fileInput = fileInput}
            type = "file"
            onChange = {this.props.handleFileUpload}/>
          </div>
          <button className = "profile-upload-button btn btn-primary"
                  onClick={(e)=>{
                    e.preventDefault()
                    this.fileInput.click()}}>
                    Change Profile Photo
          </button>
          <div className = "create-user-form-top-margin">
            <div className = "form-group">
              <label className = "form-label" htmlFor = "user_name">Username</label>
              <input onChange = {this.props.handleInputChange} className = "form-control" value = {this.props.user.user_name} type = "text" name = "user_name" placeholder = "Username"/>
            </div>
            <div className = "form-group">
              <label className = "form-label" htmlFor = "first_name">First Name</label>
              <input onChange = {this.props.handleInputChange} className = "form-control" value = {this.props.user.first_name} type = "text" name = "first_name" placeholder = "First Name"/>
            </div>
            <div className = "form-group">
              <label className = "form-label" htmlFor = "last_name">Last Name</label>
              <input onChange = {this.props.handleInputChange} className = "form-control" value = {this.props.user.last_name} type = "text" name = "last_name" placeholder = "Last Name"/>
            </div>
            <div className = "form-group">
              <label className = "form-label" htmlFor = "last_name">Bio</label>
              <input onChange = {this.props.handleInputChange} className = "form-control" value = {this.props.user.bio} type = "textArea" name = "bio" placeholder = "Bio"/>
            </div>
          </div>
          <button className = "btn btn-primary"> Submit Changes </button>
          <Link to = "/profile"><button className = "btn btn-primary"> Go Back </button></Link>
        </form>

      </React.Fragment>
    )
  }

}

export default EditUserForm
