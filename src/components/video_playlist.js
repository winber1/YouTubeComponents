import React from 'react';
//import VideoListItem from './video_list_item';

const VideoPlayList = (props) => {
  console.log('in videoPlayList');
  const playlistItems = props.playlists.map((playlist) => {
    //return <VideoListItem key={video.etag} video={video} />

    const title = playlist.snippet.title;
    const imgURL = playlist.snippet.thumbnails.default.url;
    return (
        <div><h3>{title}</h3>
            <img className='media-object' src={imgURL} /></div>
      )

  });

  return(
    <ul className='col-md-4 list-group'>
      <div>{playlistItems}</div>
    </ul>
  );
};


export default VideoPlayList;
