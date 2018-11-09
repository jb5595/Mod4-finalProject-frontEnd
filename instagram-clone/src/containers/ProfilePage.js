import React, { Component } from 'react';
import ProfilePicture from "../components/profilePicture"
import ProfileInfo from "../components/profileInfo"
import ProfilePostsContainer from "./profilePostsContainer"


const BaseUserURL = "http://localhost:3000/api/v1/users/"

class ProfilePage extends Component{
  constructor(props){
    super(props)
    this.state = {
      user: null
    }
  }

  componentDidMount(){
    let url  = BaseUserURL + this.props.userId
    fetch(url)
    .then(response => response.json())
    .then(data =>this.setState({user:data}) )

  }

  render(){
    return(
      <div>
        {this.renderProfilePage()}
      </div>
    )
  }

  renderProfilePage(){
    if (this.state.user){
      return(
        <React.Fragment>
        <div className = 'row profile-page-top-container'>
          <div className = "col-4 profile-picture-container">
            <ProfilePicture image={this.state.user.profile_picture}/>
          </div>
          <div className = "col-8 profile-info-container">
            <ProfileInfo
              userName = {this.state.user.user_name}
              firstName = {this.state.user.first_name}
              lastName = {this.state.user.last_name}
              posts = {this.state.user.posts}
              bio = {this.state.user.bio}
            />
          </div>
        </div>
        <ProfilePostsContainer posts = {this.state.user.posts}/>
        </React.Fragment>

      )
    }
  }
}

export default ProfilePage
