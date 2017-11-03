import React, { Component } from 'react';
import './App.css';

class Profile extends Component {
    render() {
        let artist = {
            name: '', 
            followers: {total: ''}, 
            images: [{url: ''}],
            genres: []
        };
        artist = this.props.artist !== null ? this.props.artist : artist;

        return (
            <div className="Profile">
                <img 
                    alt="Profile"
                    className="Profile-img"
                    src={artist.images[0].url}
                />
                <div className="Artist-info">
                    <div>
                        {artist.name}
                    </div>
                    <div>
                        {artist.followers.total} followers
                    </div>
                    <div>
                        {
                            artist.genres.map((genre, k) => {
                                genre = genre !== artist.genres[artist.genres.length - 1] 
                                    ? ` ${genre}, ` 
                                    : `${genre}`;
                                return (
                                    <span key={k}>{genre}</span>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;