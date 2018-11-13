import React from "react"
import PostCard from "./postCard"

const BaseFeedUrl= "http://localhost:3000/api/v1/posts/feed/"
class Feed extends React.Component{
  constructor(){
    super()
    this.state = {posts:null}
  }

  componentDidMount(){
    console.log("mounted")
    fetch(BaseFeedUrl+this.props.currentUser.id)
    .then(resp => resp.json())
    .then(posts => this.setState({posts:posts}))
  }

  render(){
    return(
      <div>
        {this.state.posts ? this.state.posts.map(post=><PostCard removeBookMark = {this.props.removeBookMark} addBookMark = {this.props.addBookMark} currentUser ={this.props.currentUser} post = {post}/>) : null}
      </div>

    )
  }
}

export default Feed
