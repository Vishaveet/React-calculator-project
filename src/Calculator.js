import { useState } from "react";
import "./calculator.css";
import KeyPad from "./Keypad";

  
const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109,
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/"];

function Calculator() {

  const [expression,setExpression]=useState("");
  const [result,setResult]=useState("");
  const [history, setHistory] = useState([]);
  const handleKeyPress=(keyCode,key)=>{
    console.log('hi');
    if(!keyCode) return;
    if(!usedKeyCodes.includes(keyCode)) return;

    if(numbers.includes(key)){
      if(key==="0"){
        if(expression.length===0) return;
      }
      calculateResult(expression+key);

      setExpression(expression+key)
      console.log('number');
    }
    else if(operators.includes(key)){
      if(!expression) return;
      const lastChar =expression.slice(-1);
      if(operators.includes(lastChar)) return;
      if(lastChar==='.') return;
      setExpression(expression +key);

      console.log('operator');
    }
    else if(key==='.'){
      if(!expression) return;
      const lastChar=expression.slice(-1);
      if(!numbers.includes(lastChar)) return;

      setExpression(expression +key);
    }
    else if(keyCode===13){
      calculateResult(expression);
      let tempHistory=[...history];
      if(tempHistory.length>20) tempHistory=tempHistory.slice(0,1);

      tempHistory.push(expression);
      setHistory(tempHistory)
      console.log('enter');
    }
    else if(keyCode===8){
      if(!expression) return;
      calculateResult(expression.slice(0,-1));
      setExpression(expression.slice(0,-1));
      console.log('backspance');
    }
  }

  const calculateResult=(exp)=> {
    if(!exp) return;
     const lastChar=exp.slice(-1);
     if(!numbers.includes(lastChar)) exp= exp.slice(0,-1);

     const answer=eval(exp).toFixed(2)+"";
     setResult(answer);
  }

  return (
    <div className="container">
      <div className="calculator" 
      tabIndex="0"
      onKeyDown={(event)=>handleKeyPress(event.keyCode,event.key)}
      >
        <div className="display">
          <div className="navbar">
            <div className="nav-left">
              <span>9:15</span>
            </div>
            <div className="nav-center">
              <img
                alt="img"
                src="https://cdn-icons-png.flaticon.com/128/5708/5708327.png"
              />
            </div>
            <div className="nav-right">
              <img
                alt="network"
                src="https://cdn-icons-png.flaticon.com/128/4630/4630358.png"
              />
              <img
                alt="wifi"
                src="https://cdn-icons-png.flaticon.com/128/93/93158.png"
              />
              <img
                alt="battery"
                src="https://cdn-icons-png.flaticon.com/128/664/664886.png"
              />
            </div>
          </div>
          <div className="header">
            <div className="header_history">
              <p>
                {
                  history &&
                  history.map((item,index)=><span key={item+""+Math.random()*44}>{item}</span>)
                }
              </p>
              
            </div>
            <div className="header_expression">
              <span>{expression}</span>
            </div>
            <div className="header_result"><span>{result}</span></div>
          </div>
        </div>
          <KeyPad handleKeyPress={handleKeyPress} />
      </div>
    </div>
  );
}
export default Calculator;
