import React from 'react';

export default (props) => {
  return (
    <div className="row">
      {
        props.dataRow.map((element, i) => {
          return <div key={i} className="col p-1 border hoverable user-select-none" onClick={() => props.onClick(element)}>{element}</div>
        })
      }
    </div>
  )
}

{/* <div className="col p-1 border hoverable">1</div>
<div className="col p-1 border hoverable">2</div>
<div className="col p-1 border hoverable">3</div>
<div className="col p-1 border hoverable">+</div> */}