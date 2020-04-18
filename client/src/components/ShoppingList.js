import React, { useContext, useEffect } from 'react';
import { Spinner, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { GlobalContext } from '../state/contexts/GlobalContext';
import { AuthContext } from '../state/contexts/AuthContext';

export const ShoppingList = () => {
  const { auth } = useContext(AuthContext);
  const { items, getItems, updateItem, isLoading } = useContext(GlobalContext);
  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user, items.length]);

  return (
    <>
      {!isLoading ? (
        auth.isAuthenticated && (
          <ListGroup>
            {items.length ? (
              <TransitionGroup className='shopping-list'>
                {items
                  .filter((item) => !item.isPurchased)
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map(({ _id, name }) => (
                    <CSSTransition key={_id} timeout={500} classNames='fade'>
                      <ListGroupItem>
                        <Button
                          className='remove-btn'
                          color='danger'
                          size='sm'
                          onClick={() => {
                            updateItem(_id);
                          }}
                        >
                          &#10005;
                        </Button>
                        {name}
                      </ListGroupItem>
                    </CSSTransition>
                  ))}
              </TransitionGroup>
            ) : (
              <h5>Your shopping list is empty.</h5>
            )}
          </ListGroup>
        )
      ) : (
        <Spinner style={{ width: '3rem', height: '3rem' }} />
      )}
    </>
  );
};
