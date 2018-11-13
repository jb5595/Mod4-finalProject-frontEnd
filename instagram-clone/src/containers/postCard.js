import React from "react"
import PostTopBar from "../components/postTopBar"
import PostBottomBar from "../components/postBottomBar"
import Comment from "../components/comments"
import CommentForm from "../components/commentForm"

const BaseUrl = "http://localhost:3000"
const LikeURL = "http://localhost:3000/api/v1/likes/"
const CommentURL = "http://localhost:3000/api/v1/comments/"
const BookmarkUrl = "http://localhost:3000/api/v1/bookmarked_posts"

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

  handleUnbookMark = (e) =>{
    let body = {bookmark:
                  {
                    user_id: this.props.currentUser.id,
                    post_id: this.props.post.id
                  }
                }
    fetch(BookmarkUrl + "/unbookmark",{
      method: "POST",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(resp=> resp.json())
    .then(bookmark =>this.props.removeBookMark(bookmark))
  }

  handleBookMark = (e) =>{
    let body = {bookmark:
                  {
                    user_id: this.props.currentUser.id,
                    post_id: this.props.post.id
                  }
                }
    fetch(BookmarkUrl,{
      method: "POST",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(resp=> resp.json())
    .then(bookmark => this.props.addBookMark(bookmark))
  }

  handleUnlike = (e) => {
    let likeId = e.currentTarget.dataset.id
    let url = LikeURL + likeId
    fetch(url,{
      method: "DELETE",
    })
    .then(resp=> resp.json())
    .then(like =>{
      let newLikes = this.state.likes.filter(like => like.id != likeId)
      this.setState({likes:newLikes})
    })
  }


  render(){
    return(
      <div className = "post-card">
        <PostTopBar user = {this.props.post.user}/>
        <img className = "post-show-image"src = {BaseUrl + this.props.post.image.url}/>
        <PostBottomBar currentUser = {this.props.currentUser}
          caption = {this.props.post.caption}
          postId = {this.props.post.id}
         likes = {this.state.likes}
         bookmarks = {this.props.currentUser.bookmarked_items}
         handleUnlike = {this.handleUnlike}
         handleLike = {this.handleLike}
         handleBookMark = {this.handleBookMark}
         handleUnbookMark = {this.handleUnbookMark}
         user = {this.props.post.user}/>
        <div className = "comment-well">
          <div className ="comments">
            {this.state.comments.map((comment) =>
              <Comment
              currentUser ={this.props.currentUser}
              user = {this.props.post.user}
              key = {comment.id}
              handleCommentDelete = {this.handleCommentDelete}
              comment = {comment}/>)}
          </div>
          <CommentForm handleSubmit = {this.handleCommentSubmit} handleCommentChange = {this.handleCommentChange}/>
        </div>
      </div>
    )
  }
  handleCommentSubmit = (e) =>{
    e.preventDefault()
    e.currentTarget.reset()
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
    .then(comment => {
      this.setState({
        comments:[...this.state.comments, comment],
        newComment: {
          ...this.state.newComment,
          content:""
        }
      })
    }
  )

  }
  handleCommentChange = (e) =>{
    this.setState({
      newComment:{
        ...this.state.newComment,
        content: e.target.value
      }
    })
  }
  handleCommentDelete = (e) =>{
    let commentId = e.currentTarget.dataset.id
    let url = CommentURL + commentId
    fetch(url,{
      method: "DELETE",
    })
    .then(resp=> resp.json())
    .then(like =>{
      let newComments = this.state.comments.filter(comment => comment.id != commentId)
      this.setState({comments:newComments})
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

  handleUnlike = (e) => {
    let likeId = e.currentTarget.dataset.id
    let url = LikeURL + likeId
    fetch(url,{
      method: "DELETE",
    })
    .then(resp=> resp.json())
    .then(like =>{
      let newLikes = this.state.likes.filter(like => like.id != likeId)
      this.setState({likes:newLikes})
    })

  }
}

export default PostCard
