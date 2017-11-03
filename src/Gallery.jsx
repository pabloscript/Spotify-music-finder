import React, { Component } from 'react';
import './Gallery.css';

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playingUrl: '',
            audio: null,
            playing: false
        }
    }
    playAudio(previewUrl) {
        let audio = new Audio(previewUrl);
        if (!this.state.playing) {
            audio.play();
            this.setState({
                playing: true,
                playingUrl: previewUrl,
                audio
            })
        } else {
            if (this.state.playingUrl === previewUrl) {
                this.state.audio.pause();
                this.setState({
                    playing: false
                })
            } else {
                this.state.audio.pause();
                audio.play();
                this.setState({
                    playing: true,
                    playingUrl: previewUrl,
                    audio
                })
            }
        }
    }

    render() {        
        const { tracks } = this.props;
        return (
            <div className="Gallery-wrapper">
                {tracks.map((track, k) => {
                    console.log("Track properties: ", track);
                    const trackImg = track.album.images[0].url;
                    return (
                        <div
                            key={ k }
                            className="Track"
                            onClick={ () => this.playAudio(track.preview_url) }
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