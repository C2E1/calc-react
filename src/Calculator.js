import {useState} from "react";
import * as calcButton from "./AppConstants";
import ThemeContext from "./ThemeContext";

let leftArg = 0;

const Calculator = () => {
    const [arithmeticOutput, setArithmeticOutput] = useState(calcButton.ZERO_BUTTON);
    const [numberAppend, setNumberAppend] = useState(false);
    const [calcStarted, setCalcStarted] = useState(false);
    const [currentOperation, setCurrentOperation] = useState(calcButton.NO_OP);
    const [prevOperation, setPrevOperation] = useState(calcButton.NO_OP);
    const [operatorLastClicked, setOperatorLastClicked] = useState(false);
    const [numLastClicked, setNumLastClicked] = useState(false);


    const standardNumClick = (numClicked) => {
        if (numberAppend === false) {
            setArithmeticOutput(numClicked);
            setNumberAppend(true);
        }
        else {
            setArithmeticOutput(arithmeticOutput + numClicked);
        }
        setOperatorLastClicked(false);
        setNumLastClicked(true);
    }

    const operationClick = (operation) => {
        setNumberAppend(false);
        setCurrentOperation(operation);
        if(calcStarted === false){
            leftArg = parseInt(arithmeticOutput);
            setCalcStarted(true);
            setPrevOperation(operation);
        }
        else{
            if(operatorLastClicked){
                setCurrentOperation(operation);
            }
            else{
                leftArg = compute(leftArg, parseInt(arithmeticOutput), prevOperation);
                setPrevOperation(currentOperation);
            }
        }
        setArithmeticOutput(calcButton.ZERO_BUTTON);
        setOperatorLastClicked(true);
    }

    const clear = () => {
        setArithmeticOutput(calcButton.ZERO_BUTTON);
        setNumberAppend(false);
        setCalcStarted(false);
        setCurrentOperation(calcButton.NO_OP);
        leftArg = 0;
        setOperatorLastClicked(false);
        setNumLastClicked(false);
    }

    const compute = (la, ra, op) => {
        let output = 0;
        switch(op){
            case calcButton.DIVISION_BUTTON:
                output = Math.floor(la / ra);
                break;
            case calcButton.MULTIPLICATION_BUTTON:
                output = Math.floor(la * ra);
                break;
            case calcButton.SUBTRACTION_BUTTON:
                output = Math.floor(la - ra);
                break;
            case calcButton.ADDITION_BUTTON:
                output = Math.floor(la + ra);
                break;
        }
        return output;
    }
    
    

    const handleCalculatorButtonClick = (event) => {
        if(event.target.tagName === 'BUTTON'){
            const clickedButton = event.target.innerText;
            switch(clickedButton){
                case calcButton.ONE_BUTTON:
                case calcButton.TWO_BUTTON:
                case calcButton.THREE_BUTTON:
                case calcButton.FOUR_BUTTON:
                case calcButton.FIVE_BUTTON:
                case calcButton.SIX_BUTTON:
                case calcButton.SEVEN_BUTTON:
                case calcButton.EIGHT_BUTTON:
                case calcButton.NINE_BUTTON:
                    standardNumClick(clickedButton);
                    break;
                case calcButton.ZERO_BUTTON:
                    if(numberAppend === false){
                        setArithmeticOutput(calcButton.ZERO_BUTTON);
                    }
                    else{
                        setArithmeticOutput(arithmeticOutput + calcButton.ZERO_BUTTON);
                    }
                    break;
                case calcButton.CLEAR_BUTTON:
                    clear();
                    break;
                case calcButton.DELETE_BUTTON:
                    if(arithmeticOutput.length <= 1){
                        setArithmeticOutput(calcButton.ZERO_BUTTON);
                        setNumberAppend(false);
                    }
                    else{
                        setArithmeticOutput(arithmeticOutput.substring(0, arithmeticOutput.length - 1));
                    }
                    break;
                case calcButton.DIVISION_BUTTON:
                    operationClick(calcButton.DIVISION_BUTTON);
                    break;
                case calcButton.MULTIPLICATION_BUTTON:
                    operationClick(calcButton.MULTIPLICATION_BUTTON);
                    break;                
                case calcButton.SUBTRACTION_BUTTON:
                    operationClick(calcButton.SUBTRACTION_BUTTON);
                    break;                
                case calcButton.ADDITION_BUTTON:
                    operationClick(calcButton.ADDITION_BUTTON);
                    break;                
                case calcButton.COMPUTE_BUTTON:
                    if(calcStarted){
                        leftArg = compute(leftArg, parseInt(arithmeticOutput), currentOperation);
                        setArithmeticOutput(`${leftArg}`);
                        setCalcStarted(false);
                        setCurrentOperation(calcButton.NO_OP);
                        setOperatorLastClicked(false);
                        setPrevOperation(currentOperation);
                        setNumberAppend(false);
                    }
                break;
            }
        }
    };
    
   

    return (
        <ThemeContext.Consumer>
            {([theme]) => (
                <div className={`calculator calculator-${theme}`} onClick={handleCalculatorButtonClick}>
                    <div className="arithmetic-output-window">
                        <p className={`arithmetic-output arithmetic-output-${theme}`}>{arithmeticOutput}</p>
                    </div>
                    <div className="row">
                        <button className={`calculator-standard-button calculator-standard-button-${theme} calculator-clear-button calculator-clear-button-${theme} button-symbol`}>C</button>
                        <button className={`calculator-standard-button calculator-standard-button-${theme} button-symbol`}>&#8592;</button>
                        <button className={`calculator-standard-button calculator-standard-button-${theme} button-symbol end-column-button-${theme}`}>&#247;</button>
                    </div>
                    <div className="row">
                        <button className={`calculator-standard-button calculator-standard-button-${theme} button-symbol`}>7</button>
                        <button className={`calculator-standard-button calculator-standard-button-${theme} button-symbol`}>8</button>
                        <button className={`calculator-standard-button calculator-standard-button-${theme} button-symbol`}>9</button>
                        <button className={`calculator-standard-button calculator-standard-button-${theme} button-symbol end-column-button-${theme}`}>&#215;</button>
                    </div>
                    <div className="row">
                        <button className={`calculator-standard-button calculator-standard-button-${theme} button-symbol`}>4</button>
                        <button className={`calculator-standard-button calculator-standard-button-${theme} button-symbol`}>5</button>
                        <button className={`calculator-standard-button calculator-standard-button-${theme} button-symbol`}>6</button>
                        <button className={`calculator-standard-button calculator-standard-button-${theme} button-symbol end-column-button-${theme}`}>&#8722;</button>
                    </div>
                    <div className="row">
                        <button className={`calculator-standard-button calculator-standard-button-${theme} button-symbol`}>1</button>
                        <button className={`calculator-standard-button calculator-standard-button-${theme} button-symbol`}>2</button>
                        <button className={`calculator-standard-button calculator-standard-button-${theme} button-symbol`}>3</button>
                        <button className={`calculator-standard-button calculator-standard-button-${theme} button-symbol end-column-button-${theme}`}>+</button>
                    </div>
                    <div className="row">
                        <button className={`calculator-standard-button calculator-standard-button-${theme} calculator-zero-button calculator-zero-button-${theme} button-symbol`}>0</button>
                        <button className={`calculator-standard-button calculator-standard-button-${theme} button-symbol end-column-button-${theme}`}>=</button>
                    </div>
                </div>
            )}
        </ThemeContext.Consumer>
    )
}

export default Calculator;