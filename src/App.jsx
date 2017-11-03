import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const accessToken = 'BQBIRk0pRGOub4KcVbRTUsc4bVYOrrb-RDZHuk8TSPvvnIJtX_gvj5KvohtwOOb7YFJxh9z1d1Avce27OFSTGVhKBDiSfDvzRZyhId7dLBqZ6xTUTG_jA4T2GwVRwrqlBx93PX7fIWN6__XHw-myLhWI67GjRlDk&refresh_token=AQDGbHgSdWGGbzlLwXnOwOKGwvM5dogbvxluQC24rEjQvx2m7Vzf_ENKkg5z-POm4ZiC5b10imFaJU0P953PtL7F3HhDWmrrgmSAZbmgRG2z-d9lFwyx3vDXxlC8wXES6F0';
    console.log(FETCH_URL);

    const myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        this.setState({artist});
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
              value={this.state.query}
              onChange={e => {this.setState({query: e.target.value})}}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  this.search()
                }
              }}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <Profile artist={this.state.artist} />
        <div className="Gallery">
          Gallery
        </div>
      </div>
    );
  }
}

export default App;
