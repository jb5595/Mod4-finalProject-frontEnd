import React from "react"
import FeedImageSmall from "../components/feedImageSmall"

const PostsUrl = "http://localhost:3000/api/v1/posts"

class ExploreFeed extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      posts:null
    }
  }

  componentDidMount(){
    fetch(PostsUrl)
    .then(resp => resp.json())
    .then(posts => this.setState({posts:posts}))
  }

  render(){
    return(
      <div>
        <div className = "feed row">
          {this.state.posts?this.renderPosts():null}
        </div>
      </div>

    )
  }
  renderPosts(){
    return this.state.posts.map(post=><FeedImageSmall key = {post.id} author = {post.user.user_name} caption = {post.caption} postId = {post.id} image = {post.image}/>)

  }
}

export default ExploreFeed
