import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { collectBookInfo } from '../../contentScript/collectDom'
import BookCard from './BookCard'
import SearchOverlay from '../SearchOverlay'
import sampleTitles from '../../utils/sampleTitlesResponse'
const axios = require('axios');


const AllBooksFeed: React.FC<{}> = () => {
    const [title, setTitle] = useState<string | void>("")
    const [author, setAuthor] = useState<string | void>("")
    const [searching, setSearching] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("loading...")
    const [error, setError] = useState<boolean>(false)

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

    //query titles from NLB API and populate titles after
    const queryTitles = (title: string, author: string[]) => {
        loadOverlay(true)
        let url = "https://boiling-plateau-78957.herokuapp.com/titles?" + `title=${title}`

        for (let i = 0; i < author.length; i++) {
            url = url + `&author=${author[i]}`
        }
        axios.get(url).then(resp => {
            const status = resp.data['s:Envelope']['s:Body']['SearchResponse']['Status']['_text']
            console.log(status)
            if (status === "OK") {
                const titles = resp.data['s:Envelope']['s:Body']['SearchResponse']['Titles']['Title']
                if (titles.length > 0) {
                    setTitles(titles)
                } else {
                    setError(true)
                }
                setMessage("")
                loadOverlay(false)
            } else {
                setError(true)
            }


        });
    }

    const EmptyState = () => {
        return (
            <div>
                <h1>No Data found.</h1>
            </div>
        )
    }

    return (
        <div>
            <SearchOverlay
                modalVisible={searching}
            />
            <p className="response" >Title Searched: {title}</p>
            <p className="response" >Author Searched: {author}</p>
            {error ?
                <EmptyState />
                :
                titles.map((title, index) => {
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


export default AllBooksFeed