import React from "react"
import PostTopBar from "../components/postTopBar"
import PostBottomBar from "../components/postBottomBar"
import Comment from "../components/comments"
import CommentForm from "../components/commentForm"


const BaseUrl = "http://localhost:3000"
const LikeURL = "http://localhost:3000/api/v1/likes/"
const CommentURL = "http://localhost:3000/api/v1/comments/"

class PostCard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      likes: this.props.post.likes,
      comments: this.props.post.comments,
      newComment: {
        content: "",
        post_id: this.props.post.id,
        user_id: this.props.currentUser.id
      }
    }
  }


  render(){
    return(
      <div>
        <PostTopBar user = {this.props.post.user}/>
        <img className = "post-show-image"src = {BaseUrl + this.props.post.image.url}/>
        <PostBottomBar likes = {this.state.likes.length} handleLike = {this.handleLike} user = {this.props.post.user}/>
        <div className = "comment-well">
          {this.state.comments.map((comment) => <Comment key = {comment.id} comment = {comment}/>)}
          <CommentForm handleSubmit = {this.handleCommentSubmit} handleCommentChange = {this.handleCommentChange}/>
        </div>
      </div>
    )
  }
  handleCommentSubmit = (e) =>{
    e.preventDefault()
    let body = {comment:{...this.state.newComment}}
    fetch(CommentURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(comment => this.setState(
      {comments:[...this.state.comments, comment]}))

  }
  handleCommentChange = (e) =>{
    this.setState({
      newComment:{
        ...this.state.newComment,
        content: e.target.value
      }
    })
  }

  handleLike = (e) =>{
    let body = {like:
                  {
                    user_id: this.props.currentUser.id,
                    post_id: this.props.post.id
                  }
                }
    fetch(LikeURL,{
      method: "POST",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(resp=> resp.json())
    .then(like =>this.setState({likes:[...this.state.likes, like]}))
  }
}

export default PostCard
