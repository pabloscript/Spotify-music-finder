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
    const accessToken = 'BQDBKpxK-xtrtlmiE5AIeCS7OKM61kUXOzXKWO6R-4sArNCrjozWlFDMWguBVukNBdnkOEiaYPRmf6IsmgQiRxV-WJN2fqylvzpyqYcziKQ-ANZvtbFIKMXzA8xggq25AGoBbHedbU5iyccNkpm2dSexK_7Gpt78&refresh_token=AQDAZSW_niB0kIYA42bI5d-imLSzC_pMlf8EMUqqQxcO0lbACBZrVaIlBt7zz4XFgCzPwaWnN9pYGboBDC9Vt0tvf60hlNFrmbqTuJ2elMjkkJDfso-zWrLOtzQV54ZwUh4';
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
