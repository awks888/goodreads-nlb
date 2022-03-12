import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './popup.css'
import { collectBookInfo } from '../contentScript/collectDom'
import BookCard from '../components/BookCard'
import SearchOverlay from '../components/SearchOverlay'
import sampleTitles from '../utils/sampleTitlesResponse'
const axios = require('axios');


const App: React.FC<{}> = () => {
  const [title, setTitle] = useState<string | void>("")
  const [author, setAuthor] = useState<string | void>("")
  const [searching, setSearching] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("loading...")

  //list of returned titles
  const [titles, setTitles] = useState<any[]>([])

  // const titles = sampleTitles['s:Envelope']['s:Body']['SearchResponse']['Titles']['Title']

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
        try {
          setTitle(results[0].result["title"])
          setAuthor(results[0].result["authors"].toString())
        }
        catch {
          setMessage("Please go to a Goodreads book page.")
          return //end process here since user is not on a goodreads book page.
        }
        //connect to server 
        queryTitles(results[0].result["title"], results[0].result["authors"])
      });
    })
  }, [])

  //show search overlay 
  const loadOverlay = (show: boolean) => {
    setSearching(show)
  }

  //query titles from NLB API
  const queryTitles = (title: string, author: string[]) => {
    loadOverlay(true)
    let url = "http://localhost:3000/titles?" + `title=${title}`

    for (let i = 0; i < author.length; i++) {
      url = url + `&author=${author[i]}`
    }
    axios.get(url).then(resp => {

      setTitles(resp.data['s:Envelope']['s:Body']['SearchResponse']['Titles']['Title'])
      setMessage("")
      loadOverlay(false)
    });
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
          loadOverlay={loadOverlay}
          key={index}
        />
      })}
      {titles && <div>
        <p>{message}</p>
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
