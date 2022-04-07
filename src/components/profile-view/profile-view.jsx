import React from 'react';
import axios from 'axios';
import {Form, Button, Card, Container, Col, Row} from 'react-bootstrap';

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
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday,
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
onRemoveFavorite = (e, movie) => {
  const Username = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  axios.delete(`https://myflixmovies-app.herokuapp.com/${Username}/movies/${movie._id}`, {
    headers: { Authorization: `Bearer ${token}`},
  })
  .then((response) => {
    console.log(response);
    alert('Movie Removed from Favorites');
    this.componentDidMount();
  })
  .catch(function (error) {
    console.log(error);
  });
};

  render() {

    const { onBackClick } = this.props;
    const { FavoriteMovies, Username } = this.state;

    return (
      <Container className='mt-3'>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Profile</Card.Title>
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
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='New Password'
                      onChange={(e) => this.setPassword(e.target.value)}
                      />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='New Email'
                      onChange={(e) => this.setEmail(e.target.value)}
                      />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
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
        <Row>
          <Col className='mt-3'>
            <h3>{Username} Favorite Movies </h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                {FavoriteMovies.lenght === 0 && (
                  <div>No Favorite Movies</div>
                )}
                <Row>
                  {FavoriteMovies.lenght > 0 && movies.map((movie) => {
                    if (movie._id === FavoriteMovies.find((favorite) => favorite === movie._id)
                  ) {
                    return (
                      <Card key={movie._id}>
                        <Card.Img
                          className='pr-2 mb-2 w-25'
                          src={movie.ImagePath}
                        />
                        <Card.Body>
                          <Card.Title>{movie.Title}</Card.Title>
                          <Button variant='primary' value={movie._id} onClick={(e) => this.onRemoveFavorite(e, movie)}>Remove</Button>
                        </Card.Body>
                      </Card>
                      );
                    }
                  })}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Button variant='secondary' className='mt-3' onClick={() => { onBackClick();}}>Back</Button>
      </Container>
    )
  }
}

export default ProfileView;
