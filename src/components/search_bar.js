import React, { Component } from 'react';

/* functional component */
/*
const SearchBar = () => {
  return <input />
};
*/

/* refactor as...
   class component  */
/*
class SearchBar extends Component {
  render() {
    return <input onChange={this.onInputChange} />;
  }

  onInputChange(event) {
    console.log(event.target.value);
  }
}
*/
class SearchBar extends Component {
  // section 1 lesson 17
  constructor(props){
    super(props);

    // put search term to state
    this.state = { term: '' };
  }

  render() {
    return (
      <div>
        <input
          value={this.state.term}
          //onChange={event => this.setState({ term: event.target.value })}
          />

      </div>
    );
  }
}

export default SearchBar;
