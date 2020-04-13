import React from 'react';
import { Container } from 'reactstrap';

import AppNavbar from './components/AppNavbar';
import { ShoppingList } from './components/ShoppingList';
import AddItem from './components/AddItemModal';

import { GlobalProvider } from './context/GlobalState';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <GlobalProvider>
      <AppNavbar />
      <Container>
        <AddItem />
        <ShoppingList />
      </Container>
    </GlobalProvider>
  );
}

export default App;
