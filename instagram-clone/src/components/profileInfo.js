import React from "react"
import { Link } from 'react-router-dom';

class ProfileInfo extends React.Component {
  render(){
    return(
    <div>
      <div className = "row">
        <p className = "profile-username profile-info-margin">{this.props.userName}</p>
        {this.renderProfileButton()}
      </div>
      <div className = "row">
        <p className = 'profile-info-margin profile-info-text'><b>{this.props.posts?this.props.posts.length:null}</b> Posts</p>
        <p className = 'profile-info-margin profile-info-text'><b>{this.props.followers.length}</b> Followers</p>
        <p className = 'profile-info-margin profile-info-text'><b>{this.props.following.length}</b> Following</p>
      </div>
      <div className = "row">
        <p className = "profile-info-text"><b>{this.props.firstName} {this.props.lastName}</b> </p>
      </div>
      <div className = "row">
        <p className = "profile-info-text">{this.props.bio}</p>
      </div>
    </div>
    )
  }

  renderProfileButton(){
    if (this.props.id == this.props.currentUser.id){
      return <Link to = {`/editprofile/${this.props.currentUser.id}`}><button className = "profile-info-text btn btn-outline-secondary btn-sm edit-profile-button">Edit Profile</button></Link>
    }
    else{
      if(this.props.followers.find(user => user.id == this.props.currentUser.id)){
        return <button
        className = "profile-info-text btn btn-outline-secondary btn-sm edit-profile-button"
        onClick = {this.props.unFollow}
        >UnFollow</button>
      }
      else{
        return <button
        className = "profile-info-text btn btn-outline-secondary btn-sm edit-profile-button"
        onClick = {this.props.follow}
        >Follow</button>
      }
    }
  }
}

export default ProfileInfo
