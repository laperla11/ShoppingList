import React from 'react';
import { GlobalContext } from '../state/contexts/GlobalContext';
import { AuthContext } from '../state/contexts/AuthContext';

import List from './List';

const ShopList = () => {
  return (
    <GlobalContext.Consumer>
      {(global) => (
        <AuthContext.Consumer>
          {(auth) => {
            console.log('parn', global.state);

            return <List global={global} auth={auth} />;
          }}
        </AuthContext.Consumer>
      )}
    </GlobalContext.Consumer>
  );
};

export default ShopList;
