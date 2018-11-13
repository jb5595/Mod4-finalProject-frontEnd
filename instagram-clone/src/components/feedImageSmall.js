import React from "react"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faThumbsUp  } from '@fortawesome/free-solid-svg-icons'

import {Link} from 'react-router-dom'

library.add(faComment)
library.add(faThumbsUp)

const BaseUrl = "http://localhost:3000"


class FeedImageSmall extends React.Component{

  render(){
    return(
      <div className = "col-4 feed-image-container">
      <Link to = {`/posts/${this.props.postId}`}>
        <React.Fragment>
          <img data-id = {this.props.postId} onMouseEnter= {this.handleMouseOver} className ="small-feed-photo" src={BaseUrl+this.props.image.url} alt="image"/>
          </React.Fragment>
        <div
        id = {`overlay-${this.props.postId}`}
        onMouseLeave= {this.handleMouseLeave}
        className = "feed-image-overlay">
            {this.props.caption ? <p>"{this.props.caption}"</p> : null}
            <p>Author: {this.props.author}</p>
        </div>
      </Link>
      </div>

    )
  }
  handleMouseOver = (e) =>{
    let id = e.currentTarget.dataset.id
    let element = document.querySelector(`#overlay-${id}`)
    element.style.display = "block"
  }

  handleMouseLeave = (e) => {
    e.currentTarget.style.display = "none"
  }
}

export default FeedImageSmall
