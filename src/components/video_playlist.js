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

  getVideos(vids){
    const videoItems = (vids).map((video) => {
      return <VideoListItem key={video.etag} video={video} />
    });
    return videoItems;
  }

  render(){
    return(
      <div>
      <ul className='col-md-4 list-group'>
      {(this.props.playlists).map((pl) => {

        return <div><h3>{pl.title}</h3>{this.getVideos(pl.videos)}</div>
      })}
        </ul></div>
      );
    }
};

export default VideoPlayList;
