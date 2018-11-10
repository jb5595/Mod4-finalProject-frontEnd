import React, { Component } from 'react';
import ProfilePicture from "../components/profilePicture"
import ProfileInfo from "../components/profileInfo"
import ProfilePostsContainer from "./profilePostsContainer"


const BaseUserURL = "http://localhost:3000/api/v1/users/"
const BaseFollowURL = "http://localhost:3000/api/v1/relationships"
const BaseUnFollowURL = "http://localhost:3000/api/v1/relationships/unfollow"


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

  unFollow = (e) =>{
    let body = {
      relationship:{
        follower_id: this.props.currentUser.id,
        followed_id: this.state.user.id
      }
    }
    fetch(BaseUnFollowURL,{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(data =>{
      let newFollowers = this.state.user.followers.filter(user => user.id !=this.props.currentUser.id)
      this.setState({
        user:
          {...this.state.user,
            followers: newFollowers
          }
      })
    })
    }


  follow = (e) =>{
    let body = {
      relationship:{
        follower_id: this.props.currentUser.id,
        followed_id: this.state.user.id
      }
    }
    fetch(BaseFollowURL,{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(data => this.setState({
      user:
      {...this.state.user,
        followers:[...this.state.user.followers, data]
      }
    }))
  }
    render(){
      return(
        <div>
          {this.state.user ? this.renderProfilePage(): null}
        </div>
      )
    }
  renderProfilePage(){
      return(
        <React.Fragment>
        <div className = 'row profile-page-top-container'>
          <div className = "col-4 profile-picture-container">
            <ProfilePicture image={this.state.user.profile_picture}/>
          </div>
          <div className = "col-8 profile-info-container">
            <ProfileInfo
              currentUser = {this.props.currentUser}
              userName = {this.state.user.user_name}
              firstName = {this.state.user.first_name}
              lastName = {this.state.user.last_name}
              posts = {this.state.user.posts}
              bio = {this.state.user.bio}
              id = {this.state.user.id}
              followers = {this.state.user.followers}
              following = {this.state.user.following}
              follow = {this.follow}
              unFollow = {this.unFollow}
            />
          </div>
        </div>
        <ProfilePostsContainer posts = {this.state.user.posts}/>
        </React.Fragment>
      )
  }
}

export default ProfilePage
