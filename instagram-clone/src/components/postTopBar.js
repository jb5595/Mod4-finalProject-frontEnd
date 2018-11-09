import React from "react"
import {Link} from 'react-router-dom'
const BaseUrl = "http://localhost:3000"

class PostTopBar extends React.Component{


  render(){
    return(
      <div className = "row post-top-bar">
          <div className = "">
            <img className ="post-profile-photo" src ={BaseUrl + this.props.user.profile_picture.url}/>
          </div>
          <div className = "col-2 post-user-name">
            <Link to = {`/users/${this.props.user.id}`}>
              <p><b>{this.props.user.user_name}</b></p>
            </Link>
          </div>
      </div>
    )
  }
}


export default PostTopBar
