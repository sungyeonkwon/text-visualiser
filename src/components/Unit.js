import React, { Component } from 'react';
import Textbox from './Textbox';
import Frame from './Frame/Frame';
import Control from './Control/Control';
import { ALIGN_OPTS, SHAPE_OPTS, TYPE_OPTS } from '../constants/constants';

class Unit extends Component {

  UnitRef = React.createRef();

  state = {
    showControl: false,
    text: '',
    textArr: ['0'],
    edge: 1,
    blockW: 1,
    blockH: 1,
    lineCount: 1,
    maxChar: 1,
    align: 'center',
    shape: 'circle',
    currType: 'whitespace',
    color: {
      whitespace: 'blue',
      lowercase: 'red',
      uppercase: 'purple',
      fullstop: 'yellow',
      comma: 'grey',
      background: 'pink',
    },
  }

  componentDidMount() {
    let edge = Math.floor(this.UnitRef.current.clientWidth / 2)
    this.setState({ edge });
    window.addEventListener("resize", this.onWindowResize);
  }

  onWindowResize = e => {
    if (this.UnitRef.current){
      this.setState({ showControl: false })
      this.setState({ edge: Math.floor(this.UnitRef.current.clientWidth / 2)});
    }
  };

  processText = text => {
    let textArr;
    if (text.match(/\n/) == null){ // first line only
      textArr = [text]
    } else { // multi lines
      textArr = text.split(/\n/).map(line => line.split(' '))
    }
    this.setState({ textArr }, () => {
      this.getLineCount(textArr)
      this.getMaxChar(textArr)
    })
  }

  getLineCount = textArr => {
    this.setState({lineCount: textArr.length }, () => {
      this.setState({ blockH: Math.floor( this.state.edge / this.state.textArr.length)}) // TODO: initial condition
    })
  }

  getMaxChar = textArr => {
    this.setState({ maxChar: Math.max(...textArr.map(line => line.toString().length)) }, () =>{
      this.setState({ blockW: Math.floor( this.state.edge / this.state.maxChar)}) // TODO: initial condition
    })
  }

  callbackOnChange = text => {
    this.setState({ text })
    this.processText(text)
  }

  callbackOnClick = () => {
    this.setState({ showControl: !this.state.showControl })
  }

  callbackOnBtn = name => {
    if (ALIGN_OPTS.includes(name)){
      this.setState({ align: name })
    } else if (SHAPE_OPTS.includes(name)){
      this.setState({ shape: name })
    }
  }

  callbackOnBtnType = type => {
    console.log("Unit type got it", type)
    this.setState({ currType: type})
    // set the color state according to the type
  }

  setColorType = ([color, type]) => {
    let stateColor = { ...this.state.color}
    stateColor[type] = color
    this.setState({ color: stateColor})
  }

  onClickAddUnit = () => {
    this.props.callbackOnAddUnit(this.props.unitKey)
  }

  onClickRemoveUnit = () => {
    this.props.callbackOnRemoveUnit(this.props.unitKey)
  }

  render(){
    console.log("[Unit] state ", this.state)

    return(
      <div className="Unit" ref={this.UnitRef}>
        <Textbox callbackOnClick={this.callbackOnClick} callbackOnChange={this.callbackOnChange}/>
        <Frame 
          textArr={this.state.textArr}
          align={this.state.align}
          shape={this.state.shape}
          color={this.state.color}
          blockW={this.state.blockW}
          blockH={this.state.blockH}
        />
        <button 
          className="add round-btn btn icon" 
          onClick={this.onClickAddUnit}  
        />
        <button 
          className="remove btn icon" 
          onClick={this.onClickRemoveUnit} 
        />
        { this.state.showControl ? 
          <Control 
            currType={this.state.currType}
            callbackOnBtn={this.callbackOnBtn} 
            callbackOnBtnType={this.callbackOnBtnType}
            color={this.state.color}
            callbackOnColorSelect={this.setColorType}
          />
        : null }
      </div>
    )
  }
}

export default Unit