import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Card, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './movie-view.scss';

let mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

class MovieView extends React.Component {

  state = {
    movies: this.props.movies,
    Favorites: this.props.user.Favorites || []
  }

  addFavorite(movies) {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
  
    axios.post(`https://myflixmovies-app.herokuapp.com/users/${Username}/movies/${movies._id}`,   {
      Favorites: this.state.Favorites
    },
    {
      headers: { Authorization: `Bearer ${token}`},
    })
    .then(response => {
      console.log(response);
      alert(movies.Title + ' was added to your favorites');
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  render() {
    const { movies, onBackClick, user } = this.props;

    let isFavorite = false
    if (user.Favorites.includes(movies._id)) {
      isFavorite = true;
    } else {
      isFavorite = false;
    };

    return (
      <Container>
        <Col>
          <Row className='d-block'>
            <Card className='mt-5'>
              <Card.Body>

                <Card.Img className='mr-3 mb-2 w-25 float-left' src={movies.ImagePath} />

                <Card.Title className='mt-2'>{movies.Title}</Card.Title>

                <Card.Text className='mt-4' as='h5'>{movies.Description}</Card.Text>
                
                <Link to={`/directors/${movies.Director.Name}`}>
                  <Card.Text as='h5' className='mt-5'>{movies.Director.Name}</Card.Text>
                </Link>

                <Link to={`/genres/${movies.Genre.Name}`}>
                  <Card.Text as='h5' className='mt-3'>{movies.Genre.Name}</Card.Text>
                </Link>
                <Button className='mt-5 mb-0' value={movies._id} variant='outline-warning' onClick={(e) => this.addFavorite(movies)}>Add to Favorites</Button>
                <Row>
                  <Link to={`/`}>
                     <Button className='mt-4' variant='warning' onClick={() => { onBackClick(); }}>Back</Button>
                  </Link>
                </Row>
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movies: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect (mapStateToProps)(MovieView);
