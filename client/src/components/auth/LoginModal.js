import React, { useState, useContext, useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  NavLink,
  Alert,
} from 'reactstrap';

import { clearErrors } from '../../state/actions/errorActions';

import { AuthContext } from '../../state/contexts/AuthContext';
import { ErrorContext } from '../../state/contexts/ErrorContext';

const LoginModal = () => {
  const defaultUser = {
    email: '',
    password: '',
    msg: null,
  };
  // local state
  const [newUser, setNewUser] = useState(defaultUser);
  const [modal, setModal] = useState(false);

  const { error, dispatchError } = useContext(ErrorContext);
  const { auth, login } = useContext(AuthContext);
  const { isAuthenticated } = auth;

  useEffect(() => {
    setNewUser(
      error.id === 'LOGIN_FAIL'
        ? { ...newUser, msg: error.msg.msg }
        : defaultUser
    );
    // if authenticated close modal
    if (modal && isAuthenticated) {
      toggle();
    }
  }, [error, isAuthenticated]);

  const toggle = () => {
    // Clear errors
    dispatchError(clearErrors());
    setModal(!modal);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(newUser);
    setNewUser(defaultUser);
  };
  const { email, password, msg } = newUser;
  return (
    <>
      <NavLink onClick={toggle} href='#'>
        Login
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {msg ? <Alert color='danger'>{msg}</Alert> : null}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for='email'>Email</Label>
              <Input
                type='email'
                name='email'
                value={email}
                placeholder='Email'
                onChange={handleChange}
              />

              <Label for='password'>Password</Label>
              <Input
                type='password'
                name='password'
                value={password}
                placeholder='Password'
                onChange={handleChange}
              />
              <Button
                color='dark'
                style={{ marginTop: '2rem', display: 'block' }}
              >
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default LoginModal;
