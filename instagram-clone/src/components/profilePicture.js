import React from "react"
const BaseUrl = "http://localhost:3000"

const ProfilePicture = (props) => {
  return(
    <React.Fragment>
      <img className = "profile-picture" alt = "profile" src = {BaseUrl + props.image.url}/>
    </React.Fragment>
  )
}

export default ProfilePicture
