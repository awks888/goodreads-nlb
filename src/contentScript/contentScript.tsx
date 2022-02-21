import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './contentScript.css'


const App: React.FC<{}> = () => {
    return <div className="searchButton">
        <img className="searchLogo" src="https://mobileapp.nlb.gov.sg/images/NEW_NLB_mobile-app-icon_dark%20orange_final.png"></img>
        <p className="searchCTA">Search NLB</p>
    </div>
}

const root = document.createElement('div')
document.getElementById('imagecol').appendChild(root)
// document.body.appendChild(root)
ReactDOM.render(<App />, root)