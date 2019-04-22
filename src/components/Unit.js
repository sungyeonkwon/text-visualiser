import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Textbox from './Textbox';
import Frame from './Frame/Frame';
import Control from './Control/Control';
import { ALIGN_OPTS, SHAPE_OPTS, SCROLLBAR_W, COLOR_OPTS } from '../constants/constants';

const selectRandom = arr => arr[ Math.floor( Math.random() * arr.length ) ];

class Unit extends Component {

  UnitRef = React.createRef();
  state = {
    unitKey: this.props.unitKey,
    showControl: false,
    text: '',
    textArr: ['0'],
    isMobile: false,
    edge: 1,
    blockW: 1,
    blockH: 1,
    lineCount: 1,
    maxChar: 1,
    align: selectRandom(ALIGN_OPTS),
    rotate: 0,
    shape: selectRandom(SHAPE_OPTS),
    currType: 'background',
    color: {
      background: selectRandom(COLOR_OPTS),
      lowercase: selectRandom(COLOR_OPTS),
      uppercase: selectRandom(COLOR_OPTS),
      fullstop: selectRandom(COLOR_OPTS),
      comma: selectRandom(COLOR_OPTS),
      whitespace: selectRandom(COLOR_OPTS),
    },
  }

  componentDidMount() {
    let window_w = this.UnitRef.current.clientWidth
    let edge;
    let isMobile = false;
    if (window_w <= 750 - SCROLLBAR_W) {
      edge = window_w
      isMobile = true;
    } else {
      edge = window_w / 2
    }
    this.setState({ edge: edge, textArr: this.props.poem.text, isMobile: isMobile }, () => {
      this.getLineCount(this.props.poem.text)
      this.getMaxChar(this.props.poem.text)
    })
    window.addEventListener("resize", this.onWindowResize);
  }

  onWindowResize = e => {
    if (this.UnitRef.current){
      let window_w = this.UnitRef.current.clientWidth
      let edge;
      window_w <= 750 - SCROLLBAR_W ? edge = window_w : edge = window_w / 2
      this.setState({ edge }, () => {
        this.setState({ 
          blockH: this.state.edge / this.state.textArr.length,
          blockW: this.state.edge / this.state.maxChar
        })
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
      this.setState({ blockH: this.state.edge / this.state.textArr.length })
    })
  }

  getMaxChar = textArr => {
    this.setState({ maxChar: Math.max(...textArr.map(line => line.toString().length)) }, () =>{
      this.setState({ blockW: this.state.edge / this.state.maxChar })
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
    const transitionClass = !this.state.showControl ? "transition-control-leave" : ""
    return(
      <div className={`Unit ${this.props.unitKey}`} ref={this.UnitRef} >
        <Textbox 
          poem={this.props.poem}
          showControl={this.state.showControl}
          callbackOnClick={this.callbackOnClick} 
          callbackOnChange={this.callbackOnChange}/>
        <Frame 
          edge={this.state.edge}
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
         <Control 
          color={this.state.color}
          addClassToControl={transitionClass}
          currType={this.state.currType}
          callbackOnBtn={this.callbackOnBtn} 
          callbackOnBtnType={this.callbackOnBtnType}
          callbackOnColorSelect={this.setColorType}
          align={this.state.align}
          shape={this.state.shape}
        />
        </CSSTransitionGroup>
      </div>
    )
  }
}

export default Unit