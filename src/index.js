import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'
const API_KEY = 'AIzaSyCpFFn5L-9JfU9-hOJpXPzCtWhE9AXhOAw';

class App extends Component {
  constructor (props){
    super(props);

    this.state = { videos: [] };

    YTSearch({key: API_KEY, term: 'roseastrology'}, (videos) => {
      console.log(videos);
      this.setState({ videos });  // same as { videos: videos }
    });
  }

  render() {
    return (
          <div>
              <YTPlayList playlist={this.state.playlist} >
              <VideoList videos={this.state.videos} />
          </div>
        );
  }
}

ReactDOM.render(<App />, document.querySelector('.VideoListContainer'));
