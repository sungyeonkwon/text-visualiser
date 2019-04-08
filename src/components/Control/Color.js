import React, { Component} from 'react'

class Color extends Component {

  state = {
    selectColor: null,
  }

  selectColor = color => {
    // console.log("this color fn", color)
    // this.props.callbackOnColorSelect(color)
  }

  render(){
    // console.log("this.props.color", this.props.color)
    return(
      <div
        onClick={(e) => this.selectColor(this.props.color)} 
        className="Color" >
        iam color
      </div>
    )
  }
}

export default Color

