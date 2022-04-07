import React from 'react';
import { Container, Card, Button} from 'react-bootstrap/';

class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Container className='mx-auto mt-3'>
        <Card>
          <Card.Body>
            <Card.Title>Genre</Card.Title>
            <Card.Text>
              Name: {genre.Name}
            </Card.Text>
            <Card.Text>
              Description: {genre.Description}
            </Card.Text>
            <Button variant='secondary' onClick={() => { onBackClick(); }}>Back</Button>
          </Card.Body>
        </Card>
      </Container>
    )
  }
}

export default GenreView;
