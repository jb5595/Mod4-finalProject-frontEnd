import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
  return (
    <div style={{ borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '12px' }}>
      <NavLink
        style={{ marginRight: '10px' }}
        to= {`/users/${props.currentUser.id}`}
      >
        Profile
      </NavLink>
      <NavLink
        style={{ marginRight: '10px' }}
        to="/createpost"
      >
        Create Post
      </NavLink>
    </div>
  );
}

export default NavBar;
