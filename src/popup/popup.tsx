import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './popup.css'
import AllBooksFeed from '../components/AllBooksFeed/AllBooksFeed'
import EBooksFeed from '../components/EBooksFeed/EBooksFeed'
import { tabType, getDefaultTab } from '../utils/storage'


const App: React.FC<{}> = () => {
  const [tab, setTab] = useState<tabType>("AllBooks")

  useEffect(() => {
    getDefaultTab().then((defaultTab) => {
      setTab(defaultTab)
    })
  }, [])

  const handleOptionsClick = () => {
    chrome.runtime.openOptionsPage()
  }

  return (
    <div>
      <div className="topBar">
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
        <div className="optionsButton" onClick={handleOptionsClick}>
          <p className="optionsCTA">Options</p>
        </div>
      </div>
      {tab === "AllBooks" ?
        <div>
          <AllBooksFeed />
        </div>
        :
        <div>
          <EBooksFeed />
        </div>
      }
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)


// const nlb = async (): Promise<void> => {
//   const data = await searchNLB()
//   setText(data)
// }
// nlb()
