import React, { Component} from 'react'
import Color from './Color';
import { COLOR_OPTS } from '../../constants/constants';

class ColorSelector extends Component {

  state = {
    selectColor: null,
  }

  render(){
    return(
      <div className="ColorSelector">
        {COLOR_OPTS.map((color, i) => 
          <Color 
            color={this.props.color}
            key={i}
            style={{ backgroundColor: color}} 
          />
        )}
      </div>
    )
  }
}

export default ColorSelector

