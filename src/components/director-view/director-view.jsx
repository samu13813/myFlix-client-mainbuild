import React from 'react';
import { Container, Card, Button } from 'react-bootstrap/';

class DirectorView extends React.Component{
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container className='mx-auto mt-5'>
        <Card>
          <Card.Body>
            <Card.Title>Director</Card.Title>
            <Card.Text>
              Name: {director.Name}
            </Card.Text>
            <Card.Text>
              Biography: {director.Bio}
            </Card.Text>
            <Card.Text>
              Birth: {director.Birth}
            </Card.Text>
            <Button className='mt-2' variant='warning' onClick={() => { onBackClick(); }}>Back</Button>
          </Card.Body>
        </Card>
      </Container>
    )
  }
}

export default DirectorView;
