import React, { useState } from 'react'
import './BookCard.css'


const BookCard: React.FC<{
    id: number,
    bid: string,
    isbn: string,
    titleName: string,
    author: string,
    publishYear: string,
    parentClick: any,
    key: number
}> = ({ id, bid, isbn, titleName, author, publishYear, parentClick, key }) => {
    const [checked, setChecked] = useState<boolean>(false);
    const [available, setAvailable] = useState<boolean>(false)
    //create 2 array states for libraries
    const [availableLibraries, setAvailableLibraries] = useState<string[]>(["Serangoon Public Library", "Bishan Public Library", "library@orchard"]);
    const [loanedLibraries, setLoanedLibraries] = useState<string[]>(["Toa Payoh Public Library", "Choa Chu Kang Public Library", "Central Public Library"]);


    const clickHandler = () => {
        setChecked(!checked)
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
                    </div>
                    <div className="loanedSection">
                        <p className="loanedTitle">In-transit/On-Loan</p>
                        {loanedLibraries.map(function (library, idx) {
                            return (<li className="loanedLibraries" key={idx}>{library}</li>)
                        })}
                    </div>
                </div>}
            </div>
            {checked ?
                <div className="checkAvailButton" onClick={() => {
                    parentClick(true)

                    // const myTimeOut = setTimeout(() => { parentClick(10000) }, 3000)
                    setTimeout(() => { parentClick(false) }, 2000);

                }}>
                    <div className="CTAcontainer">
                        <p className="buttonCTA" >Check Availability</p>
                    </div>
                </div>
                :
                <div className="checkAvailButton" onClick={() => {
                    parentClick(true)
                    clickHandler()
                    setTimeout(() => { parentClick(false) }, 2000);

                }}>
                    <div className="CTAcontainer">
                        <p className="buttonCTA">HERE</p>
                    </div>
                </div>
            }

        </div>
    )
}

export default BookCard