import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import ProfileView from '../profile-view/profile-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genres-view/genres-view';
// import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import NavbarComp from '../navbar/navbar';

import { Row, Col } from 'react-bootstrap';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  getMovies(token) {
    axios.get('https://myflixmovies-app.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      //Asign the result to the state
      this.props.setMovies(response.data);
    })
    .catch(function(error) {
      console.log(error)
    });
  }

componentDidMount() {
  let accessToken = localStorage.getItem('token');
  if (accessToken !== null) {
    this.setState({
      user: localStorage.getItem('user')
    });
    this.getMovies(accessToken);
  }
}

// When a movie is clicked, this function is called and updates the state of 'selectedMovie'
  setSelectedMovie(movie) {
    this.setState ({
      selectedMovie: movie
    });
  }

  // When a user succesfully logs in, this function updates the 'user' property in state to that particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  // Below function gets updated when a new user register
  onRegistration(register) {
    this.setState({
      register
    });
  }

  render() {
    const { movies } = this.props;
    const { user } = this.state;

    return (
      <Router>
        <NavbarComp/>
        <Row className='main-view justify-content-md-center'>

          <Route exact path='/' render={() => {
            if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

            if (movies.length === 0) return <div className='main-view' />;

            return <MoviesList movies={movies} />;
          }} />

          <Route exact path='/register' render={() => {
            if (user) return <Redirect to='/' />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route exact path='/movies/:movieId' render={({ match, history }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path='/directors/:name' render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            if (movies.length === 0) return <div className='main-view' />

            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path='/genres/:name' render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            if (movies.length === 0) return <div className='main-view' />;

            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path='/profile' render={({ history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            if (movies.length === 0) return <div className='main-view' />;

            return <Col>
              <ProfileView movies={movies} onBackClick={() => history.goBack()} />
            </Col>
          }} />

        </Row>
      </Router>
    );
  }
};

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);
