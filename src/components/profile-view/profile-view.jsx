import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Form, Button, Card, Container, Col, Row, CardGroup } from 'react-bootstrap';
import { setMovies, setUser, updateUser } from '../../actions/actions';

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user
  }
}

class ProfileView extends React.Component{

  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  getUser = (token) => {
    const Username = localStorage.getItem('user');
    axios.get(`https://myflixmovies-app.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday,
        FavoriteMovies: response.data.FavoriteMovies
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  };

//Allows users to update their profile details

  editUser = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.put(`https://myflixmovies-app.herokuapp.com/users/${Username}`, {
      Username: this.state.Username,
      Password: this.state.Password,
      Email: this.state.Email,
      Birthday: this.state.Birthday,
    },
    {
      headers: { Authorization: `Bearer ${token}`},
    })
    .then((response) => {
      let formattedDate = null;
      let anyBirthday = response.data.Birthday;
      if(anyBirthday){
        formattedDate = anyBirthday.slice(0,10)
      }
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: formattedDate,
      });

      localStorage.setItem('user', this.state.Username);
      alert('Profile Updated');
      window.open('/profile', '_self');
    })
    .catch(error => {
      console.log(error);
    })
  };

  //Allows user to delete their account

  onDeleteUser() {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://myflixmovies-app.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log(response);
      alert('Profile Deleted');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.open('/', '_self');
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  setUsername(value) {
    this.setState({
      Username: value
    });
  };

  setPassword(value) {
    this.setState({
      Password: value
    });
  };

  setEmail(value) {
    this.setState({
      Email: value
    });
  };

  setBirthday(value) {
    this.setState({
      Birthday: value
    });
  };

//Allows user to remove a movie from favorites
onRemoveFavorite = (movies) => {
  const Username = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  axios.delete(`https://myflixmovies-app.herokuapp.com/users/${Username}/movies/${movies._id}`, {
    headers: { Authorization: `Bearer ${token}`},
  })
  .then((response) => {
    console.log(response);
    alert('Movie Removed from Favorites');
    window.open(`/profile`, '_self');
  })
  .catch(function (error) {
    console.log(error);
  });
};

  render() {

    const { movies, onBackClick } = this.props;
    const { FavoriteMovies, Username, Email, formattedDate } = this.state;
    

    return (
      <Container className='mt-3'>
        <Row>
        <Col>
          <Card>
            <Card.Body>
             <Card.Title as='h3'>Hello, {Username}</Card.Title>
              <Card.Text><b>Username:</b> {Username}</Card.Text>
              <Card.Text><b>Email:</b> {Email}</Card.Text>
              <Card.Text><b>Birthday:</b> {formattedDate}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title as='h3'>Profile</Card.Title>
                <Form onSubmit={(e) =>
                  this.editUser(
                    e,
                    this.Username,
                    this.Password,
                    this.Email,
                    this.Birthday
                  )}>

                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='New Username'
                      onChange={(e) => this.setUsername(e.target.value)}
                      />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className='mt-2'>Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='New Password'
                      onChange={(e) => this.setPassword(e.target.value)}
                      />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className='mt-2'>Email</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='New Email'
                      onChange={(e) => this.setEmail(e.target.value)}
                      />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className='mt-2'>Birthday</Form.Label>
                    <Form.Control
                      type='date'
                      onChange={(e) => this.setBirthday(e.target.value)}
                      />
                  </Form.Group>

                  <Button className='mt-3' variant='primary' type='submit' onClick={this.editUser}>Update User</Button>
                  <Button className='mt-3 ml-3' variant='secondary' onClick={this.onDeleteUser}>Delete User</Button>

                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        </Col>
        </Row>
        
        
        <Row>
          <Col className='mt-3'>
            <h3>{Username} Favorite Movies </h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
            <Card.Body className='favs-override'>
                {FavoriteMovies.length === 0 && (
                  <div className="text-center">No favorites added yet</div>
                )}
                <Row className='justify-content-center'>
                  {FavoriteMovies.length > 0 &&
                    movies.map((movies) => {
                      if (
                        movies._id === FavoriteMovies.find((fav) => fav === movies._id)
                      ) {
                      return (
                        <Col lg={3} md={6} className="mb-2" key={movies._id}>
                          <CardGroup>
                            <Card>
                              
                              <Card.Img className="img" variant="top" src={movies.ImagePath} />
                              <Card.Body>

                                <Button size="sm" className="card-text btn-fav" variant="danger" value={movies._id} onClick={(e) => this.onRemoveFavorite(movies)}>Remove</Button>
                    
                                
                              </Card.Body>
                            </Card>
                          </CardGroup>
                        </Col>
                      );
                    }
                  })}
                </Row>
              </Card.Body> 
            </Card>
          </Col>
        </Row>
        <Button variant='secondary' className='mt-3 mb-3' onClick={() => { onBackClick();}}>Back</Button>
      </Container>
    )
  }
}

let mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => {
      dispatch(setUser(user))
    },
    updateUser: (user) => {
      dispatch(updateUser(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
