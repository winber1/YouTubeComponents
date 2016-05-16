import React from 'react';
import VideoListItem from './video_list_item';

import axios from 'axios';
var ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = 'AIzaSyCpFFn5L-9JfU9-hOJpXPzCtWhE9AXhOAw';
const YTchannelID = 'UCghGuUjJUeuGkCYauHHwGCA';  //roseastrology

class VideoList extends React.Component {
  constructor(props) {
    super(props);
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


  getVideos(){
    var vids = [];
    var videoItems2 = {};

    var params = {
      part: 'snippet',
      key: API_KEY,
      channelId: YTchannelID,
      maxResults:50,
      type: 'video'
    };

    videoItems2 = this.myYTSearch(params, (response) => {
      console.log('response',response);
      videoItems2 = (this.props.videos).map((video) => {
        return <VideoListItem key={video.etag} video={video} />
      });
      //this.setState({ videos });  // same as { videos: videos }
    });


    const videoItems = (this.props.videos).map((video) => {
      return <VideoListItem key={video.etag} video={video} />
    });
    console.log('typeof videoItems',typeof (videoItems));

console.log('videoItems',videoItems);
console.log('videoItems2',videoItems2);

    return videoItems;
  }

  getVideos2(){  // this works using state from index.js
    const videos = this.props.videos;
    const videoItems = (this.props.videos).map((video) => {
      return <VideoListItem key={video.etag} video={video} />
    });
    return videoItems;
  }

  render(){
    return(
      <ul className='col-md-4 list-group'>
        {this.getVideos()}
        </ul>
      );
    }
};

export default VideoList;
