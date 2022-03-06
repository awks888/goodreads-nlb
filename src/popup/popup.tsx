import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './popup.css'




const App: React.FC<{}> = () => {
  const [text, setText] = useState<string>("..loading")


  useEffect(() => {
    // chrome.runtime.sendMessage(null, "content", (returned) => {
    //   console.log(returned)
    // })
    const injected = () => {
      const title = document.getElementById('bookTitle').textContent;
      return title;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.scripting.executeScript({
        target: {
          tabId: tabs[0].id,
        },
        // files: ['../contentScript/collectDom.js'],
        function: injected
      });

    })

  }, [])

  return (
    <div>
      <p>Hello World</p>
      <img className="searchLogo" src="/goodreads.png"></img>
      <p className="response" >{text}</p>
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
