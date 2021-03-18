import React from 'react'



const SingleBook = (props)=>{
    const book = props.book;
    console.log(book);
    if(Object.keys(book).length){return (<div>Is loading ....</div>)}
    else{return (<div><h1>Book Information </h1> </div>)}//(
        // <div id='bookInformation'>
        //   <h1>Book Information </h1> 
        //     <h2><a href='/'>Book</a> (${book[0].title})</h2>
        //         <img src= 'default-book.png'/>
        //         <div id='bookInfo'>
        //             <h4>Title: <span>{book.title}</span></h4>
        //             <h4>ISBN: <span>{book.isbn}</span></h4>
        //             <h4>Published_date: <span>{book.published_date}</span></h4>
        //             <h4>Publisher_name: <span>{book.publisher_name}</span></h4>
        //             <h4>Author_name: <span>{book.author_name}</span></h4>
        //         </div>
        //</div> 
    //);
}

export default SingleBook