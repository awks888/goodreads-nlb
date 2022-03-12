import React, { useState } from "react";
import './SearchOverlay.css'


const Search: React.FC<{
    modalVisible: boolean
}> = ({ modalVisible }) => {
    return (
        <div>
            {modalVisible && <div className="loading">
                <div className="uil-ring-css">
                    <div></div>
                </div>
            </div>}
        </div>
    )
}

export default Search


// { modalVisible && <div className="loading">
// <div className='uil-ring-css'>
//     <div></div>
// </div>
// </div>}
// )