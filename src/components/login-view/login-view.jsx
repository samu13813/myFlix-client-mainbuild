import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Form, Button, Card, CardGroup, Container, Col, Row} from 'react-bootstrap';
import './login-view.scss';
import { Link } from 'react-router-dom';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be at least 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be at least 8 characters long');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      axios.post('https://myflixmovies-app.herokuapp.com/login', {
        Username: username,
        Password: password
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
    }
  };

  return (
    <Container className='pt-5 w-25'>
      <Row>
        <Col>
          <CardGroup>
            <Card>
            <Card.Body>
              <Card.Title as='h2'>Log In</Card.Title>
              <Form>
                <Form.Group className='mb-3'>
                  <Form.Label className='mt-3'>Username:</Form.Label>
                  <Form.Control type='text' placeholder='Enter your Username' value={username} required onChange={e => setUsername(e.target.value)} />
                  {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label className='mt-3'>Password:</Form.Label>
                  <Form.Control type='password' placeholder='Enter your Password' value={password} required onChange={e => setPassword(e.target.value)} />
                  {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>

                <Button variant='warning' type='submit' className='mt-4' onClick={handleSubmit}>
                  Submit
                </Button>
                <Link to='/register'>
                  <Button variant='outline-warning' className='ml-3 mt-4'>Register Now</Button>
                </Link>

              </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
