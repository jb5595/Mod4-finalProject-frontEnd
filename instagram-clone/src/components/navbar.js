import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const BaseSearchURL = "http://localhost:3000/api/v1/users/search/"
const BaseUrl = "http://localhost:3000"
library.add(faSearch)

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


  }
  render (){
    return (
    <div>
    <div className="navbar navbar-expand">
    <a className ="navbar-brand" href="#">Navbar</a>
    <NavLink to= {`/profile`}>Profile</NavLink>
    <NavLink className = "nav-item nav-link active" to="/createpost">Create Post</NavLink>
    <NavLink className = "nav-item nav-link active" to="/feed">Feed</NavLink>
    <NavLink className = "nav-item nav-link active" to="/explore">Explore</NavLink>
    <button onClick = {this.props.logout }className = "nav-item btn btn-primary">Logout</button>
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
    </div>
    </div>
  );
  }
}

export default NavBar;
