import React, { useState } from 'react'
import './BookCard.css'
// import sampleAvailability from '../utils/sampleAvailabilityResponse'
import savedLibraries from '../../utils/libraries'
const axios = require('axios');



const BookCard: React.FC<{
    id: number,
    bid: string,
    isbn: string,
    titleName: string,
    author: string,
    publishYear: string,
    loadOverlay: any,
    key: number
}> = ({ id, bid, isbn, titleName, author, publishYear, loadOverlay, key }) => {
    const [checked, setChecked] = useState<boolean>(false);
    const [available, setAvailable] = useState<boolean>(false)
    //create 2 array states for libraries
    const [availableLibraries, setAvailableLibraries] = useState<string[]>([]);
    const [loanedLibraries, setLoanedLibraries] = useState<string[]>([]);

    // const sample = sampleAvailability['s:Envelope']['s:Body']['GetAvailabilityInfoResponse']['Items']['Item']

    //takes in array of response items and sets the 2 library array states
    function arrangeLibraries(collection) {
        const availableLibs = [];
        const loanedLibs = [];

        for (let i = 0; i < collection.length; i++) {
            //identify all the attributes of the book
            const libraryCode = collection[i]['BranchID']['_text']
            const status = collection[i]['StatusDesc']['_text']

            if (libraryCode in savedLibraries) { //check if library is inside the libraries of concern
                if (savedLibraries[libraryCode]['available'] !== "available") { //if the library is already available let's not process
                    if (status === "Not on Loan") {
                        savedLibraries[libraryCode]['available'] = 'available' //if the book is available at this library let's make it available
                    } else {
                        savedLibraries[libraryCode]['available'] = 'loaned' //otherwise mark book as loaned
                    }
                }
            }
        }
        for (const savedLibrary in savedLibraries) {
            if (savedLibraries[savedLibrary]['available'] === "available") {
                availableLibs.push(savedLibraries[savedLibrary]['name'])
            } else if (savedLibraries[savedLibrary]['available'] === "loaned") {
                loanedLibs.push(savedLibraries[savedLibrary]['name'])
            }
        }
        setAvailableLibraries(availableLibs)
        setLoanedLibraries(loanedLibs)

        if (availableLibs.length > 0) {
            setAvailable(true)
        }
        // setTimeout(() => { setChecked(true) }, 3000);
        // loadOverlay(false)
    }

    //query Availability from NLB API and populate info after. 
    async function queryAvailability() {
        loadOverlay(true)
        const url = `https://boiling-plateau-78957.herokuapp.com/availability?bid=${bid}`

        const request = await axios.get(url)
        console.log("here 1")
        arrangeLibraries(request.data['s:Envelope']['s:Body']['GetAvailabilityInfoResponse']['Items']['Item'])
        console.log("here 2")
        setChecked(true)
        console.log("here 3")
        loadOverlay(false)
        console.log("here 4")
    }


    const clickHandler = () => {
        queryAvailability()
    }

    return (
        <div className="titleCard">
            <div className="bookInfo">
                <p className="titleName">{titleName}</p>
                <p className="author">{author} ({publishYear})</p>
                {checked && <div className="libraryInfo">
                    <div className="availabilitySection">
                        <p className="availableTitle">Available</p>
                        {availableLibraries.map(function (library, idx) {
                            return (<li className="availableLibraries" key={idx}>{library}</li>)
                        })}
                        <p className="author">{available ? "" : "There is no availability for this book."}</p>
                    </div>
                    <div className="loanedSection">
                        <p className="loanedTitle">Loaned/In-transit/Reserved</p>
                        {loanedLibraries.map(function (library, idx) {
                            return (<li className="loanedLibraries" key={idx}>{library}</li>)
                        })}
                    </div>
                </div>}
            </div>
            {checked ?
                //an unclickable button state displaying if book is available or not
                <div className={available ? "checkedAvailable" : "checkedUnavailable"}>
                    <div className="CTAcontainer">
                        <p className="buttonCTA">{available ? "Available" : "Not Available"}</p>
                    </div>
                </div>
                :
                //a clickable button prompting user to check for the book's availability
                <div className="checkAvailButton" onClick={() => {
                    // loadOverlay(true)
                    clickHandler()
                    // setTimeout(() => { loadOverlay(false) }, 2000);

                }}>
                    <div className="CTAcontainer">
                        <p className="buttonCTA">Check Availability</p>
                    </div>
                </div>
            }

        </div>
    )
}

export default BookCard