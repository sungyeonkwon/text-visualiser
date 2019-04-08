import React, { Component } from 'react';
import ColorSelector from './ColorSelector';
import { ALIGN_OPTS, SHAPE_OPTS, TYPE_OPTS } from '../../constants/constants';

class Control extends Component {

  createBtn = (cls, name=null) => {
    let selected = this.props.currType === cls ? 'selected' : null;
    return(
      <button 
        key={cls}
        onClick={() => this.onBtnClick(cls)}
        className={`btn icon ${cls} ${selected}`}>{name}</button>
    )
  }

  onBtnClick = name => {
    if ([...ALIGN_OPTS, ...SHAPE_OPTS].includes(name)){
      this.props.callbackOnBtn(name)
    } else {
      this.props.callbackOnBtnType(name)
    }
  }

  passSelectedColor = ([color, type]) => {
    this.props.callbackOnColorSelect([color, type])
  }

  render() {
    console.log('@@@@@', this.props.currType)

    return(
      <div className="Control">
        <div className="ctrl-wrapper--align">
          {ALIGN_OPTS.map(opt => this.createBtn(opt))}
        </div>
        <div className="ctrl-wrapper--shape">
          {SHAPE_OPTS.map(opt => this.createBtn(opt))}
        </div>
        <div className="ctrl-wrapper--color">
          <div className="ctrl-types">
            {TYPE_OPTS.map(opt => this.createBtn(opt, opt))}
          </div>
          <div className="ctrl-colors">
            {TYPE_OPTS.map(opt => { 
              console.log(">>>>opt", opt)
              console.log(">>>>his.state.currType", this.props.currType)
              return(
              opt === this.props.currType ?
                <ColorSelector 
                  key={opt}
                  type={opt}
                  callbackOnColorSelect={this.passSelectedColor}
                  color={this.props.color}/> : null
              )
            })}
          </div>        
        </div>

      </div>
    )
  }
}

export default Control