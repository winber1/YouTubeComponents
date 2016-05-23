import React from 'react';
import VideoListItem from './video_list_item';

import axios from 'axios';
var ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = 'AIzaSyCpFFn5L-9JfU9-hOJpXPzCtWhE9AXhOAw';
const YTchannelID = 'UCghGuUjJUeuGkCYauHHwGCA';  //roseastrology

class VideoPlayList extends React.Component {
  constructor(props) {
    super(props);
  }


  getPlayLists(pls){  // this works using state from index.js
      //console.log('***playlists count', pls.length)
     // console.log('***playlists', pls)
          //console.log('myPL',myPL.length);
    const videoItems = pls.map((pl) => {
      //var videos = this.getVideos(pl.id.playlistId);
        var playlistId = pl.id.playlistId;

       // console.log('playlistId',playlistId);

        //console.log(pl.snippet.title);
      return <div><h5>{playlistId}:{pl.snippet.title}:{pl.etag} </h5></div>
    });
    return videoItems;
  }


  getVideos(playListID){
console.log('playListID',playListID);
    var params = {
      part: 'snippet',
      key: API_KEY,
      playlistID: playListID,
      maxResults:50,
      type: 'video'
    };

    this.myYTSearch(params, (videos) => {
      //console.log('response',videos);
      //this.setState({ videos: videos });
        return videos;
    });

    //return this.state.videos;
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

  render(){
    return(
      <div> {this.getPlayLists(this.props.playlists)}
      <ul className='col-md-4 list-group'>

        </ul></div>
      );
    }
};


export default VideoPlayList;
