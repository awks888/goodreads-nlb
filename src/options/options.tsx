import React, { useState, useEffect, } from 'react'
import ReactDOM from 'react-dom'
import './options.css'
import '../popup/popup.css'
import { tabType, getLibrariesStorage, setLibrariesStorage } from '../utils/storage'
import { defaultLibraries, libraryCodeNameMap, Libraries } from '../utils/libraries'
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';

type FormState = "ready" | "saving"

const App: React.FC<{}> = () => {
  const [formState, setFormState] = useState<FormState>("ready")
  const [savedLibraries, setSavedLibraries] = useState<Libraries>([])
  const [checkedState, setCheckedState] = useState<boolean[]>([]);

  //**** calling for saved libraries and filling up the checkboxes ****
  let startState = new Array(defaultLibraries.length).fill(false) //create blank slate for checkboxes state

  useEffect(() => {
    getLibrariesStorage().then((libraries) => { //call for saved libraries
      for (let i = 0; i < libraries.length; i++) {
        if (libraries[i].saved) {  //apply saved libraries to checkbox state
          startState[i] = true
        }
      }
      setSavedLibraries(libraries)
      setCheckedState(startState)
    })
  }, [])

  //**** functions for button clicks****
  const handleCheckBoxChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  }

  const handleSaveButtonClick = () => {
    setFormState("saving")

    let updatedSavedLibraries = savedLibraries
    for (let i = 0; i < updatedSavedLibraries.length; i++) {
      if (checkedState[i]) {
        updatedSavedLibraries[i].saved = true
      } else {
        updatedSavedLibraries[i].saved = false
      }
      setSavedLibraries(updatedSavedLibraries)
    }

    setLibrariesStorage(savedLibraries).then(() => {
      setTimeout(() => {
        setFormState("ready")
      }, 1000)
    })
  }

  return (
    <div>
      <div>
        <h1 className="optionsTitle">Options</h1>
        <div className="optionsSection">
          <p>Select your favourite libraries to visit:</p>
          <div className="toppings-list">
            {/* <ul className="toppings-list"> */}
            {savedLibraries.map((item, index) => {
              return (
                // <li key={index}>
                <div className="toppings-list-item">
                  <div className="left-section">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={item.code}
                      checked={checkedState[index]}
                      onChange={() => handleCheckBoxChange(index)}
                    />
                    <label htmlFor={`custom-checkbox-${index}`}>{libraryCodeNameMap[item.code]}</label>
                  </div>
                </div>
                // </li>
              );
            })}
            {/* </ul> */}
          </div>

        </div>
      </div>
      <div className="saveButton" onClick={handleSaveButtonClick}>
        <p className="saveButtonCTA">{formState === "ready" ? "Save" : "Saving..."}</p>
      </div>
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
