import React from 'react';

const BooksList = (props) => {
     //console.log(props);
    const books = props.books;
    const pickBook = props.pickBook
    return (
        <div id='book'>
            {
                books.map( book =>{
                    return(
                        <a key={book.id} href={`#${book.id}`} onClick={ ()=>pickBook(book.id)}>
                            <img src={book.image} />
                            <p>{book.title}</p>
                        </a>
                    )
                })
            }
        </div>
    );
}

export default BooksList