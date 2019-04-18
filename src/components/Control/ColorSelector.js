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

  // we have type and color
  // type comes from prop (current selected type)
  // color comes from prop (current selected color for type)
  // if curr selected color is the same as.. 
  render(){
    console.log("this.props.type", this.props.type)
    console.log("this.props.colors", this.props.color[this.props.type])
    let selectedColor = this.props.color[this.props.type]
    return(
      <div className="ColorSelector">
        {COLOR_OPTS.map((color, i) => 
          <Color 
            callbackOnColorSelect = {this.passSelectedColor}
            color={color}
            selectedColor={selectedColor}
            key={i}
          />
        )}
      </div>
    )
  }
}

export default ColorSelector

