import React from "react"

class Comment extends React.Component{


  render(){
    return(
      <div className ="row">
        <p className = "comment"><b>{this.props.comment.user_name}</b> {this.props.comment.content}</p>
      </div>
    )
  }
}

export default Comment
