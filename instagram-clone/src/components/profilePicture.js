import React from "react"

const ProfilePicture = (props) => {
  return(
    <React.Fragment>
      <img className = "profile-picture" alt = "profile" src = {props.image}/>
    </React.Fragment>
  )
}

export default ProfilePicture
