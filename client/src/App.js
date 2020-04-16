import React from 'react';
import { Container } from 'reactstrap';

import AppNavbar from './components/AppNavbar';
import { ShoppingList } from './components/ShoppingList';
import AddItem from './components/AddItemModal';

import { GlobalProvider } from './state/contexts/GlobalContext';
import { AuthProvider } from './state/contexts/AuthContext';
import { ErrorProvider } from './state/contexts/ErrorContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <ErrorProvider>
      <AuthProvider>
        <GlobalProvider>
          <AppNavbar />
          <Container>
            <AddItem />
            <ShoppingList />
          </Container>
        </GlobalProvider>
      </AuthProvider>
    </ErrorProvider>
  );
}

export default App;
