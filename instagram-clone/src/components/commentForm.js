import React from "react"

class CommentForm extends React.Component{

  render(){
    return(
      <div className = "row">
        <form onSubmit = {this.props.handleSubmit} className = 'comment-form' >
          <input
          className = "comment-input"
          onChange = {this.props.handleCommentChange}
          type = "text"
          placeholder = "Add a comment..."/>
        </form>
      </div>

    )

  }
}

export default CommentForm
