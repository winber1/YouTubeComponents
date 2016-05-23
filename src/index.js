import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import VideoPlayList from './components/video_playlist.js';
import axios from 'axios';

var ROOT_URL = 'https://www.googleapis.com/youtube/v3/';
const API_KEY = 'AIzaSyCpFFn5L-9JfU9-hOJpXPzCtWhE9AXhOAw';
const YTchannelID = 'UCghGuUjJUeuGkCYauHHwGCA';  //roseastrology

class App extends Component {
  constructor (props){
    super(props);

    this.state = {  videos: [],
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

    this.myYTSearch('search', params, (videos) => {
      //console.log('response',videos);
      this.setState({ videos: videos });
    });

    //return this.state.videos;
  }

  getPlaylists(){
    var playListObjs = [];
    var count = 0;
    var params = {
      part: 'snippet',
      key: API_KEY,
      channelId: YTchannelID,
      maxResults:50,
      type: 'playlist'
    };

    this.myYTSearch('search', params, (playlists) => {

      //console.log('playlists count', playlists.length)
      //console.log('playlists', playlists)

      // get playlist title and video set for each playlistid
      playlists.forEach(
        (playlist, index) => {
          var params = {
            part: 'snippet',
            maxResults:50,
            playlistId: playlist.id.playlistId,
            key: API_KEY
          };
          this.myYTSearch('playlistItems', params, (videos) => {
            //console.log('getting videos for playlist '+ index + ' title:'+playlist.snippet.title, videos);
            playListObjs.push({
              title: playlist.snippet.title,
              etag: playlist.etag,
              videos: videos,
            });
            count++;
            //console.log('total playlists processed so far: ', count);
            // check for last playlist
            if (count === 12) {
              //console.log('playListObjs', playListObjs);
              // run this once after we have all videos for all playlists
              this.setState({ playListObjs });
            }
          });
        }
      );
    });
  }

  myYTSearch (path, params, callback) {
    var p = ROOT_URL + path;
    axios.get(p, { params: params })
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
            <VideoPlayList playlists={this.state.playListObjs} />
          </div>
        );
  }
}

ReactDOM.render(<App />, document.querySelector('.VideoListContainer'));
