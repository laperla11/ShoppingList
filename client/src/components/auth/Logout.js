import React, { useContext } from 'react';
import { NavLink } from 'reactstrap';

import { AuthContext } from '../../state/contexts/AuthContext';

const Logout = () => {
  const { logout } = useContext(AuthContext);
  return (
    <>
      <NavLink onClick={logout} href='#'>
        Logout
      </NavLink>
    </>
  );
};

export default Logout;
