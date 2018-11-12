import React from "react"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { far } from '@fortawesome/free-regular-svg-icons'
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons'
library.add(faHeart)
library.add(faBookmark)



class PostBottomBar extends React.Component{

  render(){
    return(
      <div className = "post-bottom-bar">
          <div className = "row">
            {this.renderLikeButton()}
            {this.renderBookmarkButton()}
          </div>
          <div className ="row">
            <p><b>{this.props.likes.length} Likes</b></p>
          </div>
          <div className ="row">
            {this.props.caption ? <p><b>{this.props.user.user_name}</b> {this.props.caption} </p> : null}
          </div>
      </div>
    )
  }

  renderLikeButton(){
    let like = this.props.likes.find(like=> like.user_id == this.props.currentUser.id)
    if (like){
      return <p onClick = {this.props.handleUnlike} data-id = {like.id} className = "like-button-after-like"><FontAwesomeIcon icon='heart'/></p>
    }
    else {
      return <p onClick = {this.props.handleLike} className = "like-button-before-like"><FontAwesomeIcon icon='heart'/></p>
  }
  }
  renderBookmarkButton(){
    let bookmark = this.props.bookmarks.find(bookmark=> bookmark.id == this.props.postId)
    if (bookmark){
      return <p className = "after-bookmark" onClick = {this.props.handleUnbookMark}><FontAwesomeIcon icon='bookmark'/></p>
    }
    else{
      return <p className = "before-bookmark" onClick = {this.props.handleBookMark}><FontAwesomeIcon icon='bookmark'/></p>

    }

  }
}

export default PostBottomBar
