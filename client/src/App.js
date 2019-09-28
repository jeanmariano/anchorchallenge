import React, { Component } from "react";
import Player from "./Player";
import TracksContainer from "./TracksContainer";
import Loader from "./Loader";
import "./App.sass";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrackIndex: 0,
      playing: false,
      tracks: []
    };
    this.changeTrack = this.changeTrack.bind(this);
    this.setPlaying = this.setPlaying.bind(this);
    this.setTracks = this.setTracks.bind(this);
  }

  componentDidMount() {
    const headers = {
      "Content-Type": "application/json"
    };
    fetch("/api/tracks", headers)
      .then(res => res.json())
      .then(data => {
        this.setTracks(data.tracks);
      })
      .catch(error => {
        console.error("Error fetching data: " + error);
      });
  }
  
  setTracks(tracks) {
    this.setState({ tracks: tracks });
  }

  setPlaying(setting) {
    this.setState({ playing: setting });
  }

  changeTrack(newTrackIndex, playing) {
    this.setState({ currentTrackIndex: newTrackIndex, playing: playing });
  }

  renderLoader() {
    return <Loader />
  }

  renderPlayer() {
    const { currentTrackIndex, playing, tracks } = this.state;
    return (
      <div className="AppContainer">
        <Player
          currentTrackIndex={currentTrackIndex}
          setPlaying={this.setPlaying}
          changeTrack={this.changeTrack}
          playing={playing}
          tracks={tracks}
        />
        <TracksContainer
          tracks={tracks}
          changeTrack={this.changeTrack}
          playing={playing}
          currentTrackIndex={currentTrackIndex}
        />
      </div>
    );
  }

  render() {
    const { tracks } = this.state;
    return tracks.length > 0 ? this.renderPlayer() : this.renderLoader();
  }
}

export default App;
