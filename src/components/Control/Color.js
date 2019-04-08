import React, { Component} from 'react'
import { COLOR_OPTS } from '../../constants/constants';

class Color extends Component {

  render(){
    return(
      <div className="Color">
        {COLOR_OPTS.map(color => <div className="color-opt">color</div>)}
      </div>
    )
  }
}

export default Color

