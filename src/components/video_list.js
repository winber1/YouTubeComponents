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

  getVideos(){  // this works using state from index.js
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
