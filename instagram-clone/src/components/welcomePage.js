import '../WelcomeLoginCreateUser.css';
import {Link} from 'react-router-dom'

import React from "react"

class WelcomePage extends React.Component{
  render(){
    return(
      <div className = "welcome-page-container">
        <h3 className = "welcome-page-header">Welcome to Not-instagram </h3>
        <div className = "welcome-page-subcontent">
          <div className = "row">
            <p className = "offset-1">New User? </p>
            <p className = "offset-6">Existing User </p>
          </div>
          <div className = "row">
            <Link to = "/createuser"><button className = "offset-1 btn btn-primary">Create An Account</button></Link>
            <Link to = "/login" className = "offset-5" ><button className = "offset-5 btn btn-primary">Login</button></Link>
          </div>
        </div>
      </div>
    )
  }

}
export default WelcomePage
