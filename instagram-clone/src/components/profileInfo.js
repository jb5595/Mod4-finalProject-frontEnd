import React from "react"

const ProfileInfo = (props) => {
  return(
  <div>
    <div className = "row">
      <p className = "profile-username profile-info-margin">{props.userName}</p>
      <button className = "profile-info-text btn btn-outline-secondary btn-sm edit-profile-button">Edit Profile</button>
    </div>
    <div className = "row">
      <p className = 'profile-info-margin profile-info-text'><b>{props.posts?props.posts.length:null}</b> Posts</p>
      <p className = 'profile-info-margin profile-info-text'><b>100</b> Followers</p>
      <p className = 'profile-info-margin profile-info-text'><b>100</b> Following</p>
    </div>
    <div className = "row">
      <p className = "profile-info-text"><b>{props.firstName} {props.lastName}</b> </p>
    </div>
    <div className = "row">
      <p className = "profile-info-text">{props.bio}</p>
    </div>
  </div>
  )
}

export default ProfileInfo
