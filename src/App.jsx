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
    const accessToken = 'BQBgqu8pTNgZQNaQk2IChHtZZCa3lblhdblpI21jwoNaR7fQci4IyLea4tBqu6fRse9wnjXvMrrrOemCuqUYFre5mrSPxGG77HrA3rzJ-uSCR-gUXxemcoj4Fr0hpUiNFI8KUSswnXqhS91I4n1QEujlLIAvCDrX&refresh_token=AQCK38vY6GPE81LK9mCBCjrUPpEMzY4D2uYdsmMPnnMpeBbRE3Ub8j2EAL9EXfaJEzmPAEUf_kmKrCS7pz2onXRh9kQIM0OPo6ur-8HtxFwT8xtWj5WcjENcPI2y5RG_AR0';
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
