import {Link} from 'react-router-dom'

import React from "react"

class CreateUserForm extends React.Component{

  render(){
    return(
      <React.Fragment>
        <form onSubmit = {this.props.handleSubmit}>
          <div>
            <img
            className = "profile-picture-upload"
            src = {this.props.image_preview ? this.props.image_preview :"https://via.placeholder.com/150"}/>
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
                    {this.props.image_preview ?"Change Photo" : "Upload Profile Photo" }
          </button>
          <div className = "create-user-form-top-margin">
            <div className = "form-group">
              <label className = "form-label" htmlFor = "user_name">Username</label>
              <input onChange = {this.props.handleInputChange} className = "form-control" type = "text" name = "user_name" placeholder = "Username"/>
            </div>
            <div className = "form-group">
              <label className = "form-label" htmlFor = "user_name">Password</label>
              <input onChange = {this.props.handleInputChange} className = "form-control" type = "password" name = "password" placeholder = "Password"/>
            </div>
            <div className = "form-group">
              <label className = "form-label" htmlFor = "first_name">First Name</label>
              <input onChange = {this.props.handleInputChange} className = "form-control" type = "text" name = "first_name" placeholder = "First Name"/>
            </div>
            <div className = "form-group">
              <label className = "form-label" htmlFor = "last_name">Last Name</label>
              <input onChange = {this.props.handleInputChange} className = "form-control" type = "text" name = "last_name" placeholder = "Last Name"/>
            </div>
            <div className = "form-group">
              <label className = "form-label" htmlFor = "last_name">Bio</label>
              <input onChange = {this.props.handleInputChange} className = "form-control" type = "textArea" name = "bio" placeholder = "Bio"/>
            </div>
          </div>
          <button className = "btn btn-primary"> Create User </button>
          <br/><br/>
          <Link to = "/"><button className = "btn btn-primary"> Go Back </button></Link>
        </form>

      </React.Fragment>
    )
  }

}

export default CreateUserForm
