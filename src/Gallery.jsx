import React, { Component } from 'react';
import './Gallery.css';

class Gallery extends Component {
    render() {        
        const { tracks } = this.props;
        return (
            <div className="Gallery-wrapper">
                {tracks.map((track, k) => {
                    const trackImg = track.album.images[0].url;
                    return (
                        <div
                            key={ k }
                            className="Track"
                        >
                            <img
                                src={ trackImg }
                                className="Track-img"
                                alt="track"
                            />
                            <p className="Track-text">
                                { track.name }
                            </p>
                        </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Gallery;