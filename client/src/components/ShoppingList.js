import React, { useContext, useEffect } from 'react';
import { Spinner, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { GlobalContext } from '../state/contexts/GlobalContext';
import { AuthContext } from '../state/contexts/AuthContext';

export const ShoppingList = () => {
  const { auth } = useContext(AuthContext);
  const { items, getItems, deleteItem, isLoading } = useContext(GlobalContext);
  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  return (
    <>
      {!isLoading ? (
        <ListGroup>
          {auth.isAuthenticated && (
            <TransitionGroup className='shopping-list'>
              {items
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map(({ _id, name }) => (
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
                        &#10005;
                      </Button>
                      {name}
                    </ListGroupItem>
                  </CSSTransition>
                ))}
            </TransitionGroup>
          )}
        </ListGroup>
      ) : (
        <Spinner style={{ width: '3rem', height: '3rem' }} />
      )}
    </>
  );
};
