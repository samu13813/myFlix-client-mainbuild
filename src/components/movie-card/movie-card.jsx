import React from 'react';
import PropTypes from 'prop-types';
import {Card, Container, Row} from 'react-bootstrap/';
import { Link } from 'react-router-dom';
import './movie-card.scss';

class MovieCard extends React.Component {
  render() {
    const { movies } = this.props;

    return (
      <Container className=' w-75 mt-2 mb-2'>
        <Row className='d-block'>
          <Card className='border-0'>
            <Card.Body>
            <Link to={`/movies/${movies._id}`}>
              <Card.Img src={movies.ImagePath} /> 
            </Link>
            <Link to={`/movies/${movies._id}`}>
              <Card.Title className='text-center mt-3' as='h4'>{movies.Title}</Card.Title> 
            </Link>
              <Card.Text className='text-center'>{movies.Director.Name}</Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    );
  }
}

MovieCard.propTypes = {
  movies: PropTypes.shape({ //props object must include a movie object. shape is an object
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};

MovieCard.propTypes = {
  movies: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
