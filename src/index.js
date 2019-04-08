import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Unit from './components/Unit';
import './_scss/styles.scss';

class App extends Component {
  render(){
    return(
      <Unit></Unit>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'))
