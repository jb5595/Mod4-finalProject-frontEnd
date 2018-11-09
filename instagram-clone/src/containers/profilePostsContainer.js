import React from "react"
import FeedImageSmall from "../components/feedImageSmall"

class ProfilePostsContainer extends React.Component{


  render(){
    return(
      <div>
        <div className = "feed-top-bar row">
          Feed Top Bar
        </div>
        <div className = "feed row">
          {this.props.posts?this.renderPosts():null}
        </div>
      </div>

    )
  }

  renderPosts(){
    return this.props.posts.map(post=><FeedImageSmall key = {post.id} postId = {post.id} image = {post.image}/>)

  }

}

export default ProfilePostsContainer
