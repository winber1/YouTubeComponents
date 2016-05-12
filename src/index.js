import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import VideoPlayList from './components/video_playlist.js';
const API_KEY = 'AIzaSyCpFFn5L-9JfU9-hOJpXPzCtWhE9AXhOAw';
const YTchannelID = 'UCghGuUjJUeuGkCYauHHwGCA';  //roseastrology

class App extends Component {
  constructor (props){
    super(props);

    this.state = {  videos: [],
                    playlists:[]
                  };

    // video search by channelID
    YTSearch({key: API_KEY,
              channelId: 'UCghGuUjJUeuGkCYauHHwGCA',
              type: 'video'}, (videos) => {
      // console.log(videos);
      this.setState({ videos });  // same as { videos: videos }
    });

    // playList search
    YTSearch({key: API_KEY,
              channelId: 'UCghGuUjJUeuGkCYauHHwGCA',
              type:'playlist'}, (playlists) => {
      console.log("after playlist call");
      console.log(playlists);
      this.setState({ playlists });  
    });
  }

  render() {
    return (
          <div>
          <h3>PlayList</h3>
          <VideoPlayList playlists={this.state.playlists} />

          <h3>VideoList</h3>
          <VideoList videos={this.state.videos} />
          </div>
        );
  }
}

ReactDOM.render(<App />, document.querySelector('.VideoListContainer'));
