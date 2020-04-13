import React, { useContext, useEffect } from 'react';
import {
  Spinner,
  ListGroup,
  ListGroupItem,
  Button,
  Container,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { GlobalContext } from '../context/GlobalState';

export const ShoppingList = () => {
  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { items, getItems, deleteItem, isLoading } = useContext(GlobalContext);

  return (
    <>
      {!isLoading ? (
        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  <Button
                    className='remove-btn'
                    color='danger'
                    size='sm'
                    onClick={() => {
                      deleteItem(_id);
                    }}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      ) : (
        <Spinner style={{ width: '3rem', height: '3rem' }} />
      )}
    </>
  );
};
