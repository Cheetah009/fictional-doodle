import React, { useState } from 'react';
import '../scripts/calcScript'
import CalculatorRow from './CalculatorRow';

const PLACE_HOLDER = '...';

export default () => {
  const [calcOutput, setCalcOutput] = useState(PLACE_HOLDER);
  
  const showAnswer = () => {
    let bufferString;
    try {
      bufferString = eval(calcOutput);
      setCalcOutput(bufferString);
    } catch (error) {
      alert('Неправильное выражение. Исправьте, пожалуйста!');
    }
  }

  const clickHandler = (calcElem) => {
    if (calcOutput === PLACE_HOLDER) {
      setCalcOutput('');
    }
    setCalcOutput(
      (prevState => prevState + calcElem)
    )
  }

  const deleteOutput = () => {
    if (calcOutput === PLACE_HOLDER || calcOutput === '') {
       return;
     }
    setCalcOutput(
      (prevState) => {
        const newOutput = prevState.toString().slice(0, prevState.toString().length - 1);
        return newOutput === '' ? PLACE_HOLDER : newOutput; 
      } 
    )
  }

  return (
    <div className="container pt-3">
      <div className="row">
        <div className="col"></div>
        <div className="col text-center">
          <h1>Calculator</h1>
          <div className="row fluid">
            <div className="col text-right big-text calcValues pl-3 border">{calcOutput}</div>
            <div className="col-3 text-center pt-1 hoverable border user-select-none" onClick={deleteOutput}>{"←"}</div> 
          </div>
          <CalculatorRow dataRow={["1","2","3","+"]} onClick={clickHandler}/>
          <CalculatorRow dataRow={["4","5","6","-"]} onClick={clickHandler}/>
          <CalculatorRow dataRow={["7","8","9","*"]} onClick={clickHandler}/>
          <CalculatorRow dataRow={[".","0","**","/"]} onClick={clickHandler}/>
          <div className="row">
            <p className="col text-center p-2 border hoverable answerBtn user-select-none" role="button" onClick={showAnswer}>Ответ</p>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  )
}