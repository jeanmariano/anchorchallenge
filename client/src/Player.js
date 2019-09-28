import React, { Component } from "react";
import "./Player.sass";

const VIDEO = "video";
const AUDIO = "audio";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: new Audio()
    };
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const newTrackIndex = this.props.currentTrackIndex;
    const oldTrackIndex = prevProps.currentTrackIndex;
    if (
      newTrackIndex !== oldTrackIndex ||
      (newTrackIndex === 0 &&
        newTrackIndex === oldTrackIndex &&
        prevProps.playing !== this.props.playing) // edge case
    ) {
      const newType = this.isVideo(newTrackIndex) ? VIDEO : AUDIO;
      this.refs[newType].load();
      if (this.props.playing) {
        this.play(newType);
      }
    }
  }

  isVideo(currentTrackIndex) {
    const { tracks } = this.props;
    return tracks[currentTrackIndex].mediaUrl.includes(".m4v");
  }

  next() {
    const { currentTrackIndex, changeTrack, tracks } = this.props;
    if (currentTrackIndex !== tracks.length - 1) {
      changeTrack(currentTrackIndex + 1, true);
    } else {
      this.pause(this.type());
    }
  }

  prev() {
    const { currentTrackIndex, changeTrack } = this.props;
    if (currentTrackIndex > 0) {
      changeTrack(currentTrackIndex - 1, true);
    } else {
      this.pause(this.type());
    }
  }

  play(type) {
    const { setPlaying } = this.props;
    setPlaying(true);
    this.refs[type].play();
  }

  pause(type) {
    const { setPlaying } = this.props;
    setPlaying(false);
    this.refs[type].pause();
  }
  
  type() {
    const { currentTrackIndex } = this.props;
    return this.isVideo(currentTrackIndex) ? VIDEO : AUDIO;
  }

  toggle() {
    const { playing, currentTrackIndex } = this.props;
    if (playing) {
      this.pause(this.type());
    } else {
      this.play(this.type());
    }
  }

  renderVideo(currentTrack) {
    const { mediaUrl } = currentTrack;
    return (
      <video ref={VIDEO} onEnded={() => this.next(VIDEO)}>
        <source src={mediaUrl} />
      </video>
    );
  }

  renderAudio(currentTrack) {
    const { mediaUrl, imageUrl } = currentTrack;
    return (
      <div className="Player-audio">
        <img src={imageUrl} className="Player-image" alt="Album art" />
        <audio controls ref="audio" onEnded={() => this.next()}>
          <source src={mediaUrl} type="audio/mpeg" />
        </audio>
      </div>
    );
  }

  render() {
    const { currentTrackIndex, tracks, playing } = this.props;
    const currentTrack = tracks[currentTrackIndex];
    return (
      <div className="Player-container">
        <div className="Player">
          {currentTrack && (
            <div>
              {this.isVideo(currentTrackIndex)
                ? this.renderVideo(currentTrack)
                : this.renderAudio(currentTrack)}
              <div className="Player-meta">
                <h2>{currentTrack.title.replace("by Backstreet Boys", "")}</h2>
                <h3>Backstreet Boys</h3>
              </div>
            </div>
          )}
          <div className="Player-controls">
            <div className="Player-prev" onClick={this.prev}>
              <i className="fa fa-step-backward"></i>
            </div>
            <div className="Player-play" onClick={this.toggle}>
              <i
                className={`${
                  playing ? "fa fa-pause-circle-o" : "fa fa-play-circle-o"
                }`}
              ></i>
            </div>
            <div className="Player-next" onClick={this.next}>
              <i className="fa fa-step-forward"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
