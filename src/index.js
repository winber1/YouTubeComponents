import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar'

const API_KEY = 'AIzaSyCpFFn5L-9JfU9-hOJpXPzCtWhE9AXhOAw';


// create a new componenet.  This component should produce HTML
//  functional component; no state
const App = () => {
  return (
          <div>
              <SearchBar />
          </div>
        );
}

// take this component's generated HTML and put it on the page
// - in the DOM
ReactDOM.render(<App />, document.querySelector('.container'));
