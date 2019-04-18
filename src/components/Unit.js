import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
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
    rotate: 0, // use modular value for 0,1,2,3 
    shape: 'circle',
    currType: 'lowercase',
    color: {
      whitespace: '#fff',
      lowercase: '#fff',
      uppercase: '#fff',
      fullstop: '#fff',
      comma: '#fff',
      background: '#fff',
      // whitespace: '#eaeaea',
      // lowercase: '#cecece',
      // uppercase: '#aaaaaa',
      // fullstop: '#848484',
      // comma: '#636363',
      // background: '#424242',
    },
  }

  componentDidMount() {
    let window_w = this.UnitRef.current.clientWidth
    let edge;
    window_w <= 750 ? edge = window_w : edge = window_w / 2
    this.setState({ edge });
    this.setState({ textArr: this.props.poem.text }, () => {
      this.getLineCount(this.props.poem.text)
      this.getMaxChar(this.props.poem.text)
    })
    window.addEventListener("resize", this.onWindowResize);
  }

  onWindowResize = e => {
    if (this.UnitRef.current){
      let window_w = this.UnitRef.current.clientWidth
      let edge;
      window_w <= 750 ? edge = window_w : edge = window_w / 2
      this.setState({ edge }, () => {
        this.setState({ blockH: this.state.edge / this.state.textArr.length}) // TODO: initial condition
        this.setState({ blockW: this.state.edge / this.state.maxChar }) // TODO: initial condition
      });
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
      this.setState({ blockH: this.state.edge / this.state.textArr.length}) // TODO: initial condition
    })
  }

  getMaxChar = textArr => {
    this.setState({ maxChar: Math.max(...textArr.map(line => line.toString().length)) }, () =>{
      this.setState({ blockW: this.state.edge / this.state.maxChar }) // TODO: initial condition
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
    if (name === 'rotate') {
      this.setState({ rotate: this.state.rotate + 1 })
    } else if (ALIGN_OPTS.includes(name)){
      this.setState({ align: name })
    } else if (SHAPE_OPTS.includes(name)){
      this.setState({ shape: name })
    }
  }

  callbackOnBtnType = type => {
    this.setState({ currType: type})
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
    
    console.log("unit state rotate", this.state.rotate)

    return(
      <div className="Unit" ref={this.UnitRef}>
        <Textbox 
          poem={this.props.poem}
          callbackOnClick={this.callbackOnClick} 
          callbackOnChange={this.callbackOnChange}/>
        <Frame 
          textArr={this.state.textArr}
          align={this.state.align}
          shape={this.state.shape}
          rotate={this.state.rotate}
          color={this.state.color}
          blockW={this.state.blockW}
          blockH={this.state.blockH}
          maxChar={this.state.maxChar}
        />
        <button 
          className="add round-btn btn icon" 
          onClick={this.onClickAddUnit}  
        />
        <div 
          className="remove-container"
          onClick={this.onClickRemoveUnit} 
        >
          <button 
            className="remove btn icon" 
          />
        </div>

        <CSSTransitionGroup
          transitionName="transition-control"
          transitionAppear={true}
          transitionAppearTimeout={1500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
        { this.state.showControl ? 
          <Control 
            currType={this.state.currType}
            callbackOnBtn={this.callbackOnBtn} 
            callbackOnBtnType={this.callbackOnBtnType}
            color={this.state.color}
            callbackOnColorSelect={this.setColorType}
            align={this.state.align}
            shape={this.state.shape}
          />
         :
         <Control 
          color={this.state.color}
          addClassToControl="transition-control-leave"
          currType={this.state.currType}
          callbackOnBtn={this.callbackOnBtn} 
          callbackOnBtnType={this.callbackOnBtnType}
          callbackOnColorSelect={this.setColorType}
          align={this.state.align}
          shape={this.state.shape}
        />
         }
         </CSSTransitionGroup>
      </div>
    )
  }
}

export default Unit