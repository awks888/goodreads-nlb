import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './popup.css'
import { collectBookInfo } from '../contentScript/collectDom'
import BookCard from '../components/BookCard'
import sample from '../utils/sampleResponse'



const App: React.FC<{}> = () => {
  const [text, setText] = useState<string>("..loading")
  const [title, setTitle] = useState<string>("title loading...")
  const [author, setAuthor] = useState<string>("author loading...")

  const titles = sample['s:Envelope']['s:Body']['SearchResponse']['Titles']['Title']


  useEffect(() => {
    // chrome.runtime.sendMessage(null, "content", (returned) => {
    //   console.log(returned)
    // })
    // const injected = () => {
    //   const title = document.getElementById('bookTitle').textContent;
    //   return title;
    // }

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.scripting.executeScript({
        target: {
          tabId: tabs[0].id,
        },
        // files: ['../contentScript/collectDom.js'],
        function: collectBookInfo
      }, (results) => {
        // console.log(results[0].result)
        setTitle(results[0].result["title"])
        console.log(results[0].result["title"])

        setAuthor(results[0].result["authors"].toString())
        console.log(results[0].result["authors"])
      });

    })

  }, [])

  return (
    <div>
      <p>Hello World</p>
      <img className="searchLogo" src="/goodreads.png"></img>
      <p className="response" >{title}</p>
      <p className="response" >{author}</p>
      {titles.map((title, index) => {
        return <BookCard
          bid={title['BID']['_text']}
          isbn={title['ISBN']['_text']}
          titleName={title['TitleName']['_text']}
          author={title['Author']['_text']}
          publishYear={title['PublishYear']['_text']}
        />
      })}

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
