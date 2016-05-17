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
                    playListObjs:[]
                  };

    this.getVideos();
    this.getPlaylists();


    // playList search
    YTSearch({key: API_KEY,
              channelId: 'UCghGuUjJUeuGkCYauHHwGCA',
              type:'playlist'}, (playlists) => {
      //console.log("after playlist call");
      //console.log(playlists);

      this.setState({ playlists });
    });

//    this.getVideos = this.getVideos.bind(this);
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

    return this.state.videos;
  }

  getPlaylists(){
    // get playlists
    var params = {
      part: 'snippet',
      key: API_KEY,
      channelId: YTchannelID,
      maxResults:50,
      type: 'playlist'
    };

    this.myYTSearch(params, (playlists) => {
      //console.log('response',videos);
      this.setState({ playlists: playlists });
      console.log('playlists count', playlists.length)
      console.log('playlists', playlists)
    });
    //var fruits = ["Banana", "Orange", "Apple", "Mango"];
    //fruits.push("Lemon");

    // get video sets for each playlist
    var playListObjs = [];
    this.state.playlists.forEach(
      (playlist) => {
    console.log('gothere');
        var params = {
          part: 'snippet',
          key: API_KEY,
          playlistID: playlist.id,
          maxResults:50,
          type: 'videos'
        };
        this.myYTSearch(params, (videos) => {
          //console.log('response',videos);
          playListObjs.push(playlist.snippet.title, videos);
          this.setState({ playListObjs });
    console.log('playListObjs len', playListObjs.length);
        });
        console.log('playListObjs',playListObjs);
      }
    );
    return this.state.videos;
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
          <VideoList videos={this.getVideos()} />

          <h3>PlayList</h3>
<VideoPlayList playlists={this.state.playlists} />
          </div>
        );
  }
}

ReactDOM.render(<App />, document.querySelector('.VideoListContainer'));
