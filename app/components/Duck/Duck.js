import React from 'react'

const Duck = (props) => {
  console.log(props)
  return (
    <div>
      {props.duckId}
    </div>
  )
}

export default Duck
