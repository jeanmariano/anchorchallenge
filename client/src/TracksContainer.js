import React, { Component } from "react";
import "./TracksContainer.sass";

class Track extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { trackIndex, changeTrack } = this.props;
    changeTrack(trackIndex, true);
  }

  title() {
    const { title } = this.props;
    return title.replace("by Backstreet Boys", "");
  }

  selected() {
    const { trackIndex, currentTrackIndex, playing } = this.props;
    return currentTrackIndex === trackIndex && playing;
  }

  render() {
    const { trackIndex } = this.props;
    return (
      <div
        className={`Track ${this.selected() ? "Track-playing" : ""}`}
        onClick={this.handleClick}
      >
        <div
          className={`Track-index ${
            this.selected() ? "Track-index-playing" : ""
          }`}
        >
          {this.selected() ? <i class="fa fa-music"></i> : trackIndex + 1}
        </div>
        <div>{this.title()}</div>
      </div>
    );
  }
}

class TracksContainer extends Component {
  render() {
    const { tracks, changeTrack, currentTrackIndex, playing } = this.props;
    return (
      <div className="TracksContainer">
        {tracks.map((track, i) => {
          return (
            <Track
              {...track}
              trackIndex={i}
              changeTrack={changeTrack}
              currentTrackIndex={currentTrackIndex}
              playing={playing}
              key={`Track-${i}`}
            />
          );
        })}
      </div>
    );
  }
}

export default TracksContainer;
