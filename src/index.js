import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import VideoPlayList from './components/video_playlist.js';
import axios from 'axios';

var ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = 'AIzaSyCpFFn5L-9JfU9-hOJpXPzCtWhE9AXhOAw';
const YTchannelID = 'UCghGuUjJUeuGkCYauHHwGCA';  //roseastrology

class App extends Component {
  constructor (props){
    super(props);

    this.state = {  videos: [],
                    playlists:[],
                    playListObjs: []  // {playlistTitle, {video}}
                  };
  }

  componentDidMount () {
      this.getVideos();
      this.getPlaylists();
  }

  getVideos(){
    var params = {
      part: 'snippet',
      key: API_KEY,
      channelId: YTchannelID,
      maxResults:50,
      type: 'video'
    };

    this.myYTSearch(params, (videos) => {
      //console.log('response',videos);
      this.setState({ videos: videos });
    });

    //return this.state.videos;
  }

  getPlaylists(){
    var params = {
      part: 'snippet',
      key: API_KEY,
      channelId: YTchannelID,
      maxResults:50,
      type: 'playlist'
    };

    this.myYTSearch(params, (playlists) => {

      // this.setState({ playlists: playlists });
      console.log('playlists count', playlists.length)
      console.log('playlists', playlists)

      // get video sets for each playlist
      var playListObjs = [];
      var count = 0;
      playlists.forEach(
        (playlist, index) => {
          console.log('gothere');
          console.log('playlist.id', playlist.id.playlistID)
          var params = {
            part: 'snippet',
            key: API_KEY,
            playlistID: playlist.id,
            maxResults:50,
            type: 'videos'
          };
          this.myYTSearch(params, (videos) => {
            console.log('getting videos for playlist '+ index, videos);
            playListObjs.push({
              name: playlist.snippet.title,
              videos: videos,
            });
            count++;
            console.log('total playlists processed so far: ', count);
            // check for last playlist
            if (count === 12) {
              console.log('playListObjs', playListObjs);
              // run this once after we have all videos for all playlists
              this.setState({ playListObjs });
            }
          });
        }
      );
      // return this.state.videos;
    });
  }

  myYTSearch (params, callback) {
    axios.get(ROOT_URL, { params: params })
      .then(function(response) {
        if (callback) { callback(response.data.items); }
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  render() {
    return (
          <div>
            <h3>VideoList</h3>
            <VideoList videos={this.state.videos} />

            <h3>PlayList</h3>
            <VideoPlayList playlists={this.state.playlistObjs} />
          </div>
        );
  }
}

ReactDOM.render(<App />, document.querySelector('.VideoListContainer'));
