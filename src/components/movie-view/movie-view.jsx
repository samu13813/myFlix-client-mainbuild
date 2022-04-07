import React from 'react';
import axios from 'axios';
import { Button, Card, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class MovieView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      FavoriteMovies: [],
      userDetails: []
    }

    this.addFavorite = this.addFavorite.bind(this);
  };

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUserDetails(accessToken);
  }

  getUserDetails() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.get(`https://myflixmovies-app.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log(response);
      this.setState({
        userDetails: response.data,
        FavoriteMovies: response.data.FavoriteMovies
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  addFavorite() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.post(`https://myflixmovies-app.herokuapp.com/${user}/movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}`},
    })
    .then((response) => {
      this.setState({
        FavoriteMovies: response.data.FavoriteMovies
      });
      console.log(response);
      alert('Movie added to favorites');
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <Col>
          <Row className='d-block'>
            <Card className='mt-3'>
              <Card.Body>
                <Card.Img className='pr-2 mb-2 w-25 float-left' src={movie.ImagePath} />
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button className='mr-3 mt-5 mb-0' variant='secondary'>Director</Button>
                </Link>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button className='mr-3 mt-5 mb-0' variant='secondary'>Genres</Button>
                </Link>
                <Link to={`/`}>
                  <Button className='mr-3 mt-5 mb-0' variant='secondary' onClick={() => { onBackClick(); }}>Back</Button>
                </Link>
                <Button className='mt-5 mb-0' value={movie.id} variant='light' onClick={this.addFavorite(movie)}>Add to Favorites</Button>
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Container>
    );
  }
}

export default MovieView;
