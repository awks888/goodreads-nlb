import React, { useState } from 'react'
import './BookCard.css'
// import sampleAvailability from '../utils/sampleAvailabilityResponse'
import { defaultLibraries, libraryCodeNameMap } from '../../utils/libraries'
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

    //filter out only the libraries we have saved
    let savedLibraries = defaultLibraries.filter(library => library.saved === true)
    console.log(libraryCodeNameMap)

    //takes in array of response items and sets the 2 library array states
    function arrangeLibraries(collection) {
        const availableLibs = [];
        const loanedLibs = [];

        for (let i = 0; i < collection.length; i++) {
            //identify all the attributes of the book
            const libraryCode = collection[i]['BranchID']['_text']
            const status = collection[i]['StatusDesc']['_text']

            for (let j = 0; j < savedLibraries.length; j++) {
                if (libraryCode === savedLibraries[j].code) {
                    if (savedLibraries[j]['available'] !== "available") { //if the library is already available let's not process
                        if (status === "Not on Loan") {
                            savedLibraries[j]['available'] = 'available' //if the book is available at this library let's make it available
                        } else {
                            savedLibraries[j]['available'] = 'loaned' //otherwise mark book as loaned
                        }
                    }
                }
            }
        }

        //we add the libraries into their respective arrays, depending on whether they are available
        for (const savedLibrary in savedLibraries) {
            if (savedLibraries[savedLibrary]['available'] === "available") {
                const code = savedLibraries[savedLibrary]['code']
                availableLibs.push(libraryCodeNameMap[code])
            } else if (savedLibraries[savedLibrary]['available'] === "loaned") {
                const code = savedLibraries[savedLibrary]['code']
                loanedLibs.push(libraryCodeNameMap[code])
            }
        }
        //set the states
        setAvailableLibraries(availableLibs)
        setLoanedLibraries(loanedLibs)

        if (availableLibs.length > 0) {
            setAvailable(true)
        }
    }

    //query Availability from NLB API and populate info after. 
    async function queryAvailability() {
        loadOverlay(true)
        const url = `https://boiling-plateau-78957.herokuapp.com/availability?bid=${bid}`

        const request = await axios.get(url)
        arrangeLibraries(request.data['s:Envelope']['s:Body']['GetAvailabilityInfoResponse']['Items']['Item'])
        setChecked(true)
        loadOverlay(false)

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
                    clickHandler()

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