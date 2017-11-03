import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }

  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const accessToken = 'BQASROooqU6rE8BUqsHKJ19qoqSX9Phd7LnPJzJVq7lo4oEds_F-EV7hsG5uhXal41zYbAql5MfqTxRNPvuX08ozdXyOnuZ7aLK0qE94TUQrkmZ19JT62b6t-Ml7ABYAodEnklOUwsQk8boFE45J1J1IXHbd6Ohc&refresh_token=AQAFyOqi6HNU7gKi2KHKtejrIy6NZAhyvyf2lUQ6uiRoRCT_jYwZQ6eSz-h8GmwfyC4qrLfwWCplsZWgf9kFcNkotf-aoEw7CRMN_j43fFKere0ztD3AbdQaFQYxsvF8__w';
    console.log(FETCH_URL);
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';

    const fetchArtist = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    const fetchTopTracks = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    }

    fetch(FETCH_URL, fetchArtist)
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        this.setState({ artist });

        FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=PL&`
        fetch(FETCH_URL, fetchTopTracks)
          .then(response => response.json())
          .then(json => {
            const { tracks } = json;
            this.setState({ tracks });
          })
      })
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Spotify Music Finder</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an Artist"
              value={ this.state.query }
              onChange={ e => { this.setState({ query: e.target.value }) } }
              onKeyPress={ e => {
                if (e.key === "Enter") {
                  this.search()
                }
              } }
            />
            <InputGroup.Addon onClick={ () => this.search() }>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null
            ?
              <div>
                <Profile artist={ this.state.artist } />
                <Gallery tracks={ this.state.tracks } />
              </div>
            :
              <div></div>
        }
      </div>
    );
  }
}

export default App;
