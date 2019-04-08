import React, { Component} from 'react'
import Color from './Color';
import { COLOR_OPTS } from '../../constants/constants';

class ColorSelector extends Component {

  state = {
    selectColor: null,
  }

  passSelectedColor = (color) => {
    this.setState({ selectColor: color })
    this.props.callbackOnColorSelect([color, this.props.type])
  }

  render(){
    return(
      <div className="ColorSelector">
        {COLOR_OPTS.map((color, i) => 
          <Color 
            callbackOnColorSelect = {this.passSelectedColor}
            color={color}
            key={i}
          />
        )}
      </div>
    )
  }
}

export default ColorSelector

