import React from 'react';
import { ListGroupItem, Button } from 'reactstrap';

const CartElement = ({ id, name, updateItem }) => (
  <ListGroupItem className='list-item'>
    <span>
      <Button className='remove-btn' color='success' size='sm'>
        &#10003;
      </Button>
      <span
        style={{
          textDecoration: 'line-through',
        }}
      >
        {name}
      </span>
    </span>
    <Button
      style={{ fontSize: '1rem' }}
      className='remove-btn'
      color='danger'
      size='sm'
      onClick={() => {
        updateItem(id);
      }}
    >
      &#8634;
    </Button>
  </ListGroupItem>
);

export default CartElement;
