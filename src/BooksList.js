import React from 'react';

const BooksList = (props) => {
     console.log(props.books);
    const books = props.books;
    return (
        <div id='book'>
            {
                books.map( book =>{
                    <a>
                        <img src={book.image} />
                        <p>{book.title}</p>
                    </a>
                })
            }
        </div>
    );
}

export default BooksList