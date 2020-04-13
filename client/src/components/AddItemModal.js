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

import { GlobalContext } from '../context/GlobalState';

const AddItem = () => {
  const { addItem } = useContext(GlobalContext);
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
      <Button
        color='dark'
        style={{ marginBottom: '2rem' }}
        onClick={(e) => {
          toggle();
        }}
      >
        Add Item
      </Button>
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
