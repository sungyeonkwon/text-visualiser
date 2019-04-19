import React from 'react';
import Block from './Block';

const charToType = (char) => {
  if (char === '.') { return 'fullstop'}
  else if (char === ',') { return 'comma'}
  else if (char === ' ') { return 'whitespace'}
  else if (char === char.toLowerCase()) { return 'lowercase'}
  else if (char === char.toUpperCase()) { return 'uppercase'}
}

const setRotation = n => "rotate(" + n*90 + "deg"

// get maxchar and linestr.length
// get spaceCount
// if left: do nothing
// if center: "translate" x with value/2
// if right: translate x with value
const setAlignment = (blockW, maxChar, leng, align) => {
  const spaceCount = maxChar - leng
  let toMove;
  switch (align){
    case "left":
      toMove = 0
      break;
    case "center":
      toMove = blockW * spaceCount / 2
      break;
    case "right":
      toMove = blockW * spaceCount
      break;
  }
  return "translateX(" +  toMove + "px)"
}


const Frame = (props) => {

  console.log("maxChar", props.maxChar)

  const allBlocks = () => {
    const blocks = props.textArr.map(line => {
      if (line == ''){
        return(
          <div
            style={{ height: props.blockH }} 
            className={`line-container`}>
            <div 
              style={{ transform: setAlignment(props.blockW, props.maxChar, 1, props.align) }}
              className={`line ${props.align} ${props.shape}`}
            >
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
      console.log("lineStr", lineStr.length)
      return (
        <div 
        style={{ height: props.blockH }} 
        className={`line-container`}>
          <div 
            style={{ transform: setAlignment(props.blockW, props.maxChar, lineStr.length, props.align) }}
            className={`line ${props.align} ${props.shape}`}
          >
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
      style={{ 
        backgroundColor: props.color.background,
       }}
    > 
      <div 
        className="inner-container"
        style={{ transform: setRotation(props.rotate) }}
      >
      { allBlocks() }
      </div>
    </div>
  )
}

export default Frame