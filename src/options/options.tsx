import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './options.css'
import '../popup/popup.css'
import { tabType, getDefaultTab, setDefaultTab } from '../utils/storage'

type FormState = "ready" | "saving"

const App: React.FC<{}> = () => {
  useEffect(() => {
    getDefaultTab().then((defaultTab) => {
      setTab(defaultTab)
    })
  }, [])

  const [tab, setTab] = useState<tabType>("AllBooks")
  const [formState, setFormState] = useState<FormState>("ready")

  const handleSaveButtonClick = () => {
    setFormState("saving")
    setDefaultTab(tab).then(() => {
      setTimeout(() => {
        setFormState("ready")
      }, 1000)
    })
  }


  return (
    <div>
      <h1 className="optionsTitle">Options</h1>
      <div className="optionsSection">
        <div className="defaultTabSection">
          <h2 className="defaultTabTitle">Default Tab on Opening Popup</h2>
          <div className="tabContainer">
            <div className={tab === "AllBooks" ? "tab-active" : "tab"} onClick={() => {
              setTab("AllBooks")
            }}>
              <p className={tab === "AllBooks" ? "tabText-active" : "tabText"}>All Books</p>
            </div>
            <div className={tab === "EBooks" ? "tab-active" : "tab"} onClick={() => {
              setTab("EBooks")
            }}>
              <p className={tab === "EBooks" ? "tabText-active" : "tabText"}>eBooks</p>
            </div>
          </div>
        </div>
        <div className="saveButton" onClick={handleSaveButtonClick}>
          <p className="saveButtonCTA">{formState === "ready" ? "Save" : "Saving..."}</p>
        </div>
      </div>
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
