import React from "react"
import FeedImageSmall from "../components/feedImageSmall"

class ProfilePostsContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      postsToDisplay: this.props.posts,
      display:"posts"
    }
  }

  render(){
    return(
      <div>
        <div className = "feed-top-bar row">
          <div onClick = {this.displayPosts} className = {this.state.display == "posts"? "top-bar-item-active":"top-bar-item"}>
            Posts
          </div>
          {this.props.currentUser.id == this.props.user.id ?
            <div onClick = {this.displayBookmarks} className = {this.state.display == "posts"? "top-bar-item" :"top-bar-item-active"}> Saved</div> : null}

        </div>
        <div className = "feed row">
          {this.props.posts?this.renderPosts():null}
        </div>
      </div>

    )
  }
  displayBookmarks = () => {
    this.setState({
      postsToDisplay: this.props.currentUser.bookmarked_items,
      display:"bookmarks"

    })
  }
  displayPosts = () => {
    this.setState({
      postsToDisplay: this.props.posts,
      display:"posts"

    })
  }

  renderPosts(){
    return this.state.postsToDisplay.map(post=><FeedImageSmall key = {post.id} postId = {post.id} image = {post.image}/>)

  }

}

export default ProfilePostsContainer
