import React from 'react';
import Block from './Block';

const charToType = (char) => {
  if (char === '.') { return 'fullstop'}
  else if (char === ',') { return 'comma'}
  else if (char === ' ') { return 'whitespace'}
  else if (char === char.toLowerCase()) { return 'lowercase'}
  else if (char === char.toUpperCase()) { return 'uppercase'}
}

const setRotation = (n) => {
  let result;
  switch (n % 4) {
    case 0:
      result = "0deg"
      break;
    case 1:
      result = "90deg"
      break;
    case 2:
      result = "180deg"
      break;
    case 3:
      result = "270deg"
      break;
  }
  // TODO
}

const Frame = (props) => {

  const allBlocks = () => {
    const blocks = props.textArr.map(line => {
      if (line == ''){
        return(
          <div
          style={{ height: props.blockH }} 
            className={`line-container`}>
            <div className={`line ${props.align} ${props.shape}`}>
              <Block
                color={props.color}
                blockH={props.blockH}
                blockW={props.blockW}
                type="return"
              />
            </div>
          </div>
        )
      }
      const lineStr = typeof line === 'string'? line : line.join(' ')
      return (
        <div 
          style={{ height: props.blockH }}
          className={`line-container`}>
          <div className={`line ${props.align} ${props.shape}`}>
            {lineStr.split('').map((char, i) => {
            return (<Block
              key={i}
              color={props.color}
              blockH={props.blockH}
              blockW={props.blockW}
              type={charToType(char)}
            />)
          })}
        </div>
      </div>
      )
    })

    return <>{blocks}</>
  }

  return(
    <div 
      className="container-sqr frame"
      style={{ backgroundColor: props.color.background}}
    >
      { allBlocks() }
    </div>
  )
}

export default Frame