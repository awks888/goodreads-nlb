import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './popup.css'
import { collectBookInfo } from '../contentScript/collectDom'
import BookCard from '../components/BookCard'
import SearchOverlay from '../components/SearchOverlay'
import sample from '../utils/sampleResponse'



const App: React.FC<{}> = () => {
  const [text, setText] = useState<string>("..loading")
  const [title, setTitle] = useState<string>("title loading...")
  const [author, setAuthor] = useState<string>("author loading...")
  const [searching, setSearching] = useState<boolean>(false)

  const titles = sample['s:Envelope']['s:Body']['SearchResponse']['Titles']['Title']



  useEffect(() => {
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

  const parentClick = (show: boolean) => {
    // setState(state === "here" ? "not here" : "here")
    setSearching(show)
  }

  return (
    <div>
      <SearchOverlay
        modalVisible={searching}
      />
      <p className="response" >Title Searched: {title}</p>
      <p className="response" >Author Searched: {author}</p>
      {titles.map((title, index) => {
        return <BookCard
          id={index}
          bid={title['BID']['_text']}
          isbn={title['ISBN']['_text']}
          titleName={title['TitleName']['_text']}
          author={title['Author']['_text']}
          publishYear={title['PublishYear']['_text']}
          parentClick={parentClick}
          key={index}
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
