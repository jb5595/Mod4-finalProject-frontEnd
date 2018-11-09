import React from "react"
import PostCard from "./postCard"
const BasePostURl = "http://localhost:3000/api/v1/posts/"

class PostShowPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      post: null
    }
  }
  componentDidMount(){
    let url  = BasePostURl + this.props.postId
    fetch(url)
    .then(response => response.json())
    .then(data =>this.setState({post:data}) )
  }
  render(){
    return(
      <div>
        {this.state.post?<PostCard currentUser ={this.props.currentUser} post = {this.state.post}/>:null}
      </div>
    )
  }
}
export default PostShowPage
