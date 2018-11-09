import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
  return (
    <div>
    <div className="navbar navbar-expand navbar-dark bg-dark">
    <a className ="navbar-brand" href="#">Navbar</a>
    <NavLink   to= {`/profile`}>Profile</NavLink>
    <NavLink  className = "nav-item nav-link active" to="/createpost">Create Post</NavLink>
    </div>
    </div>
  );
}

export default NavBar;
