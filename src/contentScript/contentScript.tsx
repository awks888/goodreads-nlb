import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './contentScript.css'


const App: React.FC<{}> = () => {
    const [clicked, setClicked] = useState<boolean>(false)



    return <div className="searchButton">
        <img className="searchLogo" src="https://mobileapp.nlb.gov.sg/images/NEW_NLB_mobile-app-icon_dark%20orange_final.png"></img>
        {/* <p className="searchCTA">Search NLB</p> */}
        <p className="searchCTA" >Search NLB</p>
    </div>
}

const root = document.createElement('div')
document.getElementById('imagecol').appendChild(root)
// document.body.appendChild(root)
ReactDOM.render(<App />, root)

// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//     if (msg === "content") {
//         const message = "hello there"
//         sendResponse(message)
//     }
// })

// const searchClick = () => {
//     // title
//     const title = document.getElementById('bookTitle').textContent
//     console.log(title)
//     // authors
//     const factfulnessAuthors = document.getElementsByClassName('authorName__container')
//     for (let i = 0; i < factfulnessAuthors.length; i++) {
//         console.log(factfulnessAuthors[i].textContent)
//     }

//     const nlb = async (): Promise<void> => {
//         const data = await searchNLB()
//         console.log(data)
//     }
//     nlb()
// }