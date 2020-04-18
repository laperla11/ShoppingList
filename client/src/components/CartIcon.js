import React, { useContext, useEffect, useState } from 'react';
import {
  Spinner,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { GlobalContext } from '../state/contexts/GlobalContext';
import { AuthContext } from '../state/contexts/AuthContext';
import { ReactComponent as ShoppingIcon } from '../assets/shopping-bag.svg';
import CartItem from './CartElement';

const CartIcon = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const { auth } = useContext(AuthContext);
  const { items, getItems, clearItems, updateItem, isLoading } = useContext(
    GlobalContext
  );
  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);
  const itemsInCart = items.filter((item) => item.isPurchased);
  return (
    <div onClick={toggle} className='cart-container'>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{itemsInCart.length}</span>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Your Shopping Cart</ModalHeader>
        <ModalBody>
          {!isLoading ? (
            auth.isAuthenticated && (
              <ListGroup>
                {itemsInCart.length ? (
                  <>
                    <TransitionGroup className='shopping-list'>
                      {itemsInCart
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map(({ _id, name, isPurchased }) => (
                          <CSSTransition
                            key={_id}
                            timeout={500}
                            classNames='fade'
                          >
                            <CartItem
                              name={name}
                              id={_id}
                              updateItem={updateItem}
                            />
                          </CSSTransition>
                        ))}
                    </TransitionGroup>
                    <Button
                      color='dark'
                      onClick={clearItems}
                      className='clear-btn'
                      disabled={items.length !== itemsInCart.length}
                    >
                      Clear Cart
                    </Button>
                  </>
                ) : (
                  <h5>Your shopping cart is empty.</h5>
                )}
              </ListGroup>
            )
          ) : (
            <Spinner style={{ width: '3rem', height: '3rem' }} />
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CartIcon;
