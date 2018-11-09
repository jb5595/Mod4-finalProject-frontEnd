import React from "react"


class PostBottomBar extends React.Component{


  render(){
    return(
      <div className = "post-bottom-bar">
          <div className = "row">
            <button onClick = {this.props.handleLike}>Like</button>
            <button>Bookmark </button>
          </div>
          <div className ="row">
            <p><b>{this.props.likes} Likes</b></p>
          </div>
          <div className ="row">
            <p><b>{this.props.user.user_name}</b> Caption </p>
          </div>
      </div>
    )
  }
}

export default PostBottomBar
