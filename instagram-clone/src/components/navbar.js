import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'

const BaseSearchURL = "http://localhost:3000/api/v1/users/search/"
const BaseUrl = "http://localhost:3000"
library.add(faPlusSquare)

class NavBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchTerm: null,
      searchResults: []
    }
  }
  handleSearch = (e) =>{
    let searchTerm = e.currentTarget.value
    if (searchTerm != ""){
      fetch(BaseSearchURL+searchTerm)
      .then(resp => resp.json())
      .then(results=> this.setState({searchResults:results}))
    }
    else{
      this.setState({searchResults:[]})
    }


  }
  render (){
    return (
    <div>
    <div className="navbar navbar-expand">
    <NavLink to = "/feed" className ="navbar-brand  nav-item" href="#">Grammable</NavLink>
    <NavLink className= "nav-item" to= {`/profile`}>Profile</NavLink>
    <NavLink className = "nav-item nav-link active" to="/explore">Explore</NavLink>
    <NavLink className = "nav-item nav-link active add-post-icon" to="/createpost"><FontAwesomeIcon icon="plus-square" /></NavLink>
    <div className= "offset-4 row">
      <form className="form-inline navbar-form">
       <input onChange = {this.handleSearch} className="form-control mr-sm-2 navbar-search-bar" type="search" placeholder="Search" aria-label="Search"/>
       </form>
       <div className = "search-results-container">
          {this.state.searchResults.map(user=>
            <div key = {user.id} className = 'search-result row'>
            <div className = 'col-2'>
            <img src = {BaseUrl + user.profile_picture.url} className = "search-result-picture"/>
            </div>
            <div className = "offset-1">
            <Link to  = {`/users/${user.id}`}>
            <p>{user.user_name}</p>
            </Link>
            </div>
            </div>)}
       </div>
     </div>
     <button onClick = {this.props.logout }className = "navbar-button btn btn-primary">Logout</button>

    </div>
    </div>
  );
  }
}

export default NavBar;
