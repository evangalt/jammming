import logo from './logo.svg';
import './App.css';
import React from 'react';
import Playlist from './components/Playlist/Playlist';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Track from './components/Track/Track';
import TrackList from './components/Tracklist/Tracklist';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           We Be Jammmin' Project
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (!tracks.find(savedTrack => savedTrack.id === track.id)) {
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    // Code to save playlist to Spotify goes here
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    });
  }

  search(term) {
    // Code to search for tracks on Spotify goes here
    this.setState({searchResults: [{name: 'track1', artist: 'artist1', album: 'album1', id: '1'}, {name: 'track2', artist: 'artist2', album: 'album2', id: '2'}]});
  }

  render() {
    return (
      <div className="App">
        <h1>My Spotify Playlist</h1>
        <div className="App-playlist">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist-save">
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
            />
            <button className="App-save-button" onClick={this.savePlaylist}>Save to Spotify</button>
          </div>
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
        </div>
      </div>
    );
  }
}

export default App;
