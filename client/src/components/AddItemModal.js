import React, { useState, useContext } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';

import { GlobalContext } from '../state/contexts/GlobalContext';
import { AuthContext } from '../state/contexts/AuthContext';

import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';

const AddItem = () => {
  const { addItem } = useContext(GlobalContext);
  const { auth } = useContext(AuthContext);

  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');

  const toggle = () => setModal(!modal);

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(name);
    setName('');
    toggle();
  };

  return (
    <div>
      {auth.isAuthenticated ? (
        <Button
          color='dark'
          style={{ marginBottom: '2rem' }}
          onClick={(e) => {
            toggle();
          }}
        >
          Add Item
        </Button>
      ) : (
        <div
          className='shop'
          style={{
            height: '70vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h4
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
            className='mb-3'
          >
            <span style={{ padding: '.5rem 0' }}>Please</span>
            <LoginModal />
            <span style={{ padding: '.5rem 0' }}>or</span> <RegisterModal />
            <span style={{ padding: '.5rem 0' }}>to manage </span>
            <span style={{ padding: '.5rem .5rem' }}>your shopping list.</span>
          </h4>
        </div>
      )}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for='item'>Item</Label>
              <Input
                type='text'
                name='name'
                value={name}
                placeholder='Add shopping item'
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                color='dark'
                style={{ marginTop: '2rem', display: 'block' }}
              >
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddItem;
