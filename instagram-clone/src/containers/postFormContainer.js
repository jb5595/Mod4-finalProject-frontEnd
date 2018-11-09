import React from "react"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons'

import {Link} from 'react-router-dom'

library.add(faCameraRetro)

class PostFormContainer extends React.Component{
    constructor(props){
      super(props)
      console.log()
      this.state ={
        file: null,
        formData: null
      }
    }
    fileSelectedHandler = (e) =>{
      console.log(e.target.files[0])
      const fd = new FormData()
      fd.append("image", e.target.files[0], e.target.files[0].name)
      fd.append("user_id", this.props.currentUser.id)
      this.setState({
        file: URL.createObjectURL(e.target.files[0]),
        formData: fd
      })
    }
    fileUploadHandler = (e) => {
      let body = this.state.formData
      fetch("http://localhost:3000/api/v1/posts/",{
        method: "POST",
        headers:{
          Accept: "application/json"
        },
        body: body
      })
    }
    render(){
      return(
        <div>
        <div className = "row">
          <div className = "offset-10">
            {this.state.file?<Link to = "/"><button className = "upload-image-button" onClick = {this.fileUploadHandler}>Next</button></Link>:null}
          </div>
        </div>
          <div className = "image-upload-container">
          <img className = "image-upload" src ={this.state.file?this.state.file:'https://via.placeholder.com/400'} alt = "placeholder"/>
          <input
          ref = {fileInput => this.fileInput = fileInput}
          style = {{display: 'none'}}
          type = "file"
          onChange = {this.fileSelectedHandler}/>
          {this.state.file?null:<button className = "image-upload-button" onClick={()=>this.fileInput.click()}><FontAwesomeIcon icon="camera-retro" /></button>}
          </div><br/>
          {this.state.file?<button className = "upload-image-button" onClick={()=>this.fileInput.click()}>Change Image</button>:null}

        </div>
      )
    }
}
export default PostFormContainer
