export interface PageData {
    title: string
    authors: string[]
}

export const collectBookInfo = () => {
    let authorArray = []

    let title = document.getElementById('bookTitle').textContent;
    title = title.replace(/(\r\n|\n|\r)/gm, "");
    title = title.trimStart();

    const authorsHTML = document.getElementsByClassName('authorName__container')
    for (let i = 0; i < 1; i++) {
        let author = authorsHTML[i].textContent
        try {
            author = author.match(/([a-zA-Z\s\S]+)\(Goodreads Author\)/)[1]; //remove (Goodreads Author) phrase
        }
        catch {
        }
        author = author.replace(/(\r\n|\n|\r)/gm, "") //removes whitespace at front
        author = author.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " "); //removes punctuation
        authorArray = author.split(" ") //split author name into separate words
    }

    for (let i = 0; i < authorArray.length; i++) {
        if (authorArray[i].length < 1) {
            authorArray.pop(); //if last word is a blank thne remove it from the array
        }
    }

    //use below here to capture DOM's url
    // console.log(document.URL)

    const data: PageData = {
        title: title,
        authors: authorArray
    }

    return data
}



