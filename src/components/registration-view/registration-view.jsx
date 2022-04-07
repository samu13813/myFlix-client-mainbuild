import React, {useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Form, Button, Card, CardGroup, Container, Col, Row} from 'react-bootstrap';
import './registration-view.scss';
import { Link } from 'react-router-dom';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');
  const [ emailErr, setEmailErr ] = useState('');

  //validate user inputs
  const validate = () => {
    let isReq = true;
    if (username.length < 2 ) {
      setUsernameErr('Username must be at least 2 characters long');
      isReq = false;
    }
    if (password.length < 8 ) {
      setPasswordErr('Password must be at least 8 characters long');
      isReq = false;
    }
    if (email.indexOf('@') === -1) {
      setEmailErr('Please introduce a valid email');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      axios.post('https://myflixmovies-app.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        alert('Registration successful, please login!');
        window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch(response => {
        console.error(response);
        alert('Unable to register');
      });
    }
  };

  return (
    <Container className='pt-5 mx-auto'>
      <Row>
        <Col>
          <CardGroup>
            <Card>
            <Card.Body>
              <Card.Title>Please Register</Card.Title>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type='text' placeholder='Enter a Username' required value={username} onChange={e => setUsername(e.target.value)} />
                  {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type='password' placeholder='Enter a Password' minLength='8' required value={password} onChange={e => setPassword(e.target.value)} />
                  {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type='email' placeholder='Enter a Email Address' required value={email} onChange={e => setEmail(e.target.value)} />
                  {emailErr && <p>{emailErr}</p>}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control type='date' onChange={e => setBirthday(e.target.value)} />
                </Form.Group>

                <Button variant='primary' type='submit' onClick={handleSubmit}>Submit</Button>
                <Link to='/'>
                  <Button variant='secondary' className='ml-3'>Log In</Button>
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
