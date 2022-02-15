import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import './popup.css'
import { searchNLB } from '.././utils/api'



const App: React.FC<{}> = () => {
  useEffect(() => {
    searchNLB()
  }, [])

  return (
    <div>
      <p>Hello World</p>
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
