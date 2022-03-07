import React, { useState } from 'react'
import './bookCard.css'


const BookCard: React.FC<{
    bid: string,
    isbn: string,
    titleName: string,
    author: string,
    publishYear: string
}> = ({ bid, isbn, titleName, author, publishYear }) => {


    return (
        <div>
            <p>{titleName}</p>
            <p>{author}</p>
            <p>{publishYear}</p>
            <p>{bid}</p>
        </div>
    )
}

export default BookCard