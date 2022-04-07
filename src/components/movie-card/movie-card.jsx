import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Container, Row} from 'react-bootstrap/';
import { Link } from 'react-router-dom';

class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Container className='mx-auto w-75 mt-3'>
        <Row className='d-block'>
          <Card className='mx-auto'>
            <Card.Body>
              <Card.Img className='pr-2 mb-2 w-75' src={movie.ImagePath} />
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
              <Link to={`/movies/${movie._id}`}>
                <Button variant='secondary'>Open</Button>
              </Link>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({ //props object must include a movie object. shape is an object
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
