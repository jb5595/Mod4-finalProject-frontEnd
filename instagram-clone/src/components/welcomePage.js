import '../WelcomeLoginCreateUser.css';
import {Link} from 'react-router-dom'

import React from "react"

class WelcomePage extends React.Component{
  render(){
    return(
      <div className = "welcome-page-container">
        <h3 className = "welcome-page-header">Welcome to Grammable </h3>
        <div className = "welcome-page-subcontent">
            <h4 className = "welcome-text" >New User? </h4>
            <Link to = "/createuser"><button className = "btn btn-primary">Create An Account</button></Link>
            <h4 className = "welcome-text">Existing User </h4>
            <Link to = "/login" className = "" ><button className = "btn btn-primary">Login</button></Link>
        </div>
      </div>
    )
  }

}
export default WelcomePage
