import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './popup.css'
import { searchNLB } from '.././utils/api'



const App: React.FC<{}> = () => {
  const [text, setText] = useState<string>("..loading")

  useEffect(() => {
    const nlb = async (): Promise<void> => {
      const data = await searchNLB()
      setText(data)
    }
    nlb()

  }, [])

  return (
    <div>
      <p>Hello World</p>
      <p className="response">{text}</p>
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
