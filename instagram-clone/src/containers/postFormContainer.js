import React from "react"
import { Route, Redirect } from 'react-router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons'


import {Link} from 'react-router-dom'

library.add(faCameraRetro)

class PostFormContainer extends React.Component{
    constructor(props){
      super(props)
      this.state ={
        file: null,
        formData: null,
        newPost: null,
        fileUpload: null,
        caption: null
      }
    }
    handleCaptionChange = (e) =>{
      this.setState({
        [e.currentTarget.name]: e.currentTarget.value
      })
    }
    fileSelectedHandler = (e) =>{
      if (e.target.files[0]){
        this.setState({
          file: URL.createObjectURL(e.target.files[0]),
          fileUpload: e.target.files[0]
        })
      }
    }
    fileUploadHandler = (e) => {
      e.preventDefault()
      const fd = new FormData()
      fd.append("image", this.state.fileUpload, this.state.fileUpload.name)
      fd.append("user_id", this.props.currentUser.id)
      fd.append("caption", this.state.caption)
      let body = fd
      fetch("http://localhost:3000/api/v1/posts/",{
        method: "POST",
        headers:{
          Accept: "application/json"
        },
        body: body
      })
      .then(resp=>resp.json())
      .then(post =>this.setState({newPost:post}))
    }
    render(){
      if (this.state.newPost){
        return <Redirect to={`/posts/${this.state.newPost.id}`}/>

      }
      return(
        <div>
        <div className = "row">
          <div className = "offset-10">
            {this.state.file?<button className = "upload-image-button btn btn-primary " onClick = {this.fileUploadHandler}>Next</button>:null}
          </div>
        </div>
          <div className = "image-upload-container">
          <img className = "image-upload" src ={this.state.file?this.state.file:'https://via.placeholder.com/400'} alt = "placeholder"/>
          <input
          ref = {fileInput => this.fileInput = fileInput}
          style = {{display: 'none'}}
          type = "file"
          onChange = {this.fileSelectedHandler}/>
          {this.state.file?null:<button className = "image-upload-button next-button btn btn-primary " onClick={()=>this.fileInput.click()}><FontAwesomeIcon icon="camera-retro" /></button>}
          <input className = "caption-input form-control" onChange = {this.handleCaptionChange} name="caption" type = "text" placeholder = "Add a Caption"/>
          </div><br/>
          {this.state.file?<button className = "btn btn-primary upload-image-button" onClick={()=>this.fileInput.click()}>Change Image</button>:null}

        </div>
      )
    }
}
export default PostFormContainer
