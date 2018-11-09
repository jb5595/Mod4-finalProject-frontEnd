import React from "react"

import {Link} from 'react-router-dom'

const BaseUrl = "http://localhost:3000"


class FeedImageSmall extends React.Component{

  render(){
    return(
      <div className = "col-4 feed-image-contianer">
      <Link to = {`/posts/${this.props.postId}`}>
        <React.Fragment>
          <img className ="small-feed-photo" src={BaseUrl+this.props.image.url} alt="image"/>
          </React.Fragment>
      </Link>
      </div>

    )
  }
}

export default FeedImageSmall
