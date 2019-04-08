import React, { Component } from 'react';
import Textbox from './Textbox';
import Frame from './Frame/Frame';
import Control from './Control/Control';

class Unit extends Component {

  UnitRef = React.createRef();

  state = {
    showControl: false,
    text: '',
    edge: 1,
  }

  componentDidMount() {
    const containerMargin = 0;
    this.setState({ edge: Math.floor(this.UnitRef.current.clientWidth / 2) - containerMargin });
    window.addEventListener("resize", this.onWindowResize);
  }

  onWindowResize = e => {
    const containerMargin = 0;
    if (this.UnitRef.current){
      this.setState({ edge: Math.floor(this.UnitRef.current.clientWidth / 2) - containerMargin});
    }
  };

  callbackOnChange = text => {
    this.setState({ text: text })
  }

  callbackOnClick = () => {
    this.setState({ showControl: !this.state.showControl })
  }

  onClickAddUnit = () => {
    this.props.callbackOnAddUnit(this.props.unitKey)
  }

  onClickRemoveUnit = () => {
    this.props.callbackOnRemoveUnit(this.props.unitKey)
  }

  render(){
    return(
      <div className="Unit" ref={this.UnitRef}>
        <Textbox callbackOnClick={this.callbackOnClick} callbackOnChange={this.callbackOnChange}/>
        <Frame edge={this.state.edge} text={this.state.text}/>
        <button 
          className="add round-btn btn icon" 
          onClick={this.onClickAddUnit}  
        />
        <button 
          className="remove btn icon" 
          onClick={this.onClickRemoveUnit} 
        />
        { this.state.showControl? <Control /> : null }
      </div>
    )
  }
}

export default Unit