import React, {useEffect, useState} from 'react'
import './App.scss';

function App() {
  // state for the checked inputs
  const [inputDisplay, setInputDisplay] = useState([])

  // make the list of inputs
  const [inputs, setInputs] = useState([false, false, false, false, false])

  // select all or deselect all
  const [buttonText, setButtonText] = useState('Select All')

  // make the inputs
  useEffect( () => {

    // make the inputs
    setInputDisplay(inputs.map( (input, inputId) => {
      return <input type="checkbox" defaultChecked="false" name={inputId} checked={input}/>
    }))

    // handle changing the text -> check if it is either all true or all false
    let trueArray = Array.from(new Set(inputs))

    // if either complete case
    if (trueArray.length === 1) {
      // check which case and update text
      trueArray[0] ? setButtonText('Deselect All') : setButtonText('Select All')
    }

  }, [inputs])

  // handle the input changing
  const handleChange = (e) => {

    // make the array
    let localInputs = [...inputs]

    // change the inputs
    localInputs[e.target.name] ? localInputs[e.target.name] = false : localInputs[e.target.name] = true

    // change the state for the input
    setInputs(localInputs)
  }

  // handle selecting all
  const handleClick = () => {

    // handle changing the array
    buttonText === 'Select All' ? setInputs([true, true, true, true, true]) : setInputs([false, false, false, false, false])
  
  }

  return (
    <div className="App">
      <h1> Select All Challenge</h1>

      <div className="container">
        <h2>Select items</h2>
        <div className='inputContainer' onChange={handleChange}>
          {inputDisplay}
        </div>
        <button id="button" onClick={handleClick}>{buttonText}</button>
      </div>
    </div>
  );
}

export default App;
