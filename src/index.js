import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Unit from './components/Unit';
import './_scss/styles.scss';

class App extends Component {

  state = {
    unitSequence: [0, 1],
  }

  // TODO: use library
  generateKey = () => {
    let key;
    do { key = parseInt(Math.random() * 1000);
    } while (this.state.unitSequence.includes(key));
    return key;
  };

  callbackOnAddUnit = (unitKey) =>{
    let unitSequence = this.state.unitSequence.slice();
    let i = unitSequence.indexOf(unitKey);
    this.setState({
      unitSequence: [
        ...unitSequence.slice(0, i + 1),
        this.generateKey(),
        ...unitSequence.slice(i + 1, unitSequence.length)
      ]
    });
  }

  callbackOnRemoveUnit = (unitKey) => {
    if (this.state.unitSequence.length !== 1) {
      const newUnitSequence = this.state.unitSequence.filter(v => v !== unitKey);
      this.setState({ unitSequence: newUnitSequence });
    }
  }

  render(){
    const units = this.state.unitSequence.map(unit => {
      return(
        <Unit
          key={unit}
          unitKey={unit}
          callbackOnAddUnit={this.callbackOnAddUnit}
          callbackOnRemoveUnit={this.callbackOnRemoveUnit}
        />
      )
    })
    return <>{units}</>
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
