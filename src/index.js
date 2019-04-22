import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import Unit from './components/Unit';
import { POEMS } from './constants/constants';
import './_scss/main.scss';

class App extends Component {

  state = {
    unitSequence: ['u0'],
    recentlyAddedUnitKey: 'u0',
  }
  
  componentDidUpdate() {
    this.scrollToBottom(this.state.recentlyAddedUnitKey)
  }

  scrollToBottom = (unitKey) => {
    document.querySelector('.' + unitKey).scrollIntoView({ behavior: 'smooth' })
  }

  generateKey = () => 'unit' + Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);

  callbackOnAddUnit = (unitKey) =>{
    let unitSequence = this.state.unitSequence.slice();
    let i = unitSequence.indexOf(unitKey);
    let newUnitKey = this.generateKey()
    this.setState({
      recentlyAddedUnitKey: newUnitKey,
      unitSequence: [
        ...unitSequence.slice(0, i + 1),
        newUnitKey,
        ...unitSequence.slice(i + 1, unitSequence.length)
      ]
    }, () => {
      this.scrollToBottom(this.state.recentlyAddedUnitKey)
    });
  }

  callbackOnRemoveUnit = (unitKey) => {
    if (this.state.unitSequence.length !== 1) {
      const newUnitSequence = this.state.unitSequence.filter(v => v !== unitKey);
      this.setState({ unitSequence: newUnitSequence });
    }
  }

  render(){
    const units = this.state.unitSequence.map((unit, i) => {

      return(
          <Unit
            poem={POEMS[i % POEMS.length]}
            key={unit}
            unitKey={unit}
            callbackOnAddUnit={this.callbackOnAddUnit}
            callbackOnRemoveUnit={this.callbackOnRemoveUnit}
          />
      )
    })
    return (
      <div className="unit-container">
        <CSSTransitionGroup
          transitionName="transition-unit"
          transitionAppear={true}
          transitionAppearTimeout={300}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {units}
        </CSSTransitionGroup>
      </div>
    )   
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
