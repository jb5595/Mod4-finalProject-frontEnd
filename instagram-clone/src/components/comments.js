import React from "react"

class Comment extends React.Component{


  render(){
    return(
      <div className ="row">
        <p className = "comment col-11"><b>{this.props.comment.user_name}</b> {this.props.comment.content}</p>
        {this.renderDeleteButton()}
      </div>
    )
  }
  renderDeleteButton(){
    if(this.props.comment.user_id == this.props.currentUser.id || this.props.user.id == this.props.currentUser.id){
      return (
        <p className = "" onClick = {this.props.handleCommentDelete} data-id = {this.props.comment.id}>X</p>
      )
    }
  }
}

export default Comment
