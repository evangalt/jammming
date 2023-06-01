import './App.css';
import React from 'react';
import Playlist from './components/Playlist/Playlist';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';

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
    // @todo use trackUris to in Spotify API to find songs
    // const trackUris = this.state.playlistTracks.map(track => track.uri);
    // Code to save playlist to Spotify goes here
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    });
  }

  search(term) {
    // Code to search for tracks on Spotify goes here
    this.setState({searchResults: 
      [
        // @todo hard code search results for now
        {name: 'Friends', artist: 'Emmit Fenn', album: 'Friends', id: '1'}, 
        {name: 'Horus', artist: 'EarthLife', album: 'India', id: '2'},
        {name: 'funny', artist: 'Golden Vessel', album: 'everythingeverydayeverything', id: '2'},
        {name: 'Right Thing', artist: 'Bayonne', album: 'Right Thing', id: '3'},
        {name: 'Oh Laura', artist: 'SG Lewis', album: 'AudioLust & HigherLove', id: '4'},
        {name: 'Good Days', artist: 'SZA', album: 'Good Days', id: '5'},
        {name: 'Fortanach', artist: 'Sebastian Plano', album: 'Fortanach', id: '6'},
        {name: 'Holocene', artist: 'Bon Iver', album: 'Bon Iver', id: '7'},
        {name: 'Brand New Key', artist: 'Melanie', album: 'Beautiful People: The Greatest Hits of Melanie', id: '8'},
        {name: 'Tell The Vision', artist: 'Pop Smoke', album: 'Faith', id: '9'},
        {name: 'Eyes', artist: 'Rogue Wave', album: 'Eyes', id: '10'},
      ]
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Create a Spotify Playlist</h1>
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
