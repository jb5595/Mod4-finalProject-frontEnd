import React from "react"
import PostTopBar from "../components/postTopBar"
import PostBottomBar from "../components/postBottomBar"

const BaseUrl = "http://localhost:3000"
const BaseFetchURl = "http://localhost:3000/api/v1/posts/"

class PostCard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      likes: this.props.post.likes
    }
  }


  render(){
    console.log(this.props.post.image)
    return(
      <div>
        <PostTopBar user = {this.props.post.user}/>
        <img className = "post-show-image"src = {BaseUrl + this.props.post.image.url}/>
        <PostBottomBar handleLike = {this.handleLike} user = {this.props.post.user}/>

      </div>
    )
  }

  handleLike = (e) =>{
    let url = `${BaseFetchURl+this.props.post}/like`
    fetch(url,{
      method: "POST",
      headers:
      {
      }
    })
    console.log("click")
  }
}

export default PostCard
